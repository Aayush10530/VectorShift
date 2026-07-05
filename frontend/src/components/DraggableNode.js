// frontend/src/components/DraggableNode.js

import React from 'react';

const categoryColors = {
  customInput: '#34D399',      // Emerald green
  customOutput: '#FBBF24',     // Amber
  llm: '#7C6FF7',              // Purple
  text: '#22D3EE',             // Cyan
  promptCrafter: '#F472B6',    // Pink
  filter: '#22D3EE',           // Cyan
  transform: '#FBBF24',        // Amber
  apiCall: '#F87171',          // Red
  merge: '#34D399',            // Green
};

export const getNodeIcon = (type, color) => {
  const strokeColor = color || '#F472B6';
  switch (type) {
    case 'customInput':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M15 12H9" />
          <path d="m12 15-3-3 3-3" />
        </svg>
      );
    case 'customOutput':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M9 12h6" />
          <path d="m12 9 3 3-3 3" />
        </svg>
      );
    case 'llm':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="m5 3 1 2.5L8.5 6 6 7 5 9.5 4 7 1.5 6 4 5 5 3Z" style={{ opacity: 0.7, fill: strokeColor }} />
        </svg>
      );
    case 'text':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M16 13H8" />
          <path d="M16 17H8" />
          <path d="M10 9H8" />
        </svg>
      );
    case 'promptCrafter':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <path d="m15 4 5 5" />
          <path d="m3 20 12-12-5-5L3 15v5h5Z" />
        </svg>
      );
    case 'filter':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
      );
    case 'transform':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <path d="M16 3h5v5" />
          <path d="M8 21H3v-5" />
          <path d="M21 3 14 10" />
          <path d="M3 21l7-7" />
        </svg>
      );
    case 'apiCall':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m6 10 3 2-3 2" />
          <path d="m12 14 4-4" />
        </svg>
      );
    case 'merge':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={strokeColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'all 0.3s ease', flexShrink: 0 }}>
          <path d="M18 6H12a4 4 0 0 0-4 4v8" />
          <path d="M6 18H12a4 4 0 0 0 4-4V6" />
        </svg>
      );
    default:
      return (
        <span
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: strokeColor,
            flexShrink: 0,
            transition: 'all 0.3s ease'
          }}
        />
      );
  }
};

export const DraggableNode = ({ type, label }) => {
  const color = categoryColors[type] || '#F472B6';

  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-node"
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      {getNodeIcon(type, color)}
      <span className="draggable-node-text">{label}</span>
    </div>
  );
};
