const express = require('express');
const { getPatients, createPatient, updatePatient, deletePatient , getPatientById} = require('../controllers/patientController');
const router = express.Router();

// Route to get all patients
router.get('/', getPatients);

router.get('/:id', getPatientById);
// Route to add a new patient
router.post('/', createPatient);

// Route to update a patient's details by ID
router.put('/:id', updatePatient);

// Route to delete a patient by ID
router.delete('/:id', deletePatient);

module.exports = router;
