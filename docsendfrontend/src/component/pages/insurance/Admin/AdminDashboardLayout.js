import React from 'react';
import AdminSidebars from './AdminSideBars';

const AdminDashboardLayout = ({ children }) => {
  return (
    <div className="admin-dashboard-layout flex">
      {/* Sidebar */}
      <AdminSidebars />

      {/* Main Content */}
      <div className="main-content flex-grow">
        {/* The actual dashboard or other components passed as children */}
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
