const puppeteer = require('puppeteer');
const RENDER_CATCH = new Map()
const googleAnswer = async term => {
        const url = `https://google.com/search?q=${term}`
        if (RENDER_CATCH.has(url)) return RENDER_CATCH.get(url)
        const browser = await puppeteer.launch();
        const context = await browser.createIncognitoBrowserContext() 
        const page = await context.newPage();
        await page.goto(url, {waitUntil: 'domcontentloaded'});
        // const rso = await page.waitForSelector('#rso')
        // const g = await page.waitForSelector('.g')
        // const calc = await page.waitForSelector('#cwos')
        // const translate = await page.waitForSelector('#tw-container #tw-target-text')
        // const directAnswer = await page.waitForSelector('#rso div')
        // const wiki = await page.waitForSelector('#kp-wp-tab-overview div span')
        let res;
        if (await page.$('#knowledge-currency__updatable-data-column > div')) { 
            console.log('found'); 
            res = await page.evaluate(() => document
                .querySelector('#knowledge-currency__updatable-data-column > div').innerText
                .split('\n')
                .join(' ')
                .replace('שווה','שָׁוֶה')
                .replace('ביטקוין','בִּיטְקוֹיִיְן'))
        } else if (await page.$('#tw-container #tw-target-text')) {
            console.log('should translate');
        } else {
            console.log('no found');
            res = `לא מצאתי מידע על ${term}`
        }
        await context.close(); 
        RENDER_CATCH.set(url, res)
        return res
}

module.exports = googleAnswer
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