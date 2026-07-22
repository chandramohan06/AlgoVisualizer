import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateMergeSortFrames } from './generateFrames';
import {
  MERGE_SORT_JAVA_CODE,
  MERGE_SORT_CPP_CODE,
  MERGE_SORT_PSEUDO_CODE,
  MERGE_SORT_METADATA,
} from './constants';

interface MergeSortVisualizerProps {
  initialArray?: number[];
}

const MergeSortVisualizer: React.FC<MergeSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateMergeSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={MERGE_SORT_JAVA_CODE}
      cppCode={MERGE_SORT_CPP_CODE}
      pseudoCode={MERGE_SORT_PSEUDO_CODE}
      metadata={MERGE_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default MergeSortVisualizer;
