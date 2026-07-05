// frontend/src/nodes/BaseNode.js

import React from 'react';
import { Handle, Position } from 'reactflow';
import { getNodeIcon } from '../components/DraggableNode';

const getIconTypeFromTitle = (title) => {
  switch (title) {
    case 'Input': return 'customInput';
    case 'Output': return 'customOutput';
    case 'LLM': return 'llm';
    case 'Text': return 'text';
    case 'Prompt Crafter': return 'promptCrafter';
    case 'Filter': return 'filter';
    case 'Transform': return 'transform';
    case 'API Call': return 'apiCall';
    case 'Merge': return 'merge';
    default: return '';
  }
};

export const BaseNode = ({
  id,
  title,
  inputs = [],
  outputs = [],
  categoryColor = 'var(--accent-pink)',
  children,
  style = {},
}) => {
  return (
    <div
      className="base-node"
      style={{
        position: 'relative',
        overflow: 'visible',
        background: 'var(--surface-1)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `4px solid ${categoryColor}`,
        borderRadius: '10px',
        minWidth: '240px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {/* Node Header */}
      <div
        style={{
          background: 'var(--surface-2)',
          padding: '10px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          borderRadius: '9px 9px 0 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Category indicator icon */}
          {getNodeIcon(getIconTypeFromTitle(title), categoryColor)}
          <span
            style={{
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </span>
        </div>
        <div>
          {/* Placeholder for future header actions */}
        </div>
      </div>
      
      {/* Content Area */}
      <div
        style={{
          padding: '12px 24px', // Standard padding left/right
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {children}
      </div>

      {/* Target (Input) Handles */}
      {inputs.map((input, index) => {
        const topPercent = (index + 1) * (100 / (inputs.length + 1));
        return (
          <div
            key={input.id}
            style={{
              position: 'absolute',
              left: 0,
              top: `${topPercent}%`,
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <Handle
              type="target"
              position={Position.Left}
              id={`${id}-${input.id}`}
              style={{
                position: 'absolute',
                left: '-6px', // half width to center on the left border
                width: '12px',
                height: '12px',
                background: 'var(--accent-cyan)',
                border: '2px solid var(--surface-1)',
                borderRadius: '50%',
                pointerEvents: 'all',
                cursor: 'crosshair',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '10px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {input.label}
            </span>
          </div>
        );
      })}

      {/* Source (Output) Handles */}
      {outputs.map((output, index) => {
        const topPercent = (index + 1) * (100 / (outputs.length + 1));
        return (
          <div
            key={output.id}
            style={{
              position: 'absolute',
              right: 0,
              top: `${topPercent}%`,
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'row-reverse',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          >
            <Handle
              type="source"
              position={Position.Right}
              id={`${id}-${output.id}`}
              style={{
                position: 'absolute',
                right: '-6px', // half width to center on the right border
                width: '12px',
                height: '12px',
                background: 'var(--accent-cyan)',
                border: '2px solid var(--surface-1)',
                borderRadius: '50%',
                pointerEvents: 'all',
                cursor: 'crosshair',
              }}
            />
            <span
              style={{
                position: 'absolute',
                right: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                fontSize: '10px',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                fontFamily: "'Inter', sans-serif",
                whiteSpace: 'nowrap',
              }}
            >
              {output.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
