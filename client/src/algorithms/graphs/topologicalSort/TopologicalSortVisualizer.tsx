import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateTopologicalSortFrames } from './generateFrames';
import { topologicalSortJavaCode, topologicalSortCppCode, topologicalSortPseudoCode } from './code';
import type { Graph } from '../shared';

const TOPOLOGICAL_SORT_METADATA = {
  title: 'Topological Sort (Kahn\'s Algorithm)',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Topological Sort ordering sorts vertices in a Directed Acyclic Graph (DAG) such that for every directed edge u → v, vertex u comes before v. Kahn\'s algorithm works by repeatedly enqueuing nodes with an in-degree of 0 and reducing the in-degrees of their neighbors.',
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
    { id: '0-1', source: '0', target: '1', directed: true },
    { id: '0-2', source: '0', target: '2', directed: true },
    { id: '1-3', source: '1', target: '3', directed: true },
    { id: '2-3', source: '2', target: '3', directed: true },
    { id: '3-4', source: '3', target: '4', directed: true },
    { id: '1-4', source: '1', target: '4', directed: true },
  ],
  directed: true,
};

export const TopologicalSortVisualizer: React.FC = () => {
  const frames = useMemo(() => generateTopologicalSortFrames(DEFAULT_GRAPH), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={topologicalSortJavaCode}
      cppCode={topologicalSortCppCode}
      pseudoCode={topologicalSortPseudoCode}
      metadata={TOPOLOGICAL_SORT_METADATA}
      rendererType="graph"
    />
  );
};

export default TopologicalSortVisualizer;
