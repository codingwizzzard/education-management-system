import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GradeStudents = () => {
  const { courseId } = useParams(); 
  console.log('Extracted courseId from URL:', courseId);
  const [submissions, setSubmissions] = useState([]);
  const [grade, setGrade] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    console.log('Fetching submissions for courseId:', courseId);
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/grades/submissions/${courseId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(response.data);
      } catch (error) {
        setError('Failed to load submissions.');
      }
    };
    fetchSubmissions();
  }, [courseId]);

  const handleGradeSubmit = async (assignmentId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:5000/api/grades/grade/${assignmentId}`,
        { grade },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setSuccess('Grade assigned successfully');
        setSelectedAssignmentId(null); 
        setGrade(''); 
      }
    } catch (error) {
      setError('Failed to assign grade.');
    }
  };

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            <div className="page-header-title text-center">
              <h2 className="mb-0">Grade Assignments</h2>
            </div>
          </div>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="card">
          <div className="card-header">
            <h5>Student Submissions</h5>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Assignment File</th>
                  <th>Grade</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((submission) => (
                  <tr key={submission._id}>
                    <td>{submission.student.name}</td>
                    <td><a href={`http://localhost:3000/${submission.filePath}`} target="_blank" rel="noopener noreferrer">Download</a></td>
                    <td>{submission.grade || 'Not graded yet'}</td>
                    <td>
                      <input
                        type="text"
                        value={selectedAssignmentId === submission._id ? grade : ''}
                        onChange={(e) => setGrade(e.target.value)}
                        placeholder="Enter grade"
                      />
                      <button
                        onClick={() => handleGradeSubmit(submission._id)}
                        className="btn btn-primary"
                      >
                        Assign Grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeStudents;