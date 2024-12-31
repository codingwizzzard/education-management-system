const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

  exports.getAvailableQuizzes = async (req, res) => {
    try {
      const studentId = req.user._id;
      const courses = await Course.find({ studentsEnrolled: studentId }).select('_id');
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'No courses found for this student.' });
      }
  
      // Find quizzes for these courses
      const courseIds = courses.map((course) => course._id);
      const quizzes = await Quiz.find({ course: { $in: courseIds } }).select('title course createdAt');
  
      if (!quizzes || quizzes.length === 0) {
        return res.status(404).json({ message: 'No quizzes available for your courses.' });
      }
  
      res.status(200).json(quizzes);
    } catch (error) {
      console.error('Error fetching available quizzes:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };