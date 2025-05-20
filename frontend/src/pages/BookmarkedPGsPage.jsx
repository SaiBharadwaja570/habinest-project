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
        const data = res.data.bookmarks || [];
        setBookmarks(data);
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
            <a href="#" onClick={() => navigate('/')}>Home</a>
            <a href="#" onClick={() => navigate('/filter')}>Find PGs</a>
            <a href="#" onClick={() => navigate('/bookmarks')}>BookMarks</a>
          </div>
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
                <a href="#" onClick={() => navigate('/profile')} className="block px-4 py-2 text-sm text-[#504B3A]">Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">Toggle</a>
                <a href="#" className="block px-4 py-2 text-sm text-[#504B3A]">Log Out</a>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <h2 className="text-2xl font-bold mb-4">Available PGs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bookmarks.length > 0 ? (
            bookmarks.map((pg, index) => (
              <div
                key={index}
                className="border border-[#504B3A]/20 p-4 rounded-lg shadow-md bg-white"
              >
                <h3 className="font-semibold text-lg">{pg.name}</h3>
                <p className="text-sm">Location: {pg.location || "Unknown"}</p>
                <p className="text-sm">Gender: {pg.gender || "Not specified"}</p>
                <p className="text-sm">Price: ₹{pg.priceRange || "N/A"}</p>
              </div>
            ))
          ) : (
            <p>No PG listings found.</p>
          )}
        </div>
      </main>
    </div>
  );
}
