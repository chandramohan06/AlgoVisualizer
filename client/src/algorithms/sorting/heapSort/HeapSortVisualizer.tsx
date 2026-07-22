import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateHeapSortFrames } from './generateFrames';
import {
  HEAP_SORT_JAVA_CODE,
  HEAP_SORT_CPP_CODE,
  HEAP_SORT_PSEUDO_CODE,
  HEAP_SORT_METADATA,
} from './constants';

interface HeapSortVisualizerProps {
  initialArray?: number[];
}

const HeapSortVisualizer: React.FC<HeapSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateHeapSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={HEAP_SORT_JAVA_CODE}
      cppCode={HEAP_SORT_CPP_CODE}
      pseudoCode={HEAP_SORT_PSEUDO_CODE}
      metadata={HEAP_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default HeapSortVisualizer;
