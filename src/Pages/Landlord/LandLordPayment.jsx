import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const USERS_API_URL =
  "https://rent-easy-18566-default-rtdb.firebaseio.com/users.json";
const RENT_REQUEST_URL =
  "https://rent-easy-18566-default-rtdb.firebaseio.com/rentRequests.json";

const LandLordPayment = () => {
  const [tenants, setTenants] = useState([]);
  const [rentRequests, setRentRequests] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(USERS_API_URL)
      .then((res) => {
        if (res.data) {
          const tenantList = Object.entries(res.data)
            .map(([id, data]) => ({ id, ...data }))
            .filter((user) => user.role === "tenant");

          setTenants(tenantList);
        }
      })
      .catch((err) => console.error("Error fetching tenants:", err));

    axios
      .get(RENT_REQUEST_URL)
      .then((res) => {
        if (res.data) {
          setRentRequests(res.data);
        }
      })
      .catch((err) => console.error("Error fetching rent requests:", err));
  }, []);

  const handleCreateRentRequests = () => {
    const updates = tenants.map((tenant) => {
      const existingRequest = rentRequests[tenant.id];

      const newRequest = {
        tenantId: tenant.id,
        tenantName: tenant.name,
        amount: "5000",
        dueDate: new Date().toISOString().split("T")[0],
        status: "pending",
      };

      return axios
        .patch(
          `https://rent-easy-18566-default-rtdb.firebaseio.com/rentRequests/${tenant.id}.json`,
          newRequest
        )
        .then(() => ({
          [tenant.id]: newRequest,
        }))
        .catch((err) =>
          console.error(`Error updating rent request for ${tenant.name}:`, err)
        );
    });

    Promise.all(updates).then((updatedRequests) => {
      const updatedRentRequests = updatedRequests.reduce(
        (acc, curr) => ({ ...acc, ...curr }),
        {}
      );
      setRentRequests((prev) => ({ ...prev, ...updatedRentRequests }));
    });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tenant Payments</h2>

      <button
        onClick={handleCreateRentRequests}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mb-4"
      >
        Create Rent Requests
      </button>
      <button
        className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-4"
        onClick={() => navigate("/landlord/dashboard")}
      >
        Go Back Home
      </button>

      {tenants.length === 0 ? (
        <p className="text-gray-600">No tenants found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              rentRequest={rentRequests[tenant.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TenantCard = ({ tenant, rentRequest }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">{tenant.name}</h3>
      <p className="text-gray-500">Email: {tenant.email}</p>

      <div className="mt-4">
        {rentRequest ? (
          <p className="text-sm font-semibold">
            Rent Status:{" "}
            <span
              className={`px-2 py-1 rounded ${
                rentRequest.status === "paid"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }`}
            >
              {rentRequest.status === "paid" ? "Already Paid ✅" : "Pending ⏳"}
            </span>
          </p>
        ) : (
          <p className="text-gray-500">
            Click "Create Rent Requests" to generate a request.
          </p>
        )}
      </div>
    </div>
  );
};

export default LandLordPayment;
