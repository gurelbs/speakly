const mongoose = require('mongoose')
require('dotenv').config();
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => console.log('Connected Database Successfully'));