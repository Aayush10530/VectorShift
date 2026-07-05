// frontend/src/utils/variableParser.js

export const extractVariables = (text) => {
  if (text === null || text === undefined || typeof text !== 'string' || text === '') {
    return [];
  }

  const regex = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
  const variables = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    variables.push(match[1].trim());
  }

  return [...new Set(variables)];
};

// extractVariables("Hello {{ name }}, your age is {{ age }}") → ["name", "age"]
// extractVariables("{{ foo }} and {{ foo }}") → ["foo"]  
// extractVariables("no variables here") → []
// extractVariables("") → []
// extractVariables("{{ 123invalid }}") → []
