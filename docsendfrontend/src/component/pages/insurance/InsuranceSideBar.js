import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt,
  faUserFriends,
  faCopy,
  faUserTie,
  faPaperPlane,
  faMoneyBillWave,
  faCog,
  faUser,
  faUserGroup,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

const InsuranceSideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <div className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}`} onClick={closeSidebar}></div>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-50 rounded dark:bg-gray-800 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Sidebar content */}
        <aside aria-label="Sidebar" className="py-4 px-3 min-h-screen">
      <div className="overflow-y-auto py-4 px-3 min-h-screen bg-gray-50 rounded dark:bg-gray-800">
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">DocCenter Forms</div>
          </div>
          <div className="flex items-center justify-center border-b-2 mt-2"></div>
        </div>
        <ul className="space-y-2">
          <li>
            <Link to="/insurance_layout" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faTachometerAlt} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/agency" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faUserTie} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Agency</span>
            </Link>
          </li>
          <li>
            <Link to="/customers" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faUserFriends} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Customers</span>
            </Link>
          </li>
          <li>
            <Link to="/templates" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faCopy} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Templates</span>
            </Link>
          </li>
          <li>
            <Link to="/team" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faUserTie} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Team</span>
            </Link>
          </li>

          <li>
            <Link to="/send-form" className="flex items-center mb-40 p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faPaperPlane} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Send Doc's</span>
            </Link>
          </li>
          <li>
            <Link to="/agent" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faUserGroup} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Agent</span>
            </Link>
          </li>
          <li>
            <Link to="/buy-credits" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Subscription</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <FontAwesomeIcon icon={faCog} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
              <span className="ml-3">Settings</span>
            </Link>
          </li>
          <Link to="/profile" className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
          <FontAwesomeIcon icon={faUser} className="w-6 h-6  text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
          <span className="ml-3">Chris  Adebajo</span>
        </Link>
        </ul>
      </div>
      <FontAwesomeIcon icon={faTimes} className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 lg:hidden" onClick={toggleSidebar} />
        </aside>
    </div>
      <div className="text-gray-500 hover:text-gray-600 lg:hidden" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
      </div>
    </>
  );
};

export default InsuranceSideBar;
