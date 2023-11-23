import React, { useState } from 'react';
import Logo from '../../../assets/images/logo.png';

const Settings = () => {
  const [formData, setFormData] = useState({
    agentName: '',
    email: '',
    address: '',
    companyName: '',
    npn: '',
    phone: '',
    website: '',
    subscription: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic
    console.log(formData);
  };

  return (
    <div className="container mx-auto p-10 max-w-5xl bg-slate-50 ">
        <h1 className="text-xl font-bold mb-4">Settings</h1>
        <div className="border-b mb-8" ></div>
      <form onSubmit={handleSubmit}>
      <div className="flex gap-4 mb-4">
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agentName">
            Agent Name
          </label>
          <input
            id="agentName"
            name="agentName"
            type="text"
            value={formData.agentName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        
        {/* ... */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        {/* ... */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        </div>
        {/* ... */}
        <div className="flex gap-4 mb-4">
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
            Company Name
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formData.companyName}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        {/* ... */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="npn">
            NPN
          </label>
          <input
            id="npn"
            name="npn"
            type="text"
            value={formData.npn}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        {/* ... */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        </div>
        {/* ... */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="website">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            value={formData.website}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        {/* ... */}
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save changes
          </button>
        </div>
        <div className="mb-4">
          {/* Image and subscription details */}
          <div className="flex justify-between items-center">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">Your Subscription</h3>
                <p className="text-gray-600">Plan: <span className="font-bold text-gray-800">Pro Plan</span></p>
                <p className="text-gray-600">Duration: <span className="font-bold text-gray-800">10/16/23 to 11/16/23</span></p>
            </div>
            <div className="flex items-center justify-end">
                <button 
                className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => alert('Cancel Subscription')}
                >
                Cancel Subscription
                </button>
            </div>
            </div>
          <img src={Logo} alt="Company Logo" className="h-20 w-20" />
          </div>
        </div>
      </form>
      {/* Add password change form */}
      <form onSubmit={() => alert('Password changed')}>
        <h3 className="text-xl font-bold mb-4">Change Password</h3>
        <div className="border-b mb-8" ></div>
        <div className="flex gap-4 mb-4">
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentPassword">
            Current Password
          </label>
          <input
            id="currentPassword"
            name="currentPassword"
            type="password"
            placeholder="Type here your current password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type="password"
            placeholder="Type here a password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        {/* ... */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            required
          />
        </div>
        </div>
        {/* ... */}
        <div className="mb-4">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Change password
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
