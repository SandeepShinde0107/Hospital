const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB URI for local connection
        const mongoURI = process.env.MONGO_URI;
        
        // Connect using Mongoose
        await mongoose.connect(mongoURI);

        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Connection failed:', err.message);
        process.exit(1); // Exit the application if connection fails
    }
};

module.exports = connectDB;
