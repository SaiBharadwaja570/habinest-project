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

const toggleDarkMode = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  console.log('Toggled dark mode:', isDark); // debug
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
    // Placeholder for logout logic
    console.log('Logging out...');
  };

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
        url: `https://habinest-project-hapj.vercel.app/api/user/login`,
        data: apiObj,
        withCredentials: true,
        timeout: 30000,
      });

      console.log('Login successful, user:', response.data.data);
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
    <div className="font-sans bg-white dark:bg-[#1c1c1c] text-[#504B3A] dark:text-[#E4DFDA]">

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

            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#504B3A] dark:text-[#E4DFDA] hover:bg-[#69995D]/10 dark:hover:bg-[#69995D]/20 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </nav>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-[#007FFF] to-[#69995D] p-0.5 hover:scale-105 transition-transform duration-200"
              >
                <div className="w-full h-full rounded-full bg-white dark:bg-[#333] flex items-center justify-center">
                  <User className="w-6 h-6 text-[#504B3A] dark:text-[#E4DFDA]" />
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white/95 dark:bg-[#2e2e2e]/95 backdrop-blur-sm border border-[#504B3A]/10 dark:border-[#E4DFDA]/10 rounded-2xl shadow-2xl w-56 py-2">
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] dark:text-[#E4DFDA] hover:bg-[#69995D]/10 dark:hover:bg-[#69995D]/20 transition-colors text-left"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-[#504B3A] dark:text-[#E4DFDA] hover:bg-[#69995D]/10 dark:hover:bg-[#69995D]/20 transition-colors text-left"
                  >
                    🌓 Toggle Dark Mode
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-800/20 transition-colors text-left"
                  >
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
      <section className="bg-gradient-to-br from-[#69995D]/10 to-[#E4DFDA]/40 dark:from-[#2e2e2e]/40 dark:to-[#1c1c1c]/40 text-[#504B3A] dark:text-[#E4DFDA] py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Login</h1>

        {error && (
          <div className="max-w-xl mx-auto mb-4 p-4 bg-red-100 dark:bg-red-800/30 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-400 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-sm">{error}</span>
              <button
                onClick={clearMessages}
                className="text-red-500 hover:text-red-700 ml-2 dark:hover:text-red-400"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {success && (
          <div className="max-w-xl mx-auto mb-4 p-4 bg-green-100 dark:bg-green-800/30 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-400 rounded-md">
            <span className="text-sm">{success}</span>
          </div>
        )}

        <div className="max-w-xl mx-auto space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-3 rounded-md border border-[#504B3A]/20 dark:border-[#E4DFDA]/20 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 transition-colors text-[#504B3A] dark:text-[#E4DFDA] bg-white dark:bg-[#2e2e2e]"
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
            className="w-full p-3 rounded-md border border-[#504B3A]/20 dark:border-[#E4DFDA]/20 focus:outline-none focus:ring-2 focus:ring-green-300 dark:focus:ring-green-600 transition-colors text-[#504B3A] dark:text-[#E4DFDA] bg-white dark:bg-[#2e2e2e]"
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
            Signup
          </button>
        </div>

        {isLoading && (
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-[#504B3A] dark:border-[#E4DFDA]"></div>
          </div>
        )}
      </section>

      {/* Info Section */}
      <section className="py-12 px-4 text-center">
        <h2 className="text-xl font-semibold">Discover PGs That Fit You</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Your personalized gateway to secure, fast, and smart accommodation discovery.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          {/* Cards remain unchanged */}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] dark:from-[#1c1c1c] dark:to-[#333] text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Footer remains unchanged */}
        </div>
      </footer>
    </div>
  );
}
