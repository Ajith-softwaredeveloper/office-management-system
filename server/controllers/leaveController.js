const Leave = require('../models/Leave');

exports.applyLeave = async (req, res) => {
    try {
        const newLeave = new Leave(req.body);
        await newLeave.save();
        res.json(newLeave);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId', ['name']);
        res.json(leaves);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateLeaveStatus = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(leave);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
