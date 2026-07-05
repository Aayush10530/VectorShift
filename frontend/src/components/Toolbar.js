// frontend/src/components/Toolbar.js

import React, { useState } from 'react';
import { DraggableNode } from './DraggableNode';

const CATEGORIES = [
  {
    id: 'inputsOutputs',
    label: 'Inputs & Outputs',
    nodes: [
      { type: 'customInput', label: 'Input' },
      { type: 'customOutput', label: 'Output' },
    ]
  },
  {
    id: 'aiProcessing',
    label: 'AI & Text Processing',
    nodes: [
      { type: 'llm', label: 'LLM' },
      { type: 'text', label: 'Text' },
      { type: 'promptCrafter', label: 'Prompt Crafter' },
    ]
  },
  {
    id: 'dataUtilities',
    label: 'Data Utilities',
    nodes: [
      { type: 'filter', label: 'Filter' },
      { type: 'transform', label: 'Transform' },
      { type: 'apiCall', label: 'API Call' },
      { type: 'merge', label: 'Merge' },
    ]
  }
];

export const Toolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openCategories, setOpenCategories] = useState({
    inputsOutputs: true,
    aiProcessing: true,
    dataUtilities: false,
  });

  const toggleCategory = (id) => {
    setOpenCategories((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredCategories = CATEGORIES.map((cat) => {
    const matchingNodes = cat.nodes.filter((node) =>
      node.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return {
      ...cat,
      nodes: matchingNodes,
    };
  }).filter((cat) => cat.nodes.length > 0);

  const isSearching = searchQuery.trim().length > 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Search Input */}
      <div className="sidebar-search-container">
        <input
          type="text"
          placeholder="Search nodes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="sidebar-search-input"
        />
        <svg
          className="sidebar-search-icon"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      </div>

      {/* Accordions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredCategories.map((category) => {
          const isOpen = isSearching || openCategories[category.id];
          return (
            <div key={category.id} className="sidebar-category-wrapper">
              <div
                className={`sidebar-category-header ${isOpen ? 'open' : ''}`}
                onClick={() => !isSearching && toggleCategory(category.id)}
                style={{ cursor: isSearching ? 'default' : 'pointer' }}
              >
                <span className="sidebar-category-title">
                  {category.label}
                  {isSearching && (
                    <span style={{
                      fontSize: '9px',
                      background: 'rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-secondary)',
                      padding: '1px 6px',
                      borderRadius: '10px',
                      fontWeight: 600,
                      marginLeft: '6px'
                    }}>
                      {category.nodes.length} matches
                    </span>
                  )}
                </span>
                {!isSearching && (
                  <svg
                    className="sidebar-category-icon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                )}
              </div>
              <div className={`sidebar-category-content ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-category-inner">
                  {category.nodes.map((node) => (
                    <DraggableNode key={node.type} type={node.type} label={node.label} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
        {filteredCategories.length === 0 && (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-disabled)', fontSize: '12px' }}>
            No nodes match your search
          </div>
        )}
      </div>
    </div>
  );
};
