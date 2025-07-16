import React from "react";
import { ChevronLeft, Check } from "lucide-react";

const ProgressBar = ({
  sections,
  currentStep,
  progress,
  answeredQuestions,
  allVisibleQuestions,
  validateSectionCompletion,
  canNavigateToSection,
  onSectionClick,
  subtitle,
}) => {
  return (
    <div className="bg-white border-b">
      <div className="max-w-4xl mx-auto px-6 py-6">

        {/* Section Progress */}
        <div className="flex items-center justify-between mb-6">
          {sections.map((section, index) => {
            const isCurrent = index === currentStep;
            const isCompleted = validateSectionCompletion(section);
            const canAccess = canNavigateToSection(index);

            return (
              <React.Fragment key={section.id}>
                <button
                  onClick={() => onSectionClick(index)}
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
                </button>

                {index < sections.length - 1 && (
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
            <span>{subtitle}</span>
            <span>
              {Math.round(progress)}% Complete ({answeredQuestions.length}/
              {allVisibleQuestions.length} questions)
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Section Title */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-1">
            {sections[currentStep].title}
          </h2>
          <p className="text-sm text-gray-600">
            {subtitle} (Schritt {currentStep + 1} von {sections.length})
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
