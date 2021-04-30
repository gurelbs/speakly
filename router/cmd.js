const express = require('express')
const tts = require('./../voice-rss-tts/index.js');
const router = new express.Router()
require('dotenv').config()

router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    try {
        tts.speech({
            key: process.env.VOICE_RSS_API,
            hl: data.lang,
            src: data.txt,
            r: 0,
            c: 'mp3',
            f: '44khz_16bit_stereo',
            ssml: false,
            b64: false,
            callback(err, content) {
                res.status(201).end(content)
            }
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router