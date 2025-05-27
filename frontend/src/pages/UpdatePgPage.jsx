import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";

export default function UpdatePgPage() {
  const { id: pgId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    priceRange: "",
    sharingType: "",
    gender: "",
  });

  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPg = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_PG}/${pgId}`, {
          withCredentials: true,
        });
        setFormData({
          name: res.data.data.name || "",
          address: res.data.data.address || "",
          priceRange: res.data.data.priceRange || "",
          sharingType: res.data.data.sharingType || "",
          gender: res.data.data.gender || "",
        });
      } catch (error) {
        console.error("Error fetching PG:", error);
        alert("Failed to load PG details");
      }
    };

    fetchPg();
  }, [pgId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });
    if (photo) data.append("photo", photo);

    try {
      await axios.put(`${import.meta.env.VITE_BACKEND_PG}/${pgId}`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("PG updated successfully!");
      navigate("/pg-list");
    } catch (error) {
      console.error("Failed to update PG:", error);
      alert("Error updating PG");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#E4DFDA] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 w-full max-w-xl space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center text-[#504B3A]">Update PG Details</h2>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="PG Name"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="text"
          name="priceRange"
          value={formData.priceRange}
          onChange={handleChange}
          placeholder="Price Range (e.g., 5000-8000)"
          className="w-full px-4 py-2 border rounded-lg"
        />

        <select
          name="sharingType"
          value={formData.sharingType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select Sharing Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
          <option value="Triple">Triple</option>
        </select>

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Unisex">Unisex</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full"
        />

        <div className="flex justify-between">
          <Button
            type="button"
            className="bg-gray-400 text-white px-6 py-2 rounded-full"
            onClick={() => navigate("/owner-pgs")}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="bg-[#007FFF] text-white px-6 py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update PG"}
          </Button>
        </div>
      </form>
    </div>
  );
}
