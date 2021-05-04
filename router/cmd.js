require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const tts = require('./../voice-rss-tts/index.js');

const router = new express.Router()
let answer;
router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const termStartWith = x => data.txt.startsWith(x)
    const what = termStartWith('מה')
    const how = termStartWith('איך')
    const howMuch = termStartWith('כמה')
    const who = termStartWith('מי')
    answer = await googleAnswer(data.txt)
    console.log(answer)
    try {
        tts.speech({
            key: process.env.VOICE_RSS_API,
            hl: data.lang,
            src: answer,
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false,
            b64: false,
            callback(err, content) {
                res.status(201).end(content || err)
            }
        })
    } catch (err) {
        res.status(500).end(err)
    }
})

module.exports = router