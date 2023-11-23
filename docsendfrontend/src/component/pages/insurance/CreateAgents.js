import React, { useState } from 'react';
 import { useNavigate } from 'react-router-dom';
 import { ReactComponent as Return } from '../../../assets/images/return.svg';

const CreateAgents = () => {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    agentName: '',
    email: '',
    address: '',
    companyName: '',
    npn: '',
    phone: '',
    website: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form data here
    console.log('Form Submitted:', formData);
    // Clear form or navigate to another page as required
  };

    const handleReturn = () => {
        navigate(-1);
    };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Create Agent</h1>
        <button 
          onClick={handleReturn} 
          className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
        >
            <Return className="w-6 h-6 inline-block mr-2" />
        </button>
      </div>
    <hr className="mb-6" />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Agent Name */}
          <div>
            <label htmlFor="agentName" className="block mb-2">Agent Name</label>
            <input
              type="text"
              id="agentName"
              name="agentName"
              value={formData.agentName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>
          
          {/* Address */}
          <div>
            <label htmlFor="address" className="block mb-2">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Company Name */}
          <div>
            <label htmlFor="companyName" className="block mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>

          {/* NPN */}
          <div>
            <label htmlFor="npn" className="block mb-2">NPN</label>
            <input
              type="text"
              id="npn"
              name="npn"
              value={formData.npn}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block mb-2">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block mb-2">Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Create Agent
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAgents;
