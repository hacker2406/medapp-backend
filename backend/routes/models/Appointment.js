

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,  // Assuming user's email is stored as a string
        required: true
    }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
