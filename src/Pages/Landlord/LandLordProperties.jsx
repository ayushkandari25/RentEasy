import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PROPERTIES_URL =
  "https://rent-easy-18566-default-rtdb.firebaseio.com/properties.json";

const LandLordProperties = () => {
  const [properties, setProperties] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProperty, setNewProperty] = useState({
    address: "",
    type: "",
    bedrooms: "",
    size: "",
    price: "",
    contact: "",
    status: "pending",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(PROPERTIES_URL)
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

  const handleChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !newProperty.address ||
      !newProperty.type ||
      !newProperty.bedrooms ||
      !newProperty.size ||
      !newProperty.price ||
      !newProperty.contact
    ) {
      alert("All fields are required!");
      return;
    }

    axios
      .post(PROPERTIES_URL, newProperty)
      .then((res) => {
        alert("Property added successfully!");
        setProperties([...properties, { id: res.data.name, ...newProperty }]);
        setShowForm(false);
        setNewProperty({
          address: "",
          type: "",
          bedrooms: "",
          size: "",
          price: "",
          contact: "",
          status: "pending", 
        });
      })
      .catch((err) => console.error("Error adding property:", err));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Landlord Properties
      </h2>
      <button
        className="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        onClick={() => setShowForm(true)}
      >
        Add Property
      </button>
      <button
        className="mb-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md ml-4"
        onClick={() => navigate("/landlord/dashboard")}
      >
        Go Back Home
      </button>
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Add New Property
          </h3>
          <input
            type="text"
            name="address"
            placeholder="Property Address"
            value={newProperty.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="type"
            placeholder="Property Type (House, Apartment, etc.)"
            value={newProperty.type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="bedrooms"
            placeholder="Number of Bedrooms"
            value={newProperty.bedrooms}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="size"
            placeholder="Property Size (sq ft)"
            value={newProperty.size}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="number"
            name="price"
            placeholder="Asking Price"
            value={newProperty.price}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <input
            type="text"
            name="contact"
            placeholder="Contact Information"
            value={newProperty.contact}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md mb-2"
          />
          <button
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
            onClick={handleSubmit}
          >
            Submit Property
          </button>
          <button
            className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md w-full"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
        </div>
      )}
      {properties.length === 0 ? (
        <p className="text-gray-600">No properties added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property.id}
              className="bg-white p-6 rounded-lg shadow-md transition hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {property.address}
              </h3>
              <p className="text-gray-500">Type: {property.type}</p>
              <p className="text-gray-500">Bedrooms: {property.bedrooms}</p>
              <p className="text-gray-500">Size: {property.size} sq ft</p>
              <p className="text-gray-500">Price: ₹{property.price}</p>
              <p className="text-gray-500">Contact: {property.contact}</p>
              {/* Status Indicator */}
              <p
                className={`mt-2 font-semibold text-sm ${
                  property.status === "pending"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {property.status === "pending" ? "For Sale" : "SOLD OUT"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandLordProperties;
