import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnrollmentChart from '../components/EnrollmentChart';

const Index = () => {
  const [data, setData] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalTeachers: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics/totals', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="pc-container">
      <div className="pc-content">
        <div className="page-header">
          <div className="page-block">
            
            <div className="page-header-title text-center">
              <h2 className="mb-0">Education Management</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-x-6">
          <div className="col-span-12 md:col-span-12 2xl:col-span-12">
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                <div className="card">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h6 className="mb-0">Total Courses</h6>
                        <p className="mb-0 text-muted">Courses offered</p>
                      </div>
                      <div className="dropdown">
                        <a className="w-8 h-8 rounded-xl inline-flex items-center justify-center btn-link-secondary dropdown-toggle arrow-none" href="#" data-pc-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="ti ti-dots-vertical text-lg leading-none" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <h4 className="mb-0"><small className="text-muted"></small>{data.totalCourses}</h4>
                      <p className="mb-0 text-muted text-sm">Compare to last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-6 2xl:col-span-4">
                <div className="card">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h6 className="mb-0">Enrolled Students</h6>
                        <p className="mb-0 text-muted">Current Enrollments</p>
                      </div>
                      <div className="dropdown">
                        <a className="w-8 h-8 rounded-xl inline-flex items-center justify-center btn-link-secondary dropdown-toggle arrow-none" href="#" data-pc-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="ti ti-dots-vertical text-lg leading-none" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <h4 className="mb-0"><small className="text-muted"></small>{data.totalStudents}</h4>
                      <p className="mb-0 text-muted text-sm">Compare to last month</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-12 2xl:col-span-4">
                <div className="card">
                  <div className="card-body">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h6 className="mb-0">Total Teachers</h6>
                        <p className="mb-0 text-muted">Teaching Staff</p>
                      </div>
                      <div className="dropdown">
                        <a className="w-8 h-8 rounded-xl inline-flex items-center justify-center btn-link-secondary dropdown-toggle arrow-none" href="#" data-pc-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <i className="ti ti-dots-vertical text-lg leading-none" />
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2 mt-3">
                      <h4 className="mb-0"><small className="text-muted"></small>{data.totalTeachers}</h4>
                      <p className="mb-0 text-muted text-sm">Compare to last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-6">
              <div className="col-span-12 ">
                <EnrollmentChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index 