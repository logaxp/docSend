import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="admin-dashboard flex">
      {/* Hamburger Icon */}
      <FontAwesomeIcon icon={faBars} className="text-white text-3xl m-4 md:hidden cursor-pointer" onClick={toggleSidebar} />

    

    {/* Additional Content */}
    <div className="additional-content mt-6">
        {/* This is where you can add more complex components or additional information */}
        <p>More dashboard content can be added here...</p>
    </div>
</div>
  );
};

export default AdminDashboard;
