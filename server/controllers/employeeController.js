const Employee = require('../models/Employee');

exports.getAll = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ createdAt: -1 });
        res.json(employees);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const emp = new Employee(req.body);
        await emp.save();
        res.status(201).json(emp);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!emp) return res.status(404).json({ msg: 'Employee not found' });
        res.json(emp);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
