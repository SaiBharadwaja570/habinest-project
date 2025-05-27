import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { Heart, MapPin, Users, Star, Home, Search, Bookmark, User, Settings, LogOut, Menu } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [phone, setPhone]= useState('')
  const [password, setPassword]= useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleRegister= async ()=>{
    const apiObj={
      name,
      email,
      phone,
      password
    }
    axios({
      method: 'POST',
      url: `${import.meta.env.VITE_BACKEND_USER}/register`,
      data: apiObj
    }).then(()=>{
      alert("User registered succesfully")
      navigate('/login')
    })
  }

  return (
    <div className="font-sans">
      {/* Navbar */}
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
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Home
              </a>
              <a 
                href="#" 
                onClick={() => navigate("/filter")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Find PGs
              </a>
              <a 
                href="#" 
                onClick={() => navigate("/bookmarks")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
              >
                <Bookmark className="w-4 h-4" />
                BookMarks
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
                  <a href="#" className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors">
                    <Settings className="w-4 h-4" />
                    Toggle
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
<section className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 py-16 px-4">
  <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-2xl rounded-3xl p-8 border border-[#504B3A]/10 transition-all duration-300">
    <h1 className="text-2xl font-bold text-center mb-6 text-[#504B3A]">Create an Account</h1>

    <div className="space-y-4">
      <input
        type="text"
        placeholder="Name"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="number"
        placeholder="Phone number"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <div className="flex justify-between gap-4 mt-8">
      <button
        onClick={handleRegister}
        className="flex-1 py-2 rounded-xl font-semibold text-white bg-[#007FFF] hover:bg-[#0066CC] transition-colors text-center"
      >
        Register
      </button>

      <button
        onClick={handleLoginClick}
        className="flex-1 py-2 rounded-xl font-semibold text-[#504B3A] border border-[#504B3A] hover:bg-[#504B3A]/10 transition-colors text-center"
      >
        Login
      </button>
    </div>
  </div>
</section>


{/* Info Section */}
<section className="py-12 px-4 text-center">
  <h2 className="text-xl font-semibold">Discover PGs That Fit You</h2>
  <p className="text-gray-500 mb-8">
    Your personalized gateway to secure, fast, and smart accommodation discovery.
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
    <div>
      <div className="text-xl mb-2">ⓘ Personalized Listings</div>
      <p className="text-sm text-gray-600">
        Get PG recommendations tailored to your preferences like location, price, room sharing, and amenities.
      </p>
    </div>
    <div>
      <div className="text-xl mb-2">ⓘ Book Visits Instantly</div>
      <p className="text-sm text-gray-600">
        Select a date and time to schedule a visit for any PG with real-time availability and confirmation.
      </p>
    </div>
    <div>
      <div className="text-xl mb-2">ⓘ Interactive Map Search</div>
      <p className="text-sm text-gray-600">
        Explore PGs on a live map with accurate geolocation, powered by OpenStreetMap and Overpass API.
      </p>
    </div>
    <div>
      <div className="text-xl mb-2">ⓘ Save Favorites</div>
      <p className="text-sm text-gray-600">
        Bookmark PGs you like and return to them anytime without starting your search from scratch.
      </p>
    </div>
    <div>
      <div className="text-xl mb-2">ⓘ Secure User Dashboard</div>
      <p className="text-sm text-gray-600">
        Manage your profile, preferences, and password from a central dashboard with responsive design.
      </p>
    </div>
    <div>
      <div className="text-xl mb-2">ⓘ Honest Ratings & Reviews</div>
      <p className="text-sm text-gray-600">
        View and submit ratings to make smarter decisions based on real user feedback.
      </p>
    </div>
  </div>
</section>


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