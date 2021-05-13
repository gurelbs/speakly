const readline = require('readline')
const puppeteer = require('puppeteer')

const runPacman = async () => {
    const browser = await puppeteer.launch({
      headless: false,
      executablePath: 'c:/Program Files/Google/Chrome/Application/chrome.exe',
      args: ['--window-size=800,320']
    });
    const page = await browser.newPage();
    await page.setViewport({width: 800, height: 320, deviceScaleFactor: 2});
    await page.goto('https://speakly.cf/pacman/PAC-MAN.html');
    ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']
    setTimeout( async () => {
        await page.keyboard.press('ArrowRight');
    }, 3000);
    setTimeout( async () => {
        await page.keyboard.press('ArrowLeft');
    }, 6000);
    setTimeout( async () => {
        await page.keyboard.press('ArrowRight');
    }, 9000);
}

module.exports = runPacman