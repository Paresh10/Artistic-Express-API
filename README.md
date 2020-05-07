### Capstone Project: Artistic-Express-API
This API is in use for my capstone project called "Artistic". Here is the link for the front-end [REACT](https://github.com/Paresh10/artistic-react) code. See the instruction below on how to run this project on your local server.

#### About:

###### Express API for building the social site. This API can be used to build any social platform, dating platform and any professional site like LinkdIn.

MongoDB Models:
```
<!-- User Model: -->
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

  profilePicture: {
    data: Buffer,
    contentType: String
  },

 friends: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
  }],

  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
    }],

  notifications: Still Deciding and will update this as I will move forward.

  requests: {
    count: {
      type: Number,
      default: 0
    },
    source: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      sentOn: {
        type: Date,
        default: Date.now
      }
      }]
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
    }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User



 <!-- Post Model: -->
 const postSchema = new mongoose.Schema ({

  body: {
    type: String,
  },

  postPicture: {
    data: Buffer,
    contentType: String
  },
  posted: {
    type: Date,
    default: Date.now()
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

 const Post = mongoose.model('Post', PostSchema)

 module.exports = Post


 const commentSchema = new mongoose.Schema({
   text: {
     type: String,
     required: true
   },
   date: {
     type: Date,
     default: Date.now
   },

   name: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'User'
   }
 })
 const Comment = mongoose.model('Comment', reviewSchema)

 module.exports = Comment


const chatSchema = new mongoose.Model({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  name: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
  })

```

#### Technologies used:
**React** – Amazing JavaScript library that provides developers super powers of building complex websites easily! Front-end has been developed using REACT and designed with semantic-ui-react.

__Express-Node__ – Very powerful Node.js and Express.js is the back bone of this website. The entire back-end is efficiently running on combination of express, node and the back-end libraries.

**MongoDB** – Amazing and awesome MongoDB is Non structured query language database. MongoDB is very powerful and provide tools and technologies to store complex database efficiently.

__CORS__ – Which stands for cross origin resource sharing, provides the ability to share data and routes from origins. Origin can be host, server and/or browser. CORS makes it possible to cross function the resources.

**Socket.IO** – Socket.io provides amazing tools and great documentations to enable chat rooms environment in the the app.


#### Forthcoming features:
1. Give users ability to see you may know User by matching algorithms.
2. Create a job board which let's user post and see the available jobs.

#### Instruction on how to run the app:
To run this app on local server – clone this repository and in your terminal (open separate terminal) navigate to the desired directory where you want clone this repository and run npm install. This install all the dependencies in package.json. Once done, run npm app.js or in the separate window (For Mac: cmd + t) run nodemon app.js. Which will run the server automatically every time you save something in the code.

To run this API with front-end [React](https://github.com/Paresh10/artistic-react) project. Have the server running on this express terminal. Open new terminal (For Mac: cmd + n). Click on the ```React``` link above and clone the repository. cd into the directory and run npm start. And, voilla!
