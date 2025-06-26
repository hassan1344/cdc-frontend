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
import StatsCard from "../../components/StatsCard";
import { useLatestPatients } from "../../hooks/useLatestPatients";
import mockData from "../../data/mockData.json";
import PatientTable from "../../components/PatientsTable";
import { calculateAge } from "../../utils/calculateAge";
import DiabetesDurationScatter from "../../components/DiabetesDurationScatter";
import BMICategoryBar from "../../components/BMICategoryBar";
import GenderDistribution from "../../components/GenderDistribution";
import { highRiskCount } from "../../utils/highRiskCount";
import AgeDistributionChart from "../../components/AgeDistributionChart";
import RiskComparisonChart from "../../components/RiskComparisionChart";
import NeuropathyPrevalenceChart from "../../components/NeuropathyPrevalenceChart";

const AnalyticsPage = () => {

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

    const { high, medium, low } = highRiskCount(patientData);
  
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
          value={high}
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
      <main className="max-w-7xl mx-auto px-6 py-8">
        <DashboardContent />
        
      </main>
    </div>
  );
};

export default AnalyticsPage;
