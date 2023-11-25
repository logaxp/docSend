import React, { useState, useEffect } from 'react';

const AdminDataManagement = () => {
    const [dataEntries, setDataEntries] = useState([
        { id: 1, name: 'Agreement', type: 'Report', dateCreated: '2023-03-15', status: 'Active' },
        { id: 2, name: 'Music Contract', type: 'Analysis', dateCreated: '2023-03-14', status: 'Inactive' },
        { id: 3, name: 'Offer letter', type: 'Report', dateCreated: '2023-03-15', status: 'Active' },
        { id: 4, name: 'Lease ', type: 'Analysis', dateCreated: '2023-03-14', status: 'Inactive' },
        { id: 5, name: 'Document access', type: 'Report', dateCreated: '2023-03-15', status: 'Active' },
        { id: 6, name: 'Keys Taken', type: 'Analysis', dateCreated: '2023-03-14', status: 'Inactive' },
        // More data entries
    ]);


    const [filteredEntries, setFilteredEntries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const entriesPerPage = 6;

    useEffect(() => {
        const filtered = searchTerm
            ? dataEntries.filter(entry =>
                entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                entry.type.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : dataEntries;

        setFilteredEntries(filtered);
    }, [searchTerm, dataEntries]);

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to handle actions like edit, delete
    const handleAction = (action, entryId) => {
        console.log(`Action: ${action}, on entry ID: ${entryId}`);
        // Implement logic based on action
    };

    return (
        <div className="container mx-auto p-4 bg-slate-50 mb-40 mt-4">
            <h1 className="text-3xl font-semibold mb-4">Data Management</h1>
            <input
                type="text"
                placeholder="Search data..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />
            <table className="min-w-full table-auto">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Date Created</th>
                        <th className="px-4 py-2">Status</th>
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEntries.map((entry) => (
                        <tr key={entry.id}>
                            <td className="border px-4 py-2">{entry.name}</td>
                            <td className="border px-4 py-2">{entry.type}</td>
                            <td className="border px-4 py-2">{entry.dateCreated}</td>
                            <td className="border px-4 py-2">{entry.status}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => handleAction('edit', entry.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleAction('delete', entry.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination flex justify-center mt-4">
                {Array.from({ length: Math.ceil(filteredEntries.length / entriesPerPage) }, (_, index) => (
                    <button key={index} onClick={() => paginate(index + 1)} className={`px-3 py-1 border ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white'} rounded mx-1`}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AdminDataManagement;