import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateHuffmanCodingFrames } from './generateFrames';
import { huffmanJavaCode, huffmanCppCode, huffmanPseudoCode } from './code';

const HUFFMAN_METADATA = {
  title: 'Huffman Coding (Greedy)',
  category: 'Greedy',
  difficulty: 'hard' as const,
  timeComplexity: 'O(N log N)',
  spaceComplexity: 'O(N) heap size',
  description: 'Huffman Coding is an optimal prefix code algorithm used for lossless data compression. It uses a greedy approach: merging the two nodes with the lowest frequencies iteratively into a binary prefix tree.',
};

export const HuffmanCodingVisualizer: React.FC = () => {
  const frames = useMemo(() => generateHuffmanCodingFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={huffmanJavaCode}
      cppCode={huffmanCppCode}
      pseudoCode={huffmanPseudoCode}
      metadata={HUFFMAN_METADATA}
      rendererType="graph"
    />
  );
};

export default HuffmanCodingVisualizer;
