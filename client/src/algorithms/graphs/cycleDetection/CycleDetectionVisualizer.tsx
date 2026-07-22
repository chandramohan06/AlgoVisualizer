import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateCycleDetectionFrames } from './generateFrames';
import { cycleDetectionJavaCode, cycleDetectionCppCode, cycleDetectionPseudoCode } from './code';
import type { Graph } from '../shared';

const CYCLE_DETECTION_METADATA = {
  title: 'Cycle Detection (Directed Graph DFS)',
  category: 'Graphs',
  difficulty: 'medium' as const,
  timeComplexity: 'O(V + E)',
  spaceComplexity: 'O(V)',
  description: 'Cycle Detection in a directed graph uses Depth-First Search (DFS) tracking the recursion stack. If during DFS we encounter a node that is currently in the recursion stack, then a back-edge exists, indicating a cycle in the graph.',
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
    { id: '1-2', source: '1', target: '2', directed: true },
    { id: '2-0', source: '2', target: '0', directed: true }, // Back-edge forming a cycle
    { id: '2-3', source: '2', target: '3', directed: true },
    { id: '3-4', source: '3', target: '4', directed: true },
  ],
  directed: true,
};

export const CycleDetectionVisualizer: React.FC = () => {
  const frames = useMemo(() => generateCycleDetectionFrames(DEFAULT_GRAPH), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={cycleDetectionJavaCode}
      cppCode={cycleDetectionCppCode}
      pseudoCode={cycleDetectionPseudoCode}
      metadata={CYCLE_DETECTION_METADATA}
      rendererType="graph"
    />
  );
};

export default CycleDetectionVisualizer;
