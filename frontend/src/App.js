// frontend/src/App.js

import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import usePipelineStore from './store/pipelineStore';
import { NODE_TYPES } from './utils/nodeRegistry';
import { Toolbar } from './components/Toolbar';
import { SubmitButton } from './components/SubmitButton';

import 'reactflow/dist/style.css';

export const App = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [introActive, setIntroActive] = useState(true);
  const [revealSite, setRevealSite] = useState(false);

  useEffect(() => {
    const revealTimer = setTimeout(() => {
      setRevealSite(true);
    }, 1000);

    const introTimer = setTimeout(() => {
      setIntroActive(false);
    }, 2200);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(introTimer);
    };
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    if (nextTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  };

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    getNodeID,
  } = usePipelineStore();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const appDataStr = event.dataTransfer.getData('application/reactflow');
      if (!appDataStr) return;

      try {
        const appData = JSON.parse(appDataStr);
        const nodeType = appData?.nodeType;

        if (!nodeType) return;

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowWrapper.current.getBoundingClientRect().left,
          y: event.clientY - reactFlowWrapper.current.getBoundingClientRect().top,
        });

        const id = getNodeID(nodeType);
        const newNode = {
          id,
          type: nodeType,
          position,
          data: {},
        };

        addNode(newNode);
      } catch (err) {
        console.error("Error parsing drop data:", err);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  return (
    <>
      {/* Intro Loader Overlay */}
      {introActive && (
        <div className={`intro-overlay ${revealSite ? 'fade-out' : ''}`}>
          <div className="intro-logo-container">
            <div className="intro-logo-glow">
              <svg width="32" height="32" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 76 8 C 72 40 64 70 58 90 L 8 22" />
                <path d="M 48 4 C 25 12 16 28 17 38 C 18 44 40 41 96 40 C 97 55 80 60 14 75" />
              </svg>
            </div>
            <span className="intro-title">VECTORSHIFT</span>
            <div className="intro-spinner" />
          </div>
        </div>
      )}

      <div className={`site-wrapper ${revealSite ? 'revealed' : ''}`} style={{ display: 'flex', width: '100vw', height: '100vh', background: 'var(--canvas-bg)', overflow: 'hidden' }}>
        {/* Sidebar / Toolbar */}
        <div className="sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingLeft: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-cyan) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 10px rgba(124, 111, 247, 0.35)',
              }}>
                <svg width="16" height="16" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round">
                  {/* V Shape */}
                  <path d="M 76 8 C 72 40 64 70 58 90 L 8 22" />
                  {/* S Shape */}
                  <path d="M 48 4 C 25 12 16 28 17 38 C 18 44 40 41 96 40 C 97 55 80 60 14 75" />
                </svg>
              </div>
               <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '0.08em', fontFamily: "'Inter', sans-serif" }}>
                VECTOR<span style={{ color: '#8B8B9E' }}>SHIFT</span>
              </span>
            </div>
            <button
              onClick={toggleTheme}
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                transition: 'all 0.15s ease',
                outline: 'none',
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = 'var(--surface-3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.background = 'var(--surface-2)'; }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M120,40V16a8,8,0,0,1,16,0V40a8,8,0,0,1-16,0Zm72,88a64,64,0,1,1-64-64A64.07,64.07,0,0,1,192,128Zm12-8a8,8,0,0,0,8-8,88,88,0,0,0-80-80,8,8,0,0,0-16,0,104.11,104.11,0,0,1,88,88Zm-8,68.4a8,8,0,0,0,11.31,0l17-17a8,8,0,0,0-11.31-11.31l-17,17A8,8,0,0,0,188,188.4ZM240,120H216a8,8,0,0,0,0,16h24a8,8,0,0,0,0-16ZM56.6,188.4a8,8,0,0,0,11.31-11.31l-17-17a8,8,0,0,0-11.31,11.31l-17,17ZM120,216v24a8,8,0,0,0,16,0V216a8,8,0,0,0-16,0Zm96.4-17-17-17a8,8,0,1,0-11.31,11.31l17,17a8,8,0,0,0,11.31-11.31ZM40,120H16a8,8,0,0,0,0,16H40a8,8,0,0,0,0-16Zm28,8a8,8,0,0,0-8-8,104.11,104.11,0,0,1,88-88,8,8,0,0,0-16,0A88,88,0,0,0,52,112,8,8,0,0,0,60,128Zm8,60.4a8,8,0,0,0,11.31-11.31l-17-17a8,8,0,0,0-11.31,11.31l17,17ZM128,192a8,8,0,0,0-8,8c0,2.16.14,4.29.4,6.4A104.17,104.17,0,0,1,32.4,116.4c2.11.26,4.24.4,6.4.4a8,8,0,0,0,0-16,88.16,88.16,0,0,0-10.4-.62,8,8,0,0,0-8.9,8.9C20,118.84,20,128.42,20,138c0,48.53,39.47,88,88,88,9.58,0,19.16,0,28.72-.45a8,8,0,0,0,7.9-8.9A88.16,88.16,0,0,0,136,206.4c0-2.16,0-4.29-.4-6.4C135.2,192,128,192,128,192Zm68.4-142.4a8,8,0,0,0-11.31,11.31l17,17a8,8,0,0,0,11.31-11.31Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-5.29,32.4A104,104,0,0,0,162,224a103.74,103.74,0,0,0,62-20.73,8,8,0,0,0,9.54-11A102.66,102.66,0,0,0,233.54,142.23Z" />
                </svg>
              )}
            </button>
          </div>
          <Toolbar />
          <hr style={{ border: 'none', borderTop: '1px solid var(--border-subtle)', margin: '12px 0' }} />
          <SubmitButton />
        </div>
        
        {/* ReactFlow Canvas */}
        <div ref={reactFlowWrapper} style={{ flexGrow: 1, height: '100%', background: 'var(--canvas-bg)' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={NODE_TYPES}
            style={{ background: 'var(--canvas-bg)' }}
          >
            <Background
              variant="dots"
              gap={20}
              size={1.5}
              color={theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)'}
            />
            <Controls />
            <MiniMap
              style={{
                background: theme === 'dark' ? '#111118' : 'var(--surface-1)',
                border: theme === 'dark' ? '1px solid #2E2E3E' : '1px solid var(--border-subtle)',
                borderRadius: 8
              }}
              nodeColor={(node) => {
                const colors = {
                  customInput: '#34D399',
                  customOutput: '#FBBF24',
                  llm: '#7C6FF7',
                  text: '#22D3EE'
                }
                return colors[node.type] || '#F472B6'
              }}
              maskColor={theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(94, 84, 72, 0.2)'}
            />
          </ReactFlow>
        </div>
      </div>
    </>
  );
};

export default App;
