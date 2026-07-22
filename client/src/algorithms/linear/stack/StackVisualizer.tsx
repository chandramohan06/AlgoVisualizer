import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateStackFrames } from './generateFrames';
import { stackJavaCode, stackCppCode, stackPseudoCode } from './code';

const STACK_METADATA = {
  title: 'Stack Data Structure',
  category: 'Linear Data Structures',
  difficulty: 'easy' as const,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(N)',
  description: 'A Stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. Elements are pushed onto the top and popped off the top. This visualizer demonstrates basic push, pop, peek, isEmpty, isFull, clear operations, and overflow/underflow cases on a fixed capacity stack of size 5.',
};

export const StackVisualizer: React.FC = () => {
  const frames = useMemo(() => generateStackFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={stackJavaCode}
      cppCode={stackCppCode}
      pseudoCode={stackPseudoCode}
      metadata={STACK_METADATA}
      rendererType="graph"
    />
  );
};

export default StackVisualizer;
