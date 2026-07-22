import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateActivitySelectionFrames } from './generateFrames';
import { activityJavaCode, activityCppCode, activityPseudoCode } from './code';

const ACTIVITY_METADATA = {
  title: 'Activity Selection (Greedy)',
  category: 'Greedy',
  difficulty: 'easy' as const,
  timeComplexity: 'O(N log N) / O(N) if sorted',
  spaceComplexity: 'O(1) memory',
  description: 'Activity Selection selects the maximum number of mutually compatible activities that can be performed by a single person, assuming each activity has a start and end time. Sorting by end times and selecting greedily ensures optimal results.',
};

export const ActivitySelectionVisualizer: React.FC = () => {
  const frames = useMemo(() => generateActivitySelectionFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={activityJavaCode}
      cppCode={activityCppCode}
      pseudoCode={activityPseudoCode}
      metadata={ACTIVITY_METADATA}
      rendererType="graph"
    />
  );
};

export default ActivitySelectionVisualizer;
