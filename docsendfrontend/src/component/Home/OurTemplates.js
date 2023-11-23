import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileContract, faFileMedical, faHome, faSchool, faUserMd, faFileSignature } from '@fortawesome/free-solid-svg-icons';

const initialTemplates = [
  { title: 'Insurance Document', description: 'Ensure comprehensive coverage with our detailed insurance templates.', icon: faFileSignature },
  { title: 'Lease Agreement', description: 'Secure your lease with our legally vetted lease templates.', icon: faFileContract },
  { title: 'Healthcare Forms', description: 'Streamline patient care with specialized healthcare forms.', icon: faFileMedical },
  { title: 'Contract Templates', description: 'Create binding agreements with our professional contract templates.', icon: faHome },
  { title: 'School Admission Forms', description: 'Simplify school admissions with easy-to-use form templates.', icon: faSchool },
  { title: 'Mortgage Documents', description: 'Navigate mortgage processes effortlessly with our detailed templates.', icon: faUserMd },
  { title: 'Appointments', description: 'Schedule appointments with our easy-to-use form templates.', icon: faFileSignature },
  {title: 'Class Attendance', description: 'Track class attendance with our easy-to-use form templates.', icon: faFileSignature},
  {title:'Child Care', description: 'Track child care with our easy-to-use form templates.', icon: faFileSignature},
];

const OurTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTemplates, setFilteredTemplates] = useState(initialTemplates.slice(0, 6)); // Limit to first 6 templates

  useEffect(() => {
    const filtered = initialTemplates
      .filter(template => 
        template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        template.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 6); // Apply the slice here to limit search results as well
    setFilteredTemplates(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl mx-auto mt-20 mb-40 px-4 sm:px-6 lg:px-8 my-10">
      <h1 className="text-4xl font-bold text-center mb-10">Explore Our Templates</h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Templates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input w-full max-w-xl text-lg p-4 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTemplates.map((template, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="p-4 bg-slate-500 text-white cursor-pointer hover:bg-gray-700 transition-colors duration-300 flex items-center">
              <FontAwesomeIcon icon={template.icon} size="2x" className="mr-4" />
              <h2 className="text-xl font-semibold">{template.title}</h2>
            </div>
            <hr />
            <div className="p-4">
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center text-gray-500">No templates found.</div>
      )}
    </div>
  );
};

export default OurTemplates;
