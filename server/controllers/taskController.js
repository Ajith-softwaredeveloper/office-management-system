const Task = require('../models/Task');

exports.getAll = async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email').sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) { res.status(500).json({ msg: err.message }); }
};

exports.create = async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        const populated = await task.populate('assignedTo', 'name email');
        res.status(201).json(populated);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.update = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('assignedTo', 'name email');
        if (!task) return res.status(404).json({ msg: 'Task not found' });
        res.json(task);
    } catch (err) { res.status(400).json({ msg: err.message }); }
};

exports.remove = async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task deleted' });
    } catch (err) { res.status(500).json({ msg: err.message }); }
};
