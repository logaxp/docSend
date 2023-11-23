import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SendForm = () => {
  const [customer, setCustomer] = useState('');
  const [template, setTemplate] = useState('');
  const [sendMethod, setSendMethod] = useState('email');
  const [sendTime, setSendTime] = useState('now');
  const [otherAgent, setOtherAgent] = useState('no');

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
      <div className="mb-4">
  <div className="flex justify-center items-center">
    <div className="mr-10">
      <label className="block">Select Method to Send:</label>
    </div>
    <div className="flex">
      <div className="flex items-center mr-10">
        <input
          type="radio"
          name="sendMethod"
          value="email"
          checked={sendMethod === 'email'}
          onChange={() => setSendMethod('email')}
          className="form-radio mr-2"
        />
        <label>E-Mail</label>
      </div>
      <div className="flex items-center mr-10">
        <input
          type="radio"
          name="sendMethod"
          value="sms"
          checked={sendMethod === 'sms'}
          onChange={() => setSendMethod('sms')}
          className="form-radio mr-2"
        />
        <label>SMS</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          name="sendMethod"
          value="both"
          checked={sendMethod === 'both'}
          onChange={() => setSendMethod('both')}
          className="form-radio mr-2"
        />
        <label>Both</label>
      </div>
    </div>
  </div>
</div>
<div className="mb-4">
  <div className="flex justify-center items-center">
    <div className="mr-10">
      <label className="block">Choose Document Send Time?</label>
    </div>
    <div className="flex">
      <div className="flex items-center mr-10">
        <input
          type="radio"
          name="sendTime"
          value="now"
          checked={sendTime === 'now'}
          onChange={() => setSendTime('now')}
          className="form-radio mr-2"
        />
        <label>Now</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          name="sendTime"
          value="later"
          checked={sendTime === 'later'}
          onChange={() => setSendTime('later')}
          className="form-radio mr-2"
        />
        <label>Later</label>
      </div>
    </div>
  </div>
</div>

<div className="mb-12">
  <div className="flex justify-center items-center">
    <div className="mr-10">
      <label className="block">Include Another Agent?</label>
    </div>
    <div className="flex">
      <div className="flex items-center mr-10">
        <input
          type="radio"
          name="otherAgent"
          value="yes"
          checked={otherAgent === 'yes'}
          onChange={() => setOtherAgent('yes')}
          className="form-radio mr-2"
        />
        <label>Yes</label>
      </div>
      <div className="flex items-center">
        <input
          type="radio"
          name="otherAgent"
          value="no"
          checked={otherAgent === 'no'}
          onChange={() => setOtherAgent('no')}
          className="form-radio mr-2"
        />
        <label>No</label>
      </div>
    </div>
  </div>
</div>
      <div className="flex justify-center mt-6">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default SendForm;
