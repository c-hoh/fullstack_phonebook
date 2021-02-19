require('dotenv').config()

const PORT = process.env.PORT || 3001
const MONGODB_URI = process.env.MODE === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI

module.exports = {
  PORT,
  MONGODB_URI
}