import React, { useState, useMemo, useEffect } from "react";
import {
  User,
  Bell,
  Settings,
  Home,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";
import StatsCard from "../components/StatsCard";
import { useLatestPatients } from "../hooks/useLatestPatients";
import mockData from "../data/mockData.json";
import PatientTable from "../components/PatientsTable";
import { calculateAge } from "../utils/calculateAge";
import DiabetesDurationScatter from "../components/DiabetesDurationScatter";
import BMICategoryBar from "../components/BMICategoryBar";
import GenderDistribution from "../components/GenderDistribution";
import { highRiskCount } from "../utils/highRiskCount";
import AgeDistributionChart from "../components/AgeDistributionChart";
import RiskComparisonChart from "../components/RiskComparisionChart";
import NeuropathyPrevalenceChart from "../components/NeuropathyPrevalenceChart";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const allPatientData = useMemo(
    () => autoParseJsonStrings(mockData),
    [mockData]
  );

  const patientData = useLatestPatients(allPatientData);

  function autoParseJsonStrings(obj) {
    if (Array.isArray(obj)) {
      return obj.map(autoParseJsonStrings);
    }

    if (obj !== null && typeof obj === "object") {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = autoParseJsonStrings(value);
      }
      return result;
    }

    if (typeof obj === "string") {
      // Try to parse as JSON
      try {
        const trimmed = obj.trim();
        if (
          (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
          (trimmed.startsWith("[") && trimmed.endsWith("]"))
        ) {
          return JSON.parse(trimmed);
        }
      } catch (e) {
        // If parsing fails, return original string
      }
    }

    return obj;
  }



  const NavBar = () => (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <h1 className="text-2xl font-bold text-gray-900">Shooo</h1>
          <div className="flex space-x-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "dashboard"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home size={18} />
              <span>Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "patients"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Users size={18} />
              <span>Patients</span>
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "reports"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText size={18} />
              <span>Reports</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "analytics"
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp size={18} />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings size={20} />
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

  const DashboardContent = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Patients"
          value={patientData.length}
          subtitle="Active cases"
          color="blue"
        />
        <StatsCard
          title="Average Age"
          value={Math.round(
            patientData.reduce(
              (sum, p) => sum + calculateAge(p.allgemeineDaten.geburtsdatum),
              0
            ) / patientData.length
          )}
          subtitle="Years"
          color="green"
        />
        <StatsCard
          title="High Risk Cases"
          value={highRiskCount ({patientData})}
          subtitle="Type VI-VII"
          color="red"
        />
        <StatsCard
          title="Diabetes Type 2"
          value={
            patientData.filter((p) => p.allgemeineDaten.diabetestyp === "typ 2")
              .length
          }
          subtitle="Patients"
          color="yellow"
        />
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgeDistributionChart data={patientData}/>
        <GenderDistribution data={patientData}/>

      </div>
      <RiskComparisonChart data={patientData}/>
      <DiabetesDurationScatter data={patientData}/>
      <BMICategoryBar data={patientData}/>
      <NeuropathyPrevalenceChart data={patientData}/>
    </div>
  );

  const PatientContent = () => (
    <div className="space-y-6">
      <PatientTable patientData={patientData} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === "dashboard" && <DashboardContent />}
        {activeTab === "patients" && <PatientContent />}
        {activeTab === "reports" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Reports</h2>
            <p className="text-gray-600">
              Report generation features coming soon...
            </p>
          </div>
        )}
        {activeTab === "analytics" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Advanced Analytics
            </h2>
            <p className="text-gray-600">
              Advanced analytics features coming soon...
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
