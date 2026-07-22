import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateEditDistanceFrames } from './generateFrames';
import { editDistanceJavaCode, editDistanceCppCode, editDistancePseudoCode } from './code';

const EDIT_DIST_METADATA = {
  title: 'Edit Distance (Dynamic Programming)',
  category: 'Dynamic Programming',
  difficulty: 'medium' as const,
  timeComplexity: 'O(M * N)',
  spaceComplexity: 'O(M * N) DP table',
  description: 'The Edit Distance problem computes the minimum number of operations (Insert, Delete, Replace) required to convert String A to String B. This visualizer maps states onto a 2D DP matrix matching character sequences.',
};

export const EditDistanceVisualizer: React.FC = () => {
  const frames = useMemo(() => generateEditDistanceFrames('CAT', 'CUT'), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={editDistanceJavaCode}
      cppCode={editDistanceCppCode}
      pseudoCode={editDistancePseudoCode}
      metadata={EDIT_DIST_METADATA}
      rendererType="graph"
    />
  );
};

export default EditDistanceVisualizer;
