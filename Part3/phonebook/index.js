const express = require('express')
const app = express()
const morgan = require('morgan')
const PORT = 3001

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


app.use(express.json())

app.use(express.urlencoded({ extended: false }))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :response-time - :total-time[digits] ms :body'))

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const markup = (`<p>Phonebook has info for ${persons.length} people</p><p>${new Date(Date.now())}`)
    response.send(markup)
})  

app.get('/api/persons/:id', (request, response) => {

    const { id } = request.params
    const number = Number(id)
    const findNum = persons.filter((person) => person.id === number)
    if (!findNum || findNum === []) {
        return response.status(404).json({ message: 'Unable to find detail.'})
    }
    response.json(findNum)
})

app.post('/api/persons', (request, response) => {

    const newName = request.body.name.trim()

    const newNumber = { id: Math.floor(Math.random() * 10000 + 1), ...request.body, name: newName }

    const checkID = persons.findIndex((person) => person.id === newNumber.id)

    const checkName = newNumber.name 

    const checkDuplicateName = persons.filter((person) => person.name.toLowerCase() === newNumber.name.toLowerCase())

    console.log(checkDuplicateName)

    const checkNumberExists = newNumber.number

    if (checkID !== -1) {
        return response.status(404).json({ error: 'ID already in use.'})
    }
    if (!checkName) {
        return response.status(404).json({ error: 'Invalid username.' })
    }
    if (checkDuplicateName.length > 0) {
        return response.status(404).json({ error: 'Sorry, username already exists.' })
    }
    if (!checkNumberExists) {
        return response.status(404).json({ error: 'Sorry, this number is invalid or missing.' })
    }

    persons.push(newNumber)

    response.status(201).json({ message: `${newNumber.name} added`})
})

app.delete('/api/persons/:id', (request, response) => {

    const { id } = request.params
    const number = Number(id)
    const findNum = persons.findIndex((person) => person.id === number)
    if (findNum === -1) {
        return response.status(404).json({ message: 'Person detail does not exist.'})
    }
    const removeNum = persons.splice(findNum, 1)

    response.json(persons)
})



app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})