import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Home, User, LogOut } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };

useEffect(() => {
  const theme = localStorage.getItem('theme');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, []);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


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
        withCredentials: true,
        timeout: 30000,
      });

      setSuccess('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/welcome');
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
<div className="font-sans bg-gradient-to-br from-blue-100 to-blue-200 text-[#504B3A] dark:text-[#E4DFDA]">

  {/* Header */}
  <header className="bg-white/90 dark:bg-[#2e2e2e]/90 backdrop-blur-sm shadow-lg sticky top-0 z-50">
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
          <span className="font-bold text-2xl text-[#504B3A] dark:text-[#E4DFDA]">Habinest</span>
        </div>

        {/* Centered Home button */}
        <nav className="flex-1 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] dark:text-[#E4DFDA] hover:bg-[#69995D]/10 dark:hover:bg-[#69995D]/20 transition-all duration-200"
          >
            <Home className="w-4 h-4" />
            Home
          </button>
        </nav>

       
      </div>
    </div>
  </header>

  {/* Login Section */}
  <section className="flex flex-col items-center justify-center flex-1 px-4 py-16 text-[#504B3A] dark:text-[#E4DFDA]">
    <div className="w-full max-w-md bg-white/90 dark:bg-[#2e2e2e]/90 backdrop-blur rounded-2xl shadow-xl p-8 border border-gray-200 transition-transform transform hover:scale-105 duration-300">
      <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-800/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 rounded-lg shadow-sm flex justify-between items-center">
          <span className="text-sm font-medium">{error}</span>
          <button
            onClick={clearMessages}
            className="text-red-500 hover:text-red-700 font-bold ml-2 dark:hover:text-red-400"
          >
            &times;
          </button>
        </div>
      )}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-3 rounded-xl border border-[#504B3A]/20 dark:border-[#E4DFDA]/20 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 transition-colors text-[#504B3A] dark:text-[#E4DFDA] bg-white dark:bg-[#2e2e2e]"
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
          className="w-full p-3 rounded-xl border border-[#504B3A]/20 dark:border-[#E4DFDA]/20 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 transition-colors text-[#504B3A] dark:text-[#E4DFDA] bg-white dark:bg-[#2e2e2e]"
          onChange={(e) => {
            setPassword(e.target.value);
            clearMessages();
          }}
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-col items-center gap-6 mt-8">
  {/* Main Login Button */}
  <button
    className={`w-full max-w-sm px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
      isLoading
        ? 'bg-gray-400 cursor-not-allowed text-gray-200'
        : 'bg-[#69995D] hover:bg-[#5e8d52] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
    } text-white shadow-md`}
    onClick={handleLogin}
    disabled={isLoading}
  >
    {isLoading ? (
      <span className="flex items-center justify-center gap-2">
        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        Logging in...
      </span>
    ) : (
      'Login'
    )}
  </button>

  {/* Divider with "OR" */}
  <div className="flex items-center w-full max-w-sm gap-4">
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    <span className="text-sm text-gray-500 font-medium px-2">OR</span>
    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  </div>

  {/* Sign Up Section */}
  <div className="text-center space-y-3">
    <p className="text-gray-600 text-sm">
      Don't have an account yet?
    </p>
    <button
      onClick={handleRegisterClick}
      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 border-2 ${
        isLoading
          ? 'border-gray-300 text-gray-400 cursor-not-allowed'
          : 'border-[#007FFF] text-[#007FFF] hover:bg-[#007FFF] hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]'
      }`}
      disabled={isLoading}
    >
      Create New Account
    </button>
    <p className="text-xs text-gray-500">
      Join thousands of users finding their perfect PG
    </p>
  </div>
</div>

      {isLoading && (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#504B3A] dark:border-[#E4DFDA]"></div>
        </div>
      )}
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
