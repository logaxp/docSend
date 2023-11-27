import React from 'react';
import TimeSyncImage from '../../../assets/images/timesync1.png';
import DocSendImage from '../../../assets/images/docu6.png';
import AppointmentImage from '../../../assets/images/appointment.png'; // Update the import path if necessary
import TaskManagerImage from '../../../assets/images/pod4.png'; // Update the import path if necessary

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'Task Manager',
      description: 'Organize your tasks effectively and boost productivity.',
      image: TaskManagerImage,
      link: 'https://www.logaxp.com/'
    },
    {
      id: 2,
      name: 'Appointment Booking',
      description: 'Schedule appointments with ease and manage your bookings.',
      image: AppointmentImage,
      link: 'https://www.logaxp.com/'
    },
    {
      id: 3,
      name: 'DocCenter',
      description: 'Securely save and manage your documents in one place.',
      image: DocSendImage,
      link: 'https://www.logaxp.com/'
    },
    {
      id: 4,
      name: 'TimeSync',
      description: 'Track time and attendance for better workforce management.',
      image: TimeSyncImage,
      link: 'https://www.logaxp.com/'
    },
    // More products...
  ];

  return (
    <div className="container mx-auto p-4 mt-40 mb-60">
      <h1 className="text-4xl font-extrabold text-white border-b-2 text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <a key={product.id} href={product.link} target="_blank" rel="noopener noreferrer" className="block bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <img src={product.image} alt={product.name} className="rounded-t-lg w-full h-40 object-cover" />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-3">{product.name}</h2>
              <p className="text-gray-600 mb-5">{product.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Products;
