const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    grade: {
      type: Number,
      required: true,
    },
  });


const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a course title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a course description'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date'],
  },
  assignedTeacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: [true, 'Please assign a teacher to the course'],
  },
  studentsEnrolled: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  grades: [gradeSchema], 
}, {
  timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
