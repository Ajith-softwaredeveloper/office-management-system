const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    position: { type: String }
});
module.exports = mongoose.model('Employee', EmployeeSchema);
