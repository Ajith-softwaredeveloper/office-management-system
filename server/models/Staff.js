const mongoose = require('mongoose');
const StaffSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    email:       { type: String, required: true, unique: true },
    phone:       { type: String },
    department:  { type: String },
    position:    { type: String },
    salary:      { type: Number, default: 0 },
    joinDate:    { type: Date, default: Date.now },
    status:      { type: String, enum: ['Active', 'Inactive', 'On Leave'], default: 'Active' },
    avatar:      { type: String, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('Staff', StaffSchema);
