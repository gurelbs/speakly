require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const router = new express.Router()
// const axios = require('axios')
// const { default: api } = require('../client/src/api/api')

router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const {txt} = data
    try {
        let answer = await googleAnswer(txt)
        res.status(201).send({answer}).end()
    } catch (err) {
        res.status(500).end(err)
    }
})

// router.post('/api/voice', async (req,res) => {
//     const data = req.body
//     const {txt,lang} = data
//     let apiURL = `http://api.voicerss.org/?key=2a0ec72724104343b35809b65a8634f8&hl=he-il&c=MP3&f=16khz_16bit_stereo&src=שלום`;
//     try {
//         const audioBuffer = await api.get(apiURL)
//         res.send(audioBuffer).end()
//     } catch (error) {
//         res.send(error).end()
//     }
// })
module.exports = router