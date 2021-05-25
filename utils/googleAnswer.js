const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
const googleAnswer = async (term,lang) => {
        const url = `https://google.com/search?q=${term}&hl=${lang}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        let res = '';
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const context = await browser.createIncognitoBrowserContext() ;
        const page = await context.newPage();
        await page.goto(url, {waitUntil:'domcontentloaded'});
        try {
            let wikiAnswer = await page.$('#kp-wp-tab-overview');
            let currency = await page.$('#knowledge-currency__updatable-data-column > div');
            let translate = await page.$('#tw-container #tw-target-text');
            let finance = await page.$('#rso g-card-section span');
            let calc = await page.$('#cwos');
            let weather = await page.$('#wob_wc');
            let answerBox = await page.$('#rso .xpdopen div');
            let topNews = await page.$('g-section-with-header') 
            // let songLyrics = await page.$('#tsuid11');
            if (wikiAnswer && !finance && !answerBox){
                await page.waitForSelector('#kp-wp-tab-overview',{visible: true})
                return res = await page.evaluate(() => document.querySelector("#kp-wp-tab-overview span").innerText)
            } 
            if (currency){
                await page.waitForSelector('#knowledge-currency__updatable-data-column',{visible: true,timeout:300})
                return res = await page.evaluate(() => document
                .querySelector('#knowledge-currency__updatable-data-column > div').innerText
                .split('\n')
                .join(' ')
                .replace('שווה','שָׁוֶה')
                .replace('ביטקוין','בִּיטְקוֹיְן'))
            }
            if (translate){
                await page.waitForSelector('#tw-container',{visible: true})
                return res = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
            }
            if (finance){
                await page.waitForSelector('#rso g-card-section',{visible: true})
                return res = await page.evaluate(() => document.querySelector('g-card-section span').innerText)
            }
            if (calc){
                await page.waitForSelector('#cwos',{visible: true})
                return res = await page.evaluate(() => document.querySelector('#cwos').innerText)
            }
            if (weather){
                await page.waitForSelector('#wob_wc',{visible: true})
                return res = await page.evaluate(() => {
                    let temp = document.querySelector("#wob_tm").innerText
                    let loc = document.querySelector("#wob_loc").innerText
                    let date = document.querySelector("#wob_dts").innerText
                    let desc = document.querySelector('#wob_dc').innerText.replace('מעונן','מְעֻנָּן')
                    return `מזג האוויר ב${loc}: ${temp}°, ${desc}. (${date}).`
                })
            }
            if (answerBox){
                await page.waitForSelector('#rso .xpdopen div',{visible: true})
                return res = await page.evaluate(() => document.querySelector("#rso .xpdopen div").innerText
                    .split('\n')
                    .slice(0,2)
                    .join(': ')
                    .replace(/\([^)]*\)|\[[^\]]*\]|\//g,' ')
                    .trim()) 
            }
            if (topNews) {
                await page.waitForSelector('g-section-with-header',{visible: true})
                return res = await page.evaluate(() => document.querySelector("g-section-with-header").innerText
                    .split('\n')
                    .join(', ')
                )
            } 
            // if (answerBox) {
            //     await page.waitForSelector('#rso .xpdopen div',{visible: true})
            //     return res = await page.evaluate(() => document.querySelector("#rso .xpdopen div").innerText
            //         .split('\n')
            //         .join(', ')
            //     )
            // } 
            // if (!wikiAnswer && answerBox){
            //     await page.waitForSelector('.xpdopen',{visible: true,timeout:300})
            //     res = await page.evaluate(() => document.querySelector(".xpdopen span").innerText)
            // } 
            // if (topNews) {
            //     await page.waitForSelector('g-section-with-header',{visible: true,timeout:300})
            //     res = await page.evaluate(() => document.querySelector("g-section-with-header g-scrolling-carousel").innerText)
            // }
        } catch (e) {
            if (e instanceof puppeteer.errors.TimeoutError) {
                console.log(e);
                return res = 'לא מצאתי משהו רלוונטי על ' + q
            }
        }
        RENDER_CATCH.set(url, res)
        await context.close(); 
        return res || `לא הבנתי, אפשר לנסות שוב`
}

module.exports = googleAnswer