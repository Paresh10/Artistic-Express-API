// Dependencies
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const bodyParser = require('body-parser')
const session = require('express-session')
const io = require('socket.io')(http)
const PORT = process.env.PORT




// Setup CORS
app.use(cors({
  origin: ['http://localhost:3001', 'https://artistic-react.herokuapp.com'],
  credentials: true
}))


// Require Database
require('./db/db')



// Body-Parser
// app.use(bodyParser.json({ type: 'application/*+json'}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


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
  res.locals.name = req.session.name
  res.locals.userId = req.session.userId
  req.session.message = undefined
  next()
})

// Controllers
const authController = require('./controllers/authController')
app.use('/auth', authController)

const postController = require('./controllers/postController')
app.use('/posts', postController)

const userController = require('./controllers/userController')
app.use('/users', userController)

const requestController = require('./controllers/requestController')
app.use('/requests', requestController)

const commentController = require('./controllers/commentController')
app.use('/comments', commentController)



// //Setup cors for users
// CORS(users, origins=['http://localhost:3000'], supports_credentials=true)


// Set up Socket.io  here


io.on('connection', socket => {
  socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
  })
} )




// Connect to server
http.listen(PORT, () => {
  const date = new Date()
  console.log(`Today is ${date.toDateString()} and server is running on port ${PORT}`);
})
