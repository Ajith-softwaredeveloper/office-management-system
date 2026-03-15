const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name:     { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role:     { type: String, enum: ['Admin', 'Manager', 'Employee'], default: 'Employee' },
    phone:    { type: String },
    department: { type: String },
    avatar:   { type: String, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);
