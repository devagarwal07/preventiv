import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from '../routes/auth.js';
import healthRoutes from '../routes/health.js';

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); // Allow all origins for testing
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.options('*', cors(corsOptions));

// MongoDB connection with caching for serverless
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        if (process.env.MONGODB_URI) {
            cached.promise = mongoose.connect(process.env.MONGODB_URI, opts).then((mongoose) => {
                return mongoose;
            });
        }
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Connect to DB before handling requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('DB connection error:', error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/health', healthRoutes);

// Health check routes
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
        timestamp: new Date().toISOString(),
        env: {
            hasMongoUri: !!process.env.MONGODB_URI,
            hasJwtSecret: !!process.env.JWT_SECRET
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;
