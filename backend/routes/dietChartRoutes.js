const express = require('express');
const { createDietChart, getDietCharts, getDietChartByPatientId, updateDietChart, deleteDietChart } = require('../controllers/dietChartController');
const router = express.Router();

// Route to create a new diet chart
router.post('/', createDietChart);

// Route to get all diet charts
router.get('/', getDietCharts);

// Route to get a specific diet chart by patient ID
router.get('/patient/:patientId', getDietChartByPatientId);

// Route to update a specific diet chart
router.put('/:id', updateDietChart);

// Route to delete a specific diet chart
router.delete('/:id', deleteDietChart);

module.exports = router;
