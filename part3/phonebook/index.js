require('dotenv').config()
const PhonebookEntry = require('./models/phoneData')
const express = require('express')
const cors = require('cors')
const app = express()
const morgan = require('morgan')
const PORT = process.env.PORT || 3001

const persons = [
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
        console.log(data)
        if (!data) {
            return response.json([])
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

    await PhonebookEntry.find({ id }, { _id: 0, __v: 0 })
    .then(person => {
      if (person) {
        response.json(person[0])
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

app.put('/api/persons/:id', async (request, response) => {
    const { id } = request.params; 

    const newName = request.body.name.trim();

    const newNumber = { name: newName, number: request.body.number, id: id || Math.floor(Math.random() * 10000 + 1) };

        const personExists = await PhonebookEntry.findOne({ id: id });

        if (!personExists) {
            return response.status(404).json({ error: 'Sorry, username does not exist.' });
        }

        const updateNumber = await PhonebookEntry.updateOne({ id: personExists.id }, { ...newNumber }).then((person) => {
            if (person) {

                return response.json({ name: newName });
            }
        })

        if (!updateNumber) {
            
            response.status(404).json({ error: 'Could not update.' })
        }
});


app.post('/api/persons', async (request, response) => {

    const newName = request.body.name.trim()
    
    const newNumber = { name: newName, number: request.body.number, id: request.body.id || Math.floor(Math.random() * 10000 + 1)  }

    const newPhoneNumber = request.body.number

    if (!newPhoneNumber) {

        return response.status(404).json({ error: 'Sorry, this is an invalid number' })
    }

    await PhonebookEntry.find({ number: request.body.number }).then((person) => {
        if (!person) {

            return response.status(404).json({ error: 'Sorry, username already exists.' })
            
        }

        PhonebookEntry({...newNumber}).save().then((data) => {

            response.status(201).json({ message: `${newNumber.name} added`, name: newNumber.name})

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

    let person

     person = await PhonebookEntry.find({ id }).then((person) => {

            if (!person) {
                return response.status(404).json({ error: 'Could not find number, are you sure it exists?'})
            }
            PhonebookEntry.deleteOne({ id }).then((entry) => {
                return response.json({ message: `${person.name} deleted`})
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