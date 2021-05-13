require('dotenv').config()
const express = require('express')
const router = new express.Router()
import pacmanMove from './../utils/pacmanMove'
router.post('/playground/pacman', async (req, res) => {   
    const data = req.body
    const {move} = data
    try {
        let answer = await pacmanMove(move)
        res.status(201).send({answer}).end()
    } catch (err) {
        res.status(500).end(err)
    }
})

module.exports = router