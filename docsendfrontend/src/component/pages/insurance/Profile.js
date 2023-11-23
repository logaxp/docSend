import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSave, faLock, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let navigate = useNavigate();

  // Example initial user data
  const [user, setUser] = useState({
    name: 'Chris Adebajo',
    email: 'chris@example.com',
    phoneNumber: '123-456-7890',
    // Add other profile fields here
  });

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Replace with your actual logic for profile picture upload
  const handleProfilePictureUpload = (event) => {
    console.log('Uploaded file:', event.target.files[0]);
  };

  // Handles form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Replace with your actual logic for updating user password
  const handlePasswordChange = () => {
    if (newPassword === confirmPassword) {
      console.log('Password updated to:', newPassword);
      // Implement the API call for password update
    } else {
      console.error('Passwords do not match!');
    }
  };

  // Replace with your actual logic for deactivating account
  const handleDeactivateAccount = () => {
    console.log('Account deactivation initiated for user:', user.email);
    // Implement the API call for account deactivation
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your update logic here
    console.log('Updated user:', user);
    navigate('/'); // Navigate to another route if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-6">Profile Settings</h2>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 mb-6 md:mb-0 md:mr-6">
          <FontAwesomeIcon icon={faUserCircle} size="10x" className="block mx-auto mb-4" />
          <input
            type="file"
            onChange={handleProfilePictureUpload}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                className="w-full border-2 p-2 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="w-full border-2 p-2 rounded-lg"
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 text-gray-700">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={user.phoneNumber}
                onChange={handleChange}
                className="w-full border-2 p-2 rounded-lg"
              />
            </div>
            {/* Add more input fields as needed */}
            <div className="text-right">
              <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <FontAwesomeIcon icon={faSave} className="mr-2" />
                Save Changes
              </button>
            </div>
          </form>
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Change Password</h3>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              className="border-2 p-2 rounded-lg mr-2"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="border-2 p-2 rounded-lg"
            />
            <button
              onClick={handlePasswordChange}
              className="ml-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              <FontAwesomeIcon icon={faLock} className="mr-2" />
              Update Password
            </button>
          </div>
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <button
              onClick={handleDeactivateAccount}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <FontAwesomeIcon icon={faUserSlash} className="mr-2" />
              Deactivate Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
