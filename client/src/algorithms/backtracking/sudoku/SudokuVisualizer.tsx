import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateSudokuFrames } from './generateFrames';
import { sudokuJavaCode, sudokuCppCode, sudokuPseudoCode } from './code';

const SUDOKU_METADATA = {
  title: 'Sudoku Solver (Backtracking)',
  category: 'Backtracking',
  difficulty: 'hard' as const,
  timeComplexity: 'O(9^(N^2)) / O(4^(N^2)) for 4x4',
  spaceComplexity: 'O(N^2) grid state',
  description: 'Sudoku Solver is a backtracking algorithm that tries to fill empty cells with digits from 1 to N, maintaining row, column, and subgrid constraints. If a conflict occurs, it undoes the digit placement (backtracks) and tries the next number.',
};

export const SudokuVisualizer: React.FC = () => {
  const frames = useMemo(() => generateSudokuFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={sudokuJavaCode}
      cppCode={sudokuCppCode}
      pseudoCode={sudokuPseudoCode}
      metadata={SUDOKU_METADATA}
      rendererType="graph"
    />
  );
};

export default SudokuVisualizer;
