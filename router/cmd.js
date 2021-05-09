require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const router = new express.Router()
const axios = require('axios')

router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const {txt} = data
    try {
        const answer = await googleAnswer(txt)
        res.status(201).send({answer}).end()
    } catch (err) {
        res.status(500).end(err)
    }
})

// const fetchData = async () => {
//     let apiURL = `http://api.voicerss.org/?key=${process.env.VOICE_RSS_API}&hl=he-il&c=MP3&f=16khz_16bit_stereo&src=שלום,עולם`;
//     const data = await axios.request({
//         responseType: 'arraybuffer',
//         url: apiURL,
//         method: 'get',
//         headers: {
//           'Content-Type': 'audio/mp3',
//         },
//       })
//     return data
// }
// router.get('/api/voice', async (req,res) => {
//     const data = req.body
//     const {txt,lang} = data
//     console.log(txt,lang);
//     try {
//         const result = await fetchData()
//         res.status(200).send(result).end()
//     } catch (error) {
//         res.status(404).send(error).end()
//     }
// })
module.exports = router


// const termStartWith = x => data.txt.startsWith(x)
// const what = termStartWith('מה')
// const how = termStartWith('איך')
// const howMuch = termStartWith('כמה')
// const who = termStartWith('מי')