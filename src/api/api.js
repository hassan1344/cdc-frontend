// src/api/api.js
import axios from "axios";
import { mapDiagnoses } from '../utils/mapDiagnoses';

const BASE_URL = "https://pg06.regifor.de/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchQuestionnairesByPatientId = async (patientId) => {
  try {
    console.log(patientId);
    const response = await api.get(`/questionnaire/${patientId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    return [];
  }
};

export const updateQuestionnaire = async (questionnaireId, payload) => {
  try {
    const response = await api.put(`/questionnaire/${questionnaireId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating questionnaire:", error);
    throw error;
  }
};

export const signUp = async (payload) => {
  try {
    const response = await api.post('auth/signup', payload);
    return response.data;
  } catch (error) {
    console.error("Error Signing Up", error);
    throw error;
  }
};

export const logIn = async (payload) => {
  try {
    const response = await api.post('/auth/login', payload);
    return response.data;
  } catch (error) {
    console.error("Error Loggin In", error);
    throw error;
  }
};

export const fetchDiagnosticData = async (doctorId) => {
  try {
    const response = await api.get(`/diagnoses/doctor/${doctorId}`);
    return response.data.data.diagnoses;
  } catch (error) {
    console.error("Error fetching diagnostic data:", error);
    throw error;
  }
};

export const fetchDiagnosticDataByPatientId = async (patientId) => {
  try {
    const response = await api.get(`/diagnoses/patient/${patientId}`);
    console.log("Fetched diagnostic data:", response.data);
    return response.data.data.diagnoses;
  } catch (error) {
    console.error("Error fetching diagnostic data:", error);
    throw error;
  }
};

export const createDiagnosticData = async (payload) => {
  try {

    let mappedData = mapDiagnoses(payload);
    console.log("Mapped Diagnostic Data:", mappedData);
    const customPayload = {
      patientencode:  payload.patientencode ? parseInt(payload.patientencode, 10) : "",
      partnerID: parseInt(localStorage.getItem("doctorId"), 10) || "",
      allgemeineDaten: mappedData.allgemeineDaten,
      klinischerBefund: mappedData.klinischerBefund,
      fussstatus: mappedData.fussstatus,
      fussstatusGrafik: mappedData.fussstatusGrafik,
      kriterien: mappedData.kriterien,
      kategorisierung: mappedData.kategorisierung,
      schuhversorgung: mappedData.schuhversorgung,
      funktionelleTests: {},
    };

    const response = await api.post("/diagnoses", customPayload);
    return response.data;
  } catch (error) {
    console.error("Error creating diagnostic data:", error);
    throw error;
  }
}
