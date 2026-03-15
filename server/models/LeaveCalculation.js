const mongoose = require('mongoose');
const LeaveCalculationSchema = new mongoose.Schema({
    staffId:         { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    staffName:       { type: String },
    year:            { type: Number, default: () => new Date().getFullYear() },
    totalLeavesDays: { type: Number, default: 20 },
    usedLeavesDays:  { type: Number, default: 0 },
    pendingLeaves:   { type: Number, default: 0 },
    sickLeaves:      { type: Number, default: 0 },
    casualLeaves:    { type: Number, default: 0 },
    earnedLeaves:    { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('LeaveCalculation', LeaveCalculationSchema);
