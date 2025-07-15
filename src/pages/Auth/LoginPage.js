import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaIdBadge } from "react-icons/fa";
import { toast } from "react-toastify";
import { logIn } from "../../api/api.js";

const LoginPage = () => {
  const [role, setRole] = useState("doctor");
  const [emailOrId, setEmailOrId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailOrId.trim() || !password.trim()) {
      toast.dismiss();
      toast.error("Please fill in all fields.");
      return;
    }

    const credentials =
      role === "doctor"
        ? { email: emailOrId, password }
        : { id: emailOrId, password };

    try {
      const data = await logIn(credentials);

      if (data && data.data && data.data.user) {
        toast.dismiss();
        toast.success("Login successful!");

        if (data.data.user.role === "doctor") {
          navigate("/doctor/dashboard");
        } else {
          localStorage.setItem("patientId", data.data.id);
          navigate("/patient/patientDashboard");
        }
      } else {
        toast.dismiss();
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Login failed. Please try again.");
      console.error("Login error:", error);
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
          <p className="text-sm text-gray-700 mb-6">
            Sign in as registered user or doctor
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setRole("doctor")}
            className={`px-4 py-1 rounded-full font-semibold text-sm ${
              role === "doctor"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Doctor
          </button>
          <button
            onClick={() => setRole("patient")}
            className={`px-4 py-1 rounded-full font-semibold text-sm ${
              role === "patient"
                ? "bg-purple-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Patient
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            {role === "doctor" ? (
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            ) : (
              <FaIdBadge className="absolute left-3 top-3 text-gray-400" />
            )}
            <input
              type={role === "doctor" ? "email" : "text"}
              placeholder={role === "doctor" ? "Email" : "Patient ID"}
              className="w-full pl-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={emailOrId}
              onChange={(e) => setEmailOrId(e.target.value)}
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
      </div>
    </div>
  );
};

export default LoginPage;
