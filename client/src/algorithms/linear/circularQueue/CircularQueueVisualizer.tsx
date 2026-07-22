import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateCircularQueueFrames } from './generateFrames';
import { circularQueueJavaCode, circularQueueCppCode, circularQueuePseudoCode } from './code';

const CIRCULAR_QUEUE_METADATA = {
  title: 'Circular Queue Data Structure',
  category: 'Linear Data Structures',
  difficulty: 'medium' as const,
  timeComplexity: 'O(1) for all operations',
  spaceComplexity: 'O(N)',
  description: 'A Circular Queue is a linear data structure that extends a standard queue by connecting the end back to the start, forming a circular structure. This avoids wasting slot capacity at the front when elements are dequeued. The visualizer maps these slots radially to showcase wrap-around enqueue/dequeue indexing.',
};

export const CircularQueueVisualizer: React.FC = () => {
  const frames = useMemo(() => generateCircularQueueFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={circularQueueJavaCode}
      cppCode={circularQueueCppCode}
      pseudoCode={circularQueuePseudoCode}
      metadata={CIRCULAR_QUEUE_METADATA}
      rendererType="graph"
    />
  );
};

export default CircularQueueVisualizer;
