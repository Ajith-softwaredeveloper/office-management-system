const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'server');

const dirs = [
  'config',
  'controllers',
  'middleware',
  'models',
  'routes'
];

dirs.forEach(d => fs.mkdirSync(path.join(baseDir, d), { recursive: true }));

const files = {
  '.env': `PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/officemanagement?retryWrites=true&w=majority
JWT_SECRET=supersecretjwtkey_change_me_in_production
`,
  'server.js': `const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(\`Server running on port \${PORT}\`));
`,
  'config/db.js': `const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
module.exports = connectDB;
`,
  'models/User.js': `const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Employee'], default: 'Employee' }
});
module.exports = mongoose.model('User', UserSchema);
`,
  'models/Employee.js': `const mongoose = require('mongoose');
const EmployeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    department: { type: String },
    position: { type: String }
});
module.exports = mongoose.model('Employee', EmployeeSchema);
`,
  'models/Attendance.js': `const mongoose = require('mongoose');
const AttendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, enum: ['Present', 'Absent', 'Half Day', 'Leave'], default: 'Present' }
});
module.exports = mongoose.model('Attendance', AttendanceSchema);
`,
  'models/Task.js': `const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' }
});
module.exports = mongoose.model('Task', TaskSchema);
`,
  'models/Leave.js': `const mongoose = require('mongoose');
const LeaveSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reason: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' }
});
module.exports = mongoose.model('Leave', LeaveSchema);
`,
  'middleware/authMiddleware.js': `const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
`,
  'routes/authRoutes.js': `const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;
`,
  'routes/employeeRoutes.js': `const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require('../controllers/employeeController');

router.get('/', auth, getEmployees);
router.post('/', auth, createEmployee);
router.put('/:id', auth, updateEmployee);
router.delete('/:id', auth, deleteEmployee);

module.exports = router;
`,
  'routes/attendanceRoutes.js': `const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { markAttendance, getAttendance } = require('../controllers/attendanceController');

router.post('/', auth, markAttendance);
router.get('/', auth, getAttendance);

module.exports = router;
`,
  'routes/taskRoutes.js': `const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { createTask, getTasks, updateTaskStatus } = require('../controllers/taskController');

router.post('/', auth, createTask);
router.get('/', auth, getTasks);
router.put('/:id', auth, updateTaskStatus);

module.exports = router;
`,
  'routes/leaveRoutes.js': `const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');

router.post('/', auth, applyLeave);
router.get('/', auth, getLeaves);
router.put('/:id', auth, updateLeaveStatus);

module.exports = router;
`,
  'controllers/authController.js': `const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { user: { id: user.id, role: user.role } };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};
`,
  'controllers/employeeController.js': `const Employee = require('../models/Employee');

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
`,
  'controllers/attendanceController.js': `const Attendance = require('../models/Attendance');

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
`,
  'controllers/taskController.js': `const Task = require('../models/Task');

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
`,
  'controllers/leaveController.js': `const Leave = require('../models/Leave');

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
`
};

for (const [filepath, content] of Object.entries(files)) {
    fs.writeFileSync(path.join(baseDir, filepath), content);
}
console.log("Backend files generated successfully!");
