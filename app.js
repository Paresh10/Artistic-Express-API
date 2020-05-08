// Dependencies
require('dotenv').config()
const express = require('express')
const app = express()
const session = require('express-session')
const PORT = process.env.PORT

// Require Database
require('./db/db')


//Session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

//Session contd...
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.loggedIn
  res.locals.email = req.session.email
  res.locals.message = req.session.message
  res.locals.userId = req.session.userId
  req.session.message = undefined
  next()
})

// Controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)


// Connect to server
app.listen(PORT, () => {
  const date = new Date()
  console.log(`Today is ${date.toDateString()} and server is running on port ${PORT}`);
})
