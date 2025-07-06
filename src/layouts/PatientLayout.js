// src/layouts/PatientLayout.js
import React from "react";
import PatientNavBar from "../components/PatientNavBar";
import { Outlet } from "react-router-dom";
import { PatientProvider } from "../context/PatientContext";

const PatientLayout = () => {
  return (
  <PatientProvider>
      <PatientNavBar />
      <Outlet />
    </PatientProvider>
  );
};

export default PatientLayout;
