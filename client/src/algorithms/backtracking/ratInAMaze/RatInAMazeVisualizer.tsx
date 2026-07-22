import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateRatInAMazeFrames } from './generateFrames';
import { ratInAMazeJavaCode, ratInAMazeCppCode, ratInAMazePseudoCode } from './code';

const RAT_MAZE_METADATA = {
  title: 'Rat in a Maze (Backtracking)',
  category: 'Backtracking',
  difficulty: 'medium' as const,
  timeComplexity: 'O(2^(N^2))',
  spaceComplexity: 'O(N^2) solution board',
  description: 'Rat in a Maze is a pathfinding backtracking algorithm. Starting at (0, 0), the rat moves Down or Right to reach (N-1, N-1). Blocked walls cannot be traversed. If a path leads to a dead end, the rat backtracks and tries alternative directions.',
};

export const RatInAMazeVisualizer: React.FC = () => {
  const frames = useMemo(() => generateRatInAMazeFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={ratInAMazeJavaCode}
      cppCode={ratInAMazeCppCode}
      pseudoCode={ratInAMazePseudoCode}
      metadata={RAT_MAZE_METADATA}
      rendererType="graph"
    />
  );
};

export default RatInAMazeVisualizer;
