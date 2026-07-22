import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generatePriorityQueueFrames } from './generateFrames';
import { priorityQueueJavaCode, priorityQueueCppCode, priorityQueuePseudoCode } from './code';

const PRIORITY_QUEUE_METADATA = {
  title: 'Priority Queue (Binary Heap)',
  category: 'Linear Data Structures',
  difficulty: 'medium' as const,
  timeComplexity: 'O(log N) insert/extract, O(1) peek',
  spaceComplexity: 'O(N)',
  description: 'A Priority Queue is an extension of a queue where each element has a priority, and elements with higher priority (or smaller values in a Min-Heap) are served first. This visualizer implements a Binary Min-Heap tree structure supporting insert, peek, extract min, and extract max.',
};

export const PriorityQueueVisualizer: React.FC = () => {
  const frames = useMemo(() => generatePriorityQueueFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={priorityQueueJavaCode}
      cppCode={priorityQueueCppCode}
      pseudoCode={priorityQueuePseudoCode}
      metadata={PRIORITY_QUEUE_METADATA}
      rendererType="graph"
    />
  );
};

export default PriorityQueueVisualizer;
