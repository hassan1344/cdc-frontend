import React from "react";
import BaseQuestionnaire from "../../components/BaseQuestionnaire";
import { postAssessmentQuestions } from "../../data/questionData";

const MOSQuestionnaire2 = () => {
  const handleComplete = (responses) => {
    alert("Fragebogen abgeschlossen!");
    console.log("Post-assessment responses:", responses);
    // Handle completion logic
  };

  return (
    <BaseQuestionnaire
      sections={postAssessmentQuestions}
      title="MOS Questionnaire 2"
      subtitle="Erfolgskontrolle"
      onComplete={handleComplete}
      headerConfig={{ acronym: "MOS2" }}
    />
  );
};

export default MOSQuestionnaire2;