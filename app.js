const express = require('express')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

// GET method for fetching all data
app.get('/api/persons', async (_request, response, next) => {
  try {
    const people = await Person.find({})
    response.json(people)
  } catch (error) {
    next(error)
  }
})

// GET method for fetching individual entries
app.get('/api/persons/:id', async (request, response, next) => {
  try {
    const person = await Person.findById(request.params.id)
    response.json(person)
  } catch (error) {
    next(error)
  }
})

// GET method for retrieving general information about the phonebook
app.get('/info', async (_request, response, next) => {
  try {
    const result = await Person.find({})
    const now = new Date()
    const num_entries = result.length
    const body = `<p>Phonebook has info for ${ num_entries } people.</p>` +
                  `<p>${ now }</p>`
    response.send(body)
  } catch (error) {
    next(error)
  }
})

// DELETE method for removing entries from the phonebook
app.delete('/api/persons/:id', async (request, response, next) => {
  try {
    await Person.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

// POST method for adding new entries to the phonebook.
app.post('/api/persons', async (request, response, next) => {
  const body = request.body

  const newEntry = new Person ({
    'name': body.name,
    'number':  body.number
  })

  try {
    const savedEntry = await newEntry.save()
    response.json(savedEntry)
  } catch (error) {
    next(error)
  }
})

// PUT method for updating entries
app.put('/api/persons/:id', async (request, response, next) => {
  const body = request.body

  const changedEntry = {
    'name': body.name,
    'number': body.number
  }

  const putopts = {
    new: true,
    runValidators: true,
    context: 'query'
  }
  const selector = { _id: request.params.id }

  try {
    const updatedPerson = await Person.findOneAndUpdate(
      selector, changedEntry, putopts)
    response.json(updatedPerson.toJSON())
  } catch (error) {
    next(error)
  }
})

// health check
app.use('/api/health', (_request, response) => {
  response.send('ok')
})

// testing methods
if (process.env.MODE === 'test') {
  app.use('/api/testing/reset', async (_request, response) => {
    await Person.deleteMany({})
    response.send(204).end()
  })
}

// error handling
const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed request' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

module.exports = app