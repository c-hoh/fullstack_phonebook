const supertest = require('supertest')
const mongoose = require('mongoose')
const Person = require('../models/person')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Person.deleteMany({})
})

describe('API functions', () => {
  it('entry can be added to the phonebook', async () => {
    const toAdd = {
      name: 'Testy McTest',
      number: '07097 97 97 12'
    }

    const response = await api
      .post('/api/persons')
      .send(toAdd)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.name).toEqual(toAdd.name)
  }),

  it('entries can be updated', async () => {
    const toAdd = {
      name: 'Te Sting',
      number: '090 090 090'
    }

    const response1 = await api
      .post('/api/persons')
      .send(toAdd)

    const toChange = {
      name: 'Te Sting',
      number: '909 909 909'
    }

    const repsonse2 = await api
      .put(`/api/persons/${ response1.body.id }`)
      .send(toChange)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(repsonse2.body.name).toEqual(toAdd.name)
    expect(repsonse2.body.number).toEqual(toChange.number)
  })
})

afterAll(() => {
  mongoose.disconnect()
})