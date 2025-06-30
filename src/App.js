import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Doctor/Dashboard";
import PatientsPage from "./pages/Doctor/PatientsPage";
import ReportsPage from "./pages/Doctor/ReportsPage";
import AnalyticsPage from "./pages/Doctor/AnalyticsPage";
import PatientDetails from "./pages/Doctor/PatientDetails";
import MOSQuestionnaire from "./pages/Patient/MOSQuestionnaire";
import MOSQuestionnaire2 from "./pages/Patient/MOSQuestionnaire2";

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
            <Route path="/mosquestionnaire" element={<MOSQuestionnaire />} />
            <Route path="/mosquestionnaire2" element={<MOSQuestionnaire2 />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
