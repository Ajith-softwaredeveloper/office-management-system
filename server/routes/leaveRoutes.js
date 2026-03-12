const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { applyLeave, getLeaves, updateLeaveStatus } = require('../controllers/leaveController');

router.post('/', auth, applyLeave);
router.get('/', auth, getLeaves);
router.put('/:id', auth, updateLeaveStatus);

module.exports = router;
