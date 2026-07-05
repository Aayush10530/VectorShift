// frontend/src/nodes/custom/PromptCrafterNode.js

import { useState } from 'react';
import { BaseNode } from '../../nodes/BaseNode';

export const PromptCrafterNode = ({ id, data }) => {
  const [systemText] = useState(data?.systemText || 'You are a helpful assistant.');
  const [userText] = useState(data?.userText || 'Help me build a pipeline.');

  return (
    <BaseNode
      id={id}
      title="Prompt Crafter"
      inputs={[
        { id: 'system', label: 'System' },
        { id: 'user', label: 'User Message' },
      ]}
      outputs={[{ id: 'prompt', label: 'Composed Prompt' }]}
      categoryColor="var(--accent-pink)"
      style={{ width: 240 }}
    >
      <div>
        <div style={{ marginBottom: '6px' }}>
          <label className="field-label">Preview:</label>
          <textarea
            value={`System: ${systemText}\nUser: ${userText}`}
            readOnly
            className="field-textarea"
            style={{ background: 'rgba(0, 0, 0, 0.4)', color: 'var(--text-secondary)', fontStyle: 'italic' }}
          />
        </div>
      </div>
    </BaseNode>
  );
};
