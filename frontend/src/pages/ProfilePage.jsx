import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Pencil, LogOut } from "lucide-react";

const ProfilePage = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#E4DFDA] text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
        <div className="flex items-center gap-2">
          <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">Habinest</span>
        </div>

        <nav className="space-x-4 text-sm text-gray-100 font-medium">
          <a href="#" onClick={() => navigate("/")}>Home</a>
          <a href="#" onClick={() => navigate("/filter")}>Find PGs</a>
          <a href="#" onClick={() => navigate("/bookmarks")}>BookMarks</a>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
            <img src="/profile.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-[#504B3A]/20 rounded-lg shadow-lg w-48 py-2 z-50">
              <a href="#" onClick={() => navigate("/profile")} className="block px-4 py-2 text-sm text-[#504B3A]">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">Settings</a>
              <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">Log Out</a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8">
        <Card className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6">
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center">
              <img
                src="/profile.png"
                alt="Profile"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#007FFF]"
              />
              <Button variant="ghost" className="mt-2 text-[#007FFF]">
                <Pencil className="mr-2 h-4 w-4" /> Edit Picture
              </Button>
            </div>

            {/* Profile Details Section */}
            <div className="space-y-4">
              {[
                { label: "Name", value: "John Doe" },
                { label: "Email", value: "johndoe@gmail.com" },
                { label: "Mobile Phone(+1)", value: "(123) 456-7890" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">{item.label}:</p>
                    <p className="text-lg font-semibold">{item.value}</p>
                  </div>
                  <Pencil className="text-[#504B3A] cursor-pointer" />
                </div>
              ))}

              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Change Password</p>
                <Pencil className="text-[#504B3A] cursor-pointer" />
              </div>

              <div className="pt-4">
                <Button variant="destructive" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Log Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
};

export default ProfilePage;
