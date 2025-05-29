import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Home, Search, Bookmark, User, Settings, LogOut, MapPin, Users, Star } from "lucide-react";

export default function FilterListingPage() {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [genderFilter, setGenderFilter] = useState("");
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      navigate("/");
      localStorage.removeItem("isLoggedIn");
    } catch (error) {
      console.error("Logout failed:", error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_PG}`, {
          params: {
            ...(debouncedSearch && { name: debouncedSearch }),
            ...(minPrice > 0 && { minPrice }),
            ...(maxPrice < 50000 && { maxPrice }),
            ...(genderFilter && { gender: genderFilter }),
          },
        });
        setListings(res.data.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [debouncedSearch, minPrice, maxPrice, genderFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E4DFDA] to-[#69995D]/10">
      {/* Navbar */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/HabinestLogo.jpg" alt="Habinest" className="w-10 h-10 object-cover" />
            <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button
              onClick={() => navigate("/filter")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
            >
              <Search className="w-4 h-4" /> Find PGs
            </button>
            <button
              onClick={() => navigate("/bookmarks")}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
            >
              <Bookmark className="w-4 h-4" /> Bookmarks
            </button>
          </nav>

          <div className="relative">
                    {isLoggedIn ? (
                      <>
                        <button
                          onClick={toggleDropdown}
                          className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007FFF] to-[#69995D] hover:scale-105 transition-transform duration-200"
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
                              <User className="w-4 h-4" /> Profile
                            </a>
                            <a
                              href="#"
                              onClick={handleLogout}
                              className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="w-4 h-4"/> Log Out
                            </a>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate("/login")}
                          className="px-4 py-2 rounded-lg text-[#504B3A] border border-[#504B3A]/20 hover:bg-[#69995D]/10 transition-all duration-200"
                        >
                          Login
                        </button>
                        <button
                          onClick={() => navigate("/register")}
                          className="px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow hover:bg-[#007FFF]/90 transition-all duration-200"
                        >
                          Register
                        </button>
                      </div>
                    )}
                  </div>
        </div>
      </header>

      {/* Filters & Listings */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow mb-8">
          <h2 className="text-2xl font-bold mb-4 text-[#504B3A]">Filter Listings</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-xl border border-[#504B3A]/20 focus:outline-none w-full mb-4"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold">Gender</label>
              <select
                className="w-full px-2 py-1 border rounded mt-1"
                value={genderFilter}
                onChange={(e) => setGenderFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Gents">Gents</option>
                <option value="Women">Women</option>
                <option value="Coliving">Coliving</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Min Price</label>
              <input
                type="range"
                min="1000"
                max={maxPrice}
                step="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="text-sm">₹{minPrice}</div>
            </div>

            <div>
              <label className="block font-semibold">Max Price</label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.length === 0 ? (
            <p className="text-center col-span-full text-[#504B3A]/70">
              No listings found. Try adjusting filters.
            </p>
          ) : (
            listings.map((listing) => (
              <div
                key={listing._id}
                className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-white/50"
                onClick={() => navigate(`/${listing._id}`)}
              >
                <div className="relative">
                  <img
                    src={listing.photo}
                    alt={listing.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#69995D] text-white px-3 py-1 rounded-full text-xs font-semibold">
                      {listing.gender}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-[#504B3A] mb-2">{listing.name}</h3>
                  <div className="flex items-center gap-2 text-[#504B3A]/70 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{listing.address}</span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#69995D]" />
                      <span className="text-sm text-[#504B3A]">{listing.sharingType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-[#504B3A]">{listing.rating || "N/A"}</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#007FFF]">₹{listing.priceRange}</div>
                  {listing.amenities && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {listing.amenities.slice(0, 3).map((a, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-[#E4DFDA] text-[#504B3A] rounded-lg"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

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
