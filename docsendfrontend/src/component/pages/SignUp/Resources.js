import React from 'react';
import { Link } from 'react-router-dom';

const Resources = () => {
  const resources = [
    {
      id: 1,
      title: 'How to Send Your First Document',
      description: 'A step-by-step guide to sending documents securely with our service.',
      link: '/guides/send-document'
    },
    {
      id: 2,
      title: 'Understanding Digital Signatures',
      description: 'Learn what digital signatures are and why they are crucial for your business.',
      link: '/guides/digital-signatures'
    },
    {
      id: 3,
      title: 'Document Management Best Practices',
      description: 'Optimize your workflow with these document management tips.',
      link: '/guides/document-management'
    },
    // More resources...
  ];

  return (
    <div className="container mb-60 mt-20 mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Resources to Get You Started</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-3">{resource.title}</h2>
            <p className="mb-5">{resource.description}</p>
            <Link to={resource.link} className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out">
              Learn More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
