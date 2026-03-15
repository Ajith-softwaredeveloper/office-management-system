const Staff = require('../models/Staff');

exports.getAll = async (req, res) => {
    try {
        const staffs = await Staff.find().sort({ createdAt: -1 });
        res.json(staffs);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getById = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.id);
        if (!staff) return res.status(404).json({ msg: 'Staff not found' });
        res.json(staff);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const staff = new Staff(req.body);
        await staff.save();
        res.status(201).json(staff);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!staff) return res.status(404).json({ msg: 'Staff not found' });
        res.json(staff);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await Staff.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Staff deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
