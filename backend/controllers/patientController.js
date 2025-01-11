const Patient = require('../models/patient');

// Get all patients
exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Create a new patient
exports.createPatient = async (req, res) => {
    try {
        const newPatient = new Patient(req.body);
        await newPatient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a patient's details
exports.updatePatient = async (req, res) => {
    try {
        // Find and update patient by ID
        const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // If no patient is found
        if (!updatedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json(updatedPatient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
    try {
        // Find and delete patient by ID
        const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

        // If no patient is found
        if (!deletedPatient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
