const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Present', 'Absent', 'Half Day', 'Leave'], default: 'Present' }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
