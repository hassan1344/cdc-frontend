import React, { useState, useEffect } from "react";
import BaseQuestionnaire from "../../components/BaseQuestionnaire";
import { preAssessmentQuestions } from "../../data/questionData";

const MOSQuestionnaire = () => {
  const [savedResponses, setSavedResponses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const patientId = "365693801";

  const handleSave = (responses) => {
    alert("Fragebogen saved!");
    console.log("Pre-assessment responses:", responses);
  };

  const handleComplete = (responses) => {
    alert("Fragebogen abgeschlossen!");
    console.log("Pre-assessment responses:", responses);
  };

  const sampleSavedResponses = {
    patientencode: "365693801",
    questionnaireType: "Vorerhebung",
    responses: [
      {
        questionNumber: 1,
        questionId: "walking_distance_pre",
        sectionId: "A",
        responseType: "radio",
        icfCode: "ICF: d450 Gehen",
        selectedOption: 1,
      },
      {
        questionNumber: 2,
        questionId: "conditions",
        sectionId: "A",
        responseType: "checkbox",
        icfCode: null,
        selectedOptions: [1],
        selectedValues: ["Rheumatoide Arthritis"],
        selectedOption: null,
        selectedValue: null,
      },
      {
        questionNumber: 3,
        questionId: "wounds",
        sectionId: "B",
        responseType: "radio",
        icfCode: "ICF: b810 Schutzfunktion der Haut",
        selectedOption: 0,
      },
              {
            questionNumber: 4,
            questionId: "wounds_image",
            sectionId: "B",
            responseType: "wounds_image",
            icfCode: null,
            selectedOption: null,
            selectedValue: [
                "LPD5",
                "LPD4",
                "LPD3"
            ]
        }
    ],
  };

  // useEffect(() => {
  //   const loadSavedResponses = async () => {
  //     try {
  //       // Replace this with your actual API call to fetch saved responses
  //       const response = await fetch(`/api/questionnaire/draft/${patientId}`);

  //       if (response.ok) {
  //         const data = await response.json();
  //         setSavedResponses(data);
  //       } else {
  //         // No saved responses found, start fresh
  //         setSavedResponses(null);
  //       }
  //     } catch (error) {
  //       console.error("Error loading saved responses:", error);
  //       setSavedResponses(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   if (patientId) {
  //     loadSavedResponses();
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [patientId]);

  //   const handleSave = async (responses) => {
  //   try {
  //     await fetch(`/api/questionnaire/draft/${patientId}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(responses),
  //     });
  //     console.log('Draft saved successfully');
  //   } catch (error) {
  //     console.error('Error saving draft:', error);
  //   }
  // };

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
      patientencode = {patientId}
      onComplete={handleComplete}
      headerConfig={{ acronym: "MOS" }}
      savedResponses={sampleSavedResponses}
      onSave={handleSave}
    />
  );
};

export default MOSQuestionnaire;
