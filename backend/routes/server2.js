// server.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Admin = require('./models/Admin');
const Appointment = require('./models/Appointment'); 
const path = require('path');
const fs = require('fs');
// const { Admin } = require('mongodb');

// Create Express app
const app = express();
app.use(express.static(path.join(__dirname, 'backend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home3.html')); 
});
// Define route for login page
app.get('/login2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login2.html'));
});

// Define route for signup page
app.get('/signup2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup2.html'));
});


// Define route for appointments page
app.get('/appointments2.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'appointments2.html'));
});
app.get('/home3.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home3.html')); 
});
app.get('../backend/routes/home4.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'home4.html')); 
});

// Set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define MongoDB connection URI
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/appointmentsdonedb';

// Connect to MongoDB 
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define routes
// Replace these with your actual routes

// Define a route to handle user authentication (login)
app.post('/login2',async (req, res) => {
    // Implement your login logic here
    try {
        const { username, password } = req.body;
        // Find user by username
        const user = await Admin.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Verify password
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        // Return user data (or you can choose what you want to return)
        fs.readFile('home4.html', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading home2.html:', err);
                return res.status(500).json({ message: 'Server error' });
            }
            // Replace the placeholder with the username
            const modifiedHomePage = data.replace('${username}', user.username);
            // Send the modified home page
            res.send(modifiedHomePage);
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Define a route to handle user registration (signup)
app.post('/signup2', async(req, res) => {
    // Implement your signup logic here
    try {
        const { username, email, password } = req.body;
        // Check if user already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }
        // Create new user
        const newAdmin = new Admin({ username, email, password });
        await newAdmin.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Define a route to handle appointment scheduling

// app.get('/appointments', async (req, res) => {
//     try {
//         const userEmail = req.query.userEmail;
//         // Fetch appointments for the logged-in user from MongoDB
//         const appointments = await Appointment.find({ userEmail });
//         res.json(appointments);
//     } catch (error) {
//         console.error('Error fetching user appointments:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// });

    app.get('/appointments', async (req, res) => {
        try {
            // Fetch appointments from MongoDB
            const appointments = await Appointment.find();
            res.json(appointments);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
   
// Inside your server file (e.g., index.js)


// DELETE route to delete an appointment by ID
app.delete('/appointments/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).send({ error: 'Appointment not found' });
        }
        res.send({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



 // Placeholder, replace with actual data
// Define a route to fetch appointments for the logged-in user


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
