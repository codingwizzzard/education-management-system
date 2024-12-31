const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const { getMe } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();


router.get('/me', protect, getMe);
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
