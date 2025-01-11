require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

// Import Routes
const patientRoutes = require('./routes/patientRoutes');
const dietChartRoutes = require('./routes/dietChartRoutes');
const pantryStaffRoutes = require('./routes/pantryStaffRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const authRoutes = require("./routes/auth");

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());


// API Routes
app.use('/api/patients', patientRoutes);
app.use('/api/diet-charts', dietChartRoutes);
app.use('/api/pantry-staff', pantryStaffRoutes);
app.use('/api/deliveries', deliveryRoutes);
app.use("/auth", authRoutes);

// Test route for server
app.get('/', (req, res) => {
    res.send('Hospital Food Delivery Management System API');
});

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
