// require('dotenv').config()
// const express = require('express')
// const router = new express.Router()
// const readline = require('readline')
// const puppeteer = require('puppeteer')
// // import pacmanMove from './../utils/pacmanMove'
// router.get('/api/pacman', async (req, res) => {   
//     const data = req.body
//     const {url} = data
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             args: ['--window-size=800,320']
//           });
//           const page = await browser.newPage();
//           await page.setViewport({width: 800, height: 320, deviceScaleFactor: 2});
//           await page.goto(url);
//           ['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']
//           setTimeout( async () => {
//               await page.keyboard.press('ArrowRight');
//           }, 3000);
//           setTimeout( async () => {
//               await page.keyboard.press('ArrowLeft');
//           }, 6000);
//           setTimeout( async () => {
//               await page.keyboard.press('ArrowRight');
//           }, 9000);
//         res.status(201).send('ArrowRight').end()
//     } catch (err) {
//         res.status(500).end(err)
//     }
// })


// const runPacman = async () => {

// }

// module.exports = runPacman
// module.exports = router