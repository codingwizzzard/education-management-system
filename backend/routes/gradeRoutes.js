const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { gradeAssignment, viewStudentSubmissions, viewStudentGrades  } = require('../controllers/gradeController');
const router = express.Router();

router.get('/submissions/:courseId',protect,authorize('Teacher'),viewStudentSubmissions);
router.post('/grade/:assignmentId', protect, authorize('Teacher'), gradeAssignment);
router.get('/my-grades', protect, authorize('Student'), viewStudentGrades);

module.exports = router;
