import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CreateQuiz = () => {
  const { courseId } = useParams();
  const [questions, setQuestions] = useState([{ question: '', answer: '' }]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: '', answer: '' }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [key]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/api/quizzes/create`, {
        courseId,
        questions,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        setSuccess('Quiz created successfully!');
        setQuestions([{ question: '', answer: '' }]);
      }
    } catch (error) {
      setError('Failed to create quiz. Please try again.');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <h2>Create Quiz</h2>
        </div>

        <form onSubmit={handleSubmit}>
          {questions.map((q, index) => (
            <div key={index} className="mb-3">
              <label className="form-label">Question {index + 1}:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter question"
                value={q.question}
                onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                required
              />
              <label className="form-label mt-2">Answer:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter answer"
                value={q.answer}
                onChange={(e) => handleQuestionChange(index, 'answer', e.target.value)}
                required
              />
            </div>
          ))}
          <button type="button" className="btn btn-secondary mb-3" onClick={handleAddQuestion}>
            Add Another Question
          </button>
          <button type="submit" className="btn btn-primary">Create Quiz</button>
        </form>

        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {success && <div className="alert alert-success mt-3">{success}</div>}
      </div>
    </div>
  );
};

export default CreateQuiz;
