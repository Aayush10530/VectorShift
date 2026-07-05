// frontend/src/nodes/custom/FilterNode.js

import { useState } from 'react';
import { BaseNode } from '../../nodes/BaseNode';

export const FilterNode = ({ id, data }) => {
  const [conditionLabel, setConditionLabel] = useState(data?.conditionLabel || '');

  const handleConditionChange = (e) => {
    setConditionLabel(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Filter"
      inputs={[
        { id: 'value', label: 'Value' },
        { id: 'condition', label: 'Condition' },
      ]}
      outputs={[
        { id: 'true', label: 'True Branch' },
        { id: 'false', label: 'False Branch' },
      ]}
      categoryColor="var(--accent-cyan)"
      style={{ width: 240 }}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Label:</label>
          <input
            type="text"
            placeholder="Condition description"
            value={conditionLabel}
            onChange={handleConditionChange}
            className="field-input"
          />
        </div>
      </div>
    </BaseNode>
  );
};
