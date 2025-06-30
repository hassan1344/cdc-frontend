import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Dashboard from "./pages/Doctor/Dashboard";
import PatientsPage from "./pages/Doctor/PatientsPage";
import ReportsPage from "./pages/Doctor/ReportsPage";
import AnalyticsPage from "./pages/Doctor/AnalyticsPage";
import PatientDetails from "./pages/Doctor/PatientDetails";
import MOSQuestionnaire from "./pages/Patient/MOSQuestionnaire";
import MOSQuestionnaire2 from "./pages/Patient/MOSQuestionnaire2";
import LoginPage from "./pages/Doctor/LoginPage";
import SignupPage from "./pages/Doctor/SignupPage";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <>
      {!hideNavbar && <NavBar />}
      {children}
    </>
  );
};

const App = () => {
  return (
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/patientDetails/:id" element={<PatientDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
            <Route path="/mosquestionnaire" element={<MOSQuestionnaire />} />
            <Route path="/mosquestionnaire2" element={<MOSQuestionnaire2 />} />
        </Routes>
      </Layout>
  )}
export default App;
