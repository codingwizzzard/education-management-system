const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { getEnrollmentAnalytics, getAverageGradeAnalytics, getCoursesPerTeacherAnalytics, } = require('../controllers/analyticsController');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

router.get('/enrollment', protect, authorize('Admin'), getEnrollmentAnalytics);
router.get('/average-grades', protect, authorize('Admin'), getAverageGradeAnalytics);
router.get('/courses-per-teacher', protect, authorize('Admin'), getCoursesPerTeacherAnalytics);
router.get('/totals', async (req, res) => {
    try {
      const totalCourses = await Course.countDocuments({});
      const totalStudents = await User.countDocuments({ role: 'Student' });
      const totalTeachers = await User.countDocuments({ role: 'Teacher' });
  
      res.json({
        totalCourses,
        totalStudents,
        totalTeachers,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  });
  

module.exports = router;
