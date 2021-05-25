require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const router = new express.Router();

router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const {txt,lang} = data
    try {
        let answer = await googleAnswer(txt,lang)
        res.status(201).send({answer}).end()
    } catch (err) {
        res.status(500).send('אופס').end()
    }
})

module.exports = router