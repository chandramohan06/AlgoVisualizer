import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateCoinChangeFrames } from './generateFrames';
import { coinChangeJavaCode, coinChangeCppCode, coinChangePseudoCode } from './code';

const COIN_CHANGE_METADATA = {
  title: 'Coin Change (Dynamic Programming)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(Coins * Amount)',
  spaceComplexity: 'O(Amount) DP table',
  description: 'The Coin Change problem seeks the minimum number of coins required to make up a given amount. If it is not possible to make the amount, return -1. This visualizer demonstrates iterative step transitions on a 1D DP table.',
};

export const CoinChangeVisualizer: React.FC = () => {
  const frames = useMemo(() => generateCoinChangeFrames([1, 2, 5], 5), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={coinChangeJavaCode}
      cppCode={coinChangeCppCode}
      pseudoCode={coinChangePseudoCode}
      metadata={COIN_CHANGE_METADATA}
      rendererType="graph"
    />
  );
};

export default CoinChangeVisualizer;
