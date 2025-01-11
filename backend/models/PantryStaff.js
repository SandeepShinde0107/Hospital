const mongoose = require('mongoose');

const PantryStaffSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    assignedPatients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    }]
});

module.exports = mongoose.model('PantryStaff', PantryStaffSchema);
