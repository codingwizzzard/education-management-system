import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewEnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/enrollcourses/my-courses', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(response.data.courses);
      } catch (err) {
        setError('Failed to load enrolled courses');
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
          
            <div className="page-header-title text-center">
              <h2 className="mb-0">My Enrolled Courses</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12">
            <div className="card table-card">
              <div className="card-header flex items-center justify-between py-3">
                <h5 className="mb-0">Courses</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                    <tr>
                        <th>Course Title</th>
                        <th>Assigned Teacher</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {courses.map(course => (
                        <tr key={course._id}>
                          <td>{course.title}</td>
                          <td>{course.assignedTeacher.name}</td>
                          <td>{new Date(course.startDate).toLocaleDateString()}</td>
                          <td>{new Date(course.endDate).toLocaleDateString()}</td>
                          <td>
                            <Link to={`/upload-assignment/${course._id}`} className="btn btn-primary">
                              Upload Assignment
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default ViewEnrolledCourses;
