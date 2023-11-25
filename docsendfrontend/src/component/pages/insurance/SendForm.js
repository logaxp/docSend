import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SendForm = () => {
  const [customer, setCustomer] = useState('');
  const [template, setTemplate] = useState('');
  const [sendMethod, setSendMethod] = useState('email');
  const [sendTime, setSendTime] = useState('now');
  const [otherAgent, setOtherAgent] = useState('no');
  const [permissionType, setPermissionType] = useState('general');
  const [encryptionEnabled, setEncryptionEnabled] = useState(false);
  const [sensitiveDataHandling, setSensitiveDataHandling] = useState(false);

  // Dummy data for customers and templates dropdowns
  const customers = ['John Doe', 'Jane Smith', 'Other'];
  const templates = ['Template 1', 'Template 2', 'Template 3'];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto my-10">
        <h1 className="text-xl font-bold mb-4 text-center">Send DocCenter form</h1>
        <div className="border-b"></div>
      <h2 className="text-2xl font-bold mb-4 text-center">Send DocCenter form</h2>
      <div className="mb-4">
        <select
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Customer</option>
          {customers.map((cust, idx) => (
            <option key={idx} value={cust}>
              {cust}
            </option>
          ))}
        </select>
        <Link to="/add-new-customer">
        <button className="mt-2 text-blue-600 hover:text-blue-800">Register New Customer.</button>
        </Link>
      </div>
      <div className="mb-4">
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Template</option>
          {templates.map((temp, idx) => (
            <option key={idx} value={temp}>
              {temp}
            </option>
          ))}
        </select>
      </div>
   
<div className="container mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">Document Send Settings</h2>
      <form className="space-y-4">

        {/* Send Method */}
        <div className="flex items-center">
          <label className="w-40 font-semibold">Select Method:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="sendMethod" value="email" checked={sendMethod === 'email'} onChange={() => setSendMethod('email')} />
              <span>E-Mail</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="sendMethod" value="sms" checked={sendMethod === 'sms'} onChange={() => setSendMethod('sms')} />
              <span>SMS</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="sendMethod" value="both" checked={sendMethod === 'both'} onChange={() => setSendMethod('both')} />
              <span>Both</span>
            </label>
          </div>
        </div>

        {/* Send Time */}
        <div className="flex items-center">
          <label className="w-40 font-semibold">Doc Send Time:</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="sendTime" value="now" checked={sendTime === 'now'} onChange={() => setSendTime('now')} />
              <span>Now</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="sendTime" value="later" checked={sendTime === 'later'} onChange={() => setSendTime('later')} />
              <span>Later</span>
            </label>
          </div>
        </div>

        {/* Include Another Agent */}
        <div className="flex items-center">
          <label className="w-40 font-semibold">Include  Agent?</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="otherAgent" value="yes" checked={otherAgent === 'yes'} onChange={() => setOtherAgent('yes')} />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="otherAgent" value="no" checked={otherAgent === 'no'} onChange={() => setOtherAgent('no')} />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Document Permission Options */}
        <div className="flex items-center">
          <label className="w-40 font-semibold">Permission Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="permissionType" value="general" checked={permissionType === 'general'} onChange={() => setPermissionType('general')} />
              <span>General</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="permissionType" value="sensitive" checked={permissionType === 'sensitive'} onChange={() => setPermissionType('sensitive')} />
              <span>Sensitive</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="permissionType" value="encrypted" checked={permissionType === 'encrypted'} onChange={() => setPermissionType('encrypted')} />
              <span>Encrypted</span>
            </label>
          </div>
        </div>

       {/* Advanced Security Settings */}
      <div className="flex items-center">
        <label className="w-40 font-semibold">Advanced Security</label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={encryptionEnabled}
              onChange={() => setEncryptionEnabled(!encryptionEnabled)}
              className="form-checkbox"
            />
            <span>Enable Advanced Encryption</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={sensitiveDataHandling}
              onChange={() => setSensitiveDataHandling(!sensitiveDataHandling)}
              className="form-checkbox"
            />
            <span>Handle as Sensitive Data</span>
          </label>
        </div>
      </div>


        {/* Submit Button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
            Send Document
          </button>
        </div>

      </form>
    </div>
    </div>
  );
};

export default SendForm;
