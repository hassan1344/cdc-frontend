import { useState } from "react";

const tabs = ["General", "Clinical", "Foot Status", "Tests", "Categorization"];

export default function PatientDetailsModal({ patient, onClose }) {
  const [activeTab, setActiveTab] = useState("General");

  const allgemeineDaten = patient.allgemeineDaten;
  const klinischerBefund = patient.klinischerBefund;
  const fussstatus = patient.fussstatus;
  const funktionelleTests = patient.funktionelleTests;
  const kategorisierung = patient.kategorisierung;

  const renderTabContent = () => {
    switch (activeTab) {
      case "General":
        return (
          <ul className="text-sm">
            <li><strong>Birthdate:</strong> {allgemeineDaten.geburtsdatum}</li>
            <li><strong>Gender:</strong> {allgemeineDaten.geschlecht}</li>
            <li><strong>Diabetes Type:</strong> {allgemeineDaten.diabetestyp}</li>
            <li><strong>Diabetes Duration:</strong> {allgemeineDaten.dauerDiab} years</li>
          </ul>
        );
      case "Clinical":
        return (
          <ul className="text-sm">
            <li><strong>Left Vibration:</strong> {klinischerBefund.linksVibrationsempfindung}</li>
            <li><strong>Right Vibration:</strong> {klinischerBefund.rechtsVibrationsempfindung}</li>
            {/* add more fields as needed */}
          </ul>
        );
      case "Foot Status":
        return (
          <ul className="text-sm">
            <li><strong>Left Status:</strong> {fussstatus.linksFußstatus}</li>
            <li><strong>Right Status:</strong> {fussstatus.rechtsFußstatus}</li>
          </ul>
        );
      case "Tests":
        return (
          <ul className="text-sm">
            <li><strong>Left Push Up:</strong> {funktionelleTests.linksPushUp}</li>
            <li><strong>Right Push Up:</strong> {funktionelleTests.rechtsPushUp}</li>
          </ul>
        );
      case "Categorization":
        return (
          <ul className="text-sm">
            <li><strong>Left Risk Type:</strong> {kategorisierung.linksRisikotyp}</li>
            <li><strong>Right Risk Type:</strong> {kategorisierung.rechtsRisikotyp}</li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start p-8 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center border-b px-6 py-4">
          <h2 className="text-xl font-semibold">Patient Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">&times;</button>
        </div>
        <div className="px-6 py-4">
          <div className="flex border-b mb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`mr-4 pb-2 text-sm ${
                  activeTab === tab
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
