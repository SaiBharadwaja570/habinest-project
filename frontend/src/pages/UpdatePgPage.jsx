import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Search, Bookmark, User, LogOut, Upload, Home } from "lucide-react";

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/logout`, {}, { withCredentials: true });
      navigate("/");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

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
    const file = e.target.files[0];
    setPhoto(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-[#E4DFDA] to-[#F5F1EC]">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="HabinestLogo.jpg"  
                alt="Habinest Logo"
                className="w-10 h-10 object-cover rounded-lg"
              />
              <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <button 
                onClick={() => navigate("/pg-list")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Your PG's
              </button>
              <button 
                onClick={() => navigate("/visits")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Bookmark className="w-4 h-4" />
                Booked Visits
              </button>
            </nav>

            {/* Profile Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007FFF] to-[#69995D] p-0.5 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <User className="w-6 h-6 text-[#504B3A]" />
                </div>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white/95 backdrop-blur-sm border border-[#504B3A]/10 rounded-2xl shadow-2xl w-56 py-2 animate-in slide-in-from-top-5">
                  <button 
                    onClick={() => navigate("/profile")} 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors text-left"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center items-start py-8 px-4">
        <div className="w-full max-w-2xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-6 text-sm text-[#504B3A]/70">
            <button onClick={() => navigate("/")} className="hover:text-[#504B3A] transition-colors">
              <Home className="w-4 h-4" />
            </button>
            <span>/</span>
            <button onClick={() => navigate("/pg-list")} className="hover:text-[#504B3A] transition-colors">
              Your PGs
            </button>
            <span>/</span>
            <span className="text-[#504B3A] font-medium">Update PG</span>
          </nav>

          {/* Form Card */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#007FFF] to-[#69995D] p-6">
              <h1 className="text-3xl font-bold text-white text-center">Update PG Details</h1>
              <p className="text-white/90 text-center mt-2">Modify your property information</p>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              {/* PG Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-[#504B3A]">
                  PG Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter PG name"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007FFF] focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Address */}
              <div className="space-y-2">
                <label htmlFor="address" className="block text-sm font-medium text-[#504B3A]">
                  Address *
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter complete address"
                  required
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007FFF] focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label htmlFor="priceRange" className="block text-sm font-medium text-[#504B3A]">
                  Price Range
                </label>
                <input
                  type="text"
                  id="priceRange"
                  name="priceRange"
                  value={formData.priceRange}
                  onChange={handleChange}
                  placeholder="e.g., ₹5,000 - ₹8,000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007FFF] focus:outline-none transition-colors duration-200"
                />
              </div>

              {/* Sharing Type and Gender - Side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="sharingType" className="block text-sm font-medium text-[#504B3A]">
                    Sharing Type
                  </label>
                  <select
                    id="sharingType"
                    name="sharingType"
                    value={formData.sharingType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007FFF] focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Select Sharing Type</option>
                    <option value="Single">Single Occupancy</option>
                    <option value="Double">Double Sharing</option>
                    <option value="Triple">Triple Sharing</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="gender" className="block text-sm font-medium text-[#504B3A]">
                    Gender Preference
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#007FFF] focus:outline-none transition-colors duration-200"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male Only</option>
                    <option value="Female">Female Only</option>
                    <option value="Unisex">Unisex</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <label htmlFor="photo" className="block text-sm font-medium text-[#504B3A]">
                  Update Photo
                </label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="photo" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    {photoPreview ? (
                      <img 
                        src={photoPreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  onClick={() => navigate("/pg-list")}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-gradient-to-r from-[#007FFF] to-[#0066CC] hover:from-[#0066CC] hover:to-[#0052A3] text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update PG"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}