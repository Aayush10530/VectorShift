// frontend/src/nodes/inputNode.js

import { useState } from 'react';
import { BaseNode } from '../nodes/BaseNode';

export const InputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      inputs={[]}
      outputs={[{ id: 'value', label: 'Value' }]}
      categoryColor="var(--accent-green)"
      style={{ width: 240 }}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Name:</label>
          <input
            type="text"
            value={currName}
            onChange={handleNameChange}
            className="field-input"
          />
        </div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Type:</label>
          <select value={inputType} onChange={handleTypeChange} className="field-select">
            <option value="Text">Text</option>
            <option value="File">File</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
