const PantryStaff = require('../models/PantryStaff');

// Create a new pantry staff member
exports.createPantryStaff = async (req, res) => {
    try {
        const { name, role, contactInfo, assignedPatients } = req.body;
        const newPantryStaff = new PantryStaff({
            name,
            role,
            contactInfo,
            assignedPatients
        });
        await newPantryStaff.save();
        res.status(201).json(newPantryStaff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all pantry staff members
exports.getPantryStaff = async (req, res) => {
    try {
        const pantryStaff = await PantryStaff.find().populate('assignedPatients', 'name');
        res.json(pantryStaff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update pantry staff information
exports.updatePantryStaff = async (req, res) => {
    try {
        const { name, role, contactInfo, assignedPatients } = req.body;
        const updatedPantryStaff = await PantryStaff.findByIdAndUpdate(
            req.params.id,
            { name, role, contactInfo, assignedPatients },
            { new: true }
        );
        if (!updatedPantryStaff) return res.status(404).json({ message: 'Pantry staff not found' });
        res.json(updatedPantryStaff);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a pantry staff member
exports.deletePantryStaff = async (req, res) => {
    try {
        const deletedPantryStaff = await PantryStaff.findByIdAndDelete(req.params.id);
        if (!deletedPantryStaff) return res.status(404).json({ message: 'Pantry staff not found' });
        res.json({ message: 'Pantry staff deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
