require('dotenv').config()
const mongoose = require('mongoose')
mongoose.Types.ObjectId.isValid('all')
const config = require('../utils/config')
const logger = require('../utils/logger')

mongoose.connect(config.MONGODB_URI).then(() => {
  console.log('connected to MongoDB Database')
}).catch((error) => {
  logger.info('error connecting to MongoDB:', error.message)
})

const blogSchema = new mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)