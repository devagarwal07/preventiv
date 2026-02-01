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

// CORS configuration - allow all origins for development/testing
const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        // Allow all origins in development, or specific origins in production
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://preventiv.vercel.app',
            process.env.FRONTEND_URL
        ].filter(Boolean);

        if (allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            callback(null, true); // Allow all for now during testing
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Health check route
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Prevntiv API is running',
        timestamp: new Date().toISOString()
    });
});

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
        if (process.env.MONGODB_URI) {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('✅ Connected to MongoDB');
        } else {
            console.log('⚠️  No MONGODB_URI provided');
        }

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.log('⚠️  Starting server without database connection...');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT} (without DB)`);
        });
    }
};

// For Vercel serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
    startServer();
}
