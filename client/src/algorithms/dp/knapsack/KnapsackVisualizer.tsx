import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateKnapsackFrames } from './generateFrames';
import { knapsackJavaCode, knapsackCppCode, knapsackPseudoCode } from './code';

const KNAPSACK_METADATA = {
  title: '0/1 Knapsack (Dynamic Programming)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(N * W)',
  spaceComplexity: 'O(N * W) DP table',
  description: 'The 0/1 Knapsack problem is a classic DP problem: given items with values and weights, maximize the total value in a knapsack of capacity W. You can take either 1 or 0 of each item. The visualizer maps states onto a 2D DP table of weights versus items.',
};

export const KnapsackVisualizer: React.FC = () => {
  const frames = useMemo(() => generateKnapsackFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={knapsackJavaCode}
      cppCode={knapsackCppCode}
      pseudoCode={knapsackPseudoCode}
      metadata={KNAPSACK_METADATA}
      rendererType="graph"
    />
  );
};

export default KnapsackVisualizer;
