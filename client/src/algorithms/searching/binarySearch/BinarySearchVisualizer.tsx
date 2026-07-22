import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateBinarySearchFrames } from './generateFrames';
import {
  BINARY_SEARCH_JAVA_CODE,
  BINARY_SEARCH_CPP_CODE,
  BINARY_SEARCH_PSEUDO_CODE,
  BINARY_SEARCH_METADATA,
} from './constants';

interface Props {
  /** Array to search. MUST be sorted. */
  initialArray?: number[];
  /** Value to find. */
  target?: number;
}

const BinarySearchVisualizer: React.FC<Props> = ({
  initialArray = [1, 3, 5, 7, 9, 11, 14, 17, 20, 25],
  target = 14,
}) => {
  const frames = useMemo(
    () => generateBinarySearchFrames(initialArray, target),
    [initialArray, target],
  );

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={BINARY_SEARCH_JAVA_CODE}
      cppCode={BINARY_SEARCH_CPP_CODE}
      pseudoCode={BINARY_SEARCH_PSEUDO_CODE}
      metadata={BINARY_SEARCH_METADATA}
      rendererType="array"
    />
  );
};

export default BinarySearchVisualizer;
