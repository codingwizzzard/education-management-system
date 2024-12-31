import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateQuizPage = () => {
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/teacher/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data); 
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses.');
      }
    };

    fetchCourses();
  }, []);

  const handleAddQuestion = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ questionText: '', options: ['', '', '', ''], correctAnswer: 0 });
  };

  const handleCreateQuiz = async () => {
    if (!courseId) {
      alert('Please select a course.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/quiz/create',
        { title, courseId, questions },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Quiz created successfully!');
      setTitle('');
      setQuestions([]);
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('Failed to create quiz.');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            
            <div className="page-header-title text-center">
              <h2 className="mb-0">Create a Quiz</h2>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <div>
          <h1>Create Quiz</h1>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            className="form-control mb-3"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
          <div>
            <h2 className="mb-3">Questions</h2>
            {questions.map((q, index) => (
              <div key={index}>
                <p>{q.questionText}</p>
                <ul>
                  {q.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Question Text"
                value={newQuestion.questionText}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, questionText: e.target.value })
                }
              />
              {newQuestion.options.map((option, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control mb-3"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      options: newQuestion.options.map((opt, i) =>
                        i === index ? e.target.value : opt
                      ),
                    })
                  }
                />
              ))}
              <select
                className="form-control mb-3"
                value={newQuestion.correctAnswer}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, correctAnswer: Number(e.target.value) })
                }
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>
              <button onClick={handleAddQuestion} className="btn btn-primary mt-3">
                Add Question
              </button>
            </div>
          </div>
          <button onClick={handleCreateQuiz} className="btn btn-success mt-4">
            Create Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
