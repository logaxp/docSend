import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faUsers, faFileAlt, faCog, faChartLine, faEnvelope,
  faUserCircle, faSignOutAlt, faDatabase, faTools, faUserShield
} from '@fortawesome/free-solid-svg-icons';

const AdminSidebars = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <aside className={`sidebar bg-gray-800 text-white ${isSidebarOpen ? 'w-64' : 'w-20'} transition-all ease-in-out duration-300`}>
      <div className="sidebar-header flex justify-between items-center p-4">
        <FontAwesomeIcon icon={faUserCircle} className="text-4xl cursor-pointer" onClick={toggleSidebar} />
        <span className={`text-xl font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Admin Panel</span>
      </div>

      <ul className={`sidebar-links mt-4 space-y-2`}>
        {[
          { to: "/dashboard_content", icon: faTachometerAlt, label: 'Dashboard' },
          { to: "/user_management", icon: faUsers, label: 'Users' },
          { to: "/admin/documents", icon: faFileAlt, label: 'Documents' },
          { to: "/admin/analytics", icon: faChartLine, label: 'Analytics' },
          { to: "/admin/messages", icon: faEnvelope, label: 'Messages' },
          { to: "/admin/settings", icon: faCog, label: 'Settings' },
          { to: "/admin/data", icon: faDatabase, label: 'Data Management' },
          { to: "/admin/tools", icon: faTools, label: 'Tools' },
          { to: "/admin/security", icon: faUserShield, label: 'Security' },
        ].map((item, index) => (
          <li key={index} className="group">
            <Link to={item.to} className="flex items-center p-2 transition-colors duration-300 hover:bg-gray-700 rounded-md">
              <FontAwesomeIcon icon={item.icon} className="w-6 h-6" />
              <span className={`ml-4 text-base font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className={`logout-link mt-auto flex items-center justify-start p-4 transition-opacity duration-300 hover:bg-red-700 rounded-md cursor-pointer ${!isSidebarOpen && 'justify-center'}`}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
        <span className={`text-base font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>Logout</span>
      </div>
    </aside>
  );
};

export default AdminSidebars;
