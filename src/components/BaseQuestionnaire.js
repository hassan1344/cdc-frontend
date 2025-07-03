import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Volume2, Check } from "lucide-react";
import useSpeech from "../hooks/useSpeech";
import QuestionRenderer from "./QuestionRenderer";
import ProgressBar from "./ProgressBar";
import NavigationButtons from "./NavigationButtons";
import { mapResponsesToState } from "../utils/mapResponsesToState";

const BaseQuestionnaire = ({
  sections,
  title,
  subtitle,
  patientencode,
  onComplete,
  headerConfig,
  savedResponses = null, // New prop for saved responses
  onSave = null, // Optional callback for saving drafts
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState({});
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const speak = useSpeech();

  // Initialize responses from saved data
  useEffect(() => {
    if (savedResponses) {
      const restoredState = mapResponsesToState(savedResponses, sections);
      setResponses(restoredState);
      
      // Optionally set the current step to the first incomplete section
      const incompleteSection = findFirstIncompleteSection(restoredState);
      if (incompleteSection !== -1) {
        setCurrentStep(incompleteSection);
      }
    }
    setIsLoading(false);
  }, [savedResponses, sections]);

  // Find first incomplete section
  const findFirstIncompleteSection = (responseState) => {
    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const visibleQuestions = getVisibleQuestions(section, responseState);
      
      const isComplete = visibleQuestions.every((question) => {
        const response = responseState[question.id];
        if (question.type === "checkbox") {
          return response && response.length > 0;
        }
        return response !== undefined && response !== null && response !== "";
      });
      
      if (!isComplete) {
        return i;
      }
    }
    return -1; // All sections complete
  };

  // Modified to accept optional responseState parameter
  const getVisibleQuestions = (section, responseState = responses) => {
    return section.questions.filter(question => shouldShowQuestion(question, responseState));
  };

  const shouldShowQuestion = (question, responseState = responses) => {
    if (!question.conditional) return true;
    const dependentResponse = responseState[question.conditional.dependsOn];
    return dependentResponse === question.conditional.showIf;
  };

  useEffect(() => {
    setShowValidationErrors(false);
  }, [responses]);

  const getAllVisibleQuestions = () => {
    let allVisible = [];
    sections.forEach((section) => {
      const visibleQuestions = getVisibleQuestions(section);
      allVisible = [...allVisible, ...visibleQuestions];
    });
    return allVisible;
  };

  const validateCurrentSection = () => {
    const visibleQuestions = getVisibleQuestions(currentSection);
    return visibleQuestions.filter((question) => {
      const response = responses[question.id];
      if (question.type === "checkbox") {
        return !response || response.length === 0;
      }
      return response === undefined || response === null || response === "";
    });
  };

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

  const canNavigateToSection = (targetIndex) => {
    for (let i = 0; i < targetIndex; i++) {
      if (!validateSectionCompletion(sections[i])) {
        return false;
      }
    }
    return true;
  };

  const handleResponse = (questionId, value) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  // Auto-save functionality (optional)
  useEffect(() => {
    if (onSave && Object.keys(responses).length > 0) {
      const timeoutId = setTimeout(() => {
        const formattedResponse = handleQuestionnaireComplete(responses, sections);
        onSave(formattedResponse);
      }, 10000); // Auto-save after 10 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [responses, onSave]);

  const formatQuestionnaireResponses = (responses, sections) => {
    const formattedResponses = [];
    let questionCounter = 1;

    sections.forEach((section) => {
      section.questions.forEach((question) => {
        const responseValue = responses[question.id];

        if (
          responseValue === undefined ||
          responseValue === null ||
          responseValue === ""
        ) {
          return;
        }

        if (question.conditional) {
          const dependentResponse = responses[question.conditional.dependsOn];
          if (dependentResponse !== question.conditional.showIf) {
            return;
          }
        }

        const baseResponse = {
          questionNumber: questionCounter,
          questionId: question.id,
          sectionId: section.id,
          responseType: question.type,
          icfCode: question.icf || null,
        };

        switch (question.type) {
          case "radio":
            if (question.scaleOptions) {
              baseResponse.selectedOption = responseValue;
              baseResponse.scaleValue = responseValue;
            } else {
              const selectedIndex = question.options.findIndex(
                (opt) => opt.text === responseValue
              );
              baseResponse.selectedOption =
                selectedIndex >= 0 ? selectedIndex : null;
            }
            break;

          case "scale":
            if (question.scaleOptions) {
              baseResponse.selectedOption = responseValue;
              baseResponse.scaleValue = responseValue;
            } else {
              baseResponse.selectedOption = responseValue;
              baseResponse.scaleValue = responseValue;
            }
            break;

          case "checkbox":
            const selectedIndices = Array.isArray(responseValue)
              ? responseValue.map(value => 
                  question.options.findIndex(opt => opt.text === value)
                ).filter(index => index >= 0)
              : [];
            const selectedValues = Array.isArray(responseValue)
              ? responseValue
              : [];

            baseResponse.selectedOptions = selectedIndices;
            baseResponse.selectedValues = selectedValues;
            baseResponse.selectedOption = null;
            baseResponse.selectedValue = null;
            break;

          case "text":
          case "textarea":
            baseResponse.selectedOption = null;
            baseResponse.selectedValue = responseValue;
            break;

          case "wounds_image":
            baseResponse.selectedOption = null;
            baseResponse.selectedValue = responseValue;
            break;

          default:
            baseResponse.selectedOption = null;
            baseResponse.selectedValue = responseValue;
        }

        formattedResponses.push(baseResponse);
        questionCounter++;
      });
    });

    return formattedResponses;
  };

  const handleQuestionnaireComplete = (rawResponses, sections) => {
    const formattedResponses = formatQuestionnaireResponses(
      rawResponses,
      sections
    );

    const finalResponse = {
      patientencode: patientencode,
      questionnaireType: subtitle,
      responses: formattedResponses,
    };

    return finalResponse;
  };

  const handleNext = () => {
    const unanswered = validateCurrentSection();
    if (unanswered.length > 0) {
      setShowValidationErrors(true);
      return;
    }

    setShowValidationErrors(false);

    if (currentStep < sections.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const formattedResponse = handleQuestionnaireComplete(
        responses,
        sections
      );
      onComplete(formattedResponse);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReadAloud = (text) => {
    speak(text);
  };

  // Show loading state while initializing
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading questionnaire...</p>
        </div>
      </div>
    );
  }

  const totalSteps = sections.length;
  const allVisibleQuestions = getAllVisibleQuestions();
  const answeredQuestions = allVisibleQuestions.filter(
    (q) => responses[q.id] !== undefined
  );
  const progress =
    allVisibleQuestions.length > 0
      ? (answeredQuestions.length / allVisibleQuestions.length) * 100
      : 0;

  const currentSection = sections[currentStep];
  const visibleQuestions = getVisibleQuestions(currentSection);
  const unanswered = validateCurrentSection();
  const isLastStep = currentStep === totalSteps - 1;
  const isComplete = isLastStep && unanswered.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">
                  {headerConfig.acronym}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-600">{subtitle}</p>
                {savedResponses && (
                  <p className="text-xs text-green-600 mt-1">
                    ✓ Previous responses restored
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <ProgressBar
        sections={sections}
        currentStep={currentStep}
        progress={progress}
        answeredQuestions={answeredQuestions}
        allVisibleQuestions={allVisibleQuestions}
        validateSectionCompletion={validateSectionCompletion}
        canNavigateToSection={canNavigateToSection}
        onSectionClick={(index) => {
          if (canNavigateToSection(index)) {
            setCurrentStep(index);
            setShowValidationErrors(false);
          }
        }}
        subtitle={subtitle}
      />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="space-y-6">
            {visibleQuestions.length > 0 ? (
              visibleQuestions.map((question) => (
                <QuestionRenderer
                  key={question.id}
                  question={question}
                  response={responses[question.id]}
                  showError={showValidationErrors && !responses[question.id]}
                  onResponse={handleResponse}
                  onReadAloud={handleReadAloud}
                />
              ))
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
          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            isComplete={isComplete}
            isDisabled={unanswered.length > 0 && !isLastStep}
            onPrevious={handlePrevious}
            onNext={handleNext}
          />
        </div>
      </div>
    </div>
  );
};

export default BaseQuestionnaire;