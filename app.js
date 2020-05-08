// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

// Require Database
require('./db/db')






// Connect to server
app.listen(PORT, () => {
  const date = new Date()
  console.log(`Today is ${date.toDateString()} and server is running on port ${PORT}`);
})
