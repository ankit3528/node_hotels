const mongoose = require('mongoose');
require('dotenv').config();
// Define the MongoDB connection URL

// Local URL
//const mongoURL = "mongodb://localhost:27017/hotels" // replace "databasename" with your datbase name
// const mongoURL = process.env.MONGODB_URL_LOCAL;
//MongoDB URL
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:  true
});

// get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.

const db = mongoose.connection;

// Define event listeners for database connection

db.on('connected', () => {
    console.log("connected to the MongoDB Server");
});

db.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

db.on('disconnected', () => {
    console.log("MongoDB disconnected");
});

// Export the database connection

module.exports = db;
