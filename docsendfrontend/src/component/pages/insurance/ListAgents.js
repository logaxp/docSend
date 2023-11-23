import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Return } from '../../../assets/images/return.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const ListAgents = () => {

    const navigate = useNavigate();
  // Sample data for agents
  const agents = [
    { id: 1, name: 'Ebuka David', email: 'ebukaedavid@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Janet Ogah', email: 'janets@example.com', phone: '234-567-8901' },
    // ... more agents
  ];

  const handleReturn = () => {
    navigate(-1);
  }

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Agents List</h1>
            <button 
            onClick = {handleReturn}
            className="bg-green-100 hover:bg-green-200 text-green-800 font-bold py-2 px-4 rounded"
            >
                < Return className="w-6 h-6 inline-block mr-2" />
            </button>
     
    </div>
        <hr className="mb-6" />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {agents.map((agent) => (
              <tr key={agent.id} className="border-b hover:bg-gray-100">
                <td className="py-3 px-6 text-left">{agent.name}</td>
                <td className="py-3 px-6 text-left">{agent.email}</td>
                <td className="py-3 px-6 text-left">{agent.phone}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <Link to={`/agents/${agent.id}/view`} className="w-4 mr-2 transform hover:text-blue-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    <Link to={`/agents/${agent.id}/edit`} className="w-4 mr-2 transform hover:text-yellow-500 hover:scale-110">
                      <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <Link to={`/agents/${agent.id}/delete`} className="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
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

export default ListAgents;
