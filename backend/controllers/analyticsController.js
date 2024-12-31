const Course = require('../models/Course');

// Get number of students enrolled per course
exports.getEnrollmentAnalytics = async (req, res) => {
  try {
    const enrollmentData = await Course.aggregate([
      {
        $project: {
          title: 1,
          enrolledStudentsCount: { $size: "$studentsEnrolled" },
        }
      }
    ]);

    res.status(200).json({ enrollmentData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get average grade per course
exports.getAverageGradeAnalytics = async (req, res) => {
  try {
    const gradeData = await Course.aggregate([
      { $unwind: "$grades" },
      {
        $group: {
          _id: "$title",
          averageGrade: { $avg: "$grades.grade" }
        }
      }
    ]);

    res.status(200).json({ gradeData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get total courses per teacher
exports.getCoursesPerTeacherAnalytics = async (req, res) => {
  try {
    const teacherCoursesData = await Course.aggregate([
      {
        $group: {
          _id: "$assignedTeacher",
          coursesCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "teacher"
        }
      },
      {
        $unwind: "$teacher"
      },
      {
        $project: {
          _id: 0,
          teacherName: "$teacher.name",
          coursesCount: 1
        }
      }
    ]);

    res.status(200).json({ teacherCoursesData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
