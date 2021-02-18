const mongoose = require('mongoose')
const config = require('../utils/config')
const uninqueValidator = require('mongoose-unique-validator')
// fix mongoose deprecation warnings
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)

mongoose.connect(config.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB.')
  })
  .catch((error) => {
    console.log('Can not connect:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 8
  }
})

personSchema.plugin(uninqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
