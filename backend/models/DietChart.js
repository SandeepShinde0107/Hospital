const mongoose = require('mongoose');

const DietChartSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    dietPlan: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    instructions: {
        type: String
    },
});

module.exports = mongoose.model('DietChart', DietChartSchema);
