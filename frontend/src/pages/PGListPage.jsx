import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";

export default function PGListPage() {
  const navigate = useNavigate();
  const [pgList, setPgList] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const fetchMyPgs = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_PG}/owner-pgs`, {
        withCredentials: true,
      });
      setPgList(res.data.data);
    } catch (error) {
      console.error("Error fetching owner's PGs:", error);
    }
  };

  useEffect(() => {
    fetchMyPgs();
  }, []);

  const handleDelete = async (pgId) => {
    if (!window.confirm("Are you sure you want to delete this PG?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_PG}/${pgId}`, {
        withCredentials: true,
      });
      setPgList((prev) => prev.filter((pg) => pg._id !== pgId));
    } catch (error) {
      console.error("Failed to delete PG:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/logout`, {}, { withCredentials: true });
      navigate("/welcome");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#E4DFDA] text-black">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b bg-[#007FFF] text-white">
        <div className="flex items-center gap-2">
          <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold">Habinest</span>
        </div>

        <nav className="space-x-4 text-sm text-gray-100 font-medium">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/filter")}>Find PGs</button>
          <button onClick={() => navigate("/bookmarks")}>Bookmarks</button>
        </nav>

        {/* Profile Dropdown */}
        <div className="relative">
          <button onClick={toggleDropdown} className="flex items-center gap-2">
            <img src="/profile.png" alt="User Avatar" className="w-10 h-10 rounded-full" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-[#504B3A]/20 rounded-lg shadow-lg w-48 py-2 z-10">
              <button onClick={() => navigate("/profile")} className="block w-full text-left px-4 py-2 text-sm text-[#504B3A]">
                Profile
              </button>
              <button className="block w-full text-left px-4 py-2 text-sm text-[#504B3A]">
                Settings
              </button>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-[#504B3A]">
                Log Out
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-3xl mx-auto space-y-6">
        {pgList.length === 0 ? (
          <p className="text-center text-gray-600">You have not added any PGs yet.</p>
        ) : (
          pgList.map((pg) => (
            <Card key={pg._id} className="rounded-xl shadow-md">
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold text-lg text-[#504B3A]">{pg.name}</h3>
                  <p className="text-sm text-gray-600">{pg.address}</p>
                </div>
                <div className="space-x-2">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full"
                    onClick={() => navigate(`/owner-form/${pg._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-[#D9534F] hover:bg-[#c9302c] text-white px-4 py-1 rounded-full"
                    onClick={() => handleDelete(pg._id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}

        <div className="flex justify-center pt-4">
          <Button
            className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800"
            onClick={() => navigate("/owner-form")}
          >
            Add New PG
          </Button>
        </div>
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
