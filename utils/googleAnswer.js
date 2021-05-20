const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
const googleAnswer = async (term,lang) => {
        const url = `https://google.com/search?q=${term}&hl=${lang}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        let res = '';
        const browser = await puppeteer.launch({
            args: [
                '--no-sandbox'
            ],
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const context = await browser.createIncognitoBrowserContext() 
        const page = await context.newPage();
        const navigationPromise = page.waitForNavigation();
        await page.goto(url,{waitUntil: 'networkidle2'});
        try {
            await navigationPromise;
            let answerBox = await page.$('.xpdopen span')
            let wikiAnswer = await page.$('#kp-wp-tab-overview span')
            let currency = await page.$('#knowledge-currency__updatable-data-column > div')
            let translate = await page.$('#tw-container #tw-target-text')
            let finance = await page.$('g-card-section span')
            let calc = await page.$('#cwos')
            // let calc2 = await page.$('.xpdopen')
            // document.querySelector(".xpdopen").innerText.replace(/הצגת תוצאות על/g,'').split('\n').slice(1,2).join()
            let weather = await page.$('#wob_wc')
            let songLyrics = await page.$('.kp-blk')
            let topNews = await page.$('g-section-with-header') 
            if (songLyrics) {
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector(".kp-blk").innerText.split('\n').join(', ').replace('הצגת עוד',''))
            } 
            if (wikiAnswer){
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector("#kp-wp-tab-overview span").innerText)
            } 
            if (currency){
                await navigationPromise;
                res = await page.evaluate(() => document
                    .querySelector('#knowledge-currency__updatable-data-column > div').innerText
                    .split('\n')
                    .join(' ')
                    .replace('שווה','שָׁוֶה')
                    .replace('ביטקוין','בִּיטְקוֹיִיְן'))
            }
            if (translate){
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
            }
            if (finance){
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector('g-card-section span').innerText)
            }
            if (calc){
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector('#cwos').innerText)
            }
            if (weather){
                await navigationPromise;
                res = await page.evaluate(() => {
                    let temp = document.querySelector("#wob_tm").innerText
                    let loc = document.querySelector("#wob_loc").innerText
                    let date = document.querySelector("#wob_dts").innerText
                    let desc = document.querySelector('#wob_dc').innerText.replace('מעונן','מְעֻנָּן')
                    return `מזג האוויר ב${loc}: ${temp}°, ${desc}. (${date}).`
                })
            }
            if (topNews) {
                await navigationPromise;
                res = await page.evaluate(() => document.querySelector("g-section-with-header g-scrolling-carousel").innerText)
            }
            await context.close(); 
        } catch (e) {
            RENDER_CATCH.set(url, res)
            await context.close(); 
            console.log(e.message);
            res = `לא הבנתי, אפשר לנסות שוב`
        }
        RENDER_CATCH.set(url, res)
        return res || `לא הבנתי, אפשר לנסות שוב`
}

module.exports = googleAnswer