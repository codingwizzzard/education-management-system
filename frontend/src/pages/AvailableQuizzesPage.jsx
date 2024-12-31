import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AvailableQuizzesPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/student/quizzes', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes:', error);
        setError('Failed to load quizzes.');
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <div className="page-header-title">
              <h2 className="mb-0">Available Quizzes</h2>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="card">
          <div className="card-header">
            <h5>Your Quizzes</h5>
          </div>
          <div className="card-body">
            {quizzes.length > 0 ? (
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Quiz Title</th>
                    <th>Course</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quizzes.map((quiz) => (
                    <tr key={quiz._id}>
                      <td>{quiz.title}</td>
                      <td>{quiz.course.title}</td>
                      <td>{new Date(quiz.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/student/quiz/${quiz._id}`)}
                        >
                          Take Quiz
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No quizzes available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableQuizzesPage;
