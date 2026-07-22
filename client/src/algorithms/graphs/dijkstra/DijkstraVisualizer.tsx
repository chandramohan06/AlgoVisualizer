import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateDijkstraFrames } from './generateFrames';
import { dijkstraJavaCode, dijkstraCppCode, dijkstraPseudoCode } from './code';
import type { Graph } from '../shared';

const DIJKSTRA_METADATA = {
  title: 'Dijkstra\'s Shortest Path',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O((V + E) log V)',
  spaceComplexity: 'O(V)',
  description: 'Dijkstra\'s algorithm finds the shortest path from a single source node to all other nodes in a weighted graph with non-negative edge weights. It uses a priority queue to repeatedly extract the node with the minimum distance.',
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
    { id: '0-1', source: '0', target: '1', weight: 4, directed: true },
    { id: '0-2', source: '0', target: '2', weight: 2, directed: true },
    { id: '1-2', source: '1', target: '2', weight: 3, directed: true },
    { id: '1-3', source: '1', target: '3', weight: 2, directed: true },
    { id: '1-4', source: '1', target: '4', weight: 3, directed: true },
    { id: '2-1', source: '2', target: '1', weight: 1, directed: true },
    { id: '2-3', source: '2', target: '3', weight: 4, directed: true },
    { id: '2-4', source: '2', target: '4', weight: 5, directed: true },
    { id: '3-4', source: '3', target: '4', weight: 1, directed: true },
  ],
  directed: true,
};

export const DijkstraVisualizer: React.FC = () => {
  const frames = useMemo(() => generateDijkstraFrames(DEFAULT_GRAPH, '0'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={dijkstraJavaCode}
      cppCode={dijkstraCppCode}
      pseudoCode={dijkstraPseudoCode}
      metadata={DIJKSTRA_METADATA}
      rendererType="graph"
    />
  );
};

export default DijkstraVisualizer;
