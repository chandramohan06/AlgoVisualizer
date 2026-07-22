import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFractionalKnapsackFrames } from './generateFrames';
import { fractionalKnapsackJavaCode, fractionalKnapsackCppCode, fractionalKnapsackPseudoCode } from './code';

const FRAC_KNAPSACK_METADATA = {
  title: 'Fractional Knapsack (Greedy)',
  category: 'Greedy',
  difficulty: 'easy' as const,
  timeComplexity: 'O(N log N) for sorting',
  spaceComplexity: 'O(1) memory',
  description: 'The Fractional Knapsack problem maximizes total value in a knapsack of capacity W by taking fractions of items. Sorting items by value-to-weight ratio and selecting greedily yields the optimal solution.',
};

export const FractionalKnapsackVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFractionalKnapsackFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={fractionalKnapsackJavaCode}
      cppCode={fractionalKnapsackCppCode}
      pseudoCode={fractionalKnapsackPseudoCode}
      metadata={FRAC_KNAPSACK_METADATA}
      rendererType="graph"
    />
  );
};

export default FractionalKnapsackVisualizer;
