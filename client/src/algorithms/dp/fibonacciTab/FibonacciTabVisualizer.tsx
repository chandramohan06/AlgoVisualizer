import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFibonacciTabFrames } from './generateFrames';
import { fibTabJavaCode, fibTabCppCode, fibTabPseudoCode } from './code';

const FIB_TAB_METADATA = {
  title: 'Fibonacci (Tabulation - Bottom Up)',
  category: 'Dynamic Programming',
  difficulty: 'easy' as const,
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) DP table',
  description: 'Bottom-Up Dynamic Programming (Tabulation) solves subproblems iteratively from base cases up to the target size, storing intermediate states in a 1D DP table. This visualizer demonstrates linear state transitions and indices dependencies.',
};

export const FibonacciTabVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFibonacciTabFrames(5), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={fibTabJavaCode}
      cppCode={fibTabCppCode}
      pseudoCode={fibTabPseudoCode}
      metadata={FIB_TAB_METADATA}
      rendererType="graph"
    />
  );
};

export default FibonacciTabVisualizer;
