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
            let currency = await page.$('#knowledge-currency__updatable-data-column');
            let translate = await page.$('#tw-container');
            let calc = await page.$('#cwos');
            let weather = await page.$('#wob_wc');
            let finance = await page.$('#knowledge-finance-wholepage__entity-summary');
            let speedAnswer = await page.$('#rso .xpdopen');
            let validateAnswer = !(currency || translate || calc || weather || finance)

            if (wikiAnswer && validateAnswer && !speedAnswer){
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
            if (finance){
                await page.waitForSelector('#knowledge-finance-wholepage__entity-summary',{visible: true})
                return res = await page.evaluate(() => document.querySelector('#knowledge-finance-wholepage__entity-summary span').innerText)
            }
            if (speedAnswer && validateAnswer){
                await page.waitForSelector('#rso .xpdopen',{visible: true})
                return res = await page.evaluate(() => document.querySelector("#rso .xpdopen").innerText
                .split('\n')
                .join(': ')
                .trim()
                .replace('\/',' - '))
            }
        } catch (e) {
            if (e instanceof puppeteer.errors.TimeoutError) {
                res = 'לא מצאתי משהו רלוונטי על ' + q
            } else {
                res = `לא הבנתי, אפשר לנסות שוב`
            }
        }
        RENDER_CATCH.set(url, res)
        await context.close(); 
        return res || `לא הבנתי, אפשר לנסות שוב`
}

module.exports = googleAnswer


// console.log({
//     'wikiAnswer': wikiAnswer,
//     'currency': currency,
//     'translate': translate,
//     'calc': calc,
//     'weather': weather,
//     'finance': finance,
//     'speedAnswer': speedAnswer,
// });