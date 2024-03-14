const mongoose = require('mongoose')

const commentsSchema = mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    },
    comment: String,
    id: String
})

commentsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Comments = mongoose.model('Comment', commentsSchema)

module.exports = Comments