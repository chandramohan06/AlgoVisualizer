import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateUnionFindFrames } from './generateFrames';
import { unionFindJavaCode, unionFindCppCode, unionFindPseudoCode } from './code';
import type { Graph } from '../shared';

const UNION_FIND_METADATA = {
  title: 'Union-Find (Disjoint Set Union)',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O(α(N)) - Inverse Ackermann',
  spaceComplexity: 'O(N)',
  description: 'Union-Find is a data structure that tracks elements split into disjoint subsets. It supports two primary operations: Find (determine which subset an element is in, applying path compression) and Union (merge two subsets based on rank).',
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
  edges: [], // Dynamic parent pointers
  directed: true,
};

const DEFAULT_OPERATIONS: Array<[string, string]> = [
  ['0', '1'],
  ['2', '3'],
  ['4', '5'],
  ['1', '3'],
  ['0', '4'],
];

export const UnionFindVisualizer: React.FC = () => {
  const frames = useMemo(() => generateUnionFindFrames(DEFAULT_GRAPH, DEFAULT_OPERATIONS), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={unionFindJavaCode}
      cppCode={unionFindCppCode}
      pseudoCode={unionFindPseudoCode}
      metadata={UNION_FIND_METADATA}
      rendererType="graph"
    />
  );
};

export default UnionFindVisualizer;
