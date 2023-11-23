import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBriefcase,
  faGraduationCap,
  faHeart,
  faPaintBrush,
  faBicycle,
  faTree,
faIndustry,
  faFutbol,
  faPenClip,
  faBook,
  faUserNurse,
} from '@fortawesome/free-solid-svg-icons';

const categories = [
  { icon: faBriefcase, label: 'Business' },
  { icon: faUserNurse, label: 'HealhCare' },
  { icon: faGraduationCap, label: 'Family & Education' },
  { icon: faHeart, label: 'Wedding' },
  { icon: faPaintBrush, label: 'Lease' },
  { icon: faIndustry, label: 'Insurance' },
  { icon: faBicycle, label: 'Mortgage' },
  { icon: faTree, label: 'Charity & Causes' },
  { icon: faTree, label: 'Community' },
  { icon: faFutbol, label: 'Sports & Fitness' },
  { icon: faBook, label: 'Travel & Outdoor' },
  { icon: faPenClip, label: 'Film & Media' },
];
const Explore = () => {
  const [viewMore, setViewMore] = useState(false);

  const visibleCategories = viewMore ? categories : categories.slice(0, 8);

  return (
    <div className="container mx-auto mb-40 my-8 max-w-4xl">
    <h2 className="text-2xl font-bold mb-8">Key Sectors Embracing DocSend for Digital Signatures</h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        {visibleCategories.map((category, index) => (
          <div key={index} className="p-4 border rounded-lg text-center hover:shadow-lg transition duration-300 ease-in-out">
            <FontAwesomeIcon icon={category.icon} className="text-red-500 text-3xl mb-2" />
            <h3 className="font-semibold">{category.label}</h3>
          </div>
        ))}
      </div>
      <button
        onClick={() => setViewMore(!viewMore)}
        className="text-md text-blue-600 hover:text-blue-800 transition duration-300 ease-in-out"
      >
        {viewMore ? 'View less' : 'View more'}
      </button>
    </div>
  );
};
export default Explore;
