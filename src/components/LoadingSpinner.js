import React from "react";

const LoadingPulse = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
        <p className="text-blue-600 mt-4 font-semibold">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default LoadingPulse;