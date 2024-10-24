const express = require('express');
const mongoose = require('mongoose');

const app = express();
const Student = require('./models/student');

// Connect to MongoDB and display the status
mongoose.connect('mongodb://localhost:27017/IT6203')
   .then(() => { console.log("Connected to MongoDB."); })
   .catch(err => { console.log(`Error connecting to MongoDB: ${err}`); });

// CORS setup
app.use((req, res, next) => {
    console.log('This line is always called');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow requests from any host
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE'); // Allowable methods
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

// Middleware for parsing application/x-www-form-urlencoded and application/json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all students
app.get('/students', (req, res, next) => {
    Student.find()
        .then(data => res.status(200).json(data))
        .catch(err => {
            console.log(`Error retrieving students: ${err}`);
            res.status(500).json(err);
        });
});

// Create a new student
app.post('/students', (req, res, next) => {
    const student = new Student({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    student.save()
        .then(() => { 
            console.log('Student created successfully.');
            res.status(201).json({ message: 'Student created successfully' });
        })
        .catch(err => { 
            console.log(`Error creating student: ${err}`);
            res.status(500).json({ error: err });
        });
});

// Delete a student by ID
app.delete("/students/:id", (req, res, next) => {
    const studentId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID." });
    }

    Student.deleteOne({ _id: studentId })
        .then(result => {
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Student not found." });
            }
            res.status(200).json({ message: "Student deleted!" });
        })
        .catch(err => {
            console.error(`Error deleting student: ${err}`);
            res.status(500).json({ error: err });
        });
});

// Update a student by ID
app.put('/students/:id', (req, res, next) => { 
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID." });
    }

    Student.findOneAndUpdate(
        { _id: studentId }, 
        { $set: { 
            firstName: req.body.firstName, 
            lastName: req.body.lastName 
        }}, 
        { new: true }
    )
    .then((student) => { 
        if (student) { 
            console.log('Updated student:', student); 
            res.status(200).json(student);
        } else { 
            console.log("No student exists for this ID.");
            res.status(404).json({ message: "Student not found." });
        } 
    })
    .catch((err) => { 
        console.error(`Error updating student: ${err}`);
        res.status(500).json({ error: err });
    });
});

// Get a student by ID
app.get('/students/:id', (req, res, next) => {
    const studentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return res.status(400).json({ message: "Invalid student ID." });
    }

    Student.findOne({ _id: studentId })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: "Student not found." });
            }
            res.status(200).json(data);
            console.log(data);
        })
        .catch(err => {
            console.error(`Error retrieving student: ${err}`);
            res.status(500).json(err);
        });
});

// Export the app for use in other parts of the application
module.exports = app;
