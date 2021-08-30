const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path: '/'});

function mongooseConnect(){
    try {
        mongoose.connect(process.env.ATLAS_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
        })
        mongoose.connection.once('open', () => console.log('Connected Database Successfully'));
    } catch (error) {
        console.log(error)
    }
} 
module.exports = mongooseConnect