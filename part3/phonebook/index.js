require('dotenv').config()
const PhonebookEntry = require('./models/phoneData')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3001

const persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }

  const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } 
  
    next(error)
  }

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static('dist'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time - :total-time[digits] ms :body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

app.get('/api/persons', async (request, response) => {
    await PhonebookEntry.find({}).then((data) => {
        if (!data) {
            return response.status(404).json({
                message: 'No entry in phonebook'
            })
        }
        response.json(data)
    })
})

app.get('/info', async (request, response) => {
    await PhonebookEntry.find({}).then((persons) => {
        const markup = (`<p>Phonebook has info for ${persons.length} people</p><p>${new Date(Date.now())}`)
        response.send(markup)
    })
})  

app.get('/api/persons/:id', async (request, response) => {

    const { id } = request.params

    if (!id) {
        return response.status(404).end()
    }

    await PhonebookEntry.find({ id })
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.post('/api/persons', async (request, response) => {

    const newName = request.body.name.trim()

    const newNumber = { id: request.body.id || Math.floor(Math.random() * 10000 + 1), number: request.body.number , name: newName }

    const newPhoneNumber = request.body.number

    if (!newPhoneNumber) {

        return response.status(404).json({ error: 'Sorry, this is an invalid number' })
    }

    await PhonebookEntry.find({ number: request.body.number }).then((person) => {
        if (!person) {

            return response.status(404).json({ error: 'Sorry, username already exists.' })
            
        }

        PhonebookEntry({...newNumber}).save().then((data) => {

            response.status(201).json({ message: `${newNumber.name} added`})

        }).catch((e) => {

            response.status(500).json({ error: 'Something went wrong.'})
        })
    })

})

app.delete('/api/persons/:id', async (request, response) => {

    const id = request.params.id

    if (!id) {
        return response.status(404).json({ error: 'Invalid number'})
    }

        await PhonebookEntry.find({ id }).then((person) => {
            
            if (!person) {
                return response.status(404).json({ error: 'Could not find number, are you sure it exists?'})
            }
            PhonebookEntry.deleteOne({ id }).then((entry) => {
                return response.json(entry)
            })
        }).catch((e) => {
            response.status(404).json({ error: 'Something went wrong.'})
        })
})

app.delete('/api/persons', async (request, response) => {

    await PhonebookEntry.deleteMany({}).then(() => {

        response.json({ message: 'All numbers deleted.'})
    })

})

app.use(unknownEndpoint)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})