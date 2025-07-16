import React, { useMemo, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../data/mockData.json";
import PatientDetailsModal from "../../components/PatientDetailsModal";
import QuestionnaireTable from "../../components/QuestionnaireTable";
import { fetchDiagnosticData } from "../../api/api";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [diagnosticData, setDiagnosticData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const entries = allPatientData.filter(
    (entry) => entry.patientencode?.toString() === id
  );

  // Loading state
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

  // Error state
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

  // No patient data found
  if (entries.length === 0) {
    return (
      <div className="p-8 text-center text-red-600 font-semibold">
        No patient data found for ID: {id}
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4"
        >
          ← Zurück
        </button>
        <h1 className="text-3xl font-bold text-gray-800">
          Patient Details: {id}
        </h1>
      </div>
      <div className="px-4 md:px-6 lg:px-8">
        {/* Tabs Header */}
        <div className="flex border-b mb-4">
          {["details", "questionnaires", "diagnostic"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`mr-4 pb-2 px-2 border-b-2 ${
                activeTab === tab
                  ? "border-blue-500 font-semibold"
                  : "border-transparent text-gray-500"
              } capitalize`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div>
          {activeTab === "details" && <PatientDetailsModal entries={entries} />}

          {activeTab === "questionnaires" && (
            <>
              <QuestionnaireTable id={id}/>
            </>
          )}

          {activeTab === "diagnostic" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Diagnostic</h2>
              <p>Diagnostic section content goes here... Add a component</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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

export default PatientDetails;
