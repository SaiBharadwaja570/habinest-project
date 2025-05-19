import React, { useState, useReducer } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import axios from "axios";
import { Select, SelectItem } from "../components/ui/select";

export default function OwnerPgForm() {
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
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleSubmit= async ()=>{
    try {
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("address", state.address);
        formData.append("priceRange", state.price);
        formData.append("sharingType", state.sharing);
        formData.append("gender", state.gender);
        formData.append("photo", state.photo);
        const res=await axios({
            method:"POST",
            url:"http://localhost:8000/api/pg/",
            data:formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(()=>{
            alert("PG made")
        });
    } catch (error) {
        console.error("Upload or submission failed", error)
    }
}

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
{/* Header */}
<header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
  <div className="flex items-center gap-2">
    <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-10 w-10" />
    <span className="text-2xl font-bold">Habinest</span>
  </div>

  <nav className="space-x-4 text-sm">
<div className="space-x-4 text-sm text-gray-100 font-medium">
        <a href="#" onClick={()=>navigate('/')}>Home</a>
        <a href="#" onClick={()=>navigate('/filter')}>Find PGs</a>
        <a href="#" onClick={()=>navigate('/bookmarks')}>BookMarks</a>
  </div>
  </nav>

  {/* Profile Dropdown */}
  <div className="relative">
    <button
      onClick={toggleDropdown}
      className="flex items-center gap-2"
    >
      <img
        src="/profile.png"
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
    </button>
    {isDropdownOpen && (
      <div className="absolute right-0 mt-2 bg-white border border-[#504B3A]/20 rounded-lg shadow-lg w-48 py-2">
        <a href="#"  onClick={()=>navigate('/profile')} className="block px-4 py-2 text-sm text-[#504B3A]">
          Profile
        </a>
        <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
          Settings
        </a>
        <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
          Log Out
        </a>
      </div>
    )}
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
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Girls Only">Girls Only</option>
              <option value="Boys Only">Boys Only</option>
            </select>
          </div>

          <div>
            <Label htmlFor="gender">Sharing Type</Label>
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
<footer className="border-t p-8 bg-white text-sm text-gray-600">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
    <div>
      <h4 className="font-semibold mb-2">Use Cases</h4>
      <ul className="space-y-1">
        <li>Student housing discovery</li>
        <li>Professional relocation</li>
        <li>Personalized PG browsing</li>
        <li>Booking site visits</li>
        <li>Saving/bookmarking PGs</li>
        <li>Mobile-responsive exploration</li>
        <li>Feedback and ratings system</li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Explore</h4>
      <ul className="space-y-1">
        <li>PG Listings & Filters</li>
        <li>Profile & Preferences</li>
        <li>Map-based PG Search</li>
        <li>Real-time Suggestions</li>
        <li>Dark Mode UI</li>
        <li>Ratings & Reviews</li>
        <li>Similar PG Recommendations</li>
      </ul>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Resources</h4>
      <ul className="space-y-1">
        <li>Blog & Guides</li>
        <li>Best Practices for Users</li>
        <li>Support & Contact Form</li>
        <li>Developer API Docs</li>
        <li>Location Data (OpenStreetMap)</li>
        <li>Progress Trackers</li>
        <li>Resource Library</li>
      </ul>
    </div>
  </div>
</footer>

    </div>
  );
}
