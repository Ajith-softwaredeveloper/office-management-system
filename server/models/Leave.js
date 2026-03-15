const mongoose = require('mongoose');
const LeaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    staffId:    { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    reason:     { type: String, required: true },
    leaveType:  { type: String, enum: ['Sick', 'Casual', 'Earned', 'Other'], default: 'Casual' },
    startDate:  { type: Date, required: true },
    endDate:    { type: Date, required: true },
    days:       { type: Number, default: 1 },
    status:     { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
}, { timestamps: true });
module.exports = mongoose.model('Leave', LeaveSchema);
