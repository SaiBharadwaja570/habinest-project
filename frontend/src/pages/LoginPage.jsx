import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Keep axios here as you are using it directly

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

  const handleLogin = async () => {
    // Clear previous messages at the start of a new login attempt
    setError('');
    setSuccess('');

    // --- Input Validation ---
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true); // Start loading state

    try {
      const apiObj = {
        email: email.trim(), // Trim whitespace from email
        password
      };

      console.log('Attempting login with email:', apiObj.email); // Log email for debugging, but NEVER password

      const response = await axios({
        method: 'POST',
        // Ensure VITE_BACKEND_USER points to your backend's auth base URL,
        // e.g., 'http://localhost:3000/auth' if your server mounts auth routes at '/auth'
        url: `${import.meta.env.VITE_BACKEND_USER}/login`,
        data: apiObj,
        withCredentials: true, // Important for sending/receiving cookies (if your backend uses session cookies)
        timeout: 10000 // 10 second timeout for the request
      });

      console.log('Login successful response data:', response.data);

      setSuccess('Login successful! Redirecting...');

      // Assuming your backend returns a token or user info on successful login
      // If your backend sets an HTTP-only cookie, you might not need to store anything here.
      // If it returns a JWT in the body, store it:
      if (response.data && response.data.token) {
          localStorage.setItem('userToken', response.data.token);
          // Potentially store user info too:
          // localStorage.setItem('userInfo', JSON.stringify(response.data.user));
      }

      // Small delay to show success message before navigating
      setTimeout(() => {
        navigate('/'); // Navigate to dashboard or home page
      }, 1000);

    } catch (err) {
      console.error('Login error caught in component:', err);

      // --- Enhanced Error Handling based on Axios error structure ---
      if (axios.isCancel(err)) {
        setError('Login request cancelled.');
      } else if (err.code === 'ECONNABORTED') {
        // Specific check for request timeout (Axios's code for timeouts)
        setError('Request timed out. Please check your internet connection and try again.');
      } else if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx (i.e., a server-side error)
        const status = err.response.status;
        const message = err.response.data?.message || err.response.statusText || 'Login failed due to server error.'; // Fallback to statusText

        console.log('Server responded with error details:', {
          status,
          message,
          data: err.response.data
        });

        switch (status) {
          case 400: // Bad Request: Often due to invalid input (e.g., missing fields, wrong format)
            setError(`Invalid request: ${message}`);
            break;
          case 401: // Unauthorized: Invalid credentials, missing/invalid token
            setError('Invalid email or password. Please check your credentials.');
            break;
          case 403: // Forbidden: Authenticated but not authorized to perform action
            setError('Access denied. You do not have permission to perform this action.');
            break;
          case 404: // Not Found: Endpoint or resource not found (e.g., user email not registered)
            setError('User not found or login endpoint is incorrect. Please check your email or register first.');
            break;
          case 409: // Conflict: (e.g., user already exists if trying to register, but could apply to login state)
            setError(`Conflict: ${message}`);
            break;
          case 429: // Too Many Requests: Rate limiting applied
            setError('Too many login attempts. Please try again after some time.');
            break;
          case 500: // Internal Server Error: Generic server-side error
            setError('Server error. Please try again later.');
            break;
          default: // Catch any other unexpected HTTP errors
            setError(`Login failed: ${message}`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        // This typically means a network issue or the backend server is down/unreachable
        console.log('Network error (no response received):', err.request);
        setError('Network error. Please check your internet connection and try again.');
      } else {
        // Something else happened in setting up the request that triggered an Error
        console.log('Unexpected error during request setup:', err.message);
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false); // Always stop loading, regardless of success or failure
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return (
    <div className="font-sans">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
        <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-12 w-12" />

        <div className="space-x-4 text-sm text-teal-700 font-medium">
          <a href="#" onClick={() => navigate('/')}>Home</a>
          <a href="#" onClick={() => navigate('/filter')}>Find PGs</a>
          <a href="#" onClick={() => navigate('/bookmarks')}>BookMarks</a>
        </div>
      </nav>

      {/* Login Section */}
      <section className="bg-blue-700 text-white py-16 px-4 text-center">
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
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={(e) => {
              setEmail(e.target.value)
              clearMessages() // Clear messages when user types
            }}
            disabled={isLoading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={(e) => {
              setPassword(e.target.value)
              clearMessages() // Clear messages when user types
            }}
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            className={`px-6 py-2 rounded-md font-semibold ${
              isLoading
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            } text-white transition-colors`}
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <button
            onClick={handleRegisterClick}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-semibold transition-colors"
            disabled={isLoading}
          >
            Register
          </button>
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
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
      <footer className="border-t p-8 bg-white text-sm text-gray-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          <div>
            <h4 className="font-semibold mb-2">Use Cases</h4>
            <ul className="space-y-1">
              <li>Student housing discovery</li>
              <li>Professional relocation</li>
              <li>Personalized PG Browse</li>
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