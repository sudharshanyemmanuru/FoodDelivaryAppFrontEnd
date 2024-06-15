
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex space-x-2 animate-pulse">
        <div className="w-8 h-8 bg-red-600 rounded-full"></div>
        <div className="w-8 h-8 bg-green-600 rounded-full"></div>
        <div className="w-8 h-8 bg-yellow-600 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
