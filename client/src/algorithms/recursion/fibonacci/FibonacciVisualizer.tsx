import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFibonacciFrames } from './generateFrames';
import { fibonacciJavaCode, fibonacciCppCode, fibonacciPseudoCode } from './code';

const FIBONACCI_METADATA = {
  title: 'Fibonacci (Recursion Tree)',
  category: 'Recursion',
  difficulty: 'medium' as const,
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) call stack',
  description: 'The Fibonacci sequence is defined such that each number is the sum of the two preceding ones, starting from 0 and 1. This visualizer graphs the standard binary call tree, illustrating how subproblems are repeatedly evaluated, leading to exponential time complexity.',
};

export const FibonacciVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFibonacciFrames(4), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={fibonacciJavaCode}
      cppCode={fibonacciCppCode}
      pseudoCode={fibonacciPseudoCode}
      metadata={FIBONACCI_METADATA}
      rendererType="graph"
    />
  );
};

export default FibonacciVisualizer;
