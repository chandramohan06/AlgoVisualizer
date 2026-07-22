import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateFactorialFrames } from './generateFrames';
import { factorialJavaCode, factorialCppCode, factorialPseudoCode } from './code';

const FACTORIAL_METADATA = {
  title: 'Factorial (Recursion)',
  category: 'Recursion',
  difficulty: 'easy' as const,
  timeComplexity: 'O(N)',
  spaceComplexity: 'O(N) call stack',
  description: 'Factorial of a non-negative integer N is the product of all positive integers less than or equal to N. This visualizer demonstrates recursive depth, building the Call Stack frames, base case execution, and the stack unwinding returns.',
};

export const FactorialVisualizer: React.FC = () => {
  const frames = useMemo(() => generateFactorialFrames(5), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={factorialJavaCode}
      cppCode={factorialCppCode}
      pseudoCode={factorialPseudoCode}
      metadata={FACTORIAL_METADATA}
      rendererType="graph"
    />
  );
};

export default FactorialVisualizer;
