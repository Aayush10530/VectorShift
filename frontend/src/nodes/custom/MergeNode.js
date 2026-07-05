// frontend/src/nodes/custom/MergeNode.js

import React from 'react';
import { BaseNode } from '../../nodes/BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Merge"
      inputs={[
        { id: 'input1', label: 'Input 1' },
        { id: 'input2', label: 'Input 2' },
        { id: 'input3', label: 'Input 3' },
      ]}
      outputs={[{ id: 'merged', label: 'Merged' }]}
      categoryColor="var(--accent-green)"
      style={{ width: 240 }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40px' }}>
        <span style={{ color: 'var(--text-disabled)', fontSize: '11px', fontFamily: "'Inter', sans-serif" }}>
          Merges up to 3 inputs
        </span>
      </div>
    </BaseNode>
  );
};
