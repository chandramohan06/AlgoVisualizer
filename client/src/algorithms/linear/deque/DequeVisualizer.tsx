import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateDequeFrames } from './generateFrames';
import { dequeJavaCode, dequeCppCode, dequePseudoCode } from './code';

const DEQUE_METADATA = {
  title: 'Deque (Double-Ended Queue)',
  category: 'Linear Data Structures',
  difficulty: 'medium' as const,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(N)',
  description: 'A Deque (Double-Ended Queue) is a linear data structure that generalizes a queue, allowing insertions and deletions at both the front and the rear. This visualizer demonstrates insertFront, insertRear, deleteFront, deleteRear operations, wrap-around pointers, and overflow/underflow cases.',
};

export const DequeVisualizer: React.FC = () => {
  const frames = useMemo(() => generateDequeFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={dequeJavaCode}
      cppCode={dequeCppCode}
      pseudoCode={dequePseudoCode}
      metadata={DEQUE_METADATA}
      rendererType="graph"
    />
  );
};

export default DequeVisualizer;
