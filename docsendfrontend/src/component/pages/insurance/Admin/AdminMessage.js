import React, { useState } from 'react';

const AdminMessages = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'Godwin Les', subject: 'Feedback on DocSend', received: '2023-03-15', content: 'I really enjoy using DocSend...' },
        { id: 2, sender: 'Peter bug', subject: 'Issue with Signing', received: '2023-03-14', content: 'I encountered an issue when...' },
        { id: 1, sender: 'Friday Henry', subject: 'Feedback on DocSend', received: '2023-03-15', content: 'I really enjoy using DocSend...' },
        { id: 2, sender: 'Page Cole', subject: 'Issue with Signing', received: '2023-03-14', content: 'I encountered an issue when...' },
        // Add more messages
    ]);

    // Function to handle message actions like delete, reply etc.
    const handleAction = (action, messageId) => {
        console.log(`Action: ${action}, on message ID: ${messageId}`);
        // Implement logic based on action (e.g., delete, reply)
    };

    return (
        <div className="container max-w-5xl mx-auto p-4 mb-40">
            <h1 className="text-3xl font-semibold mb-6">Admin Messages</h1>
            <div className="messages-list">
                {messages.map((message) => (
                    <div key={message.id} className="bg-white p-4 shadow rounded-lg mb-4">
                        <h2 className="text-xl font-bold">{message.subject}</h2>
                        <p className="text-gray-600">
                            From: {message.sender} - {message.received}
                        </p>
                        <p className="my-2">{message.content}</p>
                        <div className="flex space-x-2">
                            <button onClick={() => handleAction('reply', message.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Reply
                            </button>
                            <button onClick={() => handleAction('delete', message.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                Delete
                            </button>
                            {/* Add more buttons for other actions */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminMessages;
