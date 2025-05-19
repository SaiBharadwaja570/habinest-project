import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [phone, setPhone]= useState('')
  const [password, setPassword]= useState('')

  const handleRegister= async ()=>{
    const apiObj={
      name,
      email,
      phone,
      password
    }
    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/user/register',
      data: apiObj
    }).then(()=>{
      alert("User registered succesfully")
      navigate('/login')
    })
  }

  return (
    <div className="font-sans">
{/* Navbar */}
<nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
  <img src="/HabinestLogo.jpg" alt="Habinest Logo" className="h-12 w-12" />

  <div className="space-x-4 text-sm text-teal-700 font-medium">
        <a href="#" onClick={()=>navigate('/')}>Home</a>
        <a href="#" onClick={()=>navigate('/filter')}>Find PGs</a>
        <a href="#" onClick={()=>navigate('/bookmarks')}>BookMarks</a>
  </div>
</nav>
        <section className="bg-green-600 text-white py-16 px-4 text-center">
          <h1 className="text-3xl font-bold mb-8">Register</h1>
          <div className="max-w-xl mx-auto space-y-4">
            <input
          type="text"
          placeholder="Name"
          className="w-full p-3 rounded-md text-black border border-black"
          onChange={(e)=>{setName(e.target.value)}}
            />
            <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md text-black border border-black"
          onChange={(e)=>{setEmail(e.target.value)}}
            />
            <input
          type="number"
          placeholder="Phone number"
          className="w-full p-3 rounded-md text-black border border-black"
          onChange={(e)=>{setPhone(e.target.value)}}
            />
            <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md text-black border border-black"
          onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <div className="flex justify-center gap-4 mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-semibold" onClick={handleRegister}>
          Register
            </button>
            <button
          onClick={handleLoginClick} // Add click handler
            className="bg-black text-white px-6 py-2 rounded-md font-semibold"
          >
            Login
          </button>
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
