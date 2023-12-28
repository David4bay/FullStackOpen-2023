require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.use(express.static('dist'))
  app.use(express.json())
  app.use(cors())

  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/notes',(request, response) => {
    response.json(notes)
  })

  app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
      response.json(note)
    } else {
      response.status(404).send('Invalid note id.')
    }
  })

  app.post('/api/notes', (request, response) => {
    const body = request.body
  
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const note = {
      content: body.content,
      important: body.important || false,
      id: generateId(),
    }
  
    notes = notes.concat(note)
  
    response.json(note)
  })

  app.put('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const newNote = request.body

    console.log('id', id, 'body', newNote)

    const indexOfNote = notes.findIndex((currentNote) => currentNote.id === id)

    notes.splice(indexOfNote, 1, newNote)

    response.json(newNote)
  })

  app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})