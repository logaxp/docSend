import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faEye, faEdit, faCopy } from '@fortawesome/free-solid-svg-icons';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('templates');

  const templates = [
    {
      name: 'Marketplace Enrollment Consent Form English',
      createdOn: '09/04/23',
      used: 6,
    },
    {
      name: 'Consent to Search In The Marketplace (ED)',
      createdOn: '10/26/23',
      used: 3,
    },
    // ... add more templates
  ];

  return (
    <div className="container mx-auto p-4">
         <h1 className="text-2xl font-bold text-gray-700 mb-8 border-b-2 uppercase">Templates</h1>
      <div className="flex justify-between items-center mb-4">
       
        <div>
          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-2 ${activeTab === 'templates' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('otherAgent')}
            className={`px-4 py-2 ml-2 ${activeTab === 'otherAgent' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
          >
            Other Agent
          </button>
        </div>
        <div className="flex space-x-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded-lg"
          />
        </div>
        <Link to={`/create-template`} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center">
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add new template
        </button>
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Template Name</th>
              <th className="py-3 px-6 text-left">Created On</th>
              <th className="py-3 px-6 text-center">Used</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {templates.map((template, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {template.name}
                </td>
                <td className="py-3 px-6 text-left">
                  {template.createdOn}
                </td>
                <td className="py-3 px-6 text-center">
                  {template.used} time(s)
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                    <div className="w-4 mr-2 transform hover:text-green-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FontAwesomeIcon icon={faCopy} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Templates;
