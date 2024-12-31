import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EnrollmentChart = () => {
  const [enrollmentData, setEnrollmentData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics/enrollment', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setEnrollmentData(response.data.enrollmentData);
      } catch (error) {
        console.error('Error fetching enrollment data', error);
      }
    };
    fetchData();
  }, []);

  const courseTitles = enrollmentData.map((course) => course.title);
  const enrolledCounts = enrollmentData.map((course) => course.enrolledStudentsCount);

  const data = {
    labels: courseTitles,
    datasets: [
      {
        label: 'Students Enrolled',
        backgroundColor: 'rgba(70,128,255,1)',
        borderColor: 'rgba(0,0,0,0.4)',
        borderWidth: 1,
        data: enrolledCounts,
      },
    ],
  };

  return (
    <div>
      <h3>Enrollment Analytics</h3>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Number of Students Enrolled in Each Course',
            fontSize: 20,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />
      
    </div>
  );
};

export default EnrollmentChart;
