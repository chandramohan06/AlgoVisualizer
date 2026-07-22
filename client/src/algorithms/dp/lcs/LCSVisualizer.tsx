import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateLCSFrames } from './generateFrames';
import { lcsJavaCode, lcsCppCode, lcsPseudoCode } from './code';

const LCS_METADATA = {
  title: 'Longest Common Subsequence (Dynamic Programming)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(M * N) DP table',
  description: 'The Longest Common Subsequence (LCS) problem finds the longest subsequence common to two sequences, in the same order but not necessarily contiguous. This visualizer diagrams the 2D DP matrix matching character sequences.',
};

export const LCSVisualizer: React.FC = () => {
  const frames = useMemo(() => generateLCSFrames('BAT', 'CAT'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={lcsJavaCode}
      cppCode={lcsCppCode}
      pseudoCode={lcsPseudoCode}
      metadata={LCS_METADATA}
      rendererType="graph"
    />
  );
};

export default LCSVisualizer;
