import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// CORS - Allow all origins
app.use(cors({
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB connection caching for serverless
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(process.env.MONGODB_URI, opts)
            .then((mongoose) => {
                console.log('✅ MongoDB connected');
                return mongoose;
            })
            .catch((error) => {
                console.error('❌ MongoDB connection failed:', error);
                throw error;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

// Debug/Health check route - NO DB required
app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Prevntiv API is running',
        timestamp: new Date().toISOString(),
        environment: {
            nodeVersion: process.version,
            hasMongoUri: !!process.env.MONGODB_URI,
            hasJwtSecret: !!process.env.JWT_SECRET,
            mongoUriPrefix: process.env.MONGODB_URI?.substring(0, 20) + '...'
        }
    });
});

app.get('/api/health-check', (req, res) => {
    res.json({
        status: 'ok',
        message: 'API health check passed',
        timestamp: new Date().toISOString()
    });
});

// Dynamic route imports with error handling
let authRoutes, healthRoutes;

try {
    const authModule = await import('../routes/auth.js');
    authRoutes = authModule.default;
    console.log('✅ Auth routes loaded');
} catch (error) {
    console.error('❌ Failed to load auth routes:', error);
    app.use('/api/auth/*', (req, res) => {
        res.status(500).json({
            success: false,
            message: 'Auth routes failed to load',
            error: error.message
        });
    });
}

try {
    const healthModule = await import('../routes/health.js');
    healthRoutes = healthModule.default;
    console.log('✅ Health routes loaded');
} catch (error) {
    console.error('❌ Failed to load health routes:', error);
    app.use('/api/health/*', (req, res) => {
        res.status(500).json({
            success: false,
            message: 'Health routes failed to load',
            error: error.message
        });
    });
}

// Database connection middleware for API routes only
app.use('/api', async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message,
            hint: 'Check if MONGODB_URI environment variable is set correctly in Vercel'
        });
    }
});

// Mount routes if they loaded successfully
if (authRoutes) {
    app.use('/api/auth', authRoutes);
}

if (healthRoutes) {
    app.use('/api/health', healthRoutes);
}

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

export default app;
