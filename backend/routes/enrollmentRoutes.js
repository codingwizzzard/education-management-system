const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { enrollStudent, unenrollStudent, viewEnrolledCourses } = require('../controllers/enrollmentController');
const router = express.Router();

router.get('/my-courses', protect, authorize('Student'), viewEnrolledCourses);
router.post('/enroll', protect, authorize('Admin', 'Teacher'), enrollStudent);
router.post('/unenroll', protect, authorize('Admin'), unenrollStudent);

module.exports = router;
