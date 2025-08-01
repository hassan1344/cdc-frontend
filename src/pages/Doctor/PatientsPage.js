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
import PatientTable from "../../components/PatientsTable";
import { calculateAge } from "../../utils/calculateAge";
import DiabetesDurationScatter from "../../components/DiabetesDurationScatter";
import BMICategoryBar from "../../components/BMICategoryBar";
import GenderDistribution from "../../components/GenderDistribution";
import { highRiskCount } from "../../utils/highRiskCount";
import AgeDistributionChart from "../../components/AgeDistributionChart";
import RiskComparisonChart from "../../components/RiskComparisionChart";
import NeuropathyPrevalenceChart from "../../components/NeuropathyPrevalenceChart";
import { fetchDiagnosticData } from "../../api/api";

const PatientsPage = () => {
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch diagnostic data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const doctorId = localStorage.getItem("doctorId");
        
        if (!doctorId) {
          setError("Doctor ID not found in localStorage");
          setLoading(false);
          return;
        }

        const response = await fetchDiagnosticData(doctorId);
        setDiagnosticData(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching diagnostic data:", err);
        setError("Failed to fetch diagnostic data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allPatientData = useMemo(
    () => autoParseJsonStrings(diagnosticData),
    [diagnosticData]
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Patient Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PatientContent />
      </main>
    </div>
  );
};

export default PatientsPage;