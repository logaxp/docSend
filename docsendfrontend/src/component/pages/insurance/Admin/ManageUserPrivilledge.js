

import React, { useState } from 'react';

const ManageUserPrivileges = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', privileges: ['create', 'read', 'update', 'delete'] },
    { id: 2, name: 'Jane Smith', role: 'Editor', privileges: ['read', 'update'] },
    { id: 3, name: 'Emma Johnson', role: 'Viewer', privileges: ['read'] },
    // Add more users as needed
  ]);

  // Function to handle privilege changes
  const handlePrivilegeChange = (userId, privilege, isChecked) => {
    // Logic to update privileges
    const updatedUsers = users.map((user) => {
      if (user.id === userId) {
        if (isChecked) {
          // Add privilege if checked
          return { ...user, privileges: [...user.privileges, privilege] };
        } else {
          // Remove privilege if unchecked
          return { ...user, privileges: user.privileges.filter((priv) => priv !== privilege) };
        }
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage User Privileges</h1>
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Privileges</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                {['create', 'read', 'update', 'delete'].map((privilege) => (
                  <label key={privilege} className="inline-flex items-center mr-2">
                    <input
                      type="checkbox"
                      checked={user.privileges.includes(privilege)}
                      onChange={(e) => handlePrivilegeChange(user.id, privilege, e.target.checked)}
                      className="form-checkbox"
                    />
                    <span className="ml-2">{privilege.charAt(0).toUpperCase() + privilege.slice(1)}</span>
                  </label>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUserPrivileges;
