import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateBFSFrames } from './generateFrames';
import { bfsJavaCode, bfsCppCode, bfsPseudoCode } from './code';
import type { Graph } from '../shared';

const BFS_METADATA = {
  title: 'Breadth-First Search (BFS)',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Breadth-First Search is a graph traversal algorithm that explores all vertices at the current depth level before moving to the next level. It uses a queue structure.',
};

const DEFAULT_GRAPH: Graph = {
  vertices: [
    { id: '0', value: 0 },
    { id: '1', value: 1 },
    { id: '2', value: 2 },
    { id: '3', value: 3 },
    { id: '4', value: 4 },
    { id: '5', value: 5 },
  ],
  edges: [
    { id: '0-1', source: '0', target: '1', directed: false },
    { id: '0-2', source: '0', target: '2', directed: false },
    { id: '1-3', source: '1', target: '3', directed: false },
    { id: '1-4', source: '1', target: '4', directed: false },
    { id: '2-4', source: '2', target: '4', directed: false },
    { id: '3-5', source: '3', target: '5', directed: false },
    { id: '4-5', source: '4', target: '5', directed: false },
  ],
  directed: false,
};

export const BFSVisualizer: React.FC = () => {
  const frames = useMemo(() => generateBFSFrames(DEFAULT_GRAPH, '0'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={bfsJavaCode}
      cppCode={bfsCppCode}
      pseudoCode={bfsPseudoCode}
      metadata={BFS_METADATA}
      rendererType="graph"
    />
  );
};

export default BFSVisualizer;
