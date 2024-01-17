require('dotenv').config()
// const Note = require('./models/note')
// const mongoose = require('mongoose')
const app = require('./app') // the actual Express application
const config = require('./utils/config')
const logger = require('./utils/logger')

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only JavaScript',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true
//   }
// ]

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

// app.use(cors())
// app.use(express.static('dist'))
// app.use(express.json())

// app.get('/', (request, response) => {
//   response.send('<h1>Hello World!</h1>')
// })

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then(notes => {
//     response.json(notes)
//   })
// })

// app.get('/api/notes/:id', (request, response, next) => {

//   Note.findById(request.params.id).then(note => {
//     if (note) {
//       response.json(note)
//     } else {
//       response.status(404).send('Invalid note id.')
//     }
//   }).catch(error => {
//     console.log(error)
//     next(error)
//   })
// })

// app.post('/api/notes', (request, response, next) => {

//   const body = request.body

//   if (body.content === undefined) {
//     return response.status(400).json({ error: 'content missing' })
//   }

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//   })

//   note.save().then(savedNote => {

//     response.json(savedNote)
//   }).catch(error => next(error))

// })

// app.put('/api/notes/:id', (request, response, next) => {

//   const { content, important } = request.body

//   Note.findByIdAndUpdate(
//     request.params.id,
//     { content, important },
//     { new: true, runValidators: true, context: 'query' })
//     .then(updatedNote => {
//       response.json(updatedNote)
//     })
//     .catch(error => next(error))
// })

// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndDelete(request.params.id)
//     .then(() => {
//       response.status(204).end()
//     })
//     .catch(error => next(error))
// })

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})