const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    pantryStaffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PantryStaff',
        required: true
    },
    deliveryTime: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Delivered', 'Cancelled'],
        default: 'Pending'
    },
    deliveryNotes: {
        type: String
    }
});

module.exports = mongoose.model('Delivery', DeliverySchema);
