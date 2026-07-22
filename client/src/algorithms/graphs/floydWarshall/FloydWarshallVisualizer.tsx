import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFloydWarshallFrames } from './generateFrames';
import { floydWarshallJavaCode, floydWarshallCppCode, floydWarshallPseudoCode } from './code';
import type { Graph } from '../shared';

const FLOYD_WARSHALL_METADATA = {
  title: 'Floyd-Warshall All-Pairs Shortest Path',
  category: 'Graphs',
  difficulty: 'hard' as const,
  timeComplexity: 'O(V^3)',
  spaceComplexity: 'O(V^2)',
  description: 'The Floyd-Warshall algorithm finds the shortest paths between all pairs of vertices in a weighted graph. It works by checking if a path from i to j can be shortened by passing through an intermediate vertex k.',
};

const DEFAULT_GRAPH: Graph = {
  vertices: [
    { id: '0', value: 0 },
    { id: '1', value: 1 },
    { id: '2', value: 2 },
    { id: '3', value: 3 },
  ],
  edges: [
    { id: '0-1', source: '0', target: '1', weight: 3, directed: true },
    { id: '0-3', source: '0', target: '3', weight: 7, directed: true },
    { id: '1-0', source: '1', target: '0', weight: 8, directed: true },
    { id: '1-2', source: '1', target: '2', weight: 2, directed: true },
    { id: '2-0', source: '2', target: '0', weight: 5, directed: true },
    { id: '2-3', source: '2', target: '3', weight: 1, directed: true },
    { id: '3-0', source: '3', target: '0', weight: 2, directed: true },
  ],
  directed: true,
};

export const FloydWarshallVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFloydWarshallFrames(DEFAULT_GRAPH), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={floydWarshallJavaCode}
      cppCode={floydWarshallCppCode}
      pseudoCode={floydWarshallPseudoCode}
      metadata={FLOYD_WARSHALL_METADATA}
      rendererType="graph"
    />
  );
};

export default FloydWarshallVisualizer;
