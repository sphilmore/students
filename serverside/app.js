const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Specify where to find the schema
const Student = require('./models/student');

// Connect and display the status
mongoose.connect('mongodb://localhost:27017/IT6203')
   .then(() => { console.log("connected"); })
   .catch(err => { console.log(`Error connecting: ${err}`); });

// Specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Can connect from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS'); // Allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Parse application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// In the app.get() method below, we add a path for the students API
app.get('/students', (req, res, next) => {
    // Call mongoose method find (MongoDB db.Students.find())
    Student.find()
    // If data is returned, send data as a response
    .then(data => res.status(200).json(data))
    // If error, send internal server error
    .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json(err);
    });
});



// Handle POST requests to /students
app.post('/students', (req, res, next) => {
    const student = req.body;
    console.log(student.firstName + " " + student.lastName);
    // Send an acknowledgment back to the caller
    res.status(201).json('Post successful');
});

// To use this middleware in other parts of the application
module.exports = app;


