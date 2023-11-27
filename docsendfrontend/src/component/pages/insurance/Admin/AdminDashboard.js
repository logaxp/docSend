import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChartPie, faTasks, faComments, faBell } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-dashboard flex flex-col md:flex-row">
      {/* Hamburger Icon */}
      <FontAwesomeIcon icon={faBars} className="text-white text-3xl m-4 md:hidden cursor-pointer" onClick={toggleSidebar} />

      {/* Dashboard Content */}
      <div className="flex-1 p-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Card 1: Overview */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <FontAwesomeIcon icon={faChartPie} className="text-blue-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-xl font-semibold">1,250</p>
            </div>
          </div>

          {/* Card 2: Tasks */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <FontAwesomeIcon icon={faTasks} className="text-green-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Pending Tasks</p>
              <p className="text-xl font-semibold">35</p>
            </div>
          </div>

          {/* Card 3: Messages */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <FontAwesomeIcon icon={faComments} className="text-yellow-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">New Messages</p>
              <p className="text-xl font-semibold">12</p>
            </div>
          </div>

          {/* Card 4: Alerts */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center space-x-4">
            <FontAwesomeIcon icon={faBell} className="text-red-500 text-3xl" />
            <div>
              <p className="text-sm text-gray-600">Alerts</p>
              <p className="text-xl font-semibold">5</p>
            </div>
          </div>
        </div>

        {/* Additional Content */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <p className="text-gray-600">Here you can place an overview of recent system activities, important notifications, or any other relevant information for quick access.</p>
          {/* Add more content as needed */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
