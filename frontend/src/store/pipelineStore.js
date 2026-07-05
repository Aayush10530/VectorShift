// frontend/src/store/pipelineStore.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const usePipelineStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},

  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },

  addNode: (node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },

  removeNode: (id) => {
    set({
      nodes: get().nodes.filter((n) => n.id !== id),
    });
  },

  updateNodeData: (id, data) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },

  removeEdge: (id) => {
    set({
      edges: get().edges.filter((e) => e.id !== id),
    });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },

  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },

  onConnect: (connection) => {
    set({
      edges: addEdge(
        {
          ...connection,
          type: 'default',
          animated: true,
          style: { stroke: '#7C6FF7', strokeWidth: 2 },
          markerEnd: { 
            type: MarkerType.ArrowClosed, 
            color: '#7C6FF7',
            width: 14, 
            height: 14 
          },
        },
        get().edges
      ),
    });
  },
}));

export const getPipelineState = () => usePipelineStore.getState();

export default usePipelineStore;
