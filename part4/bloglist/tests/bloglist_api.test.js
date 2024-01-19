const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

beforeAll(async () => {
  await api.delete('/api/blogs/all')
  await api.post('/api/blogs').send({
    'title': 'FullStackOpen is awesome!',
    'author': 'David Bayode',
    'url': 'example.com',
    'likes': 987654321
  })
}, 150000)

test('return a response in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('has an id property', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0]).toHaveProperty('id')
}, 100000)

test('add new blog', async () => {
  await api.post('/api/blogs').send({
    'title': 'FullStackOpen is awesome!',
    'author': 'David Bayode',
    'url': 'example.com',
    'likes': 987654321
  }).expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('no likes defaults to 0', async () => {
  const response = await api.post('/api/blogs').send({
    'title': 'FullStackOpen is awesome!',
    'author': 'David Bayode',
    'url': 'example.com'
  })

  const body = response.body

  const lastAddedItem = body[body.length - 1]
  console.log(lastAddedItem, 'lastAddedItem')
  // expect(lastAddedItem).toBe(0)
})

test('handle empty title or url when new blog is added', async () => {

  await api.post('/api/blogs').send({
    'author': 'David Bayode'
  }).expect(400)

})

afterAll(async () => {
  await mongoose.connection.close()
})