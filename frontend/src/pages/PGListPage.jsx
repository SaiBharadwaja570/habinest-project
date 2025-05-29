import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, Search, Bookmark, User, LogOut } from "lucide-react";

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

      <div className="p-8 max-w-3xl mx-auto space-y-6">
        {pgList.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-inner border border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">You have not added any PGs yet.</p>
          </div>
        ) : (
          pgList.map((pg) => (
            <Card
              key={pg._id}
              className="rounded-2xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden"
            >
              {/* Image */}
              {pg.photo && (
                <div className="relative">
                  <img
                    src={pg.photo}
                    alt={pg.name}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#69995D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {pg.gender}
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <CardContent className="flex justify-between items-center p-6">
                <div>
                  <h3 className="font-bold text-lg text-[#504B3A] mb-1">{pg.name}</h3>
                  <p className="text-sm text-gray-500">{pg.address}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    className="bg-[#007FFF] hover:bg-[#0066cc] text-white px-4 py-1 rounded-full shadow-sm transition-colors"
                    onClick={() => navigate(`/owner-form/${pg._id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="bg-[#D9534F] hover:bg-[#c9302c] text-white px-4 py-1 rounded-full shadow-sm transition-colors"
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
      </div>

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