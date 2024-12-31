const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fileName: { type: String, required: true }, 
  filePath: { type: String, required: true }, 
  submittedAt: { type: Date, default: Date.now },
  grade: { type: Number }, 
});

module.exports = mongoose.model('Assignment', assignmentSchema);
