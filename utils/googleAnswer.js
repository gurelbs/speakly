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
            // document.querySelector("#rso > div:nth-child(2) > div > div.kp-blk.c2xzTb > div > div.ifM9O > div > div:nth-child(2) > div > span > span").innerText
// document.querySelector("#rso .xpdopen").innerText.split('\n')

            console.log({
                'wikiAnswer': wikiAnswer,
                'currency': currency,
                'translate': translate,
                'calc': calc,
                'weather': weather,
                'finance': finance,
                'speedAnswer': speedAnswer,
            });
            // document.querySelector(".mnr-c").innerText.split('\n').slice(0,3).join(': ').split(' ').slice(0,2).join(' ').replace('\/',' - ')
            // document.querySelector("#knowledge-finance-wholepage__entity-summary span").innerText
            // document.querySelector(".xpdopen").innerText.split('\n').slice(0,document.querySelector(".xpdopen").innerText.split('\n').length-2).join(' ')
            // let answerBox = await page.$('#rso .kp-blk');

            // let topNews = await page.$('#rso g-section-with-header') 
            // document.querySelector("#rso .kp-blk").innerText.split('\n')
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
                // let isGoogleFirstResult = [...document.querySelectorAll(".mnr-c a")].filter(el => el.innerText === 'מידע על תקצירי תוצאות חיפוש ראשונות').length > 0
                // if (!isGoogleFirstResult){
                // } else { ;       
                //     await page.waitForSelector('.mnr-c',{visible: true})
                //     res = await page.evaluate(() => document.querySelector(".mnr-c").innerText
                //         .split('\n')
                //         .slice(2,3)
                //         .join(''))
                // }
                // return res
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