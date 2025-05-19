import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";

const pgList = [
  {
    name: "Green Acres PG",
    location: "Located in Downtown Area",
  },
  {
    name: "Blue Horizon PG",
    location: "Located near City Park",
  },
  {
    name: "Sunny Side PG",
    location: "Located by the Riverside",
  },
];

export default function PGListPage() {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
{/* Header */}
<header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
  <div className="flex items-center gap-2">
    <img src="/HabinestLogo.png" alt="Habinest Logo" className="h-10 w-10" />
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
      <main className="p-8 max-w-3xl mx-auto space-y-6">
        {pgList.map((pg, index) => (
          <Card key={index} className="rounded-xl shadow-md">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <h3 className="font-semibold text-lg text-[#504B3A]">{pg.name}</h3>
                <p className="text-sm text-gray-600">{pg.location}</p>
              </div>
              <Button className="bg-[#69995D] hover:bg-[#5c864e] text-white px-4 py-1 rounded-full">
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-center pt-4">
          <Button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800">
            Add New PG
          </Button>
        </div>
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
