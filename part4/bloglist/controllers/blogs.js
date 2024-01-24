require('express-async-errors')
const jwt = require('jsonwebtoken')
const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('userId')

  response.status(200).json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id

  const blog = await Blog.findById(blogId).populate('userId')
  if (!blog) return response.staus(404).json({ error: 'blog doesn\'t exist' })

  return response.status(200).json(blog)
})

blogRouter.post('/', async (request, response) => {

  const body = request.body
  console.log('body from blogs post route', body)
  const token = request.token.startsWith('Bearer ') ? request.token.toString().replace('Bearer', '').trim() :  request.token
  console.log('token from blogs post route', token)
  const decodedToken = await jwt.verify(token, process.env.SECRET)
  console.log('decoded token from blogs router', decodedToken)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  let user = await User.findById(decodedToken.id)

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    userId: user._id
  })

  user.blogs = await user.blogs.concat(blog)
  await user.save()
  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/all', (request, response) => {
  Blog.deleteMany({}).then(() => {
    response.status(200).json({
      message: 'All blogs deleted'
    })
  })
})

blogRouter.put('/:id', async (request, response) => {
  const blogID = request.params.id
  const blogBody = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const updatedBlog = await Blog.updateOne({ _id: blogID }, blogBody, { new: true })

  response.status(200).json(updatedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const blogID = request.params.id

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken) {
    return response.status(401).json({ error: 'token invalid' })
  }
  await Blog.deleteOne({ _id: blogID }).then((data) => {
    response.status(200).json(data)
  })
})


module.exports = blogRouter