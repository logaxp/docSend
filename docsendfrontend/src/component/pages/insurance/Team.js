import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faEnvelope, faPhone, faIdBadge, faThList, faTh } from '@fortawesome/free-solid-svg-icons';

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([
    // Initial dummy data
    { name: 'Gerrt C', role: 'Agency Manager', email: 'jane.doe@example.com', phone: '123-456-7890' },
    { name: 'Chris A', role: 'Engineer Agent', email: 'ji#2@gmail.com', phone: '123-456-7890'},
    { name: 'John B', role: 'Dental Agent', email: 'john@logaxp.com', phone: '123-456-7890'},
    { name: 'Jane D', role: 'Health Specialist', email: 'how@gmail.com', phone: '123-456-7890'},
    { name: 'Jane D', role: 'Agency Accumulator', email: 'jame@gmail.com', phone: '123-456-7890' },
    { name: 'Jane D', role: 'Loss Evaluator', email: 'hot@gmail.com', phone: '123-456-7890' },
    // ... more team members
  ]);

  // Function to add a new member - this would be more complex in a real app, likely involving a form
  const addTeamMember = () => {
    const newMember = { name: 'New Member', role: 'New Role', email: 'new.email@example.com', phone: '987-654-3210' };
    setTeamMembers([...teamMembers, newMember]);
  };
  const [viewType, setViewType] = useState('card'); // 'card' or 'list'
  const [searchTerm, setSearchTerm] = useState('');


  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)
  );

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Our Team</h1>
        <div>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setViewType(viewType === 'card' ? 'list' : 'card')}
          >
            <FontAwesomeIcon icon={viewType === 'card' ? faThList : faTh} className="mr-2" />
            {viewType === 'card' ? 'List View' : 'Card View'}
          </button>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={addTeamMember}
          >
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Add Agent
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {viewType === 'card' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredMembers.map((member, index) => (
 
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            <div className="flex items-center space-x-4 mb-4">
              <FontAwesomeIcon icon={faUser} className="text-xl text-blue-500" />
              <h2 className="text-lg font-bold">{member.name}</h2>
            </div>
            <p className="mb-2">
              <FontAwesomeIcon icon={faIdBadge} className="mr-2 text-gray-400" />
              {member.role}
            </p>
            <p className="mb-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-400" />
              {member.email}
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mr-2 text-gray-400" />
              {member.phone}
            </p>
          </div>
        ))}
      </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Phone</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {filteredMembers.map((member, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{member.name}</td>
                  <td className="py-3 px-6 text-left">{member.role}</td>
                  <td className="py-3 px-6 text-left">{member.email}</td>
                  <td className="py-3 px-6 text-left">{member.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Team;