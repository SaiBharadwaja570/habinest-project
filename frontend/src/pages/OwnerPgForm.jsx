import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectItem } from "../components/ui/select";

export default function OwnerPgForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    price: "",
    address: "",
    sharingType: "Public",
    pgPicture: null,
  });
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "pgPicture") {
      setFormData({ ...formData, pgPicture: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
{/* Header */}
<header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
  <div className="flex items-center gap-2">
    <img src="/logo.png" alt="Habinest Logo" className="h-10 w-10" />
    <span className="text-2xl font-bold">Habinest</span>
  </div>

  <nav className="space-x-4 text-sm">
<div className="space-x-4 text-sm text-gray-100 font-medium">
    <a href="#">Find PGs</a>
    <a href="#">Map View</a>
    <a href="#">Book a Visit</a>
    <a href="#">Saved</a>
    <a href="#">My Dashboard</a>
    <a href="#">Write a Review</a>
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
        <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
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

        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
        >
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
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
              onChange={handleChange}
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
              value={formData.price}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="sharingType">Sharing Type</Label>
            <select
              id="sharingType"
              name="sharingType"
              value={formData.sharingType}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded-lg mt-1"
            >
              <option value="Public">Public</option>
              <option value="Private">Private</option>
              <option value="Girls Only">Girls Only</option>
              <option value="Boys Only">Boys Only</option>
            </select>
          </div>

          <div className="pt-4">
            <Button type="submit" className="bg-[#69995D] w-full hover:bg-[#5c864e]">
              Submit
            </Button>
          </div>
        </form>
      </main>

{/* Footer */}
      <footer className="border-t p-8 grid grid-cols-1 md:grid-cols-4 gap-6 text-sm text-gray-600">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-6 w-6" />
          </div>
          <div className="flex gap-2 text-xl">
            <span>🧿</span>
            <span>📷</span>
            <span>📹</span>
            <span>🔗</span>
          </div>
        </div>

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
      </footer>
    </div>
  );
}
