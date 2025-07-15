import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdCard } from "react-icons/fa";
import { signUp } from "../../api/api.js";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate= useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { id, name, email, password, confirmPassword } = formData;

    if (!id || !name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (!isEmailValid(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

     const payload = {
      email,
      name,
      id,
      password,
      role: "patient", // fixed role
    };

    try {
      const result = await signUp(payload);
      alert("Signup successful!");
      console.log("Signup response:", result);
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-4">
      <div className="bg-white bg-opacity-60 shadow-xl rounded-3xl p-8 w-full max-w-md backdrop-blur-md">
        <div className="flex flex-col items-center">
          <div className="bg-purple-300 p-3 rounded-full mb-4">
            <FaUser className="text-white text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-purple-800 mb-1">Create Account</h2>
          <p className="text-sm text-gray-700 mb-6">If you are our patient, Join Now!</p>
        </div>

        {error && <div className="mb-4 text-red-600 text-sm text-center">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-4">

          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

                    <div className="relative">
                      
            <FaIdCard className="absolute left-3 top-3 text-gray-400" />
            <input
            type="text"
            name="id"
            placeholder="ID"
            autoComplete="off"   // Prevent autofill
            value={formData.id}
            onChange={handleChange}
            className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          </div>


          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account? <Link to="/" className="text-purple-600 hover:underline">Sign In</Link>
        </p>

        <p className="mt-2 text-xs text-gray-500 text-center">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
