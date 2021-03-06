const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
  email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: String,
    occupation: String,
    about: String,
    from: String,

    profilePicture: String,
    profilePictureId: String, 

   friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    }],
    
    pendingRequest: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
      }],

    notifications: Boolean,

    messages: [{
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      seen: Boolean
      }]
  })

const User = mongoose.model('User', userSchema)

module.exports = User
