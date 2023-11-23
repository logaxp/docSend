import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faExchangeAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Agent = () => {
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [transferTo, setTransferTo] = useState('');

    const otherAgents = [
        { id: 1, name: 'Agent A' },
        { id: 2, name: 'Agent B' },
        // ... other agents
      ];
    
      const handleCustomerChange = (e) => {
        setSelectedCustomer(e.target.value);
      };
    
      const handleTransferChange = (e) => {
        setTransferTo(e.target.value);
      };
    
      const handleTransfer = () => {
        // Logic to transfer the customer
        console.log(`Transferring customer ${selectedCustomer} to ${transferTo}`);
        // Reset state
        setSelectedCustomer('');
        setTransferTo('');
      };
    
  // Example data - replace with real data from your backend
  const myCustomers = [
    { id: 1, name: 'kriss David', email: 'john@example.com', type: 'Assigned' },
    { id: 2, name: 'Jude Agboe', email: 'jane@example.com', type: 'Transferred' },
    { id: 3, name: 'Bob Johnson', email: 'bob@gmail.com', type: 'Direct' },

    // ... other customers
  ];

  const pendingDocs = [
    { id: 1, name: 'Health Insurance Application', dueDate: '2023-11-30' },
    { id: 2, name: 'Vehicle Insurance Renewal', dueDate: '2023-12-15' },
    // ... other pending documents
  ];
 
  const handleManageClient = function(){
    console.log("Manage Client");
  }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Agent Dashboard</h1>
      
      {/* My Customers Section */}
      <section className="mb-6">
        <h3 className="text-2xl text-center font-semibold mb-4">Clients</h3>
        <div className="mb-4">
          <Link to="/create-customer" className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center">
            <FontAwesomeIcon icon={faPlus} className="mr-2" />
            Add Clients
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Type</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {myCustomers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{customer.name}</td>
                  <td className="py-3 px-6 text-left">{customer.email}</td>
                    <td className="py-3 px-6 text-left">{customer.type}</td>
                  <td className="py-3 px-6 text-center">
                    <FontAwesomeIcon icon={faExchangeAlt} className="text-blue-500 cursor-pointer mr-2" title="Transfer Customer" />
                    {/* Add more action icons as needed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Pending Documents Section */}
      <section className="mb-6">
        <h3 className="text-2xl font-semibold mb-4">Pending Documents</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Document Name</th>
                <th className="py-3 px-6 text-left">Due Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {pendingDocs.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{doc.name}</td>
                  <td className="py-3 px-6 text-left">{doc.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    {/* Transfer Customer Section */}
    <section className="mb-6">
  <h1 className="text-2xl font-semibold mb-4">Transfer Client | Manage Client</h1>
  <div className="flex flex-wrap gap-4 mb-4">
    <select 
      value={selectedCustomer} 
      onChange={handleCustomerChange} 
      className="border p-2 rounded-lg w-64"
    >
      <option value="">Select Customer</option>
      {myCustomers.map((customer) => (
        <option key={customer.id} value={customer.id}>{customer.name}</option>
      ))}
    </select>
    <select 
      value={transferTo} 
      onChange={handleTransferChange} 
      className="border p-2 rounded-lg w-64"
    >
      <option value="">Transfer To</option>
      {otherAgents.map((agent) => (
        <option key={agent.id} value={agent.id}>{agent.name}</option>
      ))}
      <option value="agency">Agency</option>
    </select>
    <button onClick={handleTransfer} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
      Transfer
    </button>
    {/* Manage Client Button */}
    <button 
      onClick={handleManageClient} // Add your logic to manage the client
      className="bg-green-600 text-white px-4 py-2 rounded-lg"
    >
      Manage Client
    </button>
  </div>
</section>

      {/* Additional features and functionalities can be added here */}
    </div>
  );
};

export default Agent;
