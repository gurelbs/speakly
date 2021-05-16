const mongoose = require('mongoose')
require('dotenv').config();
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

mongoose.connection.once('open', () => console.log('Connected Database Successfully'));