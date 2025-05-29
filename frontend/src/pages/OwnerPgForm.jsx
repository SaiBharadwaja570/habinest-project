import React, { useState, useReducer } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Select, SelectItem } from "../components/ui/select";
import { Heart, MapPin, Users, Star, Home, Search, Bookmark, User, Settings, LogOut, Menu } from "lucide-react";

export default function OwnerPgForm() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const navigate=useNavigate()
  function reducer(state, action) {
    switch (action.type) {
      case "name":
        return { ...state, name: action.payload }
      case "address":
        return { ...state, address: action.payload }
      case "price":
        return { ...state, price: action.payload }
      case "sharing":
        return { ...state, sharing: action.payload }
      case "photo":
        return { ...state, photo: action.payload }
      case "gender":
        return { ...state, gender: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    name: "",
    address: "",
    price: "",
    sharing: "",
    photo: null,
    gender: ""
  });
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("address", state.address);
      formData.append("priceRange", state.price);
      formData.append("sharingType", state.sharing);
      formData.append("gender", state.gender);
      formData.append("photo", state.photo);
  
      const res = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_BACKEND_PG}`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
  
      alert("PG made");
    } catch (error) {
      console.error("Upload or submission failed", error);
      alert("Failed to submit PG");
    }
}

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

   const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/logout`, {}, { withCredentials: true });
      navigate("/");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
   {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
  <img
    src="HabinestLogo.jpg"  
    alt="Home"
    className="w-10 h-10 object-cover"
  />

              <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <a 
                href="#" 
                onClick={() => navigate("/pg-list")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
              >
                <Search className="w-4 h-4" />
                Your Pg's
              </a>
              <a 
                href="#" 
                onClick={() => navigate("/visits")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Bookmark className="w-4 h-4" />
                Booked Visits
              </a>
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
                  <a 
                    href="#" 
                    onClick={() => navigate("/profile")} 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a href="#"  onClick={() => handleLogout()} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto py-10 px-4">
        <h2 className="text-center text-2xl font-bold text-[#504B3A] mb-6">Owner Pg Form</h2>

        <form className="space-y-6 bg-white p-6 rounded-2xl shadow-md">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              onChange={(e) => dispatch({ type: "name", payload: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="pgPicture">PG Picture</Label>
            <Input
              id="pgPicture"
              name="pgPicture"
              type="file"
              accept="image/*"
              onChange={(e) => dispatch({ type: "photo", payload: e.target.files[0] })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              placeholder="138"
              onChange={(e) => dispatch({ type: "price", payload: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter address"
              onChange={(e) => dispatch({ type: "address", payload: e.target.value })}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sharingType">Sharing Type</Label>
            <select
              id="sharingType"
              name="sharingType"
              onChange={(e) => dispatch({ type: "sharing", payload: e.target.value })}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            >
              <option value="Single">Single Sharing</option>
              <option value="Double">Double Sharing</option>
              <option value="Triple">Triple Sharing</option>
            </select>
          </div>

          <div>
            <Label htmlFor="gender">Gender</Label>
            <select id="gender" name="gender" onChange={(e) => dispatch({ type: "gender", payload: e.target.value })} className="w-full border border-gray-300 p-2 rounded-lg mt-1">
              <option value="">Select Gender Type</option>
              <option value="Gents">Gents</option>
              <option value="Women">Women</option>
              <option value="Coliving">Coliving</option>
            </select>
          </div>

          <div className="pt-4">
            <Button className="bg-[#69995D] w-full hover:bg-[#5c864e]" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Use Cases</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Student housing discovery</li>
                <li className="hover:text-white transition-colors cursor-pointer">Professional relocation</li>
                <li className="hover:text-white transition-colors cursor-pointer">Personalized PG browsing</li>
                <li className="hover:text-white transition-colors cursor-pointer">Booking site visits</li>
                <li className="hover:text-white transition-colors cursor-pointer">Saving/bookmarking PGs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Mobile-responsive exploration</li>
                <li className="hover:text-white transition-colors cursor-pointer">Feedback and ratings system</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Explore</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">PG Listings & Filters</li>
                <li className="hover:text-white transition-colors cursor-pointer">Profile & Preferences</li>
                <li className="hover:text-white transition-colors cursor-pointer">Map-based PG Search</li>
                <li className="hover:text-white transition-colors cursor-pointer">Real-time Suggestions</li>
                <li className="hover:text-white transition-colors cursor-pointer">Dark Mode UI</li>
                <li className="hover:text-white transition-colors cursor-pointer">Ratings & Reviews</li>
                <li className="hover:text-white transition-colors cursor-pointer">Similar PG Recommendations</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 text-[#E4DFDA]">Resources</h4>
              <ul className="space-y-3 text-white/80">
                <li className="hover:text-white transition-colors cursor-pointer">Blog & Guides</li>
                <li className="hover:text-white transition-colors cursor-pointer">Best Practices for Users</li>
                <li className="hover:text-white transition-colors cursor-pointer">Support & Contact Form</li>
                <li className="hover:text-white transition-colors cursor-pointer">Developer API Docs</li>
                <li className="hover:text-white transition-colors cursor-pointer">Location Data (OpenStreetMap)</li>
                <li className="hover:text-white transition-colors cursor-pointer">Progress Trackers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Resource Library</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 mt-12 pt-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
  <img
    src="HabinestLogo.jpg"  
    alt="Home"
    className="w-10 h-10 object-cover"
  />
              <span className="font-bold text-xl">Habinest</span>
            </div>
            <p className="text-white/60">Making your housing search effortless and enjoyable</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
