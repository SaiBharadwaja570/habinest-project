import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register"); // Navigate to the register page
  };

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async () => {
    // Clear previous messages
    setError('')
    setSuccess('')
    
    // Input validation
    if (!email || !password) {
      setError('Please enter both email and password')
      return
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setIsLoading(true)

    try {
      const apiObj = {
        email: email.trim(),
        password
      }

      console.log('Attempting login with:', { email: apiObj.email }) // Don't log password

      const response = await axios({
        method: 'POST',
        url: `${import.meta.env.VITE_BACKEND_USER}/login`,
        data: apiObj,
        withCredentials: true,
        timeout: 10000 // 10 second timeout
      })

      console.log('Login response:', response.data)
      
      setSuccess('Login successful! Redirecting...')
      
      // Small delay to show success message
      setTimeout(() => {
        navigate('/')
      }, 1000)

    } catch (err) {
      console.error('Login error:', err)
      
      // Handle different types of errors
      if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please check your internet connection and try again.')
      } else if (err.response) {
        // Server responded with error status
        const status = err.response.status
        const message = err.response.data?.message || 'Login failed'
        
        console.log('Server error details:', {
          status,
          message,
          data: err.response.data
        })

        switch (status) {
          case 400:
            setError(`Invalid request: ${message}`)
            break
          case 401:
            setError('Invalid email or password. Please check your credentials.')
            break
          case 404:
            setError('User not found. Please check your email or register first.')
            break
          case 409:
            setError(`Conflict: ${message}`)
            break
          case 500:
            setError('Server error. Please try again later.')
            break
          default:
            setError(`Login failed: ${message}`)
        }
      } else if (err.request) {
        // Network error - no response received
        console.log('Network error:', err.request)
        setError('Network error. Please check your internet connection and try again.')
      } else {
        // Other error
        console.log('Unexpected error:', err.message)
        setError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearMessages = () => {
    setError('')
    setSuccess('')
  }

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