import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, User } from "lucide-react";

const MOSQuestionnaire2 = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  useEffect(() => {
    setShowValidationErrors(false); // Reset validation errors when responses change
  }, [responses]);

  // Pre-assessment sections
  const preAssessmentSections = [
    {
      title: "A. Persönliche Angaben",
      questions: [
        {
          id: "walking_distance_pre",
          text: "1. Wie weit können Sie aktuell gehen?",
          icf: "ICF: d450 Gehen",
          type: "radio",
          options: [
            "Ich kann mich nur in meiner Wohnung bewegen (0-10 Meter)",
            "Ich kann zum Nachbarn gehen (10-50 Meter)",
            "Ich kann bis zur Straßenecke gehen (50-200 Meter)",
            "Ich kann zu Geschäften in der Nachbarschaft gehen (200 Meter - 1 Kilometer)",
            "Ich kann längere Strecken ohne Pause gehen (mehr als 1 Kilometer)",
          ],
        },
        {
          id: "conditions",
          text: "2. Welche der folgenden Erkrankungen haben Sie?",
          subtitle: "(Mehrfachantwort möglich)",
          type: "checkbox",
          options: [
            "Diabetes",
            "Rheumatoide Arthritis",
            "Fußfehlstellung (z. B. Plattfuß, Krallenzehen, Hallux valgus)",
            "Muskelerkrankung",
            "Sonstiges",
          ],
        },
      ],
    },
    {
      title: "B. Aktuelle Situation",
      questions: [
        {
          id: "wounds",
          text: "3. Haben Sie Wunden oder Geschwüre an Füßen oder Knöcheln?",
          icf: "ICF: b810 Schutzfunktion der Haut",
          type: "radio",
          options: ["Ja", "Nein"],
        },
        {
          id: "wounds_image",
          text: "4. Bitte markieren Sie die Stelle der Wunden/Geschwüre auf der Abbildung.",
          type: "radio",
          options: ["Give option"],
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
      ],
    },
    {
      title: "C. Erwartungen an die orthopädischen Schuhe",
      questions: [
        {
          id: "expect_fewer_wounds",
          text: "5. Erwarten Sie durch die Schuhe weniger Wunden an Ihren Füßen?",
          icf: "ICF: b810, d450",
          type: "radio",
          options: ["Ja", "Nein", "Nicht zutreffend"],
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
      ],
    },
    {
      title: "D. Gespräch mit dem Arzt",
      questions: [
        {
          id: "doctor_listening",
          text: "6. Wie gut hat Ihnen der Arzt zugehört?",
          icf: "ICF: d710 Interaktionen mit medizinischem Personal",
          type: "scale",
          scale: { min: "sehr schlecht", max: "sehr gut" },
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
        {
          id: "doctor_discussion",
          text: "7. Hat der Arzt mit Ihnen besprochen, was Sie von den Schuhen erwarten können?",
          type: "radio",
          options: ["Ja", "Nein", "Weiß nicht"],
        },
        {
          id: "doctor_experience",
          text: "8. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
          type: "radio",
          options: [
            "Ja, ich erwarte jetzt mehr",
            "Ja, ich erwarte jetzt weniger",
            "Nein, meine Erwartungen sind gleich geblieben",
            "Ich hatte keine Erwartungen",
          ],
        },
      ],
    },
    {
      title: "E. Gespräch mit dem Orthopädietechniker",
      questions: [
        {
          id: "technician_listening",
          text: "9. Wie gut hat Ihnen der Techniker zugehört?",
          icf: "ICF: d710",
          type: "scale",
          scale: { min: "sehr schlecht", max: "sehr gut" },
          conditional: {
            dependsOn: "doctor_discussion",
            showIf: "Ja",
          },
        },
        {
          id: "technician_discussion",
          text: "10. Hat der Techniker mit Ihnen besprochen, was Sie erwarten können?",
          type: "radio",
          options: ["Ja", "Nein", "Weiß nicht"],
        },
        {
          id: "technician_experience",
          text: "11. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
          type: "radio",
          options: [
            "Ja, ich erwarte jetzt mehr",
            "Ja, ich erwarte jetzt weniger",
            "Nein, meine Erwartungen sind gleich geblieben",
            "Ich hatte keine Erwartungen",
          ],
        },
      ],
    },
    {
      title: "F. Erwartungen an das Aussehen der Schuhe",
      questions: [
        {
          id: "shoe_expectation",
          text: "12. Wie hässlich oder attraktiv erwarten Sie Ihre Schuhe?",
          icf: "ICF: d920 Freizeit, Selbstbild",
          type: "scale",
          scale: { min: "sehr hässlich", max: "sehr attraktiv" },
          conditional: {
            dependsOn: "technician_discussion",
            showIf: "Ja",
          },
        },
        {
          id: "shoe_design",
          text: "13. Was denken Sie, wie andere das Aussehen Ihrer Schuhe beurteilen",
          type: "radio",
          options: [
            "Sehr hässlich",
            "Hässlich",
            "Neutral",
            "Attraktiv",
            "Sehr attraktiv",
            "Ich weiß es nicht",
          ],
        },
        {
          id: "shoe_say",
          text: "14. Konnten Sie bei der Gestaltung/Aussehen der Schuhe mitentscheiden?",
          type: "radio",
          options: ["Ja", "Nein"],
        },
      ],
    },
    {
      title: "G. Nutzung der orthopädischen Schuhe",
      questions: [
        {
          id: "shoe_fitting",
          text: "15. Wie gut erwarten Sie, dass Ihre Schuhe passen?",
          icf: "ICF: d540 Sich kleiden",
          type: "scale",
          scale: { min: "sehr schlecht", max: "sehr gut" },
        },
        {
          id: "shoe_distance",
          text: "16. Wie weit erwarten Sie mit den Schuhen gehen zu können?",
          icf: "ICF: d450 Gehen",
          type: "radio",
          options: [
            "...nur in der Wohnung (0–10 Meter)",
            "...zum Nachbarn (10–50 Meter)",
            "...zur Straßenecke (50–200 Meter)",
            "...zu Geschäften in der Nachbarschaft (200 Meter – 1 Kilometer)",
            "...längere Strecken ohne Pause (mehr als 1 Kilometer)",
          ],
        },
        {
          id: "shoe_dist_compare",
          text: "17. Ist das mehr oder weniger als Sie aktuell gehen können?",
          type: "radio",
          options: ["Weniger", "Gleich viel", "Mehr"],
        },
        {
          id: "show_activities",
          text: "18. Erwarten Sie, mit den Schuhen folgende Aktivitäten mehr oder weniger ausüben zu können?",
          icf: "ICF: d450, d455, d460, d640, d920",
          type: "radio",
          options: ["Add option"],
        },
      ],
    },
    {
      title: "H. Bewertung der Prioritäten",
      questions: [
        {
          id: "shoe_expectation_comfort",
          text: "19. Was ist Ihnen wichtiger: Dass die Schuhe gut aussehen oder Ihre Fußprobleme lösen?",
          icf: "ICF: d920, b280 Empfindung von Schmerz",
          type: "radio",
          options: [
            "Das Aussehen ist wichtiger",
            "Beides ist gleich wichtig",
            "Die Lösung der Fußprobleme ist wichtiger",
          ],
        },
        {
          id: "shoe_adv_dadv",
          text: "20. Erwarten Sie, dass die Vorteile die Nachteile überwiegen?",
          type: "scale",
          scale: { min: "auf keinen Fall", max: "auf jeden Fall" },
        },
      ],
    },
    {
      title: "I. Abschluss",
      questions: [
        {
          id: "conc_comments",
          text: "21. Haben Sie weitere Anmerkungen?",
          type: "radio",
          options: ["Give text box"],
        },
        {
          id: "conc_time",
          text: "22. Wie lange haben Sie für das Ausfüllen des Fragebogens benötigt?",
          type: "radio",
          options: ["Give text box"],
        },
      ],
    },
  ];

  // Function to check if a question should be shown based on conditional logic
  const shouldShowQuestion = (question) => {
    if (!question.conditional) return true;

    const dependentResponse = responses[question.conditional.dependsOn];
    return dependentResponse === question.conditional.showIf;
  };

  // Get all visible questions for current section
  const getVisibleQuestions = (section) => {
    return section.questions.filter(shouldShowQuestion);
  };

  // Get all visible sections and questions for progress calculation
  const getAllVisibleQuestions = () => {
    let allVisible = [];
    preAssessmentSections.forEach((section) => {
      const visibleQuestions = getVisibleQuestions(section);
      allVisible = [...allVisible, ...visibleQuestions];
    });
    return allVisible;
  };

  const validateCurrentSection = () => {
    const visibleQuestions = getVisibleQuestions(currentSection);
    const unansweredQuestions = visibleQuestions.filter((question) => {
      const response = responses[question.id];

      if (question.type === "checkbox") {
        return !response || response.length === 0;
      }
      return response === undefined || response === null || response === "";
    });

    return unansweredQuestions;
  };

  const totalSteps = preAssessmentSections.length;
  const allVisibleQuestions = getAllVisibleQuestions();
  const answeredQuestions = allVisibleQuestions.filter(
    (q) => responses[q.id] !== undefined
  );
  const progressT1 =
    allVisibleQuestions.length > 0
      ? (answeredQuestions.length / allVisibleQuestions.length) * 100
      : 0;

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    const unanswered = validateCurrentSection();
    if (unanswered.length > 0) {
      setShowValidationErrors(true);
      return;
    }

    setShowValidationErrors(false);
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderQuestion = (question) => {
    const response = responses[question.id];
    const isRequired = true; // All questions are required
    const isAnswered =
      question.type === "checkbox"
        ? response && response.length > 0
        : response !== undefined && response !== null && response !== "";
    const showError = showValidationErrors && !isAnswered;

    return (
      <div
        key={question.id}
        className={`mb-8 ${showError ? "border-l-4 border-red-500 pl-4" : ""}`}
      >
        <div className="flex items-start gap-3 mb-4">
          <Volume2 className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3
              className={`text-lg font-medium mb-1 ${
                showError ? "text-red-700" : "text-gray-900"
              }`}
            >
              {question.text} <span className="text-red-500">*</span>
            </h3>
            {showError && (
              <p className="text-sm text-red-600 mb-2">
                This question is required
              </p>
            )}
            {question.subtitle && (
              <p className="text-sm text-gray-600 mb-2">{question.subtitle}</p>
            )}
            {question.icf && (
              <p className="text-xs text-blue-600 mb-3">{question.icf}</p>
            )}
          </div>
        </div>

        {question.type === "radio" && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={response === option}
                  onChange={(e) => handleResponse(question.id, e.target.value)}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === "checkbox" && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={response?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = response || [];
                    if (e.target.checked) {
                      handleResponse(question.id, [...currentValues, option]);
                    } else {
                      handleResponse(
                        question.id,
                        currentValues.filter((v) => v !== option)
                      );
                    }
                  }}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === "scale" && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>{question.scale.min}</span>
              <span>{question.scale.max}</span>
            </div>
            <div className="flex justify-between items-center">
              {[0, 1, 2, 3, 4].map((value) => (
                <button
                  key={value}
                  onClick={() => handleResponse(question.id, value)}
                  className={`w-12 h-12 rounded-full border-2 font-medium ${
                    response === value
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300 text-gray-600 hover:border-blue-400"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const currentSection = preAssessmentSections[currentStep];
  const visibleQuestions = getVisibleQuestions(currentSection);
  const unanswered = validateCurrentSection();
  const isDisabled = currentStep === totalSteps - 1 || unanswered.length > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">MOS</span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  MOS Questionnaire
                </h1>
                <p className="text-sm text-gray-600">
                  Vorerhebung & Erfolgskontrolle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              MOS Questionnaire
            </span>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Teil 1: Vorerhebung</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressT1}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>
                {Math.round(progressT1)}% Complete ({answeredQuestions.length}/
                {allVisibleQuestions.length} questions)
              </span>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {currentSection.title}
            </h2>
            <p className="text-sm text-gray-600">
              Teil 1: Vorerhebung (Schritt {currentStep + 1} von {totalSteps})
            </p>
            {visibleQuestions.length !== currentSection.questions.length && (
              <p className="text-xs text-blue-600 mt-1">
                Showing {visibleQuestions.length} of{" "}
                {currentSection.questions.length} questions based on your
                answers
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="space-y-6">
            {visibleQuestions.length > 0 ? (
              visibleQuestions.map(renderQuestion)
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>
                  No questions to display in this section based on your previous
                  answers.
                </p>
              </div>
            )}
          </div>

          {showValidationErrors && unanswered.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                Please answer all required questions before continuing (
                {unanswered.length} remaining).
              </p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                currentStep === 0
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Zurück
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i === currentStep
                      ? "bg-purple-500"
                      : i < currentStep
                      ? "bg-purple-300"
                      : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isDisabled}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isDisabled
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              Weiter
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MOSQuestionnaire2;
