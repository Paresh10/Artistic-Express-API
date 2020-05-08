const express = require('express')
const router = express.Router()
const User = require('../models/user')


// Signup
router.get('/signup', (req, res) => {
  res.status(200).json({
    message: "Signup here!"
  })
})


module.exports = router
