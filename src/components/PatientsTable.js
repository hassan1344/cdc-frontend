import { calculateAge } from "../utils/calculateAge";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

export default function PatientTable({ patientData = [], loading = false }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [riskFilter, setRiskFilter] = useState("All");

  const getRiskBadgeColor = (riskType) => {
    switch (riskType) {
      case "Typ I": return "bg-green-100 text-green-800";
      case "Typ II": return "bg-yellow-100 text-yellow-800";
      case "Typ III": return "bg-orange-100 text-orange-800";
      case "Typ IV": return "bg-red-100 text-red-800";
      default: return "bg-red-300 text-red-800";
    }
  };

  const hasUlcerHistory = (fussstatus) => {
    try {
      const parsed = fussstatus;
      return (
        parsed.linksUlcus?.toLowerCase() !== "nein" ||
        parsed.rechtsUlcus?.toLowerCase() !== "nein"
      );
    } catch {
      return false;
    }
  };

  const getLastVisit = (allgemeineDaten, fallback) => {
    try {
      const parsed = allgemeineDaten;
      return parsed.datum || fallback;
    } catch {
      return fallback;
    }
  };

  const sortedFilteredData = useMemo(() => {
    let sorted = [...patientData];

    if (riskFilter !== "All") {
      sorted = sorted.filter((p) => {
        const k = p.kategorisierung || "{}";
        return k.linksRisikotyp === riskFilter || k.rechtsRisikotyp === riskFilter;
      });
    }

    if (sortConfig.key) {
      sorted.sort((a, b) => {
        const parseA = a.allgemeineDaten || "{}";
        const parseB = b.allgemeineDaten || "{}";

        let valA, valB;
        switch (sortConfig.key) {
          case "age":
            valA = calculateAge(parseA.geburtsdatum);
            valB = calculateAge(parseB.geburtsdatum);
            break;
          case "gender":
            valA = parseA.geschlecht;
            valB = parseB.geschlecht;
            break;
          case "diabetes":
            valA = parseA.diabetestyp;
            valB = parseB.diabetestyp;
            break;
          case "visit":
            valA = getLastVisit(a.allgemeineDaten, a.created_at);
            valB = getLastVisit(b.allgemeineDaten, b.created_at);
            break;
          default:
            return 0;
        }

        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sorted;
  }, [patientData, sortConfig, riskFilter]);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return "⇅";
    return sortConfig.direction === "asc" ? "↑" : "↓";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Patients</h3>
        <select
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="text-sm border border-gray-300 rounded px-2 py-1"
        >
          <option value="All">All Risk Types</option>
          <option value="Typ I">Typ I</option>
          <option value="Typ II">Typ II</option>
          <option value="Typ III">Typ III</option>
          <option value="Typ IV">Typ IV</option>
          <option value="Typ V">Typ V</option>
          <option value="Typ VI">Typ VI</option>
          <option value="Typ VII">Typ VII</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading patient data...</div>
      ) : sortedFilteredData.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No patient records found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("age")}>
                  Age {renderSortArrow("age")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("gender")}>
                  Gender {renderSortArrow("gender")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("diabetes")}>
                  Diabetes {renderSortArrow("diabetes")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ulcer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => toggleSort("visit")}>
                  Last Visit {renderSortArrow("visit")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedFilteredData.map((patient) => {
                const allgemeineDaten = patient.allgemeineDaten || "{}";
                const kategorisierung = patient.kategorisierung || "{}";

                const leftRisk = kategorisierung.linksRisikotyp;
                const rightRisk = kategorisierung.rechtsRisikotyp;
                const ulcer = hasUlcerHistory(patient.fussstatus);
                const lastVisit = getLastVisit(patient.allgemeineDaten, patient.created_at?.split(" ")[0]);

                return (
                  <tr
                    key={patient.patientencode}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => navigate(`/doctor/patientDetails/${patient.patientencode}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {patient.patientencode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allgemeineDaten.geburtsdatum
                        ? `${calculateAge(allgemeineDaten.geburtsdatum)} years`
                        : "Unbekannt"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allgemeineDaten.geschlecht !== "" ? (allgemeineDaten.geschlecht === "männlich" ? "Male" : "Female") : "Unbekaant"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {allgemeineDaten.diabetestyp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                      <span
                        className={("px-2 py-1 rounded text-xs font-medium", getRiskBadgeColor(leftRisk))}
                        title={`Left: ${leftRisk}`}
                      >
                        {leftRisk}
                      </span>
                      <span
                        className={("px-2 py-1 rounded text-xs font-medium", getRiskBadgeColor(rightRisk))}
                        title={`Right: ${rightRisk}`}
                      >
                        {rightRisk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={(
                          "px-2 py-1 rounded text-xs font-medium",
                          ulcer ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                        )}
                        title={ulcer ? "Ulcer history present" : "No ulcer history"}
                      >
                        {ulcer ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {lastVisit}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
