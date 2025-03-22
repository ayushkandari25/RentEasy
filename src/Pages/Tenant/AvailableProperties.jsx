import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PROPERTIES_API_URL =
  "https://rent-easy-18566-default-rtdb.firebaseio.com/properties.json";

const AvailableProperties = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(PROPERTIES_API_URL)
      .then((res) => {
        if (res.data) {
          const propertyList = Object.entries(res.data).map(([id, data]) => ({
            id,
            ...data,
          }));
          setProperties(propertyList);
        }
      })
      .catch((err) => console.error("Error fetching properties:", err));
  }, []);

  const handleBuyProperty = (property) => {
    const options = {
      key: "rzp_test_lCbh7pVhGQFt9I",
      amount: property.price * 100,
      currency: "INR",
      name: "RentEasy",
      description: `Buying ${property.name}`,
      handler: function (response) {
        console.log("Payment Successful:", response);

        axios
          .patch(
            `https://rent-easy-18566-default-rtdb.firebaseio.com/properties/${property.id}.json`,
            { status: "sold" }
          )
          .then(() => {
            setProperties((prev) =>
              prev.map((p) =>
                p.id === property.id ? { ...p, status: "sold" } : p
              )
            );
          })
          .catch((err) =>
            console.error(`Error updating property ${property.name}:`, err)
          );
      },
      theme: { color: "#3399cc" },
    };

    const paymentGateway = new window.Razorpay(options);
    paymentGateway.open();
  };

  return (
    <>
      <div className="min-h-screen p-6 bg-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Available Properties
        </h2>

        {properties.length === 0 ? (
          <p className="text-gray-600">No properties available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onBuy={handleBuyProperty}
              />
            ))}
          </div>
        )}
      <button
        onClick={() => navigate("/tenant/dashboard")}
        className="bg-red-500 text-white px-4 py-2 mt-4 ml-5"
      >
        Go Back Home
      </button>
      </div>
    </>
  );
};

const PropertyCard = ({ property, onBuy }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">{property.name}</h3>
      <p className="text-gray-500">Price: ₹{property.price}</p>
      <p
        className={`text-sm font-semibold ${
          property.status === "sold" ? "text-red-500" : "text-green-500"
        }`}
      >
        Status: {property.status === "sold" ? "Sold ❌" : "Available ✅"}
      </p>

      {property.status === "pending" && (
        <button
          onClick={() => onBuy(property)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md mt-4"
        >
          Buy Property
        </button>
      )}
    </div>
  );
};

export default AvailableProperties;
