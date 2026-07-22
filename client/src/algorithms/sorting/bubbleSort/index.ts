/**
 * Bubble Sort Algorithm Module
 *
 * This module exports all components needed for the Bubble Sort visualization.
 * It serves as the reference implementation for all future sorting algorithms.
 *
 * Architecture:
 * - generateFrames: Pure function that creates visualization frames
 * - constants: Code implementations and metadata
 * - BubbleSortVisualizer: React component using VisualizerLayout
 */

export { generateBubbleSortFrames } from './generateFrames';
export {
  BUBBLE_SORT_JAVA_CODE,
  BUBBLE_SORT_CPP_CODE,
  BUBBLE_SORT_PSEUDO_CODE,
  BUBBLE_SORT_METADATA,
} from './constants';
export { default as BubbleSortVisualizer } from './BubbleSortVisualizer';
