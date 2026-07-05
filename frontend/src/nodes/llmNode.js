// frontend/src/nodes/llmNode.js

import { useState } from 'react';
import { BaseNode } from '../nodes/BaseNode';

export const LLMNode = ({ id, data }) => {
  const [model, setModel] = useState(data?.model || 'GPT-4');

  const handleModelChange = (e) => {
    setModel(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="LLM"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'prompt', label: 'Prompt' },
      ]}
      outputs={[{ id: 'response', label: 'Response' }]}
      categoryColor="var(--accent-primary)"
      style={{ width: 240 }}
    >
      <div style={{ minHeight: '80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
          <span
            style={{
              background: 'var(--surface-3)',
              color: 'var(--accent-primary)',
              padding: '2px 8px',
              borderRadius: '20px',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {model}
          </span>
        </div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Model:</label>
          <select
            value={model}
            onChange={handleModelChange}
            className="field-select"
          >
            <option value="GPT-4">GPT-4</option>
            <option value="Claude 3">Claude 3</option>
            <option value="Llama 3">Llama 3</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
