import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generatePrimMSTFrames } from './generateFrames';
import { primMSTJavaCode, primMSTCppCode, primMSTPseudoCode } from './code';
import type { Graph } from '../shared';

const PRIM_MST_METADATA = {
  title: 'Prim\'s Minimum Spanning Tree (MST)',
  category: 'Graphs',
  difficulty: 'hard' as const,
  timeComplexity: 'O((V + E) log V)',
  spaceComplexity: 'O(V)',
  description: 'Prim\'s algorithm finds a Minimum Spanning Tree for a weighted undirected graph. It starts with a single vertex and grows the tree one edge at a time, always choosing the cheapest edge that connects a vertex in the tree to a vertex outside the tree.',
};

const DEFAULT_GRAPH: Graph = {
  vertices: [
    { id: '0', value: 0 },
    { id: '1', value: 1 },
    { id: '2', value: 2 },
    { id: '3', value: 3 },
    { id: '4', value: 4 },
  ],
  edges: [
    { id: '0-1', source: '0', target: '1', weight: 2, directed: false },
    { id: '0-3', source: '0', target: '3', weight: 6, directed: false },
    { id: '1-2', source: '1', target: '2', weight: 3, directed: false },
    { id: '1-3', source: '1', target: '3', weight: 8, directed: false },
    { id: '1-4', source: '1', target: '4', weight: 5, directed: false },
    { id: '2-4', source: '2', target: '4', weight: 7, directed: false },
    { id: '3-4', source: '3', target: '4', weight: 9, directed: false },
  ],
  directed: false,
};

export const PrimMSTVisualizer: React.FC = () => {
  const frames = useMemo(() => generatePrimMSTFrames(DEFAULT_GRAPH, '0'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={primMSTJavaCode}
      cppCode={primMSTCppCode}
      pseudoCode={primMSTPseudoCode}
      metadata={PRIM_MST_METADATA}
      rendererType="graph"
    />
  );
};

export default PrimMSTVisualizer;
