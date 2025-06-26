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

const PatientsPage = () => {
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
  const PatientContent = () => (
    <div className="space-y-6">
      <PatientTable patientData={patientData} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PatientContent />
      </main>
    </div>
  );
};

export default PatientsPage;
