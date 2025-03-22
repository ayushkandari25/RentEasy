import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TenantRent = () => {
  const { tenantId } = useParams();
  const [rentRequests, setRentRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (tenantId) {
      fetchRentRequests();
    }
  }, [tenantId]);

  const fetchRentRequests = async () => {
    try {
      const response = await axios.get(
        "https://rent-easy-18566-default-rtdb.firebaseio.com/rentRequests.json"
      );
      if (response.data) {
        const rentArray = Object.entries(response.data).map(([id, req]) => ({
          id,
          ...req,
        }));

        setRentRequests(
          rentArray.filter(
            (req) => req.status === "pending" && req.tenantId === tenantId
          )
        );
      }
    } catch (error) {
      console.error("Error fetching rent requests:", error);
    }
  };

  const handlePayment = async (request) => {
    const options = {
      key: "rzp_test_lCbh7pVhGQFt9I",
      amount: request.amount * 100,
      currency: "INR",
      name: "Rent Payment",
      description: `Rent payment for ${request.tenantName}`,
      handler: async function (response) {
        console.log("Payment Successful", response);
        await updatePaymentStatus(request.id);
      },
      prefill: {
        name: request.tenantName,
        email: "tenant@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const updatePaymentStatus = async (id) => {
    try {
      await axios.patch(
        `https://rent-easy-18566-default-rtdb.firebaseio.com/rentRequests/${id}.json`,
        { status: "paid", paymentDate: new Date().toISOString().split("T")[0] }
      );
      setRentRequests(rentRequests.filter((req) => req.id !== id));
    } catch (error) {
      console.error("Error updating rent status:", error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Rent Payments</h2>
      {rentRequests.length === 0 ? (
        <p className="text-gray-600">No pending rent requests.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rentRequests.map((request) => (
              <div
                key={request.id}
                className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {request.tenantName}
                </h3>
                <p className="text-gray-500">Amount: ₹{request.amount}</p>
                <p className="text-gray-500">Due Date: {request.dueDate}</p>
                <button
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                  onClick={() => handlePayment(request)}
                >
                  Pay Now
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={() => navigate("/tenant/dashboard")}
            className="bg-red-500 text-white px-4 py-2 mt-4 ml-5"
          >
            Go Back Home
          </button>
        </>
      )}
    </div>
  );
};

export default TenantRent;
