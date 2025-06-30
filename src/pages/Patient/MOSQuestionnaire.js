import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Volume2,
  User,
  Check,
  X,
  HelpCircle,
} from "lucide-react";
import footGraphic1 from "../../images/footGraphic1.png";
import footGraphic2 from "../../images/footGraphic2.png";
import useSpeech from "../../hooks/useSpeech";

const MOSQuestionnaire = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const speak = useSpeech();

  useEffect(() => {
    setShowValidationErrors(false); // Reset validation errors when responses change
  }, [responses]);

  // Pre-assessment sections
  const preAssessmentSections = [
    {
      id: "A",
      title: "A. Persönliche Angaben",
      questions: [
        {
          id: "walking_distance_pre",
          text: "1. Wie weit können Sie aktuell gehen?",
          icf: "ICF: d450 Gehen",
          type: "radio",
          options: [
            {
              text: "Ich kann mich nur in meiner Wohnung bewegen (0-10 Meter)",
              emoji: "🏠",
            },
            { text: "Ich kann zum Nachbarn gehen (10-50 Meter)", emoji: "👋" },
            {
              text: "Ich kann bis zur Straßenecke gehen (50-200 Meter)",
              emoji: "🚶",
            },
            {
              text: "Ich kann zu Geschäften in der Nachbarschaft gehen (200 Meter - 1 Kilometer)",
              emoji: "🏪",
            },
            {
              text: "Ich kann längere Strecken ohne Pause gehen (mehr als 1 Kilometer)",
              emoji: "🚶‍♂️💪",
            },
          ],
        },
        {
          id: "conditions",
          text: "2. Welche der folgenden Erkrankungen haben Sie?",
          subtitle: "(Mehrfachantwort möglich)",
          type: "checkbox",
          options: [
            { text: "Diabetes", emoji: "💉" },
            { text: "Rheumatoide Arthritis", emoji: "🦴" },
            {
              text: "Fußfehlstellung (z. B. Plattfuß, Krallenzehen, Hallux valgus)",
              emoji: "👣",
            },
            { text: "Muskelerkrankung", emoji: "💪" },
            { text: "Sonstiges", emoji: "📝" },
          ],
        },
      ],
    },
    {
      id: "B",
      title: "B. Aktuelle Situation",
      questions: [
        {
          id: "wounds",
          text: "3. Haben Sie Wunden oder Geschwüre an Füßen oder Knöcheln?",
          icf: "ICF: b810 Schutzfunktion der Haut",
          type: "radio",
          options: [
            { text: "Ja", emoji: "✅" },
            { text: "Nein", emoji: "❌" },
          ],
        },
        {
          id: "wounds_image",
          text: "4. Bitte markieren Sie die Stelle der Wunden/Geschwüre auf der Abbildung.",
          type: "wounds_image",
          options: [{ text: "Körperstelle auswählen", emoji: "📍" }],
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
      ],
    },
    {
      id: "C",
      title: "C. Erwartungen an die orthopädischen Schuhe",
      questions: [
        {
          id: "expect_fewer_wounds",
          text: "5. Erwarten Sie durch die Schuhe weniger Wunden an Ihren Füßen?",
          icf: "ICF: b810, d450",
          type: "radio",
          options: [
            { text: "Ja", emoji: "✅" },
            { text: "Nein", emoji: "❌" },
            { text: "Nicht zutreffend", emoji: "🤷" },
          ],
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
      ],
    },
    {
      id: "D",
      title: "D. Gespräch mit dem Arzt",
      questions: [
        {
          id: "doctor_listening",
          text: "6. Wie gut hat Ihnen der Arzt zugehört?",
          icf: "ICF: d710 Interaktionen mit medizinischem Personal",
          type: "scale",
          scale: { min: "sehr schlecht", max: "sehr gut" },
          scaleOptions: [
            { value: 0, emoji: "😤", label: "Sehr schlecht" },
            { value: 1, emoji: "😕", label: "Schlecht" },
            { value: 2, emoji: "😐", label: "Neutral" },
            { value: 3, emoji: "😊", label: "Gut" },
            { value: 4, emoji: "🤩", label: "Sehr gut" },
          ],
          conditional: {
            dependsOn: "wounds",
            showIf: "Ja",
          },
        },
        {
          id: "doctor_discussion",
          text: "7. Hat der Arzt mit Ihnen besprochen, was Sie von den Schuhen erwarten können?",
          type: "radio",
          options: [
            { text: "Ja", emoji: "✅" },
            { text: "Nein", emoji: "❌" },
            { text: "Weiß nicht", emoji: "🤷" },
          ],
        },
        {
          id: "doctor_experience",
          text: "8. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
          type: "radio",
          options: [
            { text: "Ja, ich erwarte jetzt mehr", emoji: "📈" },
            { text: "Ja, ich erwarte jetzt weniger", emoji: "📉" },
            {
              text: "Nein, meine Erwartungen sind gleich geblieben",
              emoji: "➡️",
            },
            { text: "Ich hatte keine Erwartungen", emoji: "🤷" },
          ],
        },
      ],
    },
    {
      id: "E",
      title: "E. Gespräch mit dem Orthopädietechniker",
      questions: [
        {
          id: "technician_listening",
          text: "9. Wie gut hat Ihnen der Techniker zugehört?",
          icf: "ICF: d710",
          type: "scale",
          scaleOptions: [
            { value: 0, emoji: "😤", label: "Sehr schlecht" },
            { value: 1, emoji: "😕", label: "Schlecht" },
            { value: 2, emoji: "😐", label: "Neutral" },
            { value: 3, emoji: "😊", label: "Gut" },
            { value: 4, emoji: "🤩", label: "Sehr gut" },
          ],
          conditional: {
            dependsOn: "doctor_discussion",
            showIf: "Ja",
          },
        },
        {
          id: "technician_discussion",
          text: "10. Hat der Techniker mit Ihnen besprochen, was Sie erwarten können?",
          type: "radio",
          options: [
            { text: "Ja", emoji: "✅" },
            { text: "Nein", emoji: "❌" },
            { text: "Weiß nicht", emoji: "🤷" },
          ],
        },
        {
          id: "technician_experience",
          text: "11. Haben Sie nach dem Gespräch Ihre Erwartungen angepasst?",
          type: "radio",
          options: [
            { text: "Ja, ich erwarte jetzt mehr", emoji: "📈" },
            { text: "Ja, ich erwarte jetzt weniger", emoji: "📉" },
            {
              text: "Nein, meine Erwartungen sind gleich geblieben",
              emoji: "➡️",
            },
            { text: "Ich hatte keine Erwartungen", emoji: "🤷" },
          ],
        },
      ],
    },
    {
      id: "F",
      title: "F. Erwartungen an das Aussehen der Schuhe",
      questions: [
        {
          id: "shoe_expectation",
          text: "12. Wie hässlich oder attraktiv erwarten Sie Ihre Schuhe?",
          icf: "ICF: d920 Freizeit, Selbstbild",
          type: "scale",
          scaleOptions: [
            { value: 0, emoji: "😵", label: "Sehr hässlich" },
            { value: 1, emoji: "😔", label: "Hässlich" },
            { value: 2, emoji: "😐", label: "Neutral" },
            { value: 3, emoji: "😊", label: "Attraktiv" },
            { value: 4, emoji: "😍", label: "Sehr attraktiv" },
          ],
          conditional: {
            dependsOn: "technician_discussion",
            showIf: "Ja",
          },
        },
        {
          id: "shoe_design",
          text: "13. Was denken Sie, wie andere das Aussehen Ihrer Schuhe beurteilen?",
          type: "radio",
          options: [
            { text: "Sehr hässlich", emoji: "😵" },
            { text: "Hässlich", emoji: "😔" },
            { text: "Neutral", emoji: "😐" },
            { text: "Attraktiv", emoji: "😊" },
            { text: "Sehr attraktiv", emoji: "😍" },
            { text: "Ich weiß es nicht", emoji: "🤷" },
          ],
        },
        {
          id: "shoe_say",
          text: "14. Konnten Sie bei der Gestaltung/Aussehen der Schuhe mitentscheiden?",
          type: "radio",
          options: [
            { text: "Ja", emoji: "✅" },
            { text: "Nein", emoji: "❌" },
          ],
        },
      ],
    },
    {
      id: "G",
      title: "G. Nutzung der orthopädischen Schuhe",
      questions: [
        {
          id: "shoe_fitting",
          text: "15. Wie gut erwarten Sie, dass Ihre Schuhe passen?",
          icf: "ICF: d540 Sich kleiden",
          type: "scale",
          scaleOptions: [
            { value: 0, emoji: "😤", label: "Sehr schlecht" },
            { value: 1, emoji: "😕", label: "Schlecht" },
            { value: 2, emoji: "😐", label: "Neutral" },
            { value: 3, emoji: "😊", label: "Gut" },
            { value: 4, emoji: "🤩", label: "Sehr gut" },
          ],
        },
        {
          id: "shoe_distance",
          text: "16. Wie weit erwarten Sie mit den Schuhen gehen zu können?",
          icf: "ICF: d450 Gehen",
          type: "radio",
          options: [
            { text: "...nur in der Wohnung (0–10 Meter)", emoji: "🏠" },
            { text: "...zum Nachbarn (10–50 Meter)", emoji: "👋" },
            { text: "...zur Straßenecke (50–200 Meter)", emoji: "🚶" },
            {
              text: "...zu Geschäften in der Nachbarschaft (200 Meter – 1 Kilometer)",
              emoji: "🏪",
            },
            {
              text: "...längere Strecken ohne Pause (mehr als 1 Kilometer)",
              emoji: "🚶‍♂️💪",
            },
          ],
        },
        {
          id: "shoe_dist_compare",
          text: "17. Ist das mehr oder weniger als Sie aktuell gehen können?",
          type: "radio",
          options: [
            { text: "Weniger", emoji: "📉" },
            { text: "Gleich viel", emoji: "➡️" },
            { text: "Mehr", emoji: "📈" },
          ],
        },
        {
          id: "show_activities",
          text: "18. Erwarten Sie, mit den Schuhen folgende Aktivitäten mehr oder weniger ausüben zu können?",
          icf: "ICF: d450, d455, d460, d640, d920",
          type: "radio",
          options: [{ text: "Aktivitäten bewerten", emoji: "🏃‍♂️" }],
        },
      ],
    },
    {
      id: "H",
      title: "H. Bewertung der Prioritäten",
      questions: [
        {
          id: "shoe_expectation_comfort",
          text: "19. Was ist Ihnen wichtiger: Dass die Schuhe gut aussehen oder Ihre Fußprobleme lösen?",
          icf: "ICF: d920, b280 Empfindung von Schmerz",
          type: "radio",
          options: [
            { text: "Das Aussehen ist wichtiger", emoji: "👠" },
            { text: "Beides ist gleich wichtig", emoji: "⚖️" },
            { text: "Die Lösung der Fußprobleme ist wichtiger", emoji: "🩺" },
          ],
        },
        {
          id: "shoe_adv_dadv",
          text: "20. Erwarten Sie, dass die Vorteile die Nachteile überwiegen?",
          type: "scale",
          scaleOptions: [
            { value: 0, emoji: "❌", label: "Auf keinen Fall" },
            { value: 1, emoji: "😔", label: "Eher nicht" },
            { value: 2, emoji: "🤷", label: "Unsicher" },
            { value: 3, emoji: "😊", label: "Eher ja" },
            { value: 4, emoji: "✅", label: "Auf jeden Fall" },
          ],
        },
      ],
    },
    {
      id: "I",
      title: "I. Abschluss",
      questions: [
        {
          id: "conc_comments",
          text: "21. Haben Sie weitere Anmerkungen?",
          type: "textarea",
          placeholder: "Ihre Anmerkungen...",
        },
        {
          id: "conc_time",
          text: "22. Wie lange haben Sie für das Ausfüllen des Fragebogens benötigt?",
          type: "text",
          placeholder: "z.B. 15 Minuten",
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
    } else {
      // Questionnaire completed
      alert("Fragebogen abgeschlossen!"); // Replace with your completion logic
      console.log(responses);
      // Could redirect, show completion screen, save data, etc.
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Checks if a section is fully answered
  const validateSectionCompletion = (section) => {
    const visibleQuestions = getVisibleQuestions(section);

    if (visibleQuestions.length === 0) return true;

    return visibleQuestions.every((question) => {
      const response = responses[question.id];

      if (question.type === "checkbox") {
        return response && response.length > 0;
      }
      return response !== undefined && response !== null && response !== "";
    });
  };

  // Prevents navigation if prior sections are not completed
  const canNavigateToSection = (targetIndex) => {
    for (let i = 0; i < targetIndex; i++) {
      if (!validateSectionCompletion(preAssessmentSections[i])) {
        return false;
      }
    }
    return true;
  };

  const renderQuestion = (question) => {
    const response = responses[question.id];
    const isRequired = true;
    const isAnswered =
      question.type === "checkbox"
        ? response && response.length > 0
        : response !== undefined && response !== null && response !== "";
    const showError = showValidationErrors && !isAnswered;

    const woundZones = [
      //Medial
      { id: "VRM", top: "18%", left: "7%" },
      { id: "MRM", top: "17%", left: "22%" },
      { id: "RRM", top: "18%", left: "38%" },
      { id: "RLM", top: "18%", left: "57%" },
      { id: "MLM", top: "17%", left: "71%" },
      { id: "VLM", top: "18%", left: "88%" },

      //lateral
      { id: "RRL", top: "30%", left: "9%" },
      { id: "MRL", top: "36%", left: "25%" },
      { id: "VRL", top: "40%", left: "40%" },
      { id: "VLL", top: "40%", left: "56%" },
      { id: "MLL", top: "36%", left: "72%" },
      { id: "RLL", top: "30%", left: "86%" },

      //plantar Right
      { id: "RPD5", top: "59%", left: "5%" },
      { id: "RPD4", top: "57.5%", left: "9%" },
      { id: "RPD3", top: "56%", left: "12%" },
      { id: "RPD2", top: "55%", left: "16%" },
      { id: "RPD1", top: "54%", left: "22%" },
      { id: "RPM5", top: "63%", left: "7%" },
      { id: "RPM4", top: "61%", left: "10%" },
      { id: "RPM3", top: "60%", left: "13.5%" },
      { id: "RPM2", top: "59%", left: "17%" },
      { id: "RPM1", top: "60%", left: "21%" },
      { id: "RPB5", top: "78%", left: "9%" },
      { id: "RPFerse", top: "88%", left: "15%" },

      //plantar Left
      { id: "LPD5", top: "59%", left: "48%" },
      { id: "LPD4", top: "57.5%", left: "45%" },
      { id: "LPD3", top: "56%", left: "41%" },
      { id: "LPD2", top: "55%", left: "37%" },
      { id: "LPD1", top: "54%", left: "32%" },
      { id: "LPM5", top: "63%", left: "47%" },
      { id: "LPM4", top: "61%", left: "44%" },
      { id: "LPM3", top: "60%", left: "40%" },
      { id: "LPM2", top: "59%", left: "36%" },
      { id: "LPM1", top: "60%", left: "32%" },
      { id: "LPB5", top: "78%", left: "44%" },
      { id: "LPFerse", top: "88%", left: "37%" },

      //dorsal Right
      { id: "RDD5", top: "82%", left: "52%" },
      { id: "RDD4", top: "84.5%", left: "56%" },
      { id: "RDD3", top: "86%", left: "59%" },
      { id: "RDD2", top: "87%", left: "63%" },
      { id: "RDD1", top: "89%", left: "68%" },
      { id: "RDM5", top: "72%", left: "55%" },
      { id: "RDM4", top: "74%", left: "58%" },
      { id: "RDM3", top: "76%", left: "60.5%" },
      { id: "RDM2", top: "79%", left: "64%" },
      { id: "RDM1", top: "80%", left: "68%" },

      //dorsal Left
      { id: "LDD5", top: "82%", left: "95%" },
      { id: "LDD4", top: "83.5%", left: "91%" },
      { id: "LDD3", top: "85%", left: "87%" },
      { id: "LDD2", top: "87%", left: "84%" },
      { id: "LDD1", top: "89%", left: "79%" },
      { id: "LDM5", top: "72%", left: "93%" },
      { id: "LDM4", top: "74%", left: "90%" },
      { id: "LDM3", top: "76%", left: "86%" },
      { id: "LDM2", top: "79%", left: "84%" },
      { id: "LDM1", top: "80%", left: "79%" },
    ];

    return (
      <div
        key={question.id}
        className={`mb-8 ${showError ? "border-l-4 border-red-500 pl-4" : ""}`}
      >
        <div className="flex items-start gap-3 mb-6">
          <Volume2
            className="w-8 h-8 text-blue-600 p-2 border border-blue-300 rounded-full bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition"
            onClick={() => handleReadAloud(question.text)}
            tabIndex={0}
            role="button"
            aria-label="Read aloud question"
          />
          <div className="flex-1">
            <h3
              className={`text-lg font-medium mb-2 ${
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
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  handleReadAloud(option.text);
                  handleResponse(question.id, option.text);
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  response === option.text
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl">{option.emoji}</div>
                <span className="text-left text-gray-700 flex-1">
                  {option.text}
                </span>
                {response === option.text && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {question.type === "checkbox" && (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  handleReadAloud(option.text);
                  const currentValues = response || [];
                  if (currentValues.includes(option.text)) {
                    handleResponse(
                      question.id,
                      currentValues.filter((v) => v !== option.text)
                    );
                  } else {
                    handleResponse(question.id, [
                      ...currentValues,
                      option.text,
                    ]);
                  }
                }}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                  response?.includes(option.text)
                    ? "border-purple-400 bg-purple-50"
                    : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                }`}
              >
                <div className="text-2xl">{option.emoji}</div>
                <span className="text-left text-gray-700 flex-1">
                  {option.text}
                </span>
                {response?.includes(option.text) && (
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {question.type === "scale" && question.scaleOptions && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {question.scaleOptions.map((scaleOption) => (
                <button
                  key={scaleOption.value}
                  onClick={() => {
                    handleReadAloud(scaleOption.label);
                    handleResponse(question.id, scaleOption.value);
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    response === scaleOption.value
                      ? "border-purple-400 bg-purple-50"
                      : "border-gray-200 hover:border-purple-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="text-3xl">{scaleOption.emoji}</div>
                  <span className="text-sm font-medium text-gray-700 text-center">
                    {scaleOption.label}
                  </span>
                  {response === scaleOption.value && (
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {question.type === "textarea" && (
          <textarea
            value={response || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows="4"
          />
        )}

        {question.type === "text" && (
          <input
            type="text"
            value={response || ""}
            onChange={(e) => handleResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        )}

        {question.type === "wounds_image" && (
          <div className="relative w-full max-w-3xl mx-auto">
            <img
              src={footGraphic1}
              alt="Foot map"
              className="w-full rounded-lg"
            />
            {woundZones.map((zone) => (
              <button
                key={zone.id}
                onClick={() => {
                  handleReadAloud(zone.id);
                  const current = response || [];
                  handleResponse(
                    question.id,
                    current.includes(zone.id)
                      ? current.filter((v) => v !== zone.id)
                      : [...current, zone.id]
                  );
                }}
                className={`absolute w-6 h-6 rounded-full border-2 border-white transition focus:outline-none
                ${
                  response?.includes(zone.id)
                    ? "bg-purple-600"
                    : "bg-red-500 hover:bg-red-600"
                }`}
                style={{ top: zone.top, left: zone.left }}
                title={zone.id}
              />
            ))}

            <img
              src={footGraphic2}
              alt="Foot map"
              className="w-full rounded-lg"
            />
          </div>
        )}
      </div>
    );
  };

  const handleReadAloud = (text) => {
    speak(text);
  };

  const currentSection = preAssessmentSections[currentStep];
  const visibleQuestions = getVisibleQuestions(currentSection);

  const unanswered = validateCurrentSection();
  const isLastStep = currentStep === totalSteps - 1;
  const isComplete = isLastStep && unanswered.length === 0;
  const isDisabled = !isLastStep && unanswered.length > 0;

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

      {/* Interactive Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-4">
            <ChevronLeft className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium text-gray-900">
              MOS Questionnaire
            </span>
          </div>

          {/* Section Progress */}
          <div className="flex items-center justify-between mb-6">
            {preAssessmentSections.map((section, index) => {
              const isCurrent = index === currentStep;
              const isCompleted = validateSectionCompletion(section);
              const canAccess = canNavigateToSection(index);

              return (
                <React.Fragment key={section.id}>
                  <button
                    onClick={() => {
                      if (canAccess) {
                        setCurrentStep(index);
                        setShowValidationErrors(false);
                      }
                    }}
                    disabled={!canAccess}
                    className={`flex flex-col items-center gap-2 p-3 rounded-lg transition-all ${
                      isCurrent
                        ? "bg-purple-100 text-purple-700"
                        : isCompleted
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-gray-100 text-gray-500"
                    } ${!canAccess && "opacity-50 cursor-not-allowed"}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                        isCurrent
                          ? "bg-purple-500 text-white"
                          : isCompleted
                          ? "bg-green-500 text-white"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {isCompleted ? <Check className="w-4 h-4" /> : section.id}
                    </div>
                    {/* <span className="text-xs font-medium text-center leading-tight">
                      {section.title.replace(/^[A-Z]\.\s/, "")}
                    </span> */}
                  </button>

                  {index < preAssessmentSections.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 rounded ${
                        index < currentStep ? "bg-green-400" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Overall Progress */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Teil 1: Vorerhebung</span>
              <span>
                {Math.round(progressT1)}% Complete ({answeredQuestions.length}/
                {allVisibleQuestions.length} questions)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressT1}%` }}
              ></div>
            </div>
          </div>

          {/* Section Title + Conditional Info */}
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
                  : isComplete
                  ? "bg-green-500 text-white hover:bg-green-600"
                  : "bg-purple-500 text-white hover:bg-purple-600"
              }`}
            >
              {isComplete ? "Abschließen" : "Weiter"}
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MOSQuestionnaire;
