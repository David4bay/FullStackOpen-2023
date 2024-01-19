const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    response.status(201).json(result)
  }).catch(error => next(error))
})

blogRouter.delete('/all', async (request, response, next) => {
  Blog.deleteMany({}).then(() => {
    response.status(200).json({
      message: 'All blogs deleted'
    })
  }).catch((error) => next(error))
})

module.exports = blogRouter