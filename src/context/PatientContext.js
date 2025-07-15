import React, { createContext, useContext, useState, useEffect } from 'react';

const PatientContext = createContext();

export const usePatient = () => useContext(PatientContext);

export const PatientProvider = ({ children }) => {
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem('patientId');
    if (storedId) {
      setPatientId(storedId);
    }
  }, []);

  const updatePatientId = (id) => {
    setPatientId(id);
    localStorage.setItem('patientId', id);
  };

  const clearPatientId = () => {
    setPatientId(null);
    localStorage.removeItem('patientId');
  };

  return (
    <PatientContext.Provider value={{ patientId, setPatientId: updatePatientId, clearPatientId }}>
      {children}
    </PatientContext.Provider>
  );
};
