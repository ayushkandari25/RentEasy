import React from "react";
import { useNavigate } from "react-router-dom";

const TenantMessage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
      <p className="text-md text-gray-500 mt-2 max-w-md">
        This application was developed during a **construct week project**, so
        time was limited. Some features will be available in future updates.
      </p>
      <button
        onClick={() => navigate("/tenant/dashboard")}
        className="mt-5 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default TenantMessage;


