import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateTowerOfHanoiFrames } from './generateFrames';
import { hanoiJavaCode, hanoiCppCode, hanoiPseudoCode } from './code';

const HANOI_METADATA = {
  title: 'Tower of Hanoi (Recursion)',
  category: 'Recursion',
  difficulty: 'medium' as const,
  timeComplexity: 'O(2^N)',
  spaceComplexity: 'O(N) call stack',
  description: 'Tower of Hanoi is a mathematical puzzle with three pegs and N disks of different sizes. The objective is to move all disks from the source peg to the destination peg, satisfying rules: only one disk can be moved at a time, and a larger disk cannot sit on a smaller one. This visualizer demonstrates recursive partitioning step-by-step.',
};

export const TowerOfHanoiVisualizer: React.FC = () => {
  const frames = useMemo(() => generateTowerOfHanoiFrames(3), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={hanoiJavaCode}
      cppCode={hanoiCppCode}
      pseudoCode={hanoiPseudoCode}
      metadata={HANOI_METADATA}
      rendererType="graph"
    />
  );
};

export default TowerOfHanoiVisualizer;
