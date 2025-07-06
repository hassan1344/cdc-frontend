import React, { useState, useMemo } from "react";
import StatsCard from "../../components/StatsCard";
import { useLatestPatients } from "../../hooks/useLatestPatients";
import mockData from "../../data/mockData.json";
import { calculateAge } from "../../utils/calculateAge";
import { highRiskCount } from "../../utils/highRiskCount";
import AgeDistributionChart from "../../components/AgeDistributionChart";
import GenderDistribution from "../../components/GenderDistribution";
import RiskComparisonChart from "../../components/RiskComparisionChart";
import { useNavigate } from "react-router-dom";
import ChartWrapper from "../../components/ChartWrapper";

const Dashboard = () => {
  const [showAgeChart, setShowAgeChart] = useState(false);
  const [showGenderChart, setShowGenderChart] = useState(false);
  const [showRiskChart, setShowRiskChart] = useState(false);
  const navigate = useNavigate();

  const [patientId, setPatientId] = useState("");

  const allPatientData = useMemo(() => autoParseJsonStrings(mockData), []);
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
  const avgAge = Math.round(ages.reduce((a, b) => a + b, 0) / ages.length);
  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

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
