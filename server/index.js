import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Health check route
app.get('/api/health-check', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Prevntiv API is running',
        timestamp: new Date().toISOString()
    });
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️  Starting server without database connection...');
        console.log('   Make sure MongoDB is running or update MONGODB_URI in .env');

        // Start server anyway for development
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT} (without DB)`);
        });
    }
};

startServer();
