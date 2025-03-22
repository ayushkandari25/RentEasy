import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LandLordRequest = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "https://rent-easy-18566-default-rtdb.firebaseio.com/requests.json"
        );
        if (response.data) {
          const requestList = Object.keys(response.data).map((key) => ({
            id: key,
            ...response.data[key],
          }));
          setRequests(requestList);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleResolve = async (requestId) => {
    try {
      await axios.delete(
        `https://rent-easy-18566-default-rtdb.firebaseio.com/requests/${requestId}.json`
      );
      setRequests(requests.filter((req) => req.id !== requestId));
    } catch (error) {
      console.error("Error resolving request:", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Tenant Requests</h2>

      {requests.length === 0 ? (
        <p>No requests available.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{req.title}</h3>
              <p className="text-gray-700">{req.description}</p>
              <p className="text-sm text-gray-500">Priority: {req.priority}</p>

              <p className="text-sm text-blue-700 font-semibold">
                Sent by: {req.tenantName || "Unknown Tenant"}
              </p>

              {req.image && (
                <img
                  src={req.image}
                  alt="Request"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}

              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={() => handleResolve(req.id)}
              >
                Resolve
              </button>
              <button
                className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-4"
                onClick={() => navigate("/landlord/dashboard")}
              >
                Go Back Home
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandLordRequest;
