import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateQueueFrames } from './generateFrames';
import { queueJavaCode, queueCppCode, queuePseudoCode } from './code';

const QUEUE_METADATA = {
  title: 'Queue Data Structure',
  category: 'Linear Data Structures',
  difficulty: 'easy' as const,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(N)',
  description: 'A Queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. Elements are added at the rear and removed from the front. This visualizer demonstrates enqueue, dequeue, front, rear operations, and overflow/underflow cases on a fixed capacity queue of size 5.',
};

export const QueueVisualizer: React.FC = () => {
  const frames = useMemo(() => generateQueueFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={queueJavaCode}
      cppCode={queueCppCode}
      pseudoCode={queuePseudoCode}
      metadata={QUEUE_METADATA}
      rendererType="graph"
    />
  );
};

export default QueueVisualizer;
