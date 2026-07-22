import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateBubbleSortFrames } from './generateFrames';
import {
  BUBBLE_SORT_JAVA_CODE,
  BUBBLE_SORT_CPP_CODE,
  BUBBLE_SORT_PSEUDO_CODE,
  BUBBLE_SORT_METADATA,
} from './constants';

interface BubbleSortVisualizerProps {
  /** Input array to visualize. Defaults to [5, 3, 8, 1, 2] if not provided. */
  initialArray?: number[];
}

/**
 * BubbleSortVisualizer — Reference implementation for sorting algorithms
 *
 * This component demonstrates how to integrate an algorithm with the visualization engine:
 * 1. Generate frames using the pure function
 * 2. Pass frames, code, and metadata to VisualizerLayout
 * 3. The engine handles all rendering and playback
 *
 * Future sorting algorithms should follow this exact pattern.
 */
const BubbleSortVisualizer: React.FC<BubbleSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  // Generate frames only once on mount (memoized)
  const frames = useMemo(() => generateBubbleSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={BUBBLE_SORT_JAVA_CODE}
      cppCode={BUBBLE_SORT_CPP_CODE}
      pseudoCode={BUBBLE_SORT_PSEUDO_CODE}
      metadata={BUBBLE_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default BubbleSortVisualizer;
