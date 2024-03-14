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
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: {
    type: Number,
    default: 0
  },
  id: String,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
})


blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)