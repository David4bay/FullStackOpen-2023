const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogRouter.delete('/all', async (request, response, next) => {
  await Blog.deleteMany({}).then(() => {
    response.status(200).json({
      message: 'All blogs deleted'
    })
  }).catch((error) => next(error))
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)

  await blog.save().then(result => {
    response.status(201).json(result)
  }).catch(error => next(error))
})

blogRouter.put('/:id', async (request, response, next) => {
  const blogID = request.params.id
  const blogBody = request.body

  await Blog.updateOne({ _id: blogID }, blogBody, { new: true }).then((data) => {
    response.status(200).json(data)
  }).catch((error) => next(error))
})

blogRouter.delete('/:id', async (request, response, next) => {
  const blogID = request.params.id

  await Blog.deleteOne({ _id: blogID }).then((data) => {
    response.status(200).json(data)
  }).catch((error) => next(error))
})


module.exports = blogRouter