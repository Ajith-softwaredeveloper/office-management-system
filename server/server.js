const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: '*', methods: ['GET','POST','PUT','DELETE','OPTIONS'], allowedHeaders: ['Content-Type','Authorization'] }));
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

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

// 404 handler
app.use((req, res) => res.status(404).json({ msg: `Route ${req.originalUrl} not found` }));

const PORT = process.env.PORT || 5000;
// For serverless (Vercel), export the app. For local, start listening.
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
module.exports = app;
