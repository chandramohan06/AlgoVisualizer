import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateLISFrames } from './generateFrames';
import { lisJavaCode, lisCppCode, lisPseudoCode } from './code';

const LIS_METADATA = {
  title: 'Longest Increasing Subsequence (Dynamic Programming)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(N^2)',
  spaceComplexity: 'O(N) DP table',
  description: 'The Longest Increasing Subsequence (LIS) problem finds the length of the longest subsequence of a given sequence such that all elements of the subsequence are sorted in increasing order. This visualizer demonstrates state transitions on a 1D DP table.',
};

export const LISVisualizer: React.FC = () => {
  const frames = useMemo(() => generateLISFrames([10, 22, 9, 33]), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={lisJavaCode}
      cppCode={lisCppCode}
      pseudoCode={lisPseudoCode}
      metadata={LIS_METADATA}
      rendererType="graph"
    />
  );
};

export default LISVisualizer;
