// frontend/src/nodes/textNode.js

import { useState, useRef } from 'react';
import { BaseNode } from '../nodes/BaseNode';
import { useAutoResize } from '../hooks/useAutoResize';
import { useVariableHandles } from '../hooks/useVariableHandles';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  const { width, height } = useAutoResize(textareaRef, currText);
  const variableHandles = useVariableHandles(currText);

  return (
    <BaseNode
      id={id}
      title="Text"
      inputs={variableHandles}
      outputs={[{ id: 'output', label: 'Output' }]}
      categoryColor="var(--accent-cyan)"
      style={{ width: 240, height }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
        <div>
          <label className="field-label">Text:</label>
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            className="field-textarea"
          />
        </div>
        {variableHandles.length > 0 && (
          <div style={{
            marginTop: '10px',
            paddingTop: '8px',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <span
              className="field-label"
              style={{ fontSize: '9px', color: 'var(--text-disabled)', marginBottom: '2px', letterSpacing: '0.05em' }}
            >
              DETECTED VARIABLES
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {variableHandles.map((handle) => (
                <span
                  key={handle.id}
                  style={{
                    background: 'rgba(34, 211, 238, 0.05)',
                    border: '1px solid rgba(34, 211, 238, 0.15)',
                    color: 'var(--accent-cyan)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontSize: '9px',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 500,
                    userSelect: 'none',
                    cursor: 'default',
                  }}
                >
                  {handle.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </BaseNode>
  );
};
