import express from 'express';
import connectDB from './config/db.js';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

try {
    await connectDB();
    
    const port = Number(process.env.PORT) || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
} catch (error) {
    console.error('MongoDB connection failed:', error.message);
}

