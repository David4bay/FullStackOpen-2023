const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
mongoose.set('bufferTimeoutMS', 30000)

const api = supertest(app)

test('return a response in JSON', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

afterAll(async () => {
  await mongoose.connection.close()
})