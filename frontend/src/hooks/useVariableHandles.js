// frontend/src/hooks/useVariableHandles.js

import { useMemo } from 'react';
import { extractVariables } from '../utils/variableParser';

export const useVariableHandles = (text) => {
  return useMemo(() => {
    const variables = extractVariables(text);
    if (!variables || variables.length === 0) {
      return [];
    }
    return variables.map((varName) => ({
      id: `input-${varName}`,
      label: varName,
    }));
  }, [text]);
};
