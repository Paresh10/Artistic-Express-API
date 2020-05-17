
const mongoose = require('mongoose')

const connectionString = process.env.MONGODB_URI

const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const collection = client.db("test").collection("devices");
  client.close();
});


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
