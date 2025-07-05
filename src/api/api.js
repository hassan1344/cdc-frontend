// src/api/api.js
import axios from "axios";

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
