

import React, { useState, useEffect } from 'react';


const ManageUserDocumentPrivileges = () => {
  const [userDocuments, setUserDocuments] = useState([
    { id: 1, documentName: 'Annual Report', userName: 'Patience Adebajo', accessLevel: 'Read' },
    { id: 2, documentName: 'Project Plan', userName: 'John Benson', accessLevel: 'Edit' },
    { id: 3, documentName: 'Budget Review', userName: 'Emmnuel Oga', accessLevel: 'Read' },
    { id: 4, documentName: 'Copre Templates', userName: 'krissbajo', accessLevel: 'CRUD'},
    { id: 5, documentName: 'Annual Report', userName: 'Patience Adebajo', accessLevel: 'Read' },
    { id: 6, documentName: 'Project Plan', userName: 'John Benson', accessLevel: 'Edit' },
    { id: 7, documentName: 'Budget Review', userName: 'Emmnuel Oga', accessLevel: 'Read' },
    { id: 8, documentName: 'Copre Templates', userName: 'krissbajo', accessLevel: 'CRUD'},
    { id: 9, documentName: 'Annual Report', userName: 'Patience Adebajo', accessLevel: 'Read' },
    { id: 10, documentName: 'Project Plan', userName: 'John Benson', accessLevel: 'Edit' },
    { id: 11, documentName: 'Budget Review', userName: 'Emmnuel Oga', accessLevel: 'Read' },
    { id: 12, documentName: 'Score Templates', userName: 'krissbajo', accessLevel: 'CRUD'},

    // Add more user documents as needed
  ]);


  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 10;

   // Filter documents based on the search term
   useEffect(() => {
    const filtered = userDocuments.filter(doc =>
      doc.documentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(filtered);
  }, [searchTerm, userDocuments]);

  // Handle access level changes
  const handleAccessLevelChange = (documentId, newAccessLevel) => {
    const updatedUserDocuments = userDocuments.map((doc) => {
      if (doc.id === documentId) {
        return { ...doc, accessLevel: newAccessLevel };
      }
      return doc;
    });
    setUserDocuments(updatedUserDocuments);
  };
  
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Manage User Document Privileges</h1>
      <input
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr className='hover:bg-white'>
            <th className="px-4 py-2 hover:bg-white">Document Name</th>
            <th className="px-4 py-2">User Name</th>
            <th className="px-4 py-2">Access Level</th>
          </tr>
        </thead>
        <tbody>
          {currentDocuments.map((doc) => (
            <tr key={doc.id}>
              <td className="border px-4 py-2">{doc.documentName}</td>
              <td className="border px-4 py-2">{doc.userName}</td>
              <td className="border px-4 py-2">
                <select
                  value={doc.accessLevel}
                  onChange={(e) => handleAccessLevelChange(doc.id, e.target.value)}
                  className="form-select block w-full mt-1 border-gray-300"
                >
                  <option value="Read">Read</option>
                  <option value="Edit">Edit</option>
                  <option value="None">No Access</option>
                  <option value="CRUD">CRUD</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination ">
        {/* Render Pagination Buttons */}
        {Array.from({ length: Math.ceil(filteredDocuments.length / documentsPerPage) }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className="mr-2 p-2 border rounded bg-white">
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ManageUserDocumentPrivileges;
