const Assignment = require('../models/Assignment');
const Course = require('../models/Course');

exports.uploadAssignment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const studentId = req.user._id; 
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    console.log('Uploaded file:', req.file);
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Save the assignment to the database
    const assignment = new Assignment({
      course: courseId,
      student: studentId,
      fileName: req.file.originalname, 
      filePath: req.file.path,          
    });

    await assignment.save();

    res.status(200).json({ message: 'Assignment uploaded successfully', assignment });
  } catch (error) {
    console.error('Error uploading assignment:', error); 
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.submitAssignment = async (req, res) => {
  const { courseId } = req.params;
  const { studentId, file } = req.body;

  try {
    // Ensure student is enrolled in the course
    const course = await Course.findById(courseId);
    if (!course.studentsEnrolled.includes(studentId)) {
      return res.status(400).json({ message: 'Student is not enrolled in this course' });
    }

    // Save assignment
    const assignment = new Assignment({
      student: studentId,
      course: courseId,
      file
    });

    await assignment.save();

    res.status(201).json({ message: 'Assignment submitted successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

