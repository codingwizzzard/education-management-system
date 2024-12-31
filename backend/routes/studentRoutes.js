const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getAvailableQuizzes } = require('../controllers/studentController');

const router = express.Router();

// Fetch quizzes available to the student
router.get('/quizzes', protect, authorize('Student'), getAvailableQuizzes);

module.exports = router;