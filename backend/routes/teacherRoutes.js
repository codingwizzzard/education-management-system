const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const {  getAssignedCoursesWithSubmissions, assignGrade , getAssignedCourses } = require('../controllers/teacherController');
const router = express.Router();

router.get('/assigned-courses', protect, authorize('Teacher'), getAssignedCoursesWithSubmissions);
router.post('/assign-grade/:assignmentId', protect, authorize('Teacher'), assignGrade);
router.get('/courses', protect, authorize('Teacher'), getAssignedCourses);

module.exports = router;
