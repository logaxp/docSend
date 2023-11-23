import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, // Dashboard icon
  faUserFriends, // Customers icon
  faCopy, // Templates icon
  faUserTie, // Team icon
  faPaperPlane, // Send AOR icon
  faMoneyBillWave, // Buy Credits icon
  faCog, // Settings icon
  faUser, // User icon
  faUserGroup, // Groups icon
} from '@fortawesome/free-solid-svg-icons';

const InsuranceSideBar = () => {
  return (
    <aside className="w-64" aria-label="Sidebar">
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
    </aside>
  );
};

export default InsuranceSideBar;
