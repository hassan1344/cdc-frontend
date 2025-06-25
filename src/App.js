import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import PatientsPage from "./pages/PatientsPage";
import ReportsPage from "./pages/ReportsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import PatientDetails from "./pages/PatientDetails"

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
            <Route path="/patientDetails/:id" element={<PatientDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
