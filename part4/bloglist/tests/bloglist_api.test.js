const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
mongoose.set('bufferTimeoutMS', 1000000)

const api = supertest(app)

describe('test should work within this scope', () => {

  let token

beforeAll(async () => {
      // Clear existing data
      await User.deleteMany({})
      await Blog.deleteMany({})
    
      // Create a user for testing
      await api.post('/api/users').send({
        username: 'Davidbay',
        name: 'David Bayode',
        password: process.env.PASSWORD,
      })
    
      const loginResponse = await api
      .post('/api/login')
      .send({
        username: 'Davidbay',
        password: process.env.PASSWORD,
      })
    
      token = `Bearer ${loginResponse.body.token}`
    
    }, 100000)

    
test('is empty', async () => {
  const response = await api
    .get('/api/blogs')
    .set({ Authorization: token })

  expect(response.body).toEqual([])
}, 100000)

test('validate post request', async () => {
  
      const user = await User.findOne({ username: 'Davidbay' })
    
      await api.post('/api/blogs')
        .set({ Authorization: token })
        .send({
          url: 'example.com',
          title: 'FullStackOpen is awesome!',
          author: 'David Bayode',
          userId: user.id
        }).expect(201)
        
    }, 100000)

test('add new blog', async () => {
  const user = await User.findOne({ username: 'Davidbay' })

  const newBlog = {
    url: 'exampledfdf.com',
    title: 'FullStackOpen is awesome!',
    author: 'David Bayfdfode',
    userId: user.id,
    likes: 987654321,
  }

  const response = await api
    .post('/api/blogs')
    .set({ Authorization: token })
    .send(newBlog)
      
  expect(response.body.id).toBeDefined()

  const blogsAfterAdding = await api.get('/api/blogs')
  expect([blogsAfterAdding.body[0]]).toHaveLength(1)
}, 100000)

test('return a response in JSON', async () => {
  await api
    .get('/api/blogs')
    .set({ Authorization: token })
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('add new blog', async () => {
  const user = await User.findOne({ username: 'Davidbay' })
    
  const response = await api
    .post('/api/blogs')
    .set({ Authorization: token })
    .send({
      url: 'exampledfdf.com',
      title: 'FullStackOpen is awesome!',
      author: 'David Bayfdfode',
      userId: user.id,
      likes: 987654321,
    }).expect(201)

  await api.get('/api/blogs')
  .set({ Authorization: token }).expect(200)
  console.log('The response body of add new blog is', response.body)  
  expect([response.body]).toHaveLength(1)
}, 100000)

  
test('create and edit an already existing blog', async () => {

  await Blog.deleteMany({})

  const user = await User.findOne({ username: 'Davidbay' })

  const response = await api.post('/api/blogs')
    .set({ Authorization: token })
    .send({
      url: 'example.com',
      title: 'FullStackOpen is awesome!',
      author: 'David Bayode',
      userId: user.id,
    })

  const responseID = response.body.id

  await api
    .put(`/api/blogs/${responseID}`)
    .set({ Authorization: token })
    .send({
      url: 'example.com',
      title: 'FullStackOpen is even more awesome now!',
      author: 'David Bayode',
      userId: user.id,
      likes: 987654321,
    })

  const updatedBlog = await Blog.findById(responseID)
  expect(updatedBlog.title).toBe('FullStackOpen is even more awesome now!')
}, 100000)

test('no likes defaults to 0', async () => {

  const user = await User.findOne({ username: 'Davidbay' })

  const response = await api
    .post('/api/blogs')
    .set({ Authorization: token })
    .send({
      url: 'exampledfdf.com',
      title: 'FullStackOpen is awesome!',
      author: 'David Bayfdfode',
      userId: user.id,
    })

  expect(response.body.likes).toBe(0)
})

test('handle empty title or url when new blog is added', async () => {
  const response = await api
    .post('/api/blogs')
    .set({ Authorization: token })
    .send({
      author: 'David Bayode',
    })

  expect(response.body.error).toContain('title')
  expect(response.body.error).toContain('url')
})

test('can create and delete a blog', async () => {

  const user = await User.findOne({ username: 'Davidbay' })

  const response = await api
                          .post('/api/blogs')
                          .set({ Authorization: token })
                          .send({
                          url: 'exampledfdf.com',
                          title: 'FullStackOpen is awesome!',
                          author: 'David Bayfdfode',
                          userId: user.id,
  })

  await api.delete(`/api/blogs/${response.body.id}`)
           .set({ Authorization: token })
           .expect(204)
}, 100000)

  

})

afterAll(async () => {
  await mongoose.connection.close()
}, 70000)