import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateDFSFrames } from './generateFrames';
import { dfsJavaCode, dfsCppCode, dfsPseudoCode } from './code';
import type { Graph } from '../shared';

const DFS_METADATA = {
  title: 'Depth-First Search (DFS)',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Depth-First Search is a graph traversal algorithm that explores as deep as possible along each branch before backtracking. It uses a stack structure (either call stack in recursion or an explicit stack).',
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

export const DFSVisualizer: React.FC = () => {
  const frames = useMemo(() => generateDFSFrames(DEFAULT_GRAPH, '0'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={dfsJavaCode}
      cppCode={dfsCppCode}
      pseudoCode={dfsPseudoCode}
      metadata={DFS_METADATA}
      rendererType="graph"
    />
  );
};

export default DFSVisualizer;
