import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  User,
  Bell,
  Settings,
  Home,
  FileText,
  TrendingUp,
  Users,
  LogOut,
} from "lucide-react";

const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here, e.g., clearing tokens, resetting state
    navigate("/"); // ← navigate to login
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? "bg-blue-100 text-blue-700"
        : "text-gray-600 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900">Shooo</h1>
          <div className="flex space-x-6">
            <NavLink to="/doctor/dashboard" className={navLinkClass}>
              <Home size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/doctor/patients" className={navLinkClass}>
              <Users size={18} />
              <span>Patients</span>
            </NavLink>
            <NavLink to="/doctor/diagnostic" className={navLinkClass}>
              <FileText size={18} />
              <span>Diagnostic Sheet</span>
            </NavLink>
            <NavLink to="/doctor/analytics" className={navLinkClass}>
              <TrendingUp size={18} />
              <span>Analytics</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={20} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 text-red-400 hover:text-red-600 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
          <div className="flex items-center space-x-3 pl-3 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Smith</p>
              <p className="text-xs text-gray-500">Podiatrist</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
