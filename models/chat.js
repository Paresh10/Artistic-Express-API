const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema ({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  }
})


const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
