const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const newEmp = new Employee(req.body);
        const employee = await newEmp.save();
        res.json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        let employee = await Employee.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.json(employee);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Employee removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
