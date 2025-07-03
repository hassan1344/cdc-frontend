import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NavigationButtons = ({
  currentStep,
  totalSteps,
  isComplete,
  isDisabled,
  onPrevious,
  onNext
}) => {
  return (
    <div className="flex justify-between items-center mt-8 pt-6 border-t">
      <button
        onClick={onPrevious}
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
        onClick={onNext}
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
  );
};

export default NavigationButtons;