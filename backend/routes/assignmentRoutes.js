const express = require('express');
const { protect, authorize } = require('../middlewares/authMiddleware');
const { uploadAssignment } = require('../controllers/assignmentsController');
const multer = require('multer');

const router = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); 
  }
});
const upload = multer({ storage: storage });
router.post( '/upload/:courseId',protect,authorize('Student'),upload.single('assignmentFile'),uploadAssignment);


module.exports = router;
