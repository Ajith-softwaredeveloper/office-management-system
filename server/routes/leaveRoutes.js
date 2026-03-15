const express = require('express');
const router = express.Router();
const { getAll, apply, update, remove } = require('../controllers/leaveController');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.post('/', auth, apply);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
