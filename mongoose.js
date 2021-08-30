const mongoose = require('mongoose')

async function connectMongoose() {
  try {
      await mongoose.connect(process.env.ATLAS_URI, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
      })
      console.log('Connected Database Successfully')
  } catch (error) {
      console.log(err)
  }
}

module.exports = connectMongoose