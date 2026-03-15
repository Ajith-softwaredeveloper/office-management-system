const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json());

// Connect to DB lazily (on first request) to avoid cold start timeout
let dbConnected = false;
let dbConnecting = false;

const ensureDB = async () => {
    if (dbConnected) return;
    if (dbConnecting) {
        // Wait for the ongoing connection
        await new Promise(resolve => setTimeout(resolve, 3000));
        return;
    }
    dbConnecting = true;
    const connectDB = require('./config/db');
    await connectDB();
    dbConnected = true;
    dbConnecting = false;
};

app.use(async (req, res, next) => {
    try {
        await ensureDB();
        next();
    } catch (err) {
        console.error('DB Connection failed:', err.message);
        res.status(500).json({ error: 'Database connection failed', details: err.message });
    }
});

// Health check (no DB needed)
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date(), dbConnected }));

// Auth Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Core Module Routes
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));

// Extended Module Routes
app.use('/api/staffs', require('./routes/staffRoutes'));
app.use('/api/leave_calculations', require('./routes/leaveCalculationRoutes'));
app.use('/api/company_articles', require('./routes/companyArticleRoutes'));

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ error: { code: '500', message: err.message || 'A server error has occurred' } });
});

// 404 handler
app.use((req, res) => res.status(404).json({ msg: `Route ${req.originalUrl} not found` }));

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;
