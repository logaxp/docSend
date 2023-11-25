import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManageUserPrivileges from './ManageUserPrivilledge';
import { faEdit, faTrashAlt, faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const UserManagement = () => {
  // Example hardcoded users data
  const initialUsers = [
    { id: 1, name: 'Alice Kolo', email: 'alice@example.com', role: 'Admin' },
    { id: 2, name: 'Karl Glaudia', email: 'bob@example.com', role: 'User' },
    { id: 3, name: 'Charlie Sheen', email: 'charlie@example.com', role: 'Editor' },
    // ... more users
  ];

  const [users, setUsers] = useState(initialUsers);

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Add more functionality as needed, like editUser, addUser, etc.

  return (
    <div className="user-management max-w-7xl mx-auto bg-white mb-20">
      <h2 className="text-3xl mt-20 font-bold mb-4">User Management</h2>
      <div className="mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <FontAwesomeIcon icon={faPlusSquare} className="mr-2" />
          Add User
        </button>
      </div>
      <table className="min-w-full bg-white mb-10">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b-2 border-gray-300">Name</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Email</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Role</th>
            <th className="py-2 px-4 border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b border-gray-300">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-300">{user.role}</td>
              <td className="py-2 px-4 border-b border-gray-300">
                <FontAwesomeIcon icon={faEdit} className="text-blue-500 mr-4 cursor-pointer" />
                <FontAwesomeIcon icon={faTrashAlt} className="text-red-500 cursor-pointer" onClick={() => deleteUser(user.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ManageUserPrivileges />
    </div>
  );
};

export default UserManagement;
