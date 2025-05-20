import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FilterListingPage() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/bookmarks", {
          withCredentials: true,
        });
        setBookmarks(res.data.bookmarks || []);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      }
    };

    fetchBookmarks();
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-[#504B3A] font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-[#504B3A]/20">
        <div className="flex items-center gap-2">
          <img src="/HabinestLogo.jpg" alt="Habinest" className="w-10 h-10" />
          <span className="font-bold text-xl">Habinest</span>
        </div>
        <nav className="flex items-center gap-6 text-sm">
          <div className="space-x-4 text-sm text-teal-700 font-medium">
            <a href="#" onClick={() => navigate("/")}>Home</a>
            <a href="#" onClick={() => navigate("/filter")}>Find PGs</a>
            <a href="#" onClick={() => navigate("/bookmarks")}>BookMarks</a>
          </div>

          {/* Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center gap-2">
              <img
                src="/profile.png"
                alt="User"
                className="w-10 h-10 rounded-full border border-[#504B3A]"
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-[#504B3A]/20 rounded-lg shadow-lg w-48 py-2">
                <a href="#" onClick={() => navigate("/profile")} className="block px-4 py-2 text-sm text-[#504B3A]">
                  Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
                  Toggle
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">
                  Log Out
                </a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Listings */}
        {bookmarks.length === 0 ? (
          <p className="text-center text-gray-600">No bookmarks found.</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {bookmarks.map((listing) => (
              <div
                key={listing._id}
                className="bg-white rounded-lg border border-[#504B3A]/20 p-4 text-center cursor-pointer"
                onClick={() => navigate(`/${listing._id}`)}
              >
                <img
                  src={listing.photo}
                  alt={listing.name}
                  className="w-full h-32 object-cover rounded"
                />
                <p className="mt-2 font-medium">{listing.name}</p>
                <p className="text-sm">{listing.address}</p>
                <p className="text-sm font-bold">₹{listing.priceRange}</p>
                <p className="text-xs text-[#504B3A]/70">
                  {listing.gender} | {listing.sharingType}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

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
