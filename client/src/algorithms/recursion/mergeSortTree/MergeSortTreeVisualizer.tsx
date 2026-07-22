import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateMergeSortTreeFrames } from './generateFrames';
import { mergeSortTreeJavaCode, mergeSortTreeCppCode, mergeSortTreePseudoCode } from './code';

const MERGE_SORT_TREE_METADATA = {
  title: 'Merge Sort Recursion Tree',
  category: 'Recursion',
  difficulty: 'medium' as const,
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N) recursion tree',
  description: 'Merge Sort is a classic divide-and-conquer algorithm. It recursively splits an array in halves until sub-arrays of size 1 are reached, then merges sorted halves back up. This visualizer diagrams the recursion tree of divisions and active merges.',
};

export const MergeSortTreeVisualizer: React.FC = () => {
  const frames = useMemo(() => generateMergeSortTreeFrames([5, 2, 8, 3]), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={mergeSortTreeJavaCode}
      cppCode={mergeSortTreeCppCode}
      pseudoCode={mergeSortTreePseudoCode}
      metadata={MERGE_SORT_TREE_METADATA}
      rendererType="graph"
    />
  );
};

export default MergeSortTreeVisualizer;
