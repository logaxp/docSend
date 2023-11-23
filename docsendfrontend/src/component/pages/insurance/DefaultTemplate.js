// DefaultTemplate.js
import React, { useState } from 'react';

const DefaultTemplate = () => {
  const allTemplates = [
    { id: 1, name: 'Insurance Document', description: 'Template for creating an insurance policy.' },
    { id: 2, name: 'Lease Agreement', description: 'Template for drafting a lease agreement.' },
    { id: 3, name: 'Healthcare Directive', description: 'Template for a living will or medical directive.' },
    { id: 4, name: 'Employment Contract', description: 'Template for an employment agreement.' },
    { id: 5, name: 'Mortgage Agreement', description: 'Template for a mortgage contract.' },
    { id: 6, name: 'Non-Disclosure Agreement', description: 'Template for an NDA.' },
    { id: 7, name: 'Non-Compete Agreement', description: 'Template for a non-compete agreement.' },
    { id: 8, name: 'Independent Contractor Agreement', description: 'Template for an independent contractor agreement.' },
    { id: 9, name: 'Bill of Sale', description: 'Template for a bill of sale.' },
    { id: 10, name: 'Loan Agreement', description: 'Template for a loan agreement.' },
    { id: 11, name: 'Promissory Note', description: 'Template for a promissory note.' },
    { id: 12, name: 'Partnership Agreement', description: 'Template for a partnership agreement.' },
    { id: 13, name: 'LLC Operating Agreement', description: 'Template for an LLC operating agreement.' },
    { id: 14, name: 'Independent Contractor Agreement', description: 'Template for an independent contractor agreement.' },
    { id: 15, name: 'Affidavit', description: 'Template for an affidavit.' },
    { id: 16, name: 'Model Release Form', description: 'Template for a model release form.' },
    { id: 17, name: 'Photo Release Form', description: 'Template for a photo release form.' },
    { id: 18, name: 'Photo Licensing Agreement', description: 'Template for a photo licensing agreement.' },
    { id: 19, name: 'Wedding Photography Contract', description: 'Template for a wedding photography contract.' },
    { id: 20, name: 'Event Photography Contract', description: 'Template for an event photography contract.' },
    { id: 21, name: 'Portrait Photography Contract', description: 'Template for a portrait photography contract.' },
    { id: 22, name: 'Commercial Photography Contract', description: 'Template for a commercial photography contract.' },
    { id: 23, name: 'Wedding Videography Contract', description: 'Template for a wedding videography contract.' },
    { id: 24, name: 'Event Videography Contract', description: 'Template for an event videography contract.' },
    { id: 25, name: 'Portrait Videography Contract', description: 'Template for a portrait videography contract.' },
  ];
 // Initialize visible templates with the first six from all templates
 const [visibleTemplates, setVisibleTemplates] = useState(allTemplates.slice(0, 6));
 const [searchTerm, setSearchTerm] = useState('');

 const handleSearchChange = (event) => {
   const value = event.target.value;
   setSearchTerm(value);
   if (value === '') {
     // Reset to initial six templates when search is cleared
     setVisibleTemplates(allTemplates.slice(0, 6));
   } else {
     // Filter and update visible templates based on search term
     const filteredTemplates = allTemplates.filter(template =>
       template.name.toLowerCase().includes(value.toLowerCase())
     );
     setVisibleTemplates(filteredTemplates.slice(0, 6));
   }
 };

 const handleView = (templateId) => {
   // Handle viewing the template detail
   console.log('View template with ID:', templateId);
 };

 return (
   <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mt-20 ">Explore Our Templates</h1>
     <div className="mb-10">
       <input
         type="text"
         value={searchTerm}
         onChange={handleSearchChange}
         placeholder="Search for a template..."
         className="border-2 border-gray-200 rounded-lg p-2 w-full"
       />
     </div>
     <div className="grid grid-cols-1 mb-40 md:grid-cols-2 lg:grid-cols-3 gap-4">
       {visibleTemplates.map((template) => (
         <div key={template.id} className="border rounded-lg p-4">
           <h3 className="text-lg font-semibold">{template.name}</h3>
           <p className="text-gray-600">{template.description}</p>
           <button
             onClick={() => handleView(template.id)}
             className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
           >
             View
           </button>
         </div>
       ))}
     </div>
   </div>
 );
};

export default DefaultTemplate;