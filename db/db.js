
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

mongoose.connection.on('connected', () => {
  console.log(`Connected to database ${connectionString}`);
})


mongoose.connection.on('disconnected', () => {
  console.log(`Disconnected from database ${connectionString}`);
})


mongoose.connection.on('error', (error) => {
  console.log(`Error connecting to ${connectionString}`);
  console.error(error);
})
