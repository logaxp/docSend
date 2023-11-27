import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFileAlt, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import PieChart from './PieChart';


const DashboardStatCard = ({ icon, label, value }) => (
  <div className="flex items-center  bg-gray-700 text-white p-4 rounded-lg shadow-lg">
    <FontAwesomeIcon icon={icon} size="2x" className="mr-4" />
    <div>
      <div className="text-sm">{label}</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  </div>
);
// Register the necessary components

const LayoutComponent = () => {
  // Dummy statistics data, replace with your actual data
  const stats = {
    customers: 45,
    templates: 35,
    DocsSent: 809,
  };

  return (
    <div className="flex h-135 bg-gray-50 rounded-xl mt-10  mx-auto mb-20">
    
      <div className="flex-1 p-5">

  <h1 className="text-3xl font-bold text-gray-700 pb-2 mb-8 border-b border-gray-200">
   Dashboard Overview
  </h1>
        {/* Statistics Cards */}
        <div className="grid max-w-4xl md:max-w-2xl mx-auto grid-cols-1 md:grid-cols-3  gap-4 mb-5">
          <DashboardStatCard icon={faUser} label="Customers" value={stats.customers} />
          <DashboardStatCard icon={faFileAlt} label="Templates" value={stats.templates} />
          <DashboardStatCard icon={faPaperPlane} label="Doc's Sent" value={stats.DocsSent} />
        </div>
        <h3 className="text-xl font-bold text-gray-700 pb-2 mb-8 border-b border-gray-200">
   Doc Analytics
  </h3>
        {/* Pie Chart */}
        <div className="mb-20">
      

          <div className="h-64 ">
            <PieChart />
          </div>
        </div>
        
        {/* Additional components can go here */}
      </div>
    </div>
  );
};

export default LayoutComponent;
