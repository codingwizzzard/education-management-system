import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const GradeChart = () => {
  const [gradeData, setGradeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/analytics/average-grades', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setGradeData(response.data.gradeData);
      } catch (error) {
        console.error('Error fetching grade data', error);
      }
    };
    fetchData();
  }, []);

  const courseTitles = gradeData.map((course) => course._id);
  const averageGrades = gradeData.map((course) => course.averageGrade);

  const data = {
    labels: courseTitles,
    datasets: [
      {
        label: 'Average Grade',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: averageGrades,
      },
    ],
  };

  return (
    <div>
      <h3>Average Grade Analytics</h3>
      <Line
        data={data}
        options={{
          title: {
            display: true,
            text: 'Average Grades per Course',
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

export default GradeChart;
