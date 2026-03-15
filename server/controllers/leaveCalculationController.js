const LeaveCalculation = require('../models/LeaveCalculation');

exports.getAll = async (req, res) => {
    try {
        const { staff_id } = req.query;
        const filter = {};
        if (staff_id && staff_id !== 'null' && staff_id !== 'undefined') {
            filter.staffId = staff_id;
        }
        const records = await LeaveCalculation.find(filter).populate('staffId', 'name email department');
        res.json(records);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.getById = async (req, res) => {
    try {
        const record = await LeaveCalculation.findById(req.params.id).populate('staffId', 'name email');
        if (!record) return res.status(404).json({ msg: 'Record not found' });
        res.json(record);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const record = new LeaveCalculation(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const record = await LeaveCalculation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!record) return res.status(404).json({ msg: 'Record not found' });
        res.json(record);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await LeaveCalculation.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Record deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
