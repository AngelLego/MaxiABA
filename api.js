// Vercel serverless function
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com", "https://unpkg.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://unpkg.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            fontSrc: ["'self'", "https://fonts.gstatic.com", "https://cdn.jsdelivr.net"],
            connectSrc: ["'self'"],
            frameSrc: ["'self'", "https://www.facebook.com", "https://www.google.com"]
        }
    }
}));

// CORS
app.use(cors());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        service: 'MAXI SERVICIOS ABA API'
    });
});

// API routes
try {
    const authRoutes = require('./src/routes/authRoutes');
    const publicRoutes = require('./src/routes/publicRoutes');
    const adminRoutes = require('./src/routes/adminRoutes');

    app.use('/api/admin', authRoutes);
    app.use('/api', publicRoutes);
    app.use('/api/admin', adminRoutes);
} catch (error) {
    console.error('Error loading routes:', error);
}

// Catch-all for SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: {
            code: err.code || 'INTERNAL_ERROR',
            message: process.env.NODE_ENV === 'production' 
                ? 'An error occurred' 
                : err.message
        }
    });
});

module.exports = app;
