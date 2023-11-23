import React, { useState } from 'react';

const Feature = () => {
  const [visibleRows, setVisibleRows] = useState(2); 
  const itemsPerRow = 3; 
  const initialItems = visibleRows * itemsPerRow;
      
        const features = [
          { title: 'File Sharing', description: 'Share files with your team members and clients with ease.  add comments, and track file versions.' },
          { title: 'Invoicing', description: 'Create and send invoices to your clients. Track payments and send reminders for overdue payments.' },
          { title: 'Time Tracking', description: 'Track time spent on projects and tasks. View detailed reports to analyze your team’s performance.' },
          { title: 'Reports', description: 'Generate reports to gain insights into your business. View reports on tasks, projects, invoices, and more.' },
          { title: 'User Management', description: 'Manage your team members and clients with our user management system. Manage permissions.' },
          { title: 'Email Integration', description: 'Integrate your email with our platform to manage your emails and contacts effectively.' },
          { title: 'Calendar Integration', description: 'Integrate your calendar with our platform to manage your schedule effectively.' },
          { title: 'Customer Support', description: 'Our dedicated support team is available 24/7 to help you with any issues you may face.' },
          { title: 'Customization', description: 'Customize our platform to suit your business needs. Add your logo, change the color scheme, and more.' }, 
        ];
          const toggleRows = () => {
            setVisibleRows(visibleRows >= 3 ? 2 : visibleRows + 1);
          };
        
          return (
            <section className="container max-w-7xl mx-auto py-20 text-center  bg-gray-50 mb-40 px-8">
              <h2 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl">Features</h2>
              <p className="mt-4 text-lg text-gray-600 md:text-xl lg:text-2xl max-w-2xl mx-auto">
                Our comprehensive suite of features empowers you to manage your business with ease and efficiency.
              </p>
              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                {features.slice(0, initialItems).map((feature, index) => (
                  <div key={index} className="transition duration-500 ease-in-out transform hover:-translate-y-2">
                    <div className="feature-card bg-white shadow-xl rounded-xl p-8 hover:shadow-2xl hover:bg-red-100 h-full flex flex-col">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                      <hr className="w-1/4 mx-auto mb-4 border-b-2 border-gray-500" />
                      <p className="text-gray-600 flex-1">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={toggleRows}
                className="mt-10 text-lg text-white bg-black hover:bg-blue-700 font-semibold py-2 px-8 rounded-md shadow-lg transition duration-300"
              >
                {visibleRows >= 3 ? 'Show Less' : 'Show More'}
              </button>
            </section>
          );
        };
        
        export default Feature;