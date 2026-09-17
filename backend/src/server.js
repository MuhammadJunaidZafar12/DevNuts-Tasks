import connectDB from './config/db.js';
import app from './app.js';
import Dashboard from './models/Dashboard.js';
import { dashboardSeed } from './data/dashboardSeed.js';
import dotenv from 'dotenv';

dotenv.config();

const startServer = async () => {
    try {
        await connectDB();
        await Dashboard.findOneAndUpdate({}, { $set: dashboardSeed }, {
            upsert: true,
            setDefaultsOnInsert: true
        });
        console.log('Sample analytics data is ready.');

        const port = Number(process.env.PORT) || 3000;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

startServer();

