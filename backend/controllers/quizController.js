const Quiz = require('../models/Quiz');
const Course = require('../models/Course');

// Create a quiz
exports.createQuiz = async (req, res) => {
  try {
    const { title, courseId, questions } = req.body;
    const teacherId = req.user._id;

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found.' });
    }

    // Check if the teacher is assigned to the course
    if (course.assignedTeacher.toString() !== teacherId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to create quizzes for this course.' });
    }

    const quiz = new Quiz({
      title,
      course: courseId,
      teacher: teacherId,
      questions,
    });

    await quiz.save();

    res.status(201).json({ message: 'Quiz created successfully.', quiz });
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get quizzes for a course
exports.getQuizzesByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const quizzes = await Quiz.find({ course: courseId }).select('title createdAt');

    res.status(200).json(quizzes);
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get a specific quiz by ID
exports.getQuizById = async (req, res) => {
  try {
    const { quizId } = req.params;
    const quiz = await Quiz.findById(quizId).populate('course', 'title');

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error fetching quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Submit a quiz
exports.submitQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // { questionIndex: selectedOption }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    // Calculate the score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    res.status(200).json({ message: 'Quiz submitted successfully.', score, totalQuestions: quiz.questions.length });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Submit a quiz for a student
exports.submitStudentQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // { questionIndex: selectedOption }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found.' });
    }

    // Calculate the score
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score += 1;
      }
    });

    res.status(200).json({
      message: 'Quiz submitted successfully.',
      score,
      totalQuestions: quiz.questions.length,
    });
  } catch (error) {
    console.error('Error submitting quiz:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

