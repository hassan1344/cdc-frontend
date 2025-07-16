import React, { useState, useRef } from 'react';
import { toast } from "react-toastify";
import '../../App.css';
import DiagnosticForm from '../../components/DiagnosticForm';
import { createDiagnosticData } from '../../api/api.js';
import { useNavigate, useParams } from "react-router-dom";


const DiagnosticSheet = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { patientId } = useParams();

  const handleSubmit = async () => {
    try {
      const data = formRef.current.getFormData();
      console.log("All form data:", data);

      const response = await createDiagnosticData(data);
      console.log("Diagnostic data saved successfully:", response);

      if (response?.status && response?.data?.user && response?.data?.data?.patientencode) {
        const { email, password } = response.data.user;
        const patientencode = response.data.data.patientencode;

        // Show toast with manual close + navigation
        toast.info(
          ({ closeToast }) => (
            <div>
              <strong>Benutzer erfolgreich erstellt!</strong>
              <div>Email: {email}</div>
              <div>Passwort: {password}</div>
              <button
                onClick={() => {
                  closeToast();
                  navigate(`/doctor/patientDetails/${patientencode}`);
                }}
                style={{
                  marginTop: "10px",
                  padding: "6px 12px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Weiter zur Patientenakte
              </button>
            </div>
          ),
          {
            autoClose: false,
            closeOnClick: true,
          }
        );
      }
    } catch (error) {
      console.error("Fehler beim Speichern der Diagnosedaten:", error);
      toast.error("Fehler beim Speichern der Diagnosedaten.");
    }
  };

  return (
    <div className="card-container">
      <div className="min-h-screen bg-white px-8 py-6 text-sm text-gray-800">
        {/* Header: Top Table and Branding */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-end space-x-2 text-xs font-semibold">
            {/* Left-side label */}


            {/* Geltungsbereich Column */}
            <div className="flex flex-col">
              <div className="text-center">
                <div className="text-base font-bold mr-4">V0402 K</div>
              </div>
              <div className="text-base bg-cyan-400 text-black px-2 py-1 border-b border-black">
                Geltungsbereich
              </div>
            </div>

            {/* Headers and Values */}
            {['GL', 'KO', 'PS', 'PD', 'VW', 'FE', 'EP'].map((label, index) => (
              <div key={index} className="flex flex-col border border-black text-center">
                <div
                  className={`px-2 py-1 border-b border-black ${['PD', 'EP'].includes(label) ? 'bg-white font-bold' : 'bg-gray-100'
                    }`}
                >
                  {label}
                </div>
                <div className="px-2 py-1">{['–', '–', '–', 'X', '–', '–', 'X'][index]}</div>
              </div>
            ))}
          </div>


          <div className="text-center md:text-left mt-4 md:mt-0">
            <h1 className="text-2xl font-extrabold tracking-wide mb-1">BEFUNDBOGEN</h1>
            <div className="flex items-center space-x-1">
              <div className="text-black font-bold text-lg">move</div>
              <div className="text-cyan-600 text-sm italic">diab</div>
              <div className="text-black text-sm">control®</div>
            </div>
          </div>
        </div>

        <>
          <DiagnosticForm ref={formRef} patientId={patientId} />
          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white px-4 py-2 mt-4 rounded"
          >
            Submit All Form Data
          </button>
        </>

      </div>
    </div>
  );
};

export default DiagnosticSheet;
