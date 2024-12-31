const mongoose = require('mongoose');
const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

exports.viewStudentSubmissions = async (req, res) => {
  const { courseId } = req.params;

  try {
    console.log('Received request:', req.originalUrl);
    console.log('Received courseId:', courseId);
    if (!courseId || courseId === ':courseId') {
      return res.status(400).json({ message: 'Course ID is missing or invalid in the request.' });
    }
    if (!mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid courseId format.' });
    }
    const assignments = await Assignment.find({ course: courseId })
      .populate('student', 'name email') 
      .populate('course', 'title');

    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No submissions found for this course.' });
    }

    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error in viewStudentSubmissions:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.gradeAssignment = async (req, res) => {
  const { assignmentId } = req.params;
  const { grade } = req.body;

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }
    assignment.grade = grade;
    await assignment.save();

    res.status(200).json({ message: 'Grade assigned successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.viewStudentGrades = async (req, res) => {
  try {
    const studentId = req.user._id;
    const assignments = await Assignment.find({ student: studentId })
      .populate('course', 'title') 
      .select('course grade filePath'); 
    if (assignments.length === 0) {
      return res.status(404).json({ message: 'No grades found for this student.' });
    }
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};