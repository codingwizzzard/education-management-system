const Course = require('../models/Course');
const User = require('../models/User');

// Create a new course (Admin only)
exports.createCourse = async (req, res) => {
  const { title, description, startDate, endDate, assignedTeacher } = req.body;

  try {
    // Check if the teacher exists
    const teacher = await User.findOne({ email: assignedTeacher, role: 'Teacher' });
    if (!teacher) {
      return res.status(400).json({ message: 'Assigned teacher not found or not a teacher' });
    }

    // Create the course
    const course = await Course.create({
      title,
      description,
      startDate,
      endDate,
      assignedTeacher: teacher._id,
    });

    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


exports.editCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, startDate, endDate, assignedTeacher } = req.body;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const teacher = await User.findOne({ email: assignedTeacher, role: 'Teacher' });
    if (!teacher) {
      return res.status(400).json({ message: 'Assigned teacher not found or not a teacher' });
    }

    // Update course fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.startDate = startDate || course.startDate;
    course.endDate = endDate || course.endDate;
    course.assignedTeacher = teacher._id || course.assignedTeacher;

    await course.save();

    res.status(200).json({ message: 'Course updated successfully', course });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.viewCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('assignedTeacher', 'name');
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course (Admin only)
exports.deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    // Find the course by ID and delete it
    const course = await Course.findByIdAndDelete(courseId);

    // If course is not found, return 404
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Return success response if the course is deleted
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    // Return error response in case of any issue
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.getCourseById = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId).populate('assignedTeacher', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};