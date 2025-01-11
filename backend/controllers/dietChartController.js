const DietChart = require('../models/DietChart');
const Patient = require('../models/patient');

// Create a new diet chart
exports.createDietChart = async (req, res) => {
    try {
        const { patientId, dietPlan, startDate, endDate, instructions } = req.body;
        const newDietChart = new DietChart({
            patientId,
            dietPlan,
            startDate,
            endDate,
            instructions
        });
        await newDietChart.save();
        res.status(201).json(newDietChart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all diet charts
exports.getDietCharts = async (req, res) => {
    try {
        const dietCharts = await DietChart.find().populate('patientId', 'name');
        res.json(dietCharts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get diet chart for a specific patient
exports.getDietChartByPatientId = async (req, res) => {
    try {
        const dietChart = await DietChart.findOne({ patientId: req.params.patientId }).populate('patientId', 'name');
        if (!dietChart) return res.status(404).json({ message: 'Diet chart not found' });
        res.json(dietChart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a diet chart
exports.updateDietChart = async (req, res) => {
    try {
        const { dietPlan, startDate, endDate, instructions } = req.body;
        const updatedDietChart = await DietChart.findByIdAndUpdate(
            req.params.id,
            { dietPlan, startDate, endDate, instructions },
            { new: true }
        );
        if (!updatedDietChart) return res.status(404).json({ message: 'Diet chart not found' });
        res.json(updatedDietChart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a diet chart
exports.deleteDietChart = async (req, res) => {
    try {
        const deletedDietChart = await DietChart.findByIdAndDelete(req.params.id);
        if (!deletedDietChart) return res.status(404).json({ message: 'Diet chart not found' });
        res.json({ message: 'Diet chart deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
