import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DocumentVersioning from './DocumentVersioning';
import { faUserPlus, faFileAlt, faServer } from '@fortawesome/free-solid-svg-icons';

const DashboardContent = () => {
  // Hardcoded data for demonstration
  const dashboardData = {
    newUserCount: 15,
    recentDocuments: 37,
    systemStatus: 'All Systems Operational',
    recentActivities: [
      { id: 1, activity: 'User JohnD registered', timestamp: '10 mins ago' },
      { id: 2, activity: 'Document XYZ was uploaded', timestamp: '20 mins ago' },
      { id: 3, activity: 'Server backup completed', timestamp: '30 mins ago' },
      // ... more activities
    ],
    // Add more data as needed
  };

  return (
    <div className="dashboard-content mt-10 max-w-7xl mx-auto mb-40">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      
      {/* Widgets */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* New Users */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-600">New Users</p>
            <p className="text-xl font-semibold">{dashboardData.newUserCount}</p>
          </div>
          <FontAwesomeIcon icon={faUserPlus} size="2x" className="text-blue-500" />
        </div>

        {/* Recent Documents */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-600">Recent Documents</p>
            <p className="text-xl font-semibold">{dashboardData.recentDocuments}</p>
          </div>
          <FontAwesomeIcon icon={faFileAlt} size="2x" className="text-green-500" />
        </div>

        {/* System Status */}
        <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
          <div>
            <p className="text-gray-600">System Status</p>
            <p className="text-xl font-semibold">{dashboardData.systemStatus}</p>
          </div>
          <FontAwesomeIcon icon={faServer} size="2x" className="text-red-500" />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="space-y-2">
          {dashboardData.recentActivities.map(activity => (
            <div key={activity.id} className="flex justify-between items-center">
              <p>{activity.activity}</p>
              <p className="text-sm text-gray-500">{activity.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
            <DocumentVersioning />
      {/* Additional dashboard components can be added here */}
    </div>
  );
};

export default DashboardContent;
