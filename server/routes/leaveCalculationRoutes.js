const express = require('express');
const router = express.Router();
const { getAll, getById, create, update, remove } = require('../controllers/leaveCalculationController');
const auth = require('../middleware/auth');

router.get('/', auth, getAll);
router.get('/:id', auth, getById);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

module.exports = router;
