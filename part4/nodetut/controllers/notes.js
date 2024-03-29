const jwt = require('jsonwebtoken')
const notesRouter = require('express').Router()
const User = require('../models/user')
const Note = require('../models/note')
require('express-async-errors')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({}).populate('userId', { username: 1, name: 1 })

  response.status(200).json(notes)
})

notesRouter.get('/:id', async (request, response) => {

  const note = await Note.findById(request.params.id)
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const note = new Note({
    content: body.content,
    important: body.important === undefined ? false : body.important,
    userId: user.id
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote.id)
  await user.save()

  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {

  await Note.findByIdAndDelete(request.params.id)
  response.status(200).end()
})

notesRouter.put('/:id', (request, response) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true }).then(updatedNote => {
    response.json(updatedNote)
  })
})

module.exports = notesRouter