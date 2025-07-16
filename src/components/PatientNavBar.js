import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, FileText, User, LogOut } from "lucide-react";
import { fetchUserData } from "../api/api";

const PatientNavBar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
  }, []);

  useEffect(() => {
    if (!user) return;
    const parsedUser = JSON.parse(user);

    const getData = async () => {
      const data = await fetchUserData("patient", parsedUser.email);
      setUserData(data.data);
    };
    getData();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/"); // ← navigate to login
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-green-100 text-green-700"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <img
              src={require("../images/12818828.png")}
              alt="Logo"
              className="h-8 w-8 object-contain"
            />
            <h1 className="text-2xl font-bold text-gray-900">Shooo</h1>
          </div>{" "}
          <div className="flex space-x-6">
            <NavLink to="/patient/patientDashboard" className={navLinkClass}>
              <Home size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/patient/questionnaire" className={navLinkClass}>
              <FileText size={18} />
              <span>Questionnaire</span>
            </NavLink>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>

          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {userData?.name || "John Doe"}
              </p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PatientNavBar;
