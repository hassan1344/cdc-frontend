// src/layouts/PatientLayout.js
import React from "react";
import PatientNavBar from "../components/PatientNavBar";
import { Outlet } from "react-router-dom";

const PatientLayout = () => {
  return (
    <>
      <PatientNavBar />
      <Outlet />
    </>
  );
};

export default PatientLayout;
