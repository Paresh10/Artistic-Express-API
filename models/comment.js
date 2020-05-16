const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema ({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  },
  commenter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
