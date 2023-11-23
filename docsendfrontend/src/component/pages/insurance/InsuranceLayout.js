import React from 'react';
import InsuranceSideBar from './InsuranceSideBar';

const InsuranceLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <InsuranceSideBar />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default InsuranceLayout;
