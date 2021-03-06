const mongoose = require('mongoose')

const postSchema = new mongoose.Schema ({
  body: {
    type: String
  },
  posted: {
    type: Date,
    default: Date.now()
  },
  postPicture: String,
  postPictureId: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  likes: {
    type: Number,
    required: false
  },

  likesArray: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
