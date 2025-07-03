import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout";

import Dashboard from "./pages/Doctor/Dashboard";
import PatientsPage from "./pages/Doctor/PatientsPage";
import ReportsPage from "./pages/Doctor/ReportsPage";
import AnalyticsPage from "./pages/Doctor/AnalyticsPage";
import PatientDetails from "./pages/Doctor/PatientDetails";

import PatientDashboard from "./pages/Patient/PatientDashboard";
import MOSQuestionnaire from "./pages/Patient/MOSQuestionnaire";
import MOSQuestionnaire2 from "./pages/Patient/MOSQuestionnaire2";

import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import Questionnaire from "./pages/Patient/Questionnaires";
import DiagnosticSheet from "./pages/Doctor/DiagnosticSheet";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Doctor Routes */}
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="diagnostic" element={<DiagnosticSheet />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="patientDetails/:id" element={<PatientDetails />} />
        </Route>

        {/* Patient Routes */}
        <Route path="/patient" element={<PatientLayout />}>
          <Route path="patientDashboard" element={<PatientDashboard />} />
          <Route path="questionnaire" element={<Questionnaire />} />
          <Route path="mosQuestionnaire1" element={<MOSQuestionnaire />} />
          <Route path="mosQuestionnaire2" element={<MOSQuestionnaire2 />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
