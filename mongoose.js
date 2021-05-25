require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => console.log('Connected Database Successfully'));