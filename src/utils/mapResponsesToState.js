export const mapResponsesToState = (savedResponses, sections) => {
  const stateResponses = {};

  // If no saved responses, return empty state
  if (!savedResponses || !savedResponses.responses) {
    return stateResponses;
  }

  // Create a lookup map for questions by ID
  const questionLookup = {};
  sections.forEach((section) => {
    section.questions.forEach((question) => {
      questionLookup[question.id] = question;
    });
  });

  // Process each saved response
  savedResponses.responses.forEach((response) => {
    const question = questionLookup[response.questionId];
    if (!question) return; // Skip if question not found

    switch (response.responseType) {
      case "radio":
        if (
          response.selectedOption !== null &&
          response.selectedOption !== undefined
        ) {
          if (question.scaleOptions) {
            // For scale questions with radio buttons, use the scale value
            stateResponses[response.questionId] = response.scaleValue;
          } else {
            // For regular radio questions, get the option text by index
            const optionIndex = response.selectedOption;
            if (question.options && question.options[optionIndex]) {
              stateResponses[response.questionId] =
                question.options[optionIndex].text;
            }
          }
        }
        break;

      case "scale":
        if (response.scaleValue !== null && response.scaleValue !== undefined) {
          stateResponses[response.questionId] = response.scaleValue;
        }
        break;

      case "checkbox":
        if (
          response.selectedValues &&
          Array.isArray(response.selectedValues) &&
          response.selectedValues.length > 0
        ) {
          // For checkbox questions, use the selected values array
          stateResponses[response.questionId] = response.selectedValues;
        } else if (
          response.selectedOptions &&
          Array.isArray(response.selectedOptions)
        ) {
          // Fallback: map indices to option texts
          const selectedTexts = question.options
            .filter((opt) => response.selectedOptions.includes(opt.text))
            .map((opt) => opt.text);
          stateResponses[response.questionId] = selectedTexts;
        }
        break;

      case "text":
      case "textarea":
        if (
          response.selectedValue !== null &&
          response.selectedValue !== undefined
        ) {
          stateResponses[response.questionId] = response.selectedValue;
        }
        break;

      case "wounds_image":
        if (response.selectedValues && Array.isArray(response.selectedValues)) {
          stateResponses[response.questionId] = response.selectedValues;
        }
        break;

      default:
        // Handle any other response types
        if (
          response.selectedValue !== null &&
          response.selectedValue !== undefined
        ) {
          stateResponses[response.questionId] = response.selectedValue;
        }
    }
  });

  return stateResponses;
};
