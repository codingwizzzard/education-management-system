const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { createCourse, editCourse, viewCourses, deleteCourse, getCourseById } = require('../controllers/courseController');
const router = express.Router();

// Define more specific routes before dynamic routes
router.post('/create', protect, authorize('Admin'), createCourse);
router.put('/edit/:courseId', protect, authorize('Admin', 'Teacher'), editCourse);
router.get('/view', protect, authorize('Admin', 'Teacher', 'Student'), viewCourses); // Must come before dynamic route
router.get('/:courseId', protect, authorize('Admin', 'Teacher', 'Student'), getCourseById); // Dynamic route
router.delete('/:courseId', protect, authorize('Admin'), deleteCourse);

module.exports = router;
