import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { FaBuilding, FaClipboardList, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandlordDashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handelPayment=()=>{
    navigate("/landlord/payment");
  }
  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.name || "Landlord"}! 🏠
        </h2>
        <p className="text-gray-600 mt-1">
          Manage your properties, tenants, and payments seamlessly.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center">
          <FaBuilding className="text-blue-600 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            Manage Properties
          </h3>
          <p className="text-gray-500 mt-2">View and add rental properties.</p>
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/landlord/properties")}
          >
            View Properties
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center">
          <FaClipboardList className="text-yellow-600 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            Tenant Requests
          </h3>
          <p className="text-gray-500 mt-2">
            Check maintenance and tenant queries.
          </p>
          <button
            className="mt-4 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-md"
            onClick={() => navigate("/landlord/request")}
          >
            View Requests
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md transition transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center">
          <FaMoneyBillWave className="text-green-600 text-4xl mb-3" />
          <h3 className="text-lg font-semibold text-gray-800">
            Payment Tracking
          </h3>
          <p className="text-gray-500 mt-2">Monitor rent collection status.</p>
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-md"
            onClick={handelPayment}
          >
            View Payments
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandlordDashboard;
