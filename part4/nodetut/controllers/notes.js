const notesRouter = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')
require('express-async-errors')

notesRouter.get('/', (request, response) => {
  const notes  = Note.find({}).populate('user', { username: 1, name: 1 })

  response.json(notes)
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const note = new Note({
    content: body.content,
    important: body.important || false,
    user: user.id
  })

  notesRouter.get('/:id', async (request, response) => {

    const note = await Note.findById(request.params.id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).end()
    }
  })

  const savedNote = await note.save()
  user.notes = user.notes.concat(savedNote.id)
  await user.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (request, response) => {

  await Note.findByIdAndDelete(request.params.id)
  response.status(204).end()
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