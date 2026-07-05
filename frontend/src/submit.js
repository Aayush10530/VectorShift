// frontend/src/submit.js

import { getPipelineState } from './store/pipelineStore';

export const submitPipeline = async () => {
  const { nodes, edges } = getPipelineState();
  const response = await fetch('http://localhost:8000/pipelines/parse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nodes, edges }),
  });
  if (!response.ok) {
    throw new Error(`Pipeline submission failed: ${response.status}`);
  }
  return await response.json();
};
