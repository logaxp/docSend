import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUserTie, faUserPlus, faListAlt } from '@fortawesome/free-solid-svg-icons';

const AgencyDashboardHeader = () => {
  return (
    <div className="bg-gray-700 opacity-50 shadow mb-20  mx-auto">
      <div className="mx-auto py-4 px-6 sm:px-8 lg:flex justify-between items-center">
       
        
        <div className="space-x-6 flex flex-wrap justify-center">
          <div className="space-x-2">
            <Link to="/create-user" className="bg-white text-gray-900 text-sm hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Create User
            </Link>
            <Link to="/users" className="bg-white text-gray-900 text-sm hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faUsers} className="mr-2" />
              List Users
            </Link>
          </div>
          
          <div className="space-x-2">
            <Link to="/create-agents" className="bg-white text-sm text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faUserTie} className="mr-2" />
              Create Agent
            </Link>
            <Link to="/list-agents" className="bg-white text-sm text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faListAlt} className="mr-2" />
              List Agents
            </Link>
          </div>
         
          <div className="space-x-2">
            <Link to="/create-customer" className="bg-white text-sm text-green-600 hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
              Create Customer
            </Link>
            <Link to="/list-customer" className="bg-white text-sm text-green-600 hover:bg-gray-100 px-4 py-2 rounded-md shadow-lg transition duration-200 ease-in-out">
              <FontAwesomeIcon icon={faListAlt} className="mr-2" />
              List Customers
            </Link>
          </div>
        </div>
        <div className="flex items-center space-10">
            <h1 className="text-2xl font-bold text-white">Agency Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default AgencyDashboardHeader;
