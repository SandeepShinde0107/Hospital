const Delivery = require('../models/Delivery');
const PantryStaff = require('../models/PantryStaff');
const Patient = require('../models/patient');

// Create a new delivery record
exports.createDelivery = async (req, res) => {
    try {
        const { patientId, pantryStaffId, deliveryTime, status, deliveryNotes } = req.body;
        const newDelivery = new Delivery({
            patientId,
            pantryStaffId,
            deliveryTime,
            status,
            deliveryNotes
        });
        await newDelivery.save();
        res.status(201).json(newDelivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all delivery records
exports.getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find()
            .populate('patientId', 'name')
            .populate('pantryStaffId', 'name');
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get delivery record for a specific patient
exports.getDeliveryByPatientId = async (req, res) => {
    try {
        const deliveries = await Delivery.find({ patientId: req.params.patientId })
            .populate('patientId', 'name')
            .populate('pantryStaffId', 'name');
        if (!deliveries.length) return res.status(404).json({ message: 'No deliveries found for this patient' });
        res.json(deliveries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a delivery record
exports.updateDelivery = async (req, res) => {
    try {
        const { status, deliveryNotes } = req.body;
        const updatedDelivery = await Delivery.findByIdAndUpdate(
            req.params.id,
            { status, deliveryNotes },
            { new: true }
        );
        if (!updatedDelivery) return res.status(404).json({ message: 'Delivery not found' });
        res.json(updatedDelivery);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a delivery record
exports.deleteDelivery = async (req, res) => {
    try {
        const deletedDelivery = await Delivery.findByIdAndDelete(req.params.id);
        if (!deletedDelivery) return res.status(404).json({ message: 'Delivery not found' });
        res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
