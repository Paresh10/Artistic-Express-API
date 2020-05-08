const express = require('express')
const router = express.Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


// GET -- Signup
router.get('/signup', (req, res) => {
  res.status(200).json({
    message: "Signup here!"
  })
})

// POST -- Signup
router.post('/signup', async (req, res, next) => {
  try {
    const createdUserEmail = req.body.email
    const createdPassword = req.body.password

    // If user's email already exist
    const userWithThisEmail = await User.findOne({
      email: createdUserEmail
    })


    // if user's email is already taken
    if (userWithThisEmail) {
      res.json({
        message: `${createdUserEmail} already taken`
      })
    }
    // If user is not registered yet
    else {
      const cokeZero = bcrypt.genSaltSync(10)
      const securePassword = bcrypt.hashSync(createdPassword, cokeZero)


      // Create user
      const createdUser = await User.create({
        email: createdUserEmail,
        password: securePassword,
        // name: req.body.name,
        // occupation: req.body.occupation,
        // about: req.body.about,
        // from: req.body.from
      })
      console.log("createdUser after the args");
      console.log(createdUser);


      req.session.loggedIn = true
      req.session.userId = createdUser._id
      req.session.userName = createdUser.name

      res.json({
        message: `Thanks for signing up ${createdUser.name}`
      })
    }
  }
  catch (err) {
    next(err)
  }
}) 




module.exports = router
