import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilePdf, faEye } from '@fortawesome/free-solid-svg-icons';

const Customers = () => {
  // This would be your state or data fetching logic for customers
  const customers = [
    {
      template: 'Consent to Search In The Marketplace (EDE) English',
      email: 'rkbooster949@gmail.com',
      name: 'mathew smith',
      sentOn: 'Oct 27th, 12:34 am',
      sentVia: 'E-Mail',
      otherAgent: 'no',
      status: 'signed on Oct 27th, 12:36 am',
    },
    {
        template: 'Marketplace consent to Search  (EDE) Spanish',
        email: 'grace@gmail.com',
        name: 'Grace English',
        sentOn: 'Oct 27th, 12:34 am',
        sentVia: 'SMS',
        otherAgent: 'no',
        status: 'signed on April 21th, 18:36 pm',
        },
    {
        template: 'Marketplace consent to Search  (EDE) Spanish',
        email: 'email@test.com',
        name: 'Francis Ibadan ',
        sentOn: 'Oct 27th, 12:34 am',
        sentVia: 'Both SMS and E-Mail',
        otherAgent: 'yes',
        status: 'signed on April 21th, 18:36 pm',
        }
  ];

  return (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-700 pb-2 mb-8 border-b border-gray-200">
    Customers
    </h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
            All Customers
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-lg">
            All Doc's
          </button>
        </div>
        <div className="flex space-x-2">
          <FontAwesomeIcon icon={faSearch} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search here..."
            className="border p-2 rounded-lg"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Template</th>
              <th className="py-3 px-6 text-left">Customer E-Mail</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Sent on</th>
              <th className="py-3 px-6 text-left">Sent via</th>
              <th className="py-3 px-6 text-left">Other agent</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {customers.map((customer, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {customer.template}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.email}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.name}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.sentOn}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.sentVia}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.otherAgent}
                </td>
                <td className="py-3 px-6 text-left">
                  {customer.status}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FontAwesomeIcon icon={faFilePdf} />
                    </div>
                    <div className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEye} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
