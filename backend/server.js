// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Environment variables are stored in this file
require('dotenv').config();

// Set up server
const app = express();
const port = process.env.PORT || 5000;

// Set up JSON
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => 
{
    console.log("MongoDB database connection established successfully");
})

// Get exercise and user files
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

// Use exercise and user files
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Start server
app.listen(port, () => 
{
    console.log(`Server is running on port: ${port}`);
});

/* 
* Commands used to set up:
* > npx create-react-app mern-exercise-tracker              // creates React App
* > mkdir backend
* > cd backend
* > npm init -y                                             // setups package.JSON inside new backend folder
* > npm install express cors mongoose dotenv                // installs packages
* > sudo npm install -g nodemon                             // globally installs nodemon
* > nodemon server                                          // runs server with nodemon watching for changes
*/