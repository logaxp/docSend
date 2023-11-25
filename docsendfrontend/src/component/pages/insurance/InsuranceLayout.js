import React from 'react';
import InsuranceSideBar from './InsuranceSideBar';
import backgroundImage from '../../../assets/images/bg-image.png';
import './InsuranceLayout.css';

const InsuranceLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-red-50 body-bg" style={{ backgroundImage: `url(${backgroundImage})`}}>
      <InsuranceSideBar />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default InsuranceLayout;
