import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes, faEye } from '@fortawesome/free-solid-svg-icons';

const DocumentVersioning = () => {
  // Example data for document versioning
  const documentVersions = [
    {
      id: 1,
      document: 'Contract Agreement',
      version: 'v1.2',
      editedBy: 'Alice Johnson',
      dateModified: '2022-07-15',
      changes: 'Updated terms section'
    },
    {
      id: 2,
      document: 'NDA Document',
      version: 'v1.1',
      editedBy: 'Bob Smith',
      dateModified: '2022-07-12',
      changes: 'Added confidentiality clause'
    },
    {
      id: 3,
      document: 'Employment Contract',
      version: 'v2.0',
      editedBy: 'Charlie Doe',
      dateModified: '2022-07-18',
      changes: 'Revision of employment benefits'
    },
    // ...other version histories
  ];

  return (
    <div className="container mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Document Versioning</h1>
      <table className="min-w-full leading-normal">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Document
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Version
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Edited By
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Date Modified
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Changes
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {documentVersions.map((version) => (
            <tr key={version.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {version.document}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {version.version}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {version.editedBy}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {version.dateModified}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {version.changes}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex items-center">
                <button className="text-blue-600 hover:text-blue-900 mr-3">
                  <FontAwesomeIcon icon={faEye} className="mr-1" />View
                </button>
                <button className="text-green-600 hover:text-green-900 mr-3">
                  <FontAwesomeIcon icon={faEdit} className="mr-1" />Edit
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FontAwesomeIcon icon={faTimes} className="mr-1" />Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocumentVersioning;
