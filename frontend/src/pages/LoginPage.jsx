import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Home, Search, Bookmark, User, Settings, LogOut } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('userToken');
    setIsDropdownOpen(false);
    navigate('/login');
  };

  // const handleLogin = async () => {
  //   setError('');
  //   setSuccess('');

  //   // --- Input Validation ---
  //   if (!email || !password) {
  //     setError('Please enter both email and password.');
  //     return;
  //   }

  //   if (!email.includes('@')) {
  //     setError('Please enter a valid email address.');
  //     return;
  //   }

  //   setIsLoading(true);

  //   try {
  //     const apiObj = {
  //       email: email.trim(),
  //       password,
  //     };

  //     console.log('Attempting login with email:', apiObj.email);

  //     // Note: Using placeholder URL since we don't have access to environment variables
  //     const response = await axios({
  //       method: 'POST',
  //       url: `${import.meta.env.VITE_BACKEND_USER}/login`,
  //       data: apiObj,
  //       withCredentials: true,
  //       timeout: 10000,
  //     });

  //     console.log('Login successful response data:', response.data);

  //     setSuccess('Login successful! Redirecting...');

  //     if (response.data && response.data.token) {
  //       localStorage.setItem('userToken', response.data.token);
  //     }

  //     setTimeout(() => {
  //       navigate('/');
  //     }, 1000);

  //   } catch (err) {
  //     console.error('Login error caught in component:', err);

  //     if (axios.isCancel(err)) {
  //       setError('Login request cancelled.');
  //     } else if (err.code === 'ECONNABORTED') {
  //       setError('Request timed out. Please check your internet connection and try again.');
  //     } else if (err.response) {
  //       const status = err.response.status;
  //       const message = err.response.data?.message || err.response.statusText || 'Login failed due to server error.';

  //       console.log('Server responded with error details:', {
  //         status,
  //         message,
  //         data: err.response.data,
  //       });

  //       switch (status) {
  //         case 400:
  //           setError(`Invalid request: ${message}`);
  //           break;
  //         case 401:
  //           setError('Invalid email or password. Please check your credentials.');
  //           break;
  //         case 403:
  //           setError('Access denied. You do not have permission to perform this action.');
  //           break;
  //         case 404:
  //           setError('User not found or login endpoint is incorrect. Please check your email or register first.');
  //           break;
  //         case 409:
  //           setError(`Conflict: ${message}`);
  //           break;
  //         case 429:
  //           setError('Too many login attempts. Please try again after some time.');
  //           break;
  //         case 500:
  //           setError('Server error. Please try again later.');
  //           break;
  //         default:
  //           setError(`Login failed: ${message}`);
  //       }
  //     } else if (err.request) {
  //       console.log('Network error (no response received):', err.request);
  //       setError('Network error. Please check your internet connection and try again.');
  //     } else {
  //       console.log('Unexpected error during request setup:', err.message);
  //       setError('An unexpected error occurred. Please try again.');
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLogin = async () => {
    setError('');
    setSuccess('');

    if (!email || !password) {
        setError('Please enter both email and password.');
        return;
    }

    if (!email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsLoading(true);

    try {
        const apiObj = {
            email: email.trim(),
            password,
        };

        const response = await axios({
            method: 'POST',
            url: `${import.meta.env.VITE_BACKEND_USER}/login`,
            data: apiObj,
            withCredentials: true, // This is crucial for cookies
            timeout: 10000,
        });

        console.log('Login successful, user:', response.data.data);
        setSuccess('Login successful! Redirecting...');

        // No need to store tokens - they're in HTTP-only cookies
        setTimeout(() => {
            navigate('/');
        }, 1000);

    } catch (err) {
        // Your existing error handling...
    } finally {
        setIsLoading(false);
    }
};

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="font-sans">
      <header className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg overflow-hidden">
          <img
            src="HabinestLogo.jpg"
            alt="Home"
            className="w-10 h-10 object-cover"
          />
</div>

              <span className="font-bold text-2xl text-[#504B3A]">Habinest</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button 
                onClick={() => navigate("/filter")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] hover:bg-[#69995D]/10 transition-all duration-200"
              >
                <Search className="w-4 h-4" />
                Find PGs
              </button>
              <button 
                onClick={() => navigate("/bookmarks")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#007FFF] text-white shadow-lg"
              >
                <Bookmark className="w-4 h-4" />
                BookMarks
              </button>
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
                <div className="absolute right-0 mt-2 bg-white/95 backdrop-blur-sm border border-[#504B3A]/10 rounded-2xl shadow-2xl w-56 py-2">
                  <button 
                    onClick={() => navigate("/profile")} 
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors text-left"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] hover:bg-[#69995D]/10 transition-colors text-left">
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors text-left">
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Login Section */}
      {/* Login Section */}
<section className="bg-gradient-to-br from-[#69995D]/10 to-[#E4DFDA]/40 text-[#504B3A] py-16 px-4 text-center">
  <h1 className="text-3xl font-bold mb-8">Login</h1>

  {/* Error Message */}
  {error && (
    <div className="max-w-xl mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <div className="flex justify-between items-center">
        <span className="text-sm">{error}</span>
        <button
          onClick={clearMessages}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          ×
        </button>
      </div>
    </div>
  )}

  {/* Success Message */}
  {success && (
    <div className="max-w-xl mx-auto mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
      <span className="text-sm">{success}</span>
    </div>
  )}

  <div className="max-w-xl mx-auto space-y-4">
    <input
      type="email"
      placeholder="Email"
      value={email}
      className="w-full p-3 rounded-md border border-[#504B3A]/20 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors text-[#504B3A]"
      onChange={(e) => {
        setEmail(e.target.value);
        clearMessages();
      }}
      disabled={isLoading}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      className="w-full p-3 rounded-md border border-[#504B3A]/20 focus:outline-none focus:ring-2 focus:ring-green-300 transition-colors text-[#504B3A]"
      onChange={(e) => {
        setPassword(e.target.value);
        clearMessages();
      }}
      disabled={isLoading}
    />
  </div>

  <div className="flex justify-center gap-4 mt-8">
    <button
      className={`px-6 py-2 rounded-md font-semibold ${
        isLoading
          ? 'bg-gray-500 cursor-not-allowed'
          : 'bg-[#69995D] hover:bg-[#5e8d52]'
      } text-white transition-colors`}
      onClick={handleLogin}
      disabled={isLoading}
    >
      {isLoading ? 'Logging in...' : 'Login'}
    </button>

    <button
      onClick={handleRegisterClick}
      className="bg-[#007FFF] hover:bg-[#0066CC] text-white px-6 py-2 rounded-md font-semibold transition-colors"
      disabled={isLoading}
    >
      Register
    </button>
  </div>

  {/* Loading indicator */}
  {isLoading && (
    <div className="mt-4">
      <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#504B3A]"></div>
    </div>
  )}
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