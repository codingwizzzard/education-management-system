const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {
  createQuiz,
  getQuizzesByCourse,
  getQuizById,
  submitQuiz,
} = require('../controllers/quizController');

const router = express.Router();

router.post('/create', protect, authorize('Teacher'), createQuiz);
router.get('/course/:courseId', protect, authorize('Student'), getQuizzesByCourse);
router.get('/:quizId', protect, getQuizById);
router.post('/submit/:quizId', protect, authorize('Student'), submitQuiz);

module.exports = router;
