import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TenantProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tenant, setTenant] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const response = await axios.get(
          `https://rent-easy-18566-default-rtdb.firebaseio.com/users/user${id}.json`
        );
        if (response.data) {
          setTenant({
            name: response.data.name,
            email: response.data.email,
            password: "",
          });
        } else {
          console.log("No tenant found");
        }
      } catch (error) {
        console.error("Error fetching tenant data:", error);
      }
    };

    fetchTenant();
  }, [id]);

  const handleChange = (e) => {
    setTenant({ ...tenant, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(
        `https://rent-easy-18566-default-rtdb.firebaseio.com/users/user${id}.json`,
        {
          name: tenant.name,
          email: tenant.email,
          ...(tenant.password && { password: tenant.password }),
        }
      );
      alert("Profile updated successfully!");
      navigate(`/tenant/dashboard`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Tenant Profile</h2>
      <label className="block mb-2">Name:</label>
      <input
        type="text"
        name="name"
        value={tenant.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="block mt-3 mb-2">Email:</label>
      <input
        type="email"
        name="email"
        value={tenant.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="block mt-3 mb-2">New Password (Optional):</label>
      <input
        type="password"
        name="password"
        value={tenant.password}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button
        onClick={handleUpdate}
        className="bg-blue-500 text-white px-4 py-2 mt-4"
      >
        Update Profile
      </button>
    </div>
  );
};

export default TenantProfile;
