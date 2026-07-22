import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateRadixSortFrames } from './generateFrames';
import {
  RADIX_SORT_JAVA_CODE,
  RADIX_SORT_CPP_CODE,
  RADIX_SORT_PSEUDO_CODE,
  RADIX_SORT_METADATA,
} from './constants';

interface RadixSortVisualizerProps {
  initialArray?: number[];
}

const RadixSortVisualizer: React.FC<RadixSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateRadixSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={RADIX_SORT_JAVA_CODE}
      cppCode={RADIX_SORT_CPP_CODE}
      pseudoCode={RADIX_SORT_PSEUDO_CODE}
      metadata={RADIX_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default RadixSortVisualizer;
