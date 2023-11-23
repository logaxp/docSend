import React from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';




const PieChart = () => {
  const data = {
    labels: ['Pending Doc', 'Started Doc', 'Completed Doc'],
    datasets: [
      {
        data: [3, 5, 10], // These values would be your actual data
        backgroundColor: ['#4B77BE', '#5CDEAC', '#FFC947'],
        hoverBackgroundColor: ['#354A5E', '#3C9D7F']
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'bottom'
    }
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
