import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateNQueensFrames } from './generateFrames';
import { nQueensJavaCode, nQueensCppCode, nQueensPseudoCode } from './code';

const N_QUEENS_METADATA = {
  title: 'N-Queens (Backtracking)',
  category: 'Backtracking',
  difficulty: 'hard' as const,
  timeComplexity: 'O(N!)',
  spaceComplexity: 'O(N^2) board state',
  description: 'The N-Queens puzzle is the problem of placing N chess queens on an N×N chessboard so that no two queens threaten each other. This visualizer demonstrates recursive trial, cell conflict evaluation, queen placements, and backtracking rollbacks.',
};

export const NQueensVisualizer: React.FC = () => {
  const frames = useMemo(() => generateNQueensFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={nQueensJavaCode}
      cppCode={nQueensCppCode}
      pseudoCode={nQueensPseudoCode}
      metadata={N_QUEENS_METADATA}
      rendererType="graph"
    />
  );
};

export default NQueensVisualizer;
