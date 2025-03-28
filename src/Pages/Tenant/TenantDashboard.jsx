import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const TenantDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelPayment=()=>{
    navigate(`/tenant/payment/${user.id}`);
  }

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
          <p className="text-gray-500">Pay you Rent in a Single Tap</p>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            onClick={handelPayment}
          >
            View Payments
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">Messages</h3>
          <p className="text-gray-500">Communicate with your landlord.</p>
          <button
            className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/tenant/messages/${user.id}`)}
          >
            Open Chat
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Update your Profile
          </h3>
          <p className="text-gray-500">Update your credentials.</p>
          <button
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/tenant/profile/${user.id}`)}
          >
            Update
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800">
            Available Properties
          </h3>
          <p className="text-gray-500">Want to Upgrade OR Adjust?</p>
          <button
            className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
            onClick={() => navigate("/tenant/properties")}
          >
            Click Here
          </button>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;
