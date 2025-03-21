import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TenantRequest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.priority) {
      alert("Please select a priority level.");
      return;
    }
    try {
      await axios.post(
        "https://rent-easy-18566-default-rtdb.firebaseio.com/requests.json",
        formData
      );
      alert("Request submitted successfully!");
      navigate("/tenant/dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Submit Maintenance Request</h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <label className="block mt-3 mb-2">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />

        <label className="block mt-3 mb-2">Priority:</label>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="">Select Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <label className="block mt-3 mb-2">Upload Image:</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 mt-4 w-full"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default TenantRequest;
