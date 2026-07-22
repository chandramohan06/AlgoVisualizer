import React from 'react';
import { BubbleSortVisualizer } from '@algorithms/sorting/bubbleSort';

/**
 * Bubble Sort Visualization Page
 *
 * Route: /visualizer/sorting/bubble-sort
 *
 * This page renders the Bubble Sort visualization using the reference implementation.
 * It demonstrates the complete integration with the visualization engine.
 */
const BubbleSort: React.FC = () => {
  return <BubbleSortVisualizer />;
};

export default BubbleSort;
