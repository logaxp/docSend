import React from 'react';
import AgencyDashboardHeader from './AgencyDashboardHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faUserTie, faFileSignature, faClock } from '@fortawesome/free-solid-svg-icons';

const Agency = () => {
  // Example data - replace with real data from your backend
  const jobs = [
    { id: 1, title: 'Insurance Sales Agent', status: 'Open' },
    { id: 2, title: 'Customer Service Representative', status: 'Open' },
    { id: 3, title: 'Claims Adjuster', status: 'Open' }
    // ... other jobs
  ];

  const staff = [
    { id: 1, name: 'Gerry Peter', role: 'Senior Agent' },
    { id: 2, name: 'Uzoh Smith', role: 'Claims Adjuster' },
    { id: 3, name: 'Chidi Obi', role: 'Claims Adjuster'}
    // ... other staff members
  ];

  const pendingDocs = [
    { id: 1, name: 'Health Insurance Claim Form', dueDate: '2023-11-30' },
    { id: 2, name: 'Vehicle Insurance Application', dueDate: '2023-12-15' },
    { id: 3, name: 'Dental Open Enrollment', dueDate: '2023-12-15' }
    // ... other pending documents
  ];

  const completedJobs = [
    { id: 1, title: 'Insurance Sales Agent', status: 'Closed', CompletedDate: '2023-11-30' },
    { id: 2, title: 'Dental Open Enrollment', status: 'Closed', CompletedDate: '2023-12-15' },
    { id: 3, title: 'Health Insurance Claim Form', status: 'Closed', CompletedDate: '2023-12-15'}
    // ... other jobs
  ];

  return (
    <div className="container mx-auto p-8">
        
      < AgencyDashboardHeader />
      
      {/* Jobs Section */}
      <section className="mb-6 max-w-5xl text-center mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Job Openings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="p-4 bg-white rounded-lg shadow">
              <FontAwesomeIcon icon={faBriefcase} className="text-blue-500" />
              <h3 className="font-bold">{job.title}</h3>
              <span className="text-sm text-gray-500">{job.status}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* Staff Section */}
      <section className="mb-6 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-4">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div key={member.id} className="flex items-center p-4 bg-white rounded-lg shadow">
              <FontAwesomeIcon icon={faUserTie} className="text-green-500 mr-4" />
              <div>
                <h3 className="font-bold">{member.name}</h3>
                <span className="text-sm text-gray-500">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pending Documents Section */}
      <section className='max-w-5xl mx-auto'>
        <h3 className="text-2xl font-semibold mb-4 ">Pending Approvals</h3>
        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-gray-200 text-gray-600">
              <tr>
                <th className="py-3 px-6 text-left">Document Name</th>
                <th className="py-3 px-6 text-left">Due Date</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {pendingDocs.map((doc) => (
                <tr key={doc.id} className="border-b hover:bg-gray-100">
                  <td className="py-3 px-6 text-left">{doc.name}</td>
                  <td className="py-3 px-6 text-left">{doc.dueDate}</td>
                  <td className="py-3 px-6 text-center">
                    <FontAwesomeIcon icon={faFileSignature} className="text-blue-500 cursor-pointer mr-2" />
                    <FontAwesomeIcon icon={faClock} className="text-yellow-500 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
          
        {/* Completed Jobs Section */}
        <section className="mt-6 max-w-5xl mx-auto">
  <h3 className="text-2xl font-semibold mb-4">Completed Jobs</h3>
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white rounded-lg shadow-md">
      <thead className="bg-gray-200 text-gray-600">
        <tr>
          <th className="py-3 px-6 text-left">Job Title</th>
          <th className="py-3 px-6 text-left">Status</th>
          <th className="py-3 px-6 text-left">Completed Date</th>
          <th className="py-3 px-6 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="text-gray-600">
        {completedJobs.map((job) => (
          <tr key={job.id} className="border-b hover:bg-gray-100">
            <td className="py-3 px-6 text-left">{job.title}</td>
            <td className="py-3 px-6 text-left">{job.status}</td>
            <td className="py-3 px-6 text-left">{job.CompletedDate}</td>
            <td className="py-3 px-6 text-left">
              <FontAwesomeIcon icon={faFileSignature} className="text-blue-500 cursor-pointer mr-2" />
              <FontAwesomeIcon icon={faClock} className="text-yellow-500 cursor-pointer" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>
    </div>
  );
};

export default Agency;
