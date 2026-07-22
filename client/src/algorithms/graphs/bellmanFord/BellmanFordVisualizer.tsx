import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateBellmanFordFrames } from './generateFrames';
import { bellmanFordJavaCode, bellmanFordCppCode, bellmanFordPseudoCode } from './code';
import type { Graph } from '../shared';

const BELLMAN_FORD_METADATA = {
  title: 'Bellman-Ford Shortest Path',
  category: 'Graphs',
  difficulty: 'hard' as const,
  timeComplexity: 'O(V * E)',
  spaceComplexity: 'O(V)',
  description: 'The Bellman-Ford algorithm finds the shortest path from a single source node to all other nodes in a weighted graph. Unlike Dijkstra, it can handle negative edge weights and detect negative weight cycles.',
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
    { id: '0-1', source: '0', target: '1', weight: 6, directed: true },
    { id: '0-2', source: '0', target: '2', weight: 7, directed: true },
    { id: '1-3', source: '1', target: '3', weight: 5, directed: true },
    { id: '1-2', source: '1', target: '2', weight: 8, directed: true },
    { id: '2-3', source: '2', target: '3', weight: -4, directed: true },
    { id: '2-4', source: '2', target: '4', weight: 9, directed: true },
    { id: '3-1', source: '3', target: '1', weight: -2, directed: true },
    { id: '4-3', source: '4', target: '3', weight: 7, directed: true },
    { id: '4-0', source: '4', target: '0', weight: 2, directed: true },
  ],
  directed: true,
};

export const BellmanFordVisualizer: React.FC = () => {
  const frames = useMemo(() => generateBellmanFordFrames(DEFAULT_GRAPH, '0'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={bellmanFordJavaCode}
      cppCode={bellmanFordCppCode}
      pseudoCode={bellmanFordPseudoCode}
      metadata={BELLMAN_FORD_METADATA}
      rendererType="graph"
    />
  );
};

export default BellmanFordVisualizer;
