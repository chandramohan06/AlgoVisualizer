import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateCountingSortFrames } from './generateFrames';
import {
  COUNTING_SORT_JAVA_CODE,
  COUNTING_SORT_CPP_CODE,
  COUNTING_SORT_PSEUDO_CODE,
  COUNTING_SORT_METADATA,
} from './constants';

interface CountingSortVisualizerProps {
  initialArray?: number[];
}

const CountingSortVisualizer: React.FC<CountingSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateCountingSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={COUNTING_SORT_JAVA_CODE}
      cppCode={COUNTING_SORT_CPP_CODE}
      pseudoCode={COUNTING_SORT_PSEUDO_CODE}
      metadata={COUNTING_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default CountingSortVisualizer;
