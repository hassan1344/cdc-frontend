import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login data:", { email, password });
    // Add API call here

    if (email.includes("doctor")) {
      navigate("/doctor/dashboard");
    } else {
      localStorage.setItem("patientId", password);
      navigate(`/patient/patientDashboard`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 px-4">
      <div className="bg-white bg-opacity-60 shadow-xl rounded-3xl p-8 w-full max-w-md backdrop-blur-md">
      <div className="flex flex-col items-center">
                <div className="bg-purple-300 p-3 rounded-full mb-4">
                  <FaUser className="text-white text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-purple-800 mb-1">Login</h2>
                <p className="text-sm text-gray-700 mb-6">Sign in as registered user and doctor</p>
              </div>
      
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 transition font-semibold"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-700">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-purple-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
