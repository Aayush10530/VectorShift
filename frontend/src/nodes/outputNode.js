// frontend/src/nodes/outputNode.js

import { useState } from 'react';
import { BaseNode } from '../nodes/BaseNode';

export const OutputNode = ({ id, data }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setOutputType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Output"
      inputs={[{ id: 'value', label: 'Value' }]}
      outputs={[]}
      categoryColor="var(--accent-amber)"
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
          <select value={outputType} onChange={handleTypeChange} className="field-select">
            <option value="Text">Text</option>
            <option value="File">Image</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
