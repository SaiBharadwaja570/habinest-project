import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Heart, MapPin, Users, Star, Home, Search, Bookmark, User, Settings, LogOut, Menu } from "lucide-react";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the login page
  };

  const [name, setName]= useState('');
  const [email, setEmail]= useState('');
  const [phone, setPhone]= useState('');
  const [password, setPassword]= useState('');
  const [error, setError] = useState(null); // error message state

  const handleRegister= async () => {
    setError(null); // reset error on new submit
    const apiObj = { name, email, phone, password };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/register`, apiObj);
      alert("User registered successfully");
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  const handleRegisterAsOwner= async () => {
    setError(null);
    const apiObj = { name, email, phone, password, type: "owner" };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_USER}/register`, apiObj);
      alert("User registered successfully");
      navigate('/login');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="font-sans">
      <section className="flex flex-col items-center justify-center bg-gradient-to-br from-green-500 to-green-700 py-16 px-4">
        <div className="w-full max-w-md bg-white/90 backdrop-blur shadow-2xl rounded-3xl p-8 border border-[#504B3A]/10 transition-all duration-300">
          <h1 className="text-2xl font-bold text-center mb-6 text-[#504B3A]">Create an Account</h1>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              type="number"
              placeholder="Phone number"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#69995D] text-sm text-gray-800 placeholder-gray-400 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>

          {error && (
            <div className="mt-4 text-red-600 text-center font-semibold">
              {error}
            </div>
          )}

          <div className="flex justify-between gap-4 mt-8">
            <button
              onClick={handleRegister}
              className="flex-1 py-2 rounded-xl font-semibold text-white bg-[#007FFF] hover:bg-[#0066CC] transition-colors text-center"
            >
              Register as User
            </button>

            <button
              onClick={handleRegisterAsOwner}
              className="flex-1 py-2 rounded-xl font-semibold text-white bg-[#007FFF] hover:bg-[#0066CC] transition-colors text-center"
            >
              Register as Owner
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
        {/* ...rest of your info section here (unchanged) */}
      </section>

      {/* Footer */}
      <footer className="mt-16 bg-gradient-to-br from-[#504B3A] to-[#69995D] text-white">
        {/* ...rest of your footer here (unchanged) */}
      </footer>
    </div>
  );
}
