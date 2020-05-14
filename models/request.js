const mongoose = require('mongoose')


const requestSchema = new mongoose.Schema ({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  sentOn: {
    type: Date,
    default: Date.now
  },
  status: Boolean
  })


const Request = mongoose.model('Request', requestSchema)

module.exports = Request
 