import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Heart, MapPin, Users, Star, Home, Search, Bookmark, User, Settings, LogOut, Menu } from "lucide-react";

const VisitPage = () => {
  const navigate = useNavigate();
  const [visits, setVisits] = useState(null);
  const [pgs, setPgs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const toggleDropdown = () => {
  setIsDropdownOpen((prev) => !prev);
};

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${import.meta.env.VITE_BACKEND_VISITS}/show`,
      withCredentials: true,
    })
      .then((res) => setVisits(res.data.data))
      .catch((err) => console.error('Visits not fetched', err));
  }, []);

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
    const fetchPGData = async () => {
      if (!visits || visits.length === 0) return;
      try {
        const pgIds = [...new Set(visits.map((visit) => visit.pgId))];
        const pgRequests = pgIds.map((pgId) =>
          axios.get(`${import.meta.env.VITE_BACKEND_PG}/${pgId}`)
        );
        const pgResponses = await Promise.all(pgRequests);
        const fetchedPgs = pgResponses.map((res) => res.data.data);
        setPgs(fetchedPgs);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching PG data:', error);
      }
    };
    fetchPGData();
  }, [visits]);

  const cardColors = [
    'border-l-blue-500 bg-blue-50',
    'border-l-green-500 bg-green-50',
    'border-l-purple-500 bg-purple-50',
    'border-l-orange-500 bg-orange-50',
    'border-l-pink-500 bg-pink-50',
    'border-l-teal-500 bg-teal-50',
  ];

  return (
    <div className="min-h-screen bg-[#f9fafb] flex flex-col">
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
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
                    >
                      <Search className="w-4 h-4" />
                      Your Pg's
                    </a>
                    <a 
                      href="#" 
                      onClick={() => navigate("/visits")}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
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

      <main className="flex-grow max-w-4xl mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          🗓️ Visit Records
        </h1>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white px-6 py-4 rounded-xl shadow animate-pulse text-gray-600">
              Loading visits and PG data...
            </div>
          </div>
        ) : visits && visits.length > 0 ? (
          <div className="space-y-6">
            {visits.map((visit, index) => {
              const pgInfo = pgs?.find((pg) => pg._id === visit.pgId);
              const colorClass = cardColors[index % cardColors.length];

              return (
                <div
                  key={visit._id}
                  className={`rounded-xl shadow border-l-4 ${colorClass} transition duration-300 hover:shadow-lg hover:-translate-y-1`}
                >
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-[#504B3A] mb-2 flex items-center gap-2">
                      👤 {visit.name}
                    </h3>
                    <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
                      <p>
                        <span className="font-medium text-gray-600">Email:</span> {visit.email}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">Phone:</span> {visit.phone}
                      </p>
                      <p>
                        <span className="font-medium text-gray-600">Date:</span>{' '}
                        {new Date(visit.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {pgInfo ? (
                    <div className="bg-white/70 rounded-b-xl border-t px-6 py-4 text-sm text-gray-700">
                      <h4 className="font-semibold text-[#69995D] mb-2">🏠 PG Details</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <p>
                          <span className="font-medium text-gray-600">Name:</span> {pgInfo.name}
                        </p>
                        <p>
                          <span className="font-medium text-gray-600">Address:</span> {pgInfo.address}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t px-6 py-4 text-sm text-gray-500">
                      PG data not found
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex justify-center items-center py-20">
            <div className="bg-white p-8 rounded-xl shadow-md text-gray-500 text-lg">
              No visits found
            </div>
          </div>
        )}
      </main>

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
};

export default VisitPage;
