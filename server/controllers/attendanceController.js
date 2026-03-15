const Attendance = require('../models/Attendance');

exports.getAll = async (req, res) => {
    try {
        const records = await Attendance.find().populate('employeeId', 'name email').sort({ date: -1 });
        res.json(records);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.mark = async (req, res) => {
    try {
        const { employeeId, status, date } = req.body;
        const checkDate = date ? new Date(date) : new Date();
        checkDate.setHours(0, 0, 0, 0);
        const nextDay = new Date(checkDate);
        nextDay.setDate(nextDay.getDate() + 1);

        // Check if already marked for today
        const existing = await Attendance.findOne({
            employeeId,
            date: { $gte: checkDate, $lt: nextDay }
        });
        if (existing) {
            existing.status = status || existing.status;
            await existing.save();
            return res.json(existing);
        }

        const record = new Attendance({ employeeId, status: status || 'Present', date: checkDate });
        await record.save();
        res.status(201).json(record);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await Attendance.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Record deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
