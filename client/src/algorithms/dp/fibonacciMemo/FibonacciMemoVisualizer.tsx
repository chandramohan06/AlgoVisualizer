import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFibonacciMemoFrames } from './generateFrames';
import { fibMemoJavaCode, fibMemoCppCode, fibMemoPseudoCode } from './code';

const FIB_MEMO_METADATA = {
  title: 'Fibonacci (Memoization - Top Down)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) memo + O(N) call stack',
  description: 'Top-Down Dynamic Programming (Memoization) solves subproblems recursively and stores results in a memo table to prevent redundant re-computations. This visualizer demonstrates recursive depth, cache lookups, and how recursion tree branches are pruned.',
};

export const FibonacciMemoVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFibonacciMemoFrames(4), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={fibMemoJavaCode}
      cppCode={fibMemoCppCode}
      pseudoCode={fibMemoPseudoCode}
      metadata={FIB_MEMO_METADATA}
      rendererType="graph"
    />
  );
};

export default FibonacciMemoVisualizer;
