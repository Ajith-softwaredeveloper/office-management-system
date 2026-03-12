const Task = require('../models/Task');

exports.createTask = async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.json(newTask);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', ['name']);
        res.json(tasks);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(task);
    } catch (err) {
        res.status(500).send('Server Error');
    }
};
