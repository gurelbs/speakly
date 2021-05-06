const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
const googleAnswer = async (term, lang) => {
        const url = `https://google.com/search?q=${term}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        const browser = await puppeteer.launch();
        const context = await browser.createIncognitoBrowserContext() 
        const page = await context.newPage();
        await page.goto(url,{waitUntil: 'domcontentloaded'});
        let res;
        let foundElement;
        try {
            foundElement = await page.waitForSelector('.xpdopen .kp-header div, #kp-wp-tab-overview, #knowledge-currency__updatable-data-column, #tw-container #tw-target-text, g-card-section span, #cwos, #wob_wc',{timeout: 5000});
        } catch (error) {
            console.log(error);
        }
        let answerBox = await page.$('.xpdopen .kp-header div')
        let wikiAnswer = await page.$('#kp-wp-tab-overview > div span')
        let currency = await page.$('#knowledge-currency__updatable-data-column > div')
        let translate = await page.$('#tw-container #tw-target-text')
        let finance = await page.$('g-card-section span')
        let calc = await page.$('#cwos')
        let weather = await page.$('#wob_wc')
        try {
            if (foundElement) {
                if (answerBox){
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
                    res = await page.evaluate(() => document.querySelector('#kp-wp-tab-overview div span').innerText);
                }
                if (currency){
                    res = await page.evaluate(() => document
                        .querySelector('#knowledge-currency__updatable-data-column > div').innerText
                        .split('\n')
                        .join(' ')
                        .replace('שווה','שָׁוֶה')
                        .replace('ביטקוין','בִּיטְקוֹיִיְן'))
                }
                if (translate){
                    res = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
                    lang = await page.evaluate(() => document.querySelector("#tw-container #tw-target-text span").getAttribute('lang'))
                }
                if (finance){
                    res = await page.evaluate(() => document.querySelector('g-card-section span').innerText)
                }
                if (calc){
                    res = await page.evaluate(() => document.querySelector('#cwos').innerText)
                }
                if (weather){
                    res = await page.evaluate(() => {
                        let temp = document.querySelector("#wob_tm").innerText
                        let loc = document.querySelector("#wob_loc").innerText
                        let date = document.querySelector("#wob_dts").innerText
                        let desc = document.querySelector('#wob_dc').innerText
                        return `מזג האוויר ב${loc}: ${temp}°C, ${desc}. (${date}).`
                    })
                }
            } else {
                res = `קצת מביך... לא מצאתי מידע ישיר על ${term}`
            }
        } catch (error) {
            res = `קצת מביך... לא מצאתי מידע ישיר על ${term}`
        }
        await context.close(); 
        RENDER_CATCH.set(url, {res,lang})
        return { res, lang }
}

module.exports = googleAnswer
// try {
//     switch (res) {
//         case answerBox:
//             res = answerBox.innerText
//             .split('\n')
//             // .splice(0,2)
//             .join(' ')
//             .replace('ק״מ','קילומטר')
//             .replace('קמ\"ר','קילומטר רבוע')
//             .replace(/\([^)]*\)/g,'')
//             .replace('/',': ')
//             break;  
//         case wikiAnswer:
//             res = await page.evaluate(() => document.querySelector('#kp-wp-tab-overview div span').innerText);
//             break;
//         case currency:
//             res = await page.evaluate(() => document
//             .querySelector('#knowledge-currency__updatable-data-column > div').innerText
//             .split('\n')
//             .join(' ')
//             .replace('שווה','שָׁוֶה')
//             .replace('ביטקוין','בִּיטְקוֹיִיְן'))
//             break;
//         case translate:
//             res = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
//             lang = await page.evaluate(() => document.querySelector("#tw-container #tw-target-text span").getAttribute('lang'))
//             break;
//         case finance:
//             res = await page.evaluate(() => document.querySelector('g-card-section span').innerText)
//             break;
//         case calc:
//             res = await page.evaluate(() => document.querySelector('#cwos').innerText)
//             break;
//         default:
//             console.log('no found');
//             res = `לא מצאתי מידע על ${term}`
//             break;
//     }
// } catch (error) {
//     res = error
//     console.log(res);
// }

        // await page.goto(url, {waitUntil: 'domcontentloaded'});

        // const rso = await page.waitForSelector('#rso')
        // const g = await page.waitForSelector('.g')
        // const calc = await page.waitForSelector('#cwos')
        // const translate = await page.waitForSelector('#tw-container #tw-target-text')
        // const directAnswer = await page.waitForSelector('#rso div')
        // const wiki = await page.waitForSelector('#kp-wp-tab-overview div span')

        // if (await page.$("#cwos")) {
        //     res = await page.evaluate(() => document.querySelector("#cwos").innerText)
        // } else
        // if (await page.$('.xpdopen > div')) {
        //     res = await page.evaluate(() => document.querySelector(".xpdopen > div").innerText
        //         .split('\n')
        //         // .splice(0,2)
        //         .join(' ')
        //         .replace('ק״מ','קילומטר')
        //         .replace('קמ\"ר','קילומטר רבוע')
        //         .replace(/\([^)]*\)/g,'')
        //         .replace('/',': '))
        // } 
        // if (await page.$('#kp-wp-tab-overview > div span') || await page.$('.xpdopen > div')) {
        //     res = await page.evaluate(() => document.querySelector('#kp-wp-tab-overview div span').innerText)
        // } else if (await page.$('#knowledge-currency__updatable-data-column > div')) { 
        //     res = await page.evaluate(() => document
        //         .querySelector('#knowledge-currency__updatable-data-column > div').innerText
        //         .split('\n')
        //         .join(' ')
        //         .replace('שווה','שָׁוֶה')
        //         .replace('ביטקוין','בִּיטְקוֹיִיְן'))
        // } else if (await page.$('#tw-container #tw-target-text')) {
        //     res = await page.evaluate(() => document.querySelector('#tw-container #tw-target-text').innerText)
        //     lang = await page.evaluate(() => document.querySelector("#tw-container #tw-target-text span").getAttribute('lang'))
        // } else if (await page.$("#rhs a > div")){
        //     res = await page.evaluate(() => document.querySelector("#rhs a > div").innerText.split('\n').splice(0,1).join(''))
        // } else {
        //     console.log('no found');
        //     res = `לא מצאתי מידע על ${term}`
        // }

        // document.querySelector("#knowledge-currency__updatable-data-column > div").innerText.split('\n').join(' ')
        // document
        //     .querySelector("#rso div").innerText
        //     .split('\n')
        //     .splice(0,2)
        //     .join(' ')
        //     .replace('ק״מ','קילומטר')
        //     .replace('קמ\"ר','קילומטר רבוע')
        //     .replace('/',': ')
        // document.querySelector("#tw-container #tw-target-text").innerText
        // if (!rso && !g && !wiki) return `לא מצאתי מידע על ${term}`
        // const res = await page.evaluate(() => wiki.innerText)
        // console.log(!!rso,!!g,!!wiki);
        // const toArr = g1.split('\n')
        // const query = toArr[0].split('/').join('')
        // const g2 = query.replace(/\([^)]*\)/g,' ')
        // return res
        // ? rso 
        // : g
        // ? g
        // : wiki
        // ? wiki
        // :  `לא מצאתי מידע על ${term}`
// const allResult = await page.evaluate(() => {
//    const g = document.querySelector('.g')
    // מי זה אילון מאסק
    // return document.querySelector("#kp-wp-tab-overview div span").innerText
    // תרגום הכל מאלוהים לערבית
    // return document.querySelector("#tw-spkr-button").click()
    // const more = document
    //     .querySelector("#kp-wp-tab-overview > div.TzHB6b.cLjAic.LMRCfc > div > div > div > div > div:nth-child(1) > div > div > div").innerText
    //     .split('\n')
    //     .slice(1)
    //     .join(' ')
    //     .replace('ויקיפדיה', 'מקור: וִיקִיפֶּדְיָה')
    //     return more
        // return document
    //     .querySelector('div.g').lastElementChild.innerText
    //     .split('\n')
    //     .slice(1,2)
    //     .join(' ')
    //     .replace(/\([^)]*\)/g,' ')
    //     .trim()
        // document.querySelector('#rso .g').innerText.replace(/[\n|\t|/|\w|›|(|)|:|.|,|·]/g,' ').split(' ').filter(el => el !== '').join(' ')
// })
// await browser.close();
// return allResult ? allResult : `לא מצאתי מידע על ${term}`

// const browser = await puppeteer.launch();
// const page = await browser.newPage();
// await page.goto('https://www.youtube.com/results?search_query=crazy',{waitUntil: 'domcontentloaded'})
// if (await page.$('#contents > ytd-video-renderer a')) {
// return await page.click('#contents > ytd-video-renderer a')
// }
// await browser.close();

