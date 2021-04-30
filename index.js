const express = require('express')
const cmd = require('./router/cmd')
const app = express()
const cors = require('cors')
const { json } = require('express')

app.use(cors())
app.use(express.json())
app.use(cmd)

const port = process.env.PORT || 5000
app.listen(port,() => console.log(`server run at http://localhost:${port}`))