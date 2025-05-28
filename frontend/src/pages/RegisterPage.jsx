import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Heart, MapPin, Users, Star, Home, Search, Bookmark, User, Settings, LogOut, Menu } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(''); // Keep as string for phone numbers
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState('');     // State for error messages
  const [success, setSuccess] = useState(''); // State for success messages

  // Function to clear all messages
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  const performRegistration = async (userType) => {
    // Clear previous messages at the start of a new registration attempt
    clearMessages();

    // --- Input Validation ---
    if (!name || !email || !phone || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) { // Example: minimum password length
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Basic phone number validation (can be more robust with regex)
    // Check if it's purely digits and has a reasonable length
    if (!/^\d{10,15}$/.test(phone)) { // Allows 10-15 digits
        setError('Please enter a valid phone number (10-15 digits).');
        return;
    }

    setIsLoading(true); // Start loading state

    try {
      const apiObj = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password,
        type: userType // 'user' or 'owner'
      };

      console.log(`Attempting registration as ${userType} with:`, { name: apiObj.name, email: apiObj.email }); // Don't log password

      const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BACKEND_USER}/register`, 
        data: apiObj,
        timeout: 10000 // 10 second timeout for the request
      });

      console.log('Registration successful response data:', response.data);

      setSuccess(`User registered successfully as ${userType}! Redirecting to login...`);

      // Small delay to show success message before navigating
      setTimeout(() => {
        navigate('/login'); // Navigate to login page after successful registration
      }, 1500);

    } catch (err) {
      console.error('Registration error caught in component:', err);

      // --- Enhanced Error Handling based on Axios error structure ---
      if (axios.isCancel(err)) {
        setError('Registration request cancelled.');
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please check your internet connection and try again.');
      } else if (err.response) {
        // The request was made and the server responded with a status code
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText || 'Registration failed due to server error.';

        console.log('Server responded with error details:', {
          status,
          message,
          data: err.response.data
        });

        switch (status) {
          case 400: // Bad Request: Often due to invalid input (e.g., email already exists, validation errors)
            setError(`Registration failed: ${message}`);
            break;
          case 409: // Conflict: Typically means user with that email already exists
            setError(`User with this email already exists. Please try logging in or use a different email.`);
            break;
          case 500: // Internal Server Error: Generic server-side error
            setError('Server error during registration. Please try again later.');
            break;
          default: // Catch any other unexpected HTTP errors
            setError(`Registration failed: ${message}`);
        }
      } else if (err.request) {
        // The request was made but no response was received (network error)
        console.log('Network error (no response received):', err.request);
        setError('Network error. Please check your internet connection and try again.');
      } else {
        // Something else happened in setting up the request that triggered an Error
        console.log('An unexpected error occurred during request setup:', err.message);
        setError('An unexpected error occurred during registration. Please try again.');
      }
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  const handleRegister = () => performRegistration('user');
  const handleRegisterAsOwner = () => performRegistration('owner');

  return (
    <div className="font-sans">
      <section className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 py-16 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-2xl rounded-3xl p-8 border border-[#504B3A]/10 transition-all duration-300">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#504B3A]">Create an Account</h1>

          {/* Error Message Display */}
          {error && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg shadow-sm">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{error}</span>
                <button
                  onClick={clearMessages}
                  className="text-red-500 hover:text-red-700 ml-2 font-bold"
                >
                  &times;
                </button>
              </div>
            </div>
          )}

          {/* Success Message Display */}
          {success && (
            <div className="max-w-md mx-auto mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg shadow-sm">
              <span className="text-sm font-medium">{success}</span>
            </div>
          )}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              value={name} // Controlled component
              onChange={(e) => { setName(e.target.value); clearMessages(); }}
              disabled={isLoading}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              value={email} // Controlled component
              onChange={(e) => { setEmail(e.target.value); clearMessages(); }}
              disabled={isLoading}
            />

            <input
              type="text" // Changed to text for phone number for better handling
              placeholder="Phone number"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              value={phone} // Controlled component
              onChange={(e) => { setPhone(e.target.value); clearMessages(); }}
              disabled={isLoading}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              value={password} // Controlled component
              onChange={(e) => { setPassword(e.target.value); clearMessages(); }}
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-between gap-4 mt-8">
            <button
              onClick={handleRegister}
              className={`flex-1 py-2 rounded-xl font-semibold text-white transition-colors text-center ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#007FFF] hover:bg-[#0066CC]'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register as User'}
            </button>

            <button
              onClick={handleRegisterAsOwner}
              className={`flex-1 py-2 rounded-xl font-semibold text-white transition-colors text-center ${
                isLoading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-[#007FFF] hover:bg-[#0066CC]'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Registering...' : 'Register as Owner'}
            </button>

            <button
              onClick={handleLoginClick}
              className={`flex-1 py-2 rounded-xl font-semibold text-[#504B3A] border border-[#504B3A] transition-colors text-center ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#504B3A]/10'
              }`}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
          {isLoading && (
            <div className="text-center mt-4">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
            </div>
          )}
        </div>
      </section>

     
    </div>
  );
}
