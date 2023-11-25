import React, { useState } from 'react';

const AdminTools = () => {
    const initialTools = [
        { id: 1, name: 'User Analysis', description: 'Deep dive into user behaviors and patterns.' },
        { id: 2, name: 'Data Export', description: 'Export data in various formats for reporting.' },
        { id: 3, name: 'System Health Check', description: 'Perform routine checks on system performance.' },
        { id: 4, name: 'Content Moderation', description: 'Manage and moderate user-generated content.' },
        { id: 5, name: 'User Segmentation', description: 'Create user segments based on specific criteria.' },
        { id: 6, name: 'A/B Testing', description: 'Run A/B tests to optimize website elements.' },
        { id: 7, name: 'Performance Monitoring', description: 'Track website performance and identify bottlenecks.' },
        { id: 8, name: 'Security Monitoring', description: 'Monitor website security and detect potential threats.' },
        { id: 9, name: 'Spam Filtering', description: 'Filter out spam emails and comments.' },
        { id: 10, name: 'User Role Management', description: 'Create and manage user roles with different permissions.' },
      ];
      

    const [tools, setTools] = useState(initialTools.slice(0, 6)); // Display only first 6 tools initially
    const [searchTerm, setSearchTerm] = useState('');

    // Handle search
    const handleSearch = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchTerm(query);

        if (query === '') {
            setTools(initialTools.slice(0, 6)); // Reset to initial state
        } else {
            const filteredTools = initialTools.filter(tool => 
                tool.name.toLowerCase().includes(query) || 
                tool.description.toLowerCase().includes(query)
            );
            setTools(filteredTools);
        }
    };

    // Function to handle tool selection
    const handleToolSelection = (toolId) => {
        console.log(`Selected tool ID: ${toolId}`);
        // Implement tool selection logic here
    };

    return (
        <div className="container mx-auto p-4 mb-40">
            <h1 className="text-3xl font-semibold mb-6">Admin Tools</h1>
            
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search tools..."
                value={searchTerm}
                onChange={handleSearch}
                className="mb-4 p-2 border rounded w-full"
            />

            <div className="grid md:grid-cols-3 gap-4">
                {tools.map(tool => (
                    <div key={tool.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
                        <h2 className="text-xl font-bold mb-2">{tool.name}</h2>
                        <p className="text-gray-600">{tool.description}</p>
                        <button 
                            onClick={() => handleToolSelection(tool.id)}
                            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Use Tool
                        </button>
                    </div>
                ))}
            </div>

            {tools.length === 0 && <p className="text-center text-gray-600 mt-4">No tools found.</p>}
        </div>
    );
};

export default AdminTools;
