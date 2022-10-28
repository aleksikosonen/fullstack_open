require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI

module.exports = { mongoUrl }
