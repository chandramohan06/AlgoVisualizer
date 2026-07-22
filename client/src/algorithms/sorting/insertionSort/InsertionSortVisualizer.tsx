import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateInsertionSortFrames } from './generateFrames';
import {
  INSERTION_SORT_JAVA_CODE,
  INSERTION_SORT_CPP_CODE,
  INSERTION_SORT_PSEUDO_CODE,
  INSERTION_SORT_METADATA,
} from './constants';

interface InsertionSortVisualizerProps {
  initialArray?: number[];
}

const InsertionSortVisualizer: React.FC<InsertionSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateInsertionSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={INSERTION_SORT_JAVA_CODE}
      cppCode={INSERTION_SORT_CPP_CODE}
      pseudoCode={INSERTION_SORT_PSEUDO_CODE}
      metadata={INSERTION_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default InsertionSortVisualizer;
