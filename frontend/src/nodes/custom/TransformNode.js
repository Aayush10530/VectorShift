// frontend/src/nodes/custom/TransformNode.js

import { useState } from 'react';
import { BaseNode } from '../../nodes/BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'JSON');

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Transform"
      inputs={[{ id: 'data', label: 'Data' }]}
      outputs={[{ id: 'result', label: 'Result' }]}
      categoryColor="var(--accent-amber)"
      style={{ width: 240 }}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Type:</label>
          <select
            value={transformType}
            onChange={handleTransformChange}
            className="field-select"
          >
            <option value="JSON">JSON</option>
            <option value="Text">Text</option>
            <option value="Number">Number</option>
            <option value="Boolean">Boolean</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
