// frontend/src/components/SubmitButton.js

import React, { useState } from 'react';
import { submitPipeline } from '../submit';

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await submitPipeline();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="button-primary"
      >
        {loading ? 'Submitting...' : 'BUILD PIPELINE'}
      </button>

      {result && (
        <div
          style={{
            marginTop: '8px',
            background: 'var(--surface-1)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            padding: '10px 12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span>Nodes</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{result.num_nodes}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
            <span>Edges</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{result.num_edges}</span>
          </div>
          <div
            style={{
              marginTop: '8px',
              paddingTop: '8px',
              borderTop: '1px solid var(--border-subtle)',
              fontSize: '12px',
              fontWeight: 600,
              color: result.is_dag ? 'var(--accent-green)' : 'var(--accent-red)',
            }}
          >
            {result.is_dag ? '✓ Valid Pipeline' : '✗ Contains a Cycle'}
          </div>
        </div>
      )}

      {error && (
        <div
          style={{
            marginTop: '8px',
            background: 'var(--surface-1)',
            border: '1px solid var(--accent-red)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <div style={{ fontSize: '11px', color: 'var(--accent-red)', fontWeight: 600 }}>
            Error: {error}
          </div>
        </div>
      )}
    </div>
  );
};
