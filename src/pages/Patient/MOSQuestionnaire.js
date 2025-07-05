import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseQuestionnaire from "../../components/BaseQuestionnaire";
import { preAssessmentQuestions } from "../../data/questionData";
import { updateQuestionnaire } from "../../api/api";

const MOSQuestionnaire = () => {
  const [savedResponses, setSavedResponses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const questionnaire = location.state;

  useEffect(() => {
    if (!questionnaire) {
      navigate("/questionnaires"); // fallback
    } else {
      setSavedResponses(questionnaire);
    }
  }, [questionnaire]);


  const handleComplete = (responses) => {
    alert("Fragebogen abgeschlossen!");
    console.log("Pre-assessment responses:", responses);
  };

const handleSave = async (responses) => {
  try {
    const payload = responses;

    await updateQuestionnaire(questionnaire.id, payload);
    console.log("Draft saved successfully");
  } catch (error) {
    console.error("Error saving draft:", error);
  }
};
  //   const handleComplete = async (responses) => {
  //   try {
  //     // Save final responses
  //     await fetch(`/api/questionnaire/complete/${patientId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(responses),
  //     });

  //     // Clear any saved drafts
  //     await fetch(`/api/questionnaire/draft/${patientId}`, {
  //       method: 'DELETE',
  //     });

  //     alert("Fragebogen erfolgreich abgeschlossen!");
  //     console.log("Pre-assessment responses:", responses);

  //     // Redirect or handle completion logic
  //   } catch (error) {
  //     console.error('Error completing questionnaire:', error);
  //     alert("Fehler beim Speichern des Fragebogens. Bitte versuchen Sie es erneut.");
  //   }
  // };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Fragebogen wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <BaseQuestionnaire
      sections={preAssessmentQuestions}
      title="MOS Questionnaire"
      subtitle="Vorerhebung"
      patientencode={questionnaire.patient_id}
      onComplete={handleComplete}
      headerConfig={{ acronym: "MOS" }}
      savedResponses={savedResponses}
      onSave={handleSave}
    />
  );
};

export default MOSQuestionnaire;
