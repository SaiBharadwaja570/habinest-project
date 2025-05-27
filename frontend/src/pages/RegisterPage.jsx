import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    clearMessages();
  };

  const validateForm = () => {
    const { name, phone, email, password } = form;
    if (!name || !phone || !email || !password) {
      return "All fields are required.";
    }
    if (!email.includes("@")) {
      return "Invalid email address.";
    }
    if (!/^\d{10}$/.test(phone)) {
      return "Phone number must be 10 digits.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    return null;
  };

  const handleRegister = async () => {
    clearMessages();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_USER}/register`,
        form,
        { withCredentials: true, timeout: 10000 }
      );

      setSuccess("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        setError("Request timed out. Please try again.");
      } else if (err.response) {
        const { status, data } = err.response;
        if (status === 409) {
          setError("User already exists.");
        } else {
          setError(data?.message || "Something went wrong.");
        }
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans">
      <section className="bg-blue-700 text-white py-16 px-4 text-center">
        <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>

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

        {success && (
          <div className="max-w-xl mx-auto mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            <span className="text-sm">{success}</span>
          </div>
        )}

        <div className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={handleChange}
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            className="w-full p-3 rounded-md text-black border border-black"
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            className={`px-6 py-2 rounded-md font-semibold ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white transition-colors`}
            onClick={handleRegister}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="bg-white text-blue-700 font-semibold px-6 py-2 rounded-md border border-blue-700 hover:bg-blue-100 transition-colors"
            disabled={isLoading}
          >
            Back to Login
          </button>
        </div>

        {isLoading && (
          <div className="mt-4">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
          </div>
        )}
      </section>
    </div>
  );
}
