const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
const googleAnswer = async (term) => {
        const url = `https://google.com/search?q=${term}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        let res = '';
        let foundElement;
        const browser = await puppeteer.launch();
        const context = await browser.createIncognitoBrowserContext() 
        const page = await context.newPage();
        const navigationPromise = page.waitForNavigation();
        await page.goto(url);
        try {
            await navigationPromise;
            let answerBox = await page.$('.xpdopen .kp-header div')
            let wikiAnswer = await page.$('#kp-wp-tab-overview > div span')
            let currency = await page.$('#knowledge-currency__updatable-data-column > div')
            let translate = await page.$('#tw-container #tw-target-text')
            let finance = await page.$('g-card-section span')
            let calc = await page.$('#cwos')
            let weather = await page.$('#wob_wc')
            foundElement = await page.waitForSelector('.xpdopen .kp-header div, #kp-wp-tab-overview, #knowledge-currency__updatable-data-column, #tw-container #tw-target-text, g-card-section span, #cwos, #wob_wc',{timeout: 3000});
            if (foundElement) {
                if (answerBox){
                    await navigationPromise;
                    res = await page.evaluate(() => document.querySelector(".xpdopen .kp-header div").innerText
                        .split('\n')
                        .splice(0,2)
                        .join(' ')
                        .replace('ק״מ','קילומטר')
                        .replace('קמ\"ר','קילומטר רבוע')
                        .replace(/\([^)]*\)/g,'')
                        .replace('/',': '))
                }
                if (wikiAnswer && !answerBox){
                    await navigationPromise;
                    res = await page.evaluate(() => document.querySelector('#kp-wp-tab-overview div span').innerText);
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
            } else {
                res = `קצת מביך... לא מצאתי מידע ישיר על ${term}`
            }
        } catch (e) {
            console.log(e.message);
            res || `נסה לחפש שוב עם שאילתא מדוייקת יותר`
        }
        RENDER_CATCH.set(url, res)
        await context.close(); 
        return res || `נסה לחפש שוב עם שאילתא מדוייקת יותר`
}

module.exports = googleAnswer