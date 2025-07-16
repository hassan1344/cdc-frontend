import React, { useEffect, useState } from "react";
import { fetchQuestionnairesByPatientId } from "../../api/api.js";
import { useNavigate } from "react-router-dom";
import {
  preAssessmentQuestions,
  postAssessmentQuestions,
} from "../../data/questionData.js";

const Questionnaire = () => {
  const [questionnaires, setQuestionnaires] = useState([]);
  const navigate = useNavigate();
  const [id, setId] = useState();

  useEffect(() => {
    const storedId = localStorage.getItem("patientId");
    setId(storedId);
  }, []);

  useEffect(() => {
    if (!id) return;

    const getData = async () => {
      const data = await fetchQuestionnairesByPatientId(id);
      const sorted = [...data].sort((a, b) => {
        if (a.type === b.type) {
          return new Date(a.date) - new Date(b.date);
        }
        return a.type === "pre" ? -1 : 1;
      });
      setQuestionnaires(sorted);
    };
    getData();
  }, [id]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("de-DE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Calculate progress based on actual questionnaire structure
  const calculateProgress = (questionnaire) => {
    if (!questionnaire.responses || questionnaire.responses.length === 0) {
      return 0;
    }

    // Get the questionnaire definition based on type
    const getQuestionnaireDefinition = (type) => {
      switch (type) {
        case "post":
          return postAssessmentQuestions;
        case "pre":
          return preAssessmentQuestions;
        default:
          return null;
      }
    };

    const questionnaireDefinition = getQuestionnaireDefinition(
      questionnaire.type
    );

    if (!questionnaireDefinition) {
      // Fallback to simple calculation for questionnaires without definitions
      const expectedQuestions = {
        pre: 22,
        post: 32,
      };
      const totalExpected =
        expectedQuestions[questionnaire.type] || questionnaire.responses.length;
      const answeredQuestions = questionnaire.responses.length;
      return Math.round((answeredQuestions / totalExpected) * 100);
    }

    // Calculate based on actual questionnaire structure
    const { totalQuestions, answeredQuestions } = calculateQuestionnaireStats(
      questionnaire,
      questionnaireDefinition
    );

    return totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;
  };

  // Helper function to calculate questionnaire statistics
  const calculateQuestionnaireStats = (
    questionnaire,
    questionnaireDefinition
  ) => {
    const responses = questionnaire.responses || [];
    const responseMap = {};

    // Create a map of responses by questionId
    responses.forEach((response) => {
      responseMap[response.questionId] = response;
    });

    let totalQuestions = 0;
    let answeredQuestions = 0;

    // Iterate through all sections and questions
    questionnaireDefinition.forEach((section) => {
      section.questions.forEach((question) => {
        // Check if question should be visible based on conditional logic
        const shouldShow = shouldShowQuestion(question, responseMap);

        const wasAnswered =
          !!responseMap[question.id] &&
          isQuestionAnswered(question, responseMap[question.id]);

        if (shouldShow) totalQuestions++;
        if (!shouldShow && wasAnswered) totalQuestions++;
        if (wasAnswered) answeredQuestions++;
      });
    });

    return { totalQuestions, answeredQuestions };
  };

  // Helper function to check if a question should be shown based on conditional logic
  const shouldShowQuestion = (question, responseMap) => {
    if (!question.conditional) return true;

    const dependentResponse = responseMap[question.conditional.dependsOn];
    if (!dependentResponse) return false;

    const dependentValue = getResponseValue(dependentResponse);
    const condition = question.conditional.showIf;

    if (typeof condition === "function") {
      return condition(dependentValue);
    }

    if (Array.isArray(condition)) {
      return condition.includes(dependentValue);
    }

    return dependentValue === condition;
  };

  // Helper function to get the actual response value
  const getResponseValue = (response) => {
    if (response.selectedOptions && response.selectedOptions.length > 0) {
      return response.selectedOptions[0]; // For checkbox, take first option
    }
    if (
      response.selectedOption !== null &&
      response.selectedOption !== undefined
    ) {
      return response.selectedOption;
    }
    if (
      response.selectedValue !== null &&
      response.selectedValue !== undefined
    ) {
      return response.selectedValue;
    }
    if (response.selectedValues && response.selectedValues.length > 0) {
      return response.selectedValues;
    }
    return null;
  };

  // Helper function to check if a question is properly answered
  const isQuestionAnswered = (question, response) => {
    switch (question.type) {
      case "checkbox":
        return response.selectedOptions && response.selectedOptions.length > 0;
      case "wounds_image":
        return response.selectedValues && response.selectedValues.length > 0;
      case "text":
      case "textarea":
        return response.selectedValue && response.selectedValue.trim() !== "";
      case "radio":
      case "scale":
        return (
          response.selectedOption !== null &&
          response.selectedOption !== undefined
        );
      default:
        return (
          (response.selectedOption !== null &&
            response.selectedOption !== undefined) ||
          (response.selectedValue !== null &&
            response.selectedValue !== undefined)
        );
    }
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "text-green-600";
    if (progress >= 75) return "text-blue-600";
    if (progress >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressBarColor = (progress) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getStatusBadge = (progress) => {
    if (progress === 100) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✓ Vollständig
        </span>
      );
    }
    if (progress > 0) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          ⏳ In Bearbeitung
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        ○ Nicht begonnen
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 border-b pb-3">
          Fragebögen von Patient <span className="text-blue-600">#{id}</span>
        </h1>

        {questionnaires.length === 0 ? (
          <div className="text-center py-16 text-gray-500 text-lg">
            🗂️ Keine Fragebögen gefunden.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-600">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">Typ</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Fortschritt</th>
                  <th className="py-3 px-4 text-left">Erstellt am</th>
                  <th className="py-3 px-4 text-left">Aktualisiert am</th>
                </tr>
              </thead>
              <tbody>
                {questionnaires.map((q, index) => {
                  const progress = calculateProgress(q);

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-blue-50 transition cursor-pointer"
                      onClick={() => {
                        if (progress === 100) return;
                        if (q.type === "pre") {
                          navigate("/patient/mosQuestionnaire1", { state: q });
                        } else if (q.type === "post") {
                          navigate("/patient/mosQuestionnaire2", { state: q });
                        }
                      }}
                    >
                      <td className="py-3 px-4 border-b">{index + 1}</td>
                      <td className="py-3 px-4 border-b capitalize font-medium">
                        {q.type}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {getStatusBadge(progress)}
                      </td>
                      <td className="py-3 px-4 border-b">
                        <div className="flex items-center space-x-3">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor(
                                progress
                              )}`}
                              style={{ width: `${progress}%` }}
                            ></div>
                          </div>
                          <span
                            className={`text-sm font-medium ${getProgressColor(
                              progress
                            )}`}
                          >
                            {progress}%
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {(() => {
                            const questionnaireDefinition =
                              q.type === "post"
                                ? postAssessmentQuestions
                                : preAssessmentQuestions;
                            if (questionnaireDefinition) {
                              const { totalQuestions, answeredQuestions } =
                                calculateQuestionnaireStats(
                                  q,
                                  questionnaireDefinition
                                );
                              return `${answeredQuestions} von ${totalQuestions} Fragen`;
                            }
                            return `${q.responses?.length || 0} Antworten`;
                          })()}
                        </div>
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formatDate(q.created_at)}
                      </td>
                      <td className="py-3 px-4 border-b">
                        {formatDate(q.updated_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Questionnaire;
