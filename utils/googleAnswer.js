const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
process.setMaxListeners(process.getMaxListeners() + 1);
const googleAnswer = async (term,lang) => {
        const url = `https://google.com/search?q=${term}&hl=${lang}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        let res = '';
        let err = `לא מצאתי משהו רלוונטי על ${term}`;
        const browser = await puppeteer.launch({
            args: ['--no-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
        });
        const context = await browser.createIncognitoBrowserContext() ;
        const page = await context.newPage();
        await page.goto(url, {waitUntil:'domcontentloaded'});
        try {
            res = '';
            let wikiAnswer = await page.$('#kp-wp-tab-overview');
            let currency = await page.$('#knowledge-currency__updatable-data-column');
            let translate = await page.$('#tw-container');
            let calc = await page.$('#cwos');
            let weather = await page.$('#wob_wc');
            let finance = await page.$('#knowledge-finance-wholepage__entity-summary');
            let speedAnswer = await page.$('#rso .xpdopen');
            let validateAnswer = !(currency || translate || calc || weather || finance)
            let wholepage = await page.$('.kp-wholepage')
            let innerCard = await page.$('g-inner-card')
            let wikiExpand = await page.$('.kno-rdesc')
            let lyrics = await page.$('.kp-header')

            if (wikiAnswer && validateAnswer && !speedAnswer && !wholepage){
                console.log('is wikiAnswer & validateAnswer & NOT speedAnswer & NOT wholepage');
                await page.waitForSelector('#kp-wp-tab-overview',{visible: true})
                res += await page.evaluate(() => document.querySelector("#kp-wp-tab-overview").innerText)
            } 
            if (currency){
                console.log('is currency');
                await page.waitForSelector('#knowledge-currency__updatable-data-column',{visible: true,timeout:300})
                res += await page.evaluate(() => document
                .querySelector('#knowledge-currency__updatable-data-column > div').innerText
                .split('\n')
                .join(' ')
                .replace('שווה','שָׁוֶה')
                .replace('ביטקוין','בִּיטְקוֹיְן'))
            }
            if (translate){
                console.log('is translate');
                await page.waitForSelector('#tw-container',{visible: true})
                res += await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
            }
            if (calc){
                console.log('is calc');
                await page.waitForSelector('#cwos',{visible: true})
                res += await page.evaluate(() => document.querySelector('#cwos').innerText)
            }
            if (weather){
                console.log('is weather');
                await page.waitForSelector('#wob_wc',{visible: true})
                return res += await page.evaluate(() => {
                    let temp = document.querySelector("#wob_tm").innerText
                    let loc = document.querySelector("#wob_loc").innerText
                    let date = document.querySelector("#wob_dts").innerText
                    let desc = document.querySelector('#wob_dc').innerText.replace('מעונן','מְעֻנָּן')
                    return `מזג האוויר ב${loc}: ${temp}°, ${desc}. (${date}).`
                })
                
            }
            if (finance){
                console.log('is finance');
                await page.waitForSelector('#knowledge-finance-wholepage__entity-summary',{visible: true})
                return res += await page.evaluate(() => document.querySelector('#knowledge-finance-wholepage__entity-summary span').innerText)
            }
            if (wikiExpand){
                console.log('is wikiExpand');
                await page.waitForSelector('.kno-rdesc span',{visible: true})
                return res += await page.evaluate(() => document.querySelector('.kno-rdesc span').innerText)
            }
            if (wholepage && validateAnswer){
                console.log('is wholepage');
                return res += await page.evaluate(() => document.querySelector(".kp-wholepage").innerText
                .split('\n')
                .join(': ')
                .trim()
                .replace('\/',' - '))
            }
            if (speedAnswer && validateAnswer){
                console.log('is speedAnswer & validateAnswer');
                let isGoogleFirstAnswerResult = await page.evaluate(() => document.querySelector("#rso div span a").innerText === 'מידע על תקצירי תוצאות חיפוש ראשונות')
                await page.waitForSelector('#rso .xpdopen',{visible: true})
                console.log({'isGoogleFirstAnswerResult':isGoogleFirstAnswerResult})
                if (isGoogleFirstAnswerResult){
                    res += await page.evaluate(() => document.querySelector("#rso .xpdopen").innerText
                    .split('\n')
                    .slice(1,3)
                    .join(': ')
                    .trim()
                    .replace('\/',' - '))
                } else {
                    res += await page.evaluate(() => document.querySelector("#rso .xpdopen").innerText
                        .split('\n')
                        .join(': ')
                        .trim()
                        .replace('\/',' - '))
                    }
                }
            if (innerCard && validateAnswer){
                res += await page.evaluate(() => [...document.querySelectorAll("g-inner-card")].map(el => el.innerText).join(' '))
            }
            if (!speedAnswer && !validateAnswer && wikiAnswer){
                res += await page.evaluate(() => document.querySelector(".g").innerText
                    .split('\n')
                    .join(' ')
                    .trim())
            }
            if (lyrics){
                console.log('is lyrics')
                res += await page.evaluate(() => [...document.querySelectorAll("div")]
                    .filter(el => el.getAttribute('data-attrid'))
                    .map(el => el.innerText)
                    .join(', '))
                
            }
            res += '\n-\n'
        } catch (e) {
            if (e instanceof puppeteer.errors.TimeoutError) {
                return res += 'יש לי איזה באג משום מה '
            } else {
                return  res += 'אין לי מושג מה הבעיה אבל לא מצאתי מידע על '+ term;
            }
        }
        RENDER_CATCH.set(url, res)
        await context.close(); 
        return res || err
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