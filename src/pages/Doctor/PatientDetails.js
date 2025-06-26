import React, { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockData from "../../data/mockData.json";
import { calculateAge } from "../../utils/calculateAge";

const PatientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const generalInfo = entries[0].allgemeineDaten || "{}";
  const age = calculateAge(generalInfo.geburtsdatum);

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">Patient Details: {id}</h1>

      {/* General Info */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">General Information</h2>
        <p>Age: <strong>{age}</strong></p>
        <p>Geschlecht: <strong>{generalInfo.geschlecht}</strong></p>
        <p>Größe: <strong>{generalInfo.groeße} cm</strong></p>
        <p>Gewicht: <strong>{generalInfo.gewicht} kg</strong></p>
        <p>Diabetes Typ: <strong>{generalInfo.diabetestyp}</strong></p>
        <p>Dauer der Diabetes: <strong>{generalInfo.dauerDiab} Jahre</strong></p>
        <p>Diabetesschulung: <strong>{generalInfo.diabSchulung}</strong></p>
        <p>MRSA: <strong>{generalInfo.mrsa}</strong></p>
        <p>Letzte Untersuchung: <strong>{generalInfo.datum}</strong></p>
      </div>

      {/* Entries */}
      {entries
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .map((entry, index) => {
          const klinisch = entry.klinischerBefund || "{}";
          const kategorisierung = entry.kategorisierung || "{}";
          const fussstatus = entry.fussstatus || "{}";
          const funktionelleTests = entry.funktionelleTests || "{}";

          return (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 mb-6 border-l-4 border-blue-500"
            >
              <h3 className="text-lg font-semibold mb-2">
                Untersuchung vom {new Date(entry.created_at).toLocaleDateString()}
              </h3>

              {/* Risk Category */}
              <div className="mb-3">
                <p>
                  Risikotyp Links:{" "}
                  <strong>{kategorisierung.linksRisikotyp || "N/A"}</strong>
                </p>
                <p>
                  Risikotyp Rechts:{" "}
                  <strong>{kategorisierung.rechtsRisikotyp || "N/A"}</strong>
                </p>
              </div>

              {/* Klinischer Befund */}
              <div className="mb-3">
                <h4 className="font-medium underline">Klinischer Befund</h4>
                <p>Vibration Links: {klinisch.linksVibrationsempfindung}</p>
                <p>Vibration Rechts: {klinisch.rechtsVibrationsempfindung}</p>
                <p>Mikrofilament Links: {klinisch.linksMikrofilament}</p>
                <p>Mikrofilament Rechts: {klinisch.rechtsMikrofilament}</p>
              </div>

              {/* Fußstatus */}
              <div className="mb-3">
                <h4 className="font-medium underline">Fußstatus</h4>
                <p>Links Ulcus: {fussstatus.linksUlcus}</p>
                <p>Rechts Ulcus: {fussstatus.rechtsUlcus}</p>
                <p>Podologische Behandlung: {fussstatus.podologischeBehandlung}</p>
                <p>Letzte Behandlung: {fussstatus.letztePodoBehandlung}</p>
              </div>

              {/* Funktionelle Tests */}
              <div>
                <h4 className="font-medium underline">Funktionelle Tests</h4>
                <p>Push-Up Links: {funktionelleTests.linksPushUp}</p>
                <p>Push-Up Rechts: {funktionelleTests.rechtsPushUp}</p>
                <p>Dorsalextension Links: {funktionelleTests.linksDorsalextension}</p>
                <p>Dorsalextension Rechts: {funktionelleTests.rechtsDorsalextension}</p>
              </div>
            </div>
          );
        })}
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
