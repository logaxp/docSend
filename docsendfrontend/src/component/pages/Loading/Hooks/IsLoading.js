import React from 'react';
import './IsLoading.css'; // Make sure to create this CSS file

const IsLoading = () => {
  return (
    <div className="flex justify-center items-center h-1/2">
      {/* Spinner container */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="animate-spin-slow rounded-full border-8 border-blue-300 border-opacity-20 h-40 w-40"></div>
        {/* Inner Ring */}
        <div className="animate-spin  rounded-full border-8 border-blue-400 border-t-transparent h-32 w-32 absolute top-4 left-4"></div>
        {/* Text */}
        <div className="absolute inset-0 flex justify-center items-center flex-col">
          <span className="font-bold text-lg text-blue-400">LOADING...</span>
          <span className="text-sm text-blue-500">please wait</span>
        </div>
      </div>
    </div>
  );
};

export default IsLoading;
