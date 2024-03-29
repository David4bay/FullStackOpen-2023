/* eslint-disable no-undef */
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

const User = require('../models/user')
const Note = require('../models/note')

// const initialNotes = [
//   {
//     content: 'HTML is easy',
//     important: false,
//   },
//   {
//     content: 'Browser can execute only JavaScript',
//     important: true,
//   },
// ]

beforeEach(async () => {
  await Note.deleteMany({})
  await User.deleteMany({})

  for (let note of helper.initialNotes) {
    let noteObject = new Note(note)
    await noteObject.save()
  }

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
}, 120000)

describe('when there is initially one user in db', () => {

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

describe('when there is initially some notes saved', () => {

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only JavaScript'
    )
  }, 100000)


  test('all notes are returned', async () => {
    const response = await api.get('/api/notes')

    expect(response.body).toHaveLength(helper.initialNotes.length)
  }, 100000)
})

describe('viewing a specific note', () => {

  test('succeeds with a valid id', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })

  test('fails with statuscode 404 if note does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .get(`/api/notes/${validNonexistingId}`)
      .expect(404)
  })

  test('fails with statuscode 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .get(`/api/notes/${invalidId}`)
      .expect(400)
  })
})

describe('addition of a new note', () => {

  test('fails when not provided a jwt', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }

    // Internal Server Error, no JWT auth provided
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(500)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)

    const contents = notesAtEnd.map(n => n.content)[0]
    expect(contents).toContain(
      'HTML is easy'
    )
  })

  test('fails with status code 500', async () => {
    const newNote = {
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(500)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })
})

describe('deletion of a note', () => {


  test('succeeds with status code 200 if id is valid', async () => {
    const notesAtStart = await helper.notesInDb()
    const noteToDelete = notesAtStart[0]

    // changed to 200 to emphasize success in deletion
    await api
      .delete(`/api/notes/${noteToDelete.id}`)
      .expect(200)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(
      helper.initialNotes.length - 1
    )

    const contents = notesAtEnd.map(r => r.content)

    expect(contents).not.toContain(noteToDelete.content)
  })
})

test('there are two notes', async () => {
  const response = await api.get('/api/notes')
  console.log('entered test')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/notes')

  expect(response.body[0].content).toBe('HTML is easy')
})


describe('notes can be accessed', () => {

  test('a valid note can\'t be added without jwt', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      important: true,
    }
    // Internal Server Error as no JWT auth token
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(500)

    const notesAtEnd = await helper.notesInDb()
    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)

    const contents = notesAtEnd.map(n => n.content)[0]
    expect(contents).toContain(
      'HTML is easy'
    )
  })

  test('note without content and jwt is not added', async () => {
    const newNote = {
      important: true
    }
    // Internal Server Error as no jwt auth token
    await api
      .post('/api/notes')
      .send(newNote)
      .expect(500)

    const notesAtEnd = await helper.notesInDb()

    expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
  })

  test('a specific note can be viewed', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToView = notesAtStart[0]


    const resultNote = await api
      .get(`/api/notes/${noteToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultNote.body).toEqual(noteToView)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})