import React, { useState } from 'react';

const AddNewCustomer = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    state: '',
    phone: '',
    email: '',
    template: '',
    sendVia: '',
    sendTime: 'now',
    otherAgent: 'no',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the form data
    console.log(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
  <div className="flex justify-between items-center mb-4">
    <h1 className="text-xl font-bold">Add New Customer</h1>
    <button 
      onClick={() => window.history.back()}
      className="text-blue-600 hover:text-blue-800 transition duration-300"
    >
      Return to Page
    </button>
  </div>
  <div className="border-b mb-8"></div>
      <form onSubmit={handleSubmit}>
      <div className="flex gap-4 mb-4">
    {/* First Name Field */}
    <div className="flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
        First Name
      </label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={handleInputChange}
        value={formData.firstName}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
    
    {/* Last Name Field */}
    <div className="flex-1">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
        Last Name
      </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={handleInputChange}
        value={formData.lastName}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required
      />
    </div>
  </div>
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
            </label>
            <input
                id="address"
                name="address"
                type="text"
                onChange={handleInputChange}
                value={formData.address}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </div>
        <div className="flex gap-4 mb-4">
        <div className="mb-4 flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
                State
            </label>
            <input
                id="state"
                name="state"
                type="text"
                onChange={handleInputChange}
                value={formData.state}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </div>
        <div className="mb-4 flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone
            </label>
            <input
                id="phone"
                name="phone"
                type="text"
                onChange={handleInputChange}
                value={formData.phone}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </div>
        </div>
        <div className="flex gap-4 mb-4">
        <div className="mb-4 flex-1">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
            </label>
            <input
                id="email"
                name="email"
                type="text"
                onChange={handleInputChange}
                value={formData.email}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
            />
        </div>
        {/* Dropdown for template selection */}
        <div className="mb-4 flex-1">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="template">
            Select Template
          </label>
          <select
            id="template"
            name="template"
            onChange={handleInputChange}
            value={formData.template}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a template...</option>
            <option value="template1">Template 1</option>
            <option value="template2">Template 2</option>
            <option value="template3">Template 3</option>
          </select>
        </div>
        </div>
        <div className="flex flex-col items-center mb-8">
    {/* Radio buttons for send via */}
    <div className="flex justify-start items-center w-full mb-4">
        <label className="w-1/3 text-left text-gray-700 text-sm font-bold">Select Method to Send:</label>
        <div className="flex justify-start items-center w-2/3">
            <label className="inline-flex items-center mr-4">
                <input
                    type="radio"
                    name="sendVia"
                    value="email"
                    checked={formData.sendVia === 'email'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">E-Mail</span>
            </label>
            <label className="inline-flex items-center mr-4">
                <input
                    type="radio"
                    name="sendVia"
                    value="sms"
                    checked={formData.sendVia === 'sms'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">SMS</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="sendVia"
                    value="both"
                    checked={formData.sendVia === 'both'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">Both</span>
            </label>
        </div>
    </div>

    {/* Options for When to send Document */}
    <div className="flex justify-start items-center w-full mb-4">
        <label className="w-1/3 text-left text-gray-700 text-sm font-bold">Choose Document Send Time:</label>
        <div className="flex justify-start items-center w-2/3">
            <label className="inline-flex items-center mr-4">
                <input
                    type="radio"
                    name="sendTime"
                    value="now"
                    checked={formData.sendTime === 'now'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">Now</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="sendTime"
                    value="later"
                    checked={formData.sendTime === 'later'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">Later</span>
            </label>
        </div>
    </div>

    {/* Options for Other agent */}
    <div className="flex justify-start items-center w-full">
        <label className="w-1/3 text-left text-gray-700 text-sm font-bold">Include Another Agent?</label>
        <div className="flex justify-start items-center w-2/3">
            <label className="inline-flex items-center mr-4">
                <input
                    type="radio"
                    name="otherAgent"
                    value="yes"
                    checked={formData.otherAgent === 'yes'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">Yes</span>
            </label>
            <label className="inline-flex items-center">
                <input
                    type="radio"
                    name="otherAgent"
                    value="no"
                    checked={formData.otherAgent === 'no'}
                    onChange={handleInputChange}
                    className="form-radio"
                />
                <span className="ml-2">No</span>
            </label>
        </div>
    </div>
</div>


        {/* Submit button */}
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Cancel
            </button>
        </div>
      </form>
    </div>
    );
};

export default AddNewCustomer;
