import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { faEdit, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Return } from '../../../assets/images/return.svg';
import { Link } from 'react-router-dom';

const ListCustomer = () => {
  const navigate = useNavigate();
  const customers = [
    { id: 1, name: 'Riley Adebajo', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Eniola Bajo', email: 'jane@example.com', phone: '098-765-4321' }
  ];
const handleReturn = () => {
    navigate(-1);
  }
  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Customers List</h1>
      <button
        onClick={handleReturn}
        className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
      >
        < Return className="w-6 h-6 inline-block mr-2" />
      </button>
      </div>
    <hr className="mb-6" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{customer.name}</td>
                <td className="py-3 px-6 text-left">{customer.email}</td>
                <td className="py-3 px-6 text-left">{customer.phone}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link to={`/customers/${customer.id}`} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/edit-customer/${customer.id}`} className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <Link to={`/delete-customer/${customer.id}`} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </Link>
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

export default ListCustomer;
