import React, { useState, useMemo, useEffect } from "react";
import StatsCard from "../../components/StatsCard";
import { useLatestPatients } from "../../hooks/useLatestPatients";
import { calculateAge } from "../../utils/calculateAge";
import { highRiskCount } from "../../utils/highRiskCount";
import AgeDistributionChart from "../../components/AgeDistributionChart";
import GenderDistribution from "../../components/GenderDistribution";
import RiskComparisonChart from "../../components/RiskComparisionChart";
import { useNavigate } from "react-router-dom";
import ChartWrapper from "../../components/ChartWrapper";
import { fetchDiagnosticData } from "../../api/api";

const Dashboard = () => {
  const [showAgeChart, setShowAgeChart] = useState(false);
  const [showGenderChart, setShowGenderChart] = useState(false);
  const [showRiskChart, setShowRiskChart] = useState(false);
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");

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

  const allPatientData = useMemo(() => autoParseJsonStrings(diagnosticData), [diagnosticData]);
  const patientData = useLatestPatients(allPatientData);

  const maleCount = patientData.filter(
    (p) => p.allgemeineDaten.geschlecht === "männlich"
  ).length;
  const femaleCount = patientData.filter(
    (p) => p.allgemeineDaten.geschlecht === "weiblich"
  ).length;

  const ages = patientData.map((p) =>
    calculateAge(p.allgemeineDaten.geburtsdatum)
  );
  const avgAge = ages.length > 0 ? Math.round(ages.reduce((a, b) => a + b, 0) / ages.length) : 0;
  const minAge = ages.length > 0 ? Math.min(...ages) : 0;
  const maxAge = ages.length > 0 ? Math.max(...ages) : 0;

  // Risk categories example (customize as needed)
  const { high, medium, low } = highRiskCount(patientData);

  function autoParseJsonStrings(obj) {
    if (Array.isArray(obj)) return obj.map(autoParseJsonStrings);
    if (obj !== null && typeof obj === "object") {
      const result = {};
      for (const [key, value] of Object.entries(obj)) {
        result[key] = autoParseJsonStrings(value);
      }
      return result;
    }
    if (typeof obj === "string") {
      try {
        const trimmed = obj.trim();
        if (
          (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
          (trimmed.startsWith("[") && trimmed.endsWith("]"))
        ) {
          return JSON.parse(trimmed);
        }
      } catch (e) {}
    }
    return obj;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading diagnostic data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
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
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
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
            value={avgAge}
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
              patientData.filter(
                (p) => p.allgemeineDaten.diabetestyp === "typ 2"
              ).length
            }
            subtitle="Patients"
            color="yellow"
          />
        </div>

        {/* Mini Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ChartWrapper
            title="Age Distribution"
            isOpen={showAgeChart}
            toggle={() => setShowAgeChart((prev) => !prev)}
            summaryContent={
              <p className="text-gray-600">
                Avg Age: <strong>{avgAge}</strong> &nbsp;|&nbsp; Age Range:{" "}
                <strong>
                  {minAge}-{maxAge}
                </strong>
              </p>
            }
          >
            <AgeDistributionChart data={patientData} />
          </ChartWrapper>

          <ChartWrapper
            title="Gender Distribution"
            isOpen={showGenderChart}
            toggle={() => setShowGenderChart((prev) => !prev)}
            summaryContent={
              <p className="text-gray-600">
                Male: <strong>{maleCount}</strong> | Female:{" "}
                <strong>{femaleCount}</strong>
              </p>
            }
          >
            <GenderDistribution data={patientData} />
          </ChartWrapper>

          <ChartWrapper
            title="Risk Type Distribution by Foot"
            isOpen={showRiskChart}
            toggle={() => setShowRiskChart((prev) => !prev)}
            fullWidth
            summaryContent={
              <p className="text-gray-600">
                High: <strong>{high}</strong> | Medium:{" "}
                <strong>{medium}</strong> | Low: <strong>{low}</strong>
              </p>
            }
          >
            <RiskComparisonChart data={patientData} />
          </ChartWrapper>
        </div>

        {/* View More */}
        <div className="text-center">
          <button
            onClick={() => navigate("/doctor/analytics")}
            className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            View More Analytics
          </button>
        </div>

        {/* Patient ID Navigation */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <input
            type="text"
            placeholder="Enter Patient ID"
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md w-full md:w-auto"
          />
          <button
            onClick={() => {
              if (patientId.trim()) {
                navigate(`/doctor/patientDetails/${patientId.trim()}`);
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Go to Patient
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;