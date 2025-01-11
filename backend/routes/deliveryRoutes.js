const express = require('express');
const { createDelivery, getDeliveries, getDeliveryByPatientId, updateDelivery, deleteDelivery } = require('../controllers/deliveryController');
const router = express.Router();

// Route to create a new delivery record
router.post('/', createDelivery);

// Route to get all delivery records
router.get('/', getDeliveries);

// Route to get delivery records for a specific patient
router.get('/patient/:patientId', getDeliveryByPatientId);

// Route to update a specific delivery record
router.put('/:id', updateDelivery);

// Route to delete a specific delivery record
router.delete('/:id', deleteDelivery);

module.exports = router;
