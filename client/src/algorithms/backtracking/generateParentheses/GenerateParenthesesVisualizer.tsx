import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateParenthesesFrames } from './generateFrames';
import { parenthesesJavaCode, parenthesesCppCode, parenthesesPseudoCode } from './code';

const PARENTHESES_METADATA = {
  title: 'Generate Parentheses (Backtracking)',
  category: 'Backtracking',
  difficulty: 'medium' as const,
  timeComplexity: 'O(4^N / sqrt(N))',
  spaceComplexity: 'O(N) recursion stack',
  description: 'Generate Parentheses is an algorithm that uses backtracking to construct all combinations of well-formed parentheses containing N pairs. It branches by adding a "(" or ")" and cuts branches (backtracks) when constraints are violated.',
};

export const GenerateParenthesesVisualizer: React.FC = () => {
  const frames = useMemo(() => generateParenthesesFrames(2), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={parenthesesJavaCode}
      cppCode={parenthesesCppCode}
      pseudoCode={parenthesesPseudoCode}
      metadata={PARENTHESES_METADATA}
      rendererType="graph"
    />
  );
};

export default GenerateParenthesesVisualizer;
