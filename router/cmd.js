require('dotenv').config()
const express = require('express')
const googleAnswer = require('./../utils/googleAnswer')
const router = new express.Router()

router.post('/api/cmd', async (req, res) => {   
    const data = req.body
    const {txt} = data
    const answer = await googleAnswer(txt)
    try {
        res.status(201).send({answer}).end()
    } catch (err) {
        res.status(500).send(err).end()
    }
})

module.exports = router