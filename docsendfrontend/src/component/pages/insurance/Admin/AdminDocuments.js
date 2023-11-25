


import React, { useState } from 'react';
import { faTrashAlt, faUserShield, faHistory, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ManageUserDocumentPrivileges from './ManageUserDocumentPrivileges';
// Additional imports for Modal and other utilities

const AdminDocuments = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: 'Mortgage Agreement', status: 'General', version: 'v1.0', owner: 'Khalid Abel' },
    { id: 2, title: 'Insurance Claims', status: 'Sensitive', version: 'v2.0', owner: 'Jude Ofa' },
    { id: 3, title: 'Power Attorney', status: 'General', version: 'v1.0', owner: 'Mark Chris' },
    // ...other documents
  ]);

  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  // Functions for various actions
  const handleDelete = (documentId) => {/* ... */};
  const handleChangeSensitivity = (documentId, sensitivity) => {/* ... */};
  const handleTrackChanges = (documentId) => {/* ... */};
  const handleManageAccess = (documentId) => {/* ... */};

  // Modal function for change sensitivity
  const openChangeModal = (document) => {
    setSelectedDocument(document);
    setIsChangeModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsChangeModalOpen(false);
    setSelectedDocument(null);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 mt-10 mb-40">
    <h1 className="text-2xl font-bold mb-6">Document Management</h1>
    <table className="min-w-full leading-normal mb-20">
      <thead className="bg-gray-500 text-white">
        <tr className="text-left">
          <th>Title</th>
          <th>Status</th>
          <th>Version</th>
          <th>Owner</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {documents.map((doc) => (
          <tr key={doc.id} className="border-b">
            <td>{doc.title}</td>
            <td>{doc.status}</td>
            <td>{doc.version}</td>
            <td>{doc.owner}</td>
            <td>
              <button onClick={() => handleTrackChanges(doc.id)} className="text-blue-500 hover:text-blue-700 ml-4">
                <FontAwesomeIcon icon={faHistory} className="mr-2" />Track Changes
              </button>
              <button onClick={() => handleManageAccess(doc.id)} className="text-blue-500 hover:text-blue-700 ml-4">
                <FontAwesomeIcon icon={faUserCog} className="mr-2" />Manage Access
              </button>
              <button onClick={() => openChangeModal(doc)} className="text-blue-500 hover:text-blue-700 ml-2">
                <FontAwesomeIcon icon={faUserShield} className="mr-4" />Mark as Sensitive
              </button>
              <button onClick={() => handleDelete(doc.id)} className="text-red-500 hover:text-red-700 ml-4">
                <FontAwesomeIcon icon={faTrashAlt} className="mr-2" />Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Change Sensitivity Modal */}
    {isChangeModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-5">
            <h2 className="text-xl font-bold mb-4">Change Sensitivity: {selectedDocument?.title}</h2>
            <div className="mb-4">
              <label className="block mb-2">Select Sensitivity Level:</label>
              <select className="border-2 p-2 rounded-lg w-full" onChange={(e) => handleChangeSensitivity(selectedDocument.id, e.target.value)}>
                <option value="general">General</option>
                <option value="sensitive">Sensitive</option>
                <option value="encrypted">Encrypted</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button onClick={closeModal} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2">
                Cancel
              </button>
              <button onClick={() => handleChangeSensitivity(selectedDocument.id, 'newSensitivity')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
       <ManageUserDocumentPrivileges />
      {/* Other modals for track changes, manage access, etc. */}
    </div>
  );
};

export default AdminDocuments;