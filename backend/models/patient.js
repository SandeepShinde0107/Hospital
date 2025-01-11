const mongoose = require('mongoose');
const PatientSchema = new mongoose.Schema({
    name: String,
    diseases: String,
    allergies: String,
    roomNumber: Number,
    bedNumber: Number,
    floorNumber: Number,
    age: Number,
    gender: String,
    contactInfo: String,
    emergencyContact: String,
});
module.exports = mongoose.model('Patient', PatientSchema);
