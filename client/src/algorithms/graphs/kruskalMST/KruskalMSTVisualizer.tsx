import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateKruskalMSTFrames } from './generateFrames';
import { kruskalMSTJavaCode, kruskalMSTCppCode, kruskalMSTPseudoCode } from './code';
import type { Graph } from '../shared';

const KRUSKAL_MST_METADATA = {
  title: 'Kruskal\'s Minimum Spanning Tree (MST)',
  category: 'Graphs',
  difficulty: 'hard' as const,
  timeComplexity: 'O(E log E) or O(E log V)',
  spaceComplexity: 'O(V + E)',
  description: 'Kruskal\'s algorithm finds a Minimum Spanning Tree for a connected weighted undirected graph. It sorts all edges by weight and adds them to the tree one by one, using a Disjoint Set data structure to ensure that no cycles are formed.',
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

export const KruskalMSTVisualizer: React.FC = () => {
  const frames = useMemo(() => generateKruskalMSTFrames(DEFAULT_GRAPH), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={kruskalMSTJavaCode}
      cppCode={kruskalMSTCppCode}
      pseudoCode={kruskalMSTPseudoCode}
      metadata={KRUSKAL_MST_METADATA}
      rendererType="graph"
    />
  );
};

export default KruskalMSTVisualizer;
