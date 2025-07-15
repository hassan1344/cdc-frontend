import React from "react";
import { Volume2, Check } from "lucide-react";
import footGraphic1 from "../images/footGraphic1.png";
import footGraphic2 from "../images/footGraphic2.png";
import { woundZones } from "../data/questionData";

const QuestionRenderer = ({ 
  question, 
  response, 
  showError, 
  onResponse, 
  onReadAloud 
}) => {
  const isAnswered = question.type === "checkbox"
    ? response && response.length > 0
    : response !== undefined && response !== null && response !== "";

  const renderQuestionContent = () => {
    switch (question.type) {
      case "radio":
        return (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onReadAloud(option.text);
                  onResponse(question.id, option.text);
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
        );

      case "checkbox":
        return (
          <div className="grid grid-cols-1 gap-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  onReadAloud(option.text);
                  const currentValues = response || [];
                  if (currentValues.includes(option.text)) {
                    onResponse(
                      question.id,
                      currentValues.filter((v) => v !== option.text)
                    );
                  } else {
                    onResponse(question.id, [...currentValues, option.text]);
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
        );

      case "scale":
        return (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {question.scaleOptions.map((scaleOption) => (
              <button
                key={scaleOption.value}
                onClick={() => {
                  onReadAloud(scaleOption.label);
                  onResponse(question.id, scaleOption.value);
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
        );

      case "textarea":
        return (
          <textarea
            value={response || ""}
            onChange={(e) => onResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            rows="4"
          />
        );

      case "text":
        return (
          <input
            type="text"
            value={response || ""}
            onChange={(e) => onResponse(question.id, e.target.value)}
            placeholder={question.placeholder}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          />
        );

      case "wounds_image":
        return (
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
                  onReadAloud(zone.id);
                  const current = response || [];
                  onResponse(
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
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`mb-8 ${showError ? "border-l-4 border-red-500 pl-4" : ""}`}
    >
      <div className="flex items-start gap-3 mb-6">
        <Volume2
          className="w-8 h-8 text-blue-600 p-2 border border-blue-300 rounded-full bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer transition"
          onClick={() => onReadAloud(question.text)}
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

      {renderQuestionContent()}
    </div>
  );
};

export default QuestionRenderer;