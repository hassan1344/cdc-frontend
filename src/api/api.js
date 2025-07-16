// src/api/api.js
import axios from "axios";

const BASE_URL = "https://pg06.regifor.de/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchQuestionnairesByPatientId = async (patientId) => {
  try {
    const response = await api.get(`/questionnaire/${patientId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questionnaires:", error);
    return [];
  }
};

export const updateQuestionnaire = async (questionnaireId, payload) => {
  try {
    const response = await api.put(
      `/questionnaire/${questionnaireId}`,
      payload
    );
    return response.data;
  } catch (error) {
    console.error("Error updating questionnaire:", error);
    throw error;
  }
};

export const signUp = async (payload) => {
  try {
    const response = await api.post("auth/signup", payload);
    return response.data;
  } catch (error) {
    console.error("Error Signing Up", error);
    throw error;
  }
};

export const logIn = async (payload) => {
  try {
    const response = await api.post("/auth/login", payload);
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
    return response.data.data.diagnoses;
  } catch (error) {
    console.error("Error fetching diagnostic data:", error);
    throw error;
  }
};