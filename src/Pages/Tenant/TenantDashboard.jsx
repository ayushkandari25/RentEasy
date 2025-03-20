import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const TenantDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "Tenant"}!
        </h2>
        <p className="text-gray-600">Manage your requests and payments here.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Maintenance Requests
          </h3>
          <p className="text-gray-500">
            View and manage your maintenance requests.
          </p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/tenant/request")}
          >
            New Request
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Rent Payments</h3>
          <p className="text-gray-500">
            Your next rent is due on: <b className="text-red-600">15th March</b>
          </p>
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
            View Payments
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
          <p className="text-gray-500">Communicate with your landlord.</p>
          <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
            Open Chat
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
