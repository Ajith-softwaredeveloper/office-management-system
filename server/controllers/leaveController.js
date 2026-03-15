const Leave = require('../models/Leave');
const LeaveCalculation = require('../models/LeaveCalculation');

exports.getAll = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employeeId', 'name email').sort({ createdAt: -1 });
        res.json(leaves);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.apply = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const days = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

        const leave = new Leave({ ...req.body, days });
        await leave.save();
        res.status(201).json(leave);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!leave) return res.status(404).json({ msg: 'Leave not found' });

        // Update leave calculation if approved/rejected
        if (req.body.status === 'Approved' && leave.staffId) {
            await LeaveCalculation.findOneAndUpdate(
                { staffId: leave.staffId, year: new Date().getFullYear() },
                { $inc: { usedLeavesDays: leave.days } },
                { upsert: true }
            );
        }
        res.json(leave);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await Leave.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Leave deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
