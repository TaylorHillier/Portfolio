// Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="loading flex items-center bg-[#0a0a19] justify-center h-screen">
      <div className="spinner border-t-4 border-white rounded-full animate-spin h-12 w-12"></div>
      <p className="ml-2">Loading...</p>
    </div>
  );
};

export default Loading;
