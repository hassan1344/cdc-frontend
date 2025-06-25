import { calculateAge } from "../utils/calculateAge";
import { useState } from "react";
import PatientDetailsModal from "./PatientDetailsModal";

export default function PatientTable({ patientData }) {
  const [selectedPatient, setSelectedPatient] = useState(null);

  return (
    <>
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Patients
      </h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Age
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diabetes Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Risk Type (L/R)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {patientData.map((patient) => (
              <tr
                key={patient.patientencode}
                className="hover:bg-gray-50 cursor-pointer"
                onClick={() =>setSelectedPatient(patient)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {patient.patientencode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {calculateAge(patient.allgemeineDaten.geburtsdatum)} years
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.allgemeineDaten.geschlecht === "männlich"
                    ? "Male"
                    : "Female"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.allgemeineDaten.diabetestyp}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {patient.kategorisierung.linksRisikotyp} /{" "}
                  {patient.kategorisierung.rechtsRisikotyp}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </>


    
  );
}
