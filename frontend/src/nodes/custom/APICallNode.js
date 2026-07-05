// frontend/src/nodes/custom/APICallNode.js

import { useState } from 'react';
import { BaseNode } from '../../nodes/BaseNode';

export const APICallNode = ({ id, data }) => {
  const [method, setMethod] = useState(data?.method || 'GET');

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="API Call"
      inputs={[
        { id: 'url', label: 'URL' },
        { id: 'body', label: 'Body' },
      ]}
      outputs={[
        { id: 'response', label: 'Response' },
        { id: 'error', label: 'Error' },
      ]}
      categoryColor="var(--accent-red)"
      style={{ width: 240 }}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Method:</label>
          <select
            value={method}
            onChange={handleMethodChange}
            className="field-select"
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>
    </BaseNode>
  );
};
