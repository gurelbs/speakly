require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const tts = require('./../voice-rss-tts/index.js');

const router = new express.Router()
router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const {txt,lang} = data
    try {
        const answer = await googleAnswer(txt,lang)
        tts.speech({
            key: '2a0ec72724104343b35809b65a8634f8',
            hl: data.lang,
            src: answer.res,
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false,
            b64: false,
            callback(error, content) {
                return res.status(201)
                    .send(error || {content, answer})
                    .end()
            }
        })
    } catch (err) {
        res.status(500).end(err)
    }
})

module.exports = router


// const termStartWith = x => data.txt.startsWith(x)
// const what = termStartWith('מה')
// const how = termStartWith('איך')
// const howMuch = termStartWith('כמה')
// const who = termStartWith('מי')