import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../data/mockData.json";
import PatientDetailsModal from "../../components/PatientDetailsModal";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");

  const allPatientData = useMemo(() => autoParseJsonStrings(mockData), []);
  const entries = allPatientData.filter(
    (entry) => entry.patientencode?.toString() === id
  );

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
            <div>
              <h2 className="text-xl font-bold mb-2">Questionnaires</h2>
              <p>Questionnaire section content goes here... Add a component</p>
            </div>
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
