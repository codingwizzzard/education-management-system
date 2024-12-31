const Assignment = require('../models/Assignment');
const Course = require('../models/Course');
const mongoose = require('mongoose');

// Testing Code
exports.getAssignedCoursesWithSubmissions = async (req, res) => {
    try {
      const teacherId = req.user._id; // Logged-in teacher's ID
      const courses = await Course.find({ assignedTeacher: teacherId })
        .populate('studentsEnrolled', 'name email') // Populate student details
        .select('title description studentsEnrolled'); // Select only necessary fields
      if (!courses || courses.length === 0) {
        return res.status(404).json({ message: 'No courses assigned to this teacher.' });
      }
      const courseSubmissions = await Promise.all(
        courses.map(async (course) => {
          const submissions = await Assignment.find({ course: course._id })
            .populate('student', 'name email') // Populate student details
            .select('student fileName submittedAt'); // Select only necessary fields
  
          return {
            course,
            submissions,
          };
        })
      );
  
      res.status(200).json(courseSubmissions);
    } catch (error) {
      console.error('Error fetching assigned courses and submissions:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  exports.assignGrade = async (req, res) => {
    try {
      const { assignmentId } = req.params;
      const { grade } = req.body;
  
      console.log('Received assignmentId:', assignmentId);
      console.log('Received grade:', grade);
  
      // Validate assignmentId
      if (!mongoose.Types.ObjectId.isValid(assignmentId)) {
        console.error('Invalid assignmentId format');
        return res.status(400).json({ message: 'Invalid assignment ID format.' });
      }
  
      // Validate grade
      if (!grade || typeof grade !== 'number' || grade < 0 || grade > 100) {
        console.error('Invalid grade value:', grade);
        return res.status(400).json({ message: 'Invalid grade. It must be a number between 0 and 100.' });
      }
  
      // Find the assignment
      const assignment = await Assignment.findById(assignmentId);
      if (!assignment) {
        console.error('Assignment not found for ID:', assignmentId);
        return res.status(404).json({ message: 'Assignment not found.' });
      }
  
      console.log('Found assignment:', assignment);
  
      // Update the grade
      assignment.grade = grade;
      console.log('Updated assignment before saving:', assignment);
      await assignment.save();
  
      res.status(200).json({ message: 'Grade assigned successfully.', assignment });
    } catch (error) {
      console.error('Error assigning grade:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  

  exports.getAssignedCourses = async (req, res) => {
    try {
      const teacherId = req.user._id; // Get the teacher's ID from the logged-in user
      const courses = await Course.find({ assignedTeacher: teacherId }).select('title _id'); // Fetch courses
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };