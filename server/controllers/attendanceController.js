const Attendance = require('../models/Attendance');

exports.markAttendance = async (req, res) => {
    try {
        const { employeeId, status } = req.body;
        const newAttendance = new Attendance({ employeeId, status });
        await newAttendance.save();
        res.json(newAttendance);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getAttendance = async (req, res) => {
    try {
        const records = await Attendance.find().populate('employeeId', ['name']);
        res.json(records);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
