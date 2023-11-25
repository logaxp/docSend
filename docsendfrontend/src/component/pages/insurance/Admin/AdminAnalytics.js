import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js';
import { Bar, Doughnut, Line, PolarArea } from 'react-chartjs-2';
import './AdminAnalytics.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale
);

const AdminAnalytics = () => {
  // Example datasets for the charts
  const barChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'Novemeber', 'December'],
    datasets: [
      {
        label: 'User Registrations',
        data: [65, 59, 80, 81, 56, 55, 40, 20, 30, 40, 50, 60],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const doughnutChartData = {
    labels: ['RAM', 'STORAGE', 'CPU'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'Decemeber'],
    datasets: [
      {
        label: 'Page Views',
        data: [12, 19, 3, 34, 2, 3, 12, 5, 6, 23, 8, 9],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const polarAreaChartData = {
    labels: ['Heathcare', 'Insurance', 'Mortgage', 'Educational', 'Contracts'],
    datasets: [
      {
        label: 'Dataset',
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(201, 203, 207, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
      },
    ],
  };
  const options = {
    maintainAspectRatio: false, // Add this to not maintain the ratio based on the original canvas size
    // ...other options
  };
  return (
    <div className="admin-analytics p-4 max-w-7xl mx-auto mt-10 mb-20">
  <h1 className="text-3xl font-semibold mb-6">Analytics Dashboard</h1>

  {/* Grid container */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Chart 1: User Registrations */}
    <div className="chart-container bg-white p-6 rounded-lg shadow-md h-96 mb-8">
      <h2 className="text-xl font-semibold mb-3">User Registrations</h2>
      <Bar data={barChartData}  />
    </div>

    {/* Chart 2: System Health */}
    <div className="chart-container bg-white p-6 rounded-lg shadow-md h-96 relative"> {/* Use your custom height */}
    <h2 className="text-xl font-semibold mb-3">System Health</h2>
    <div style={{ height: '300px', width: '300px' }}> {/* You can adjust these values to your preference */}
        <Doughnut data={doughnutChartData} options={options} />
    </div>
    </div>

    {/* Chart 3: Page Views Over Time */}
    <div className="chart-container bg-white p-6 rounded-lg shadow-md h-96">
      <h2 className="text-xl font-semibold mb-3">Document Views Over Time</h2>
      <Line data={lineChartData} />
    </div>

    {/* Chart 4: Resource Allocation */}
    <div className="chart-container bg-white p-6 rounded-lg shadow-md h-96">
      <h2 className="text-xl font-semibold mb-3">Resource Allocation</h2>
      <PolarArea data={polarAreaChartData} />
    </div>

  </div>
</div>

  );
};

export default AdminAnalytics;
