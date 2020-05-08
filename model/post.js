const mongoose = require('mongoose')

const postSchema = new mongoose.Schema ({
  body: {
    type: String
  },
  postPicture: {
    data: Buffer,
    contentType: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post