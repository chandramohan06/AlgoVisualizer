import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateExponentialSearchFrames } from './generateFrames';
import {
  EXPONENTIAL_SEARCH_JAVA_CODE,
  EXPONENTIAL_SEARCH_CPP_CODE,
  EXPONENTIAL_SEARCH_PSEUDO_CODE,
  EXPONENTIAL_SEARCH_METADATA,
} from './constants';

interface Props {
  initialArray?: number[];
  target?: number;
}

const ExponentialSearchVisualizer: React.FC<Props> = ({
  initialArray = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  target = 64,
}) => {
  const frames = useMemo(
    () => generateExponentialSearchFrames(initialArray, target),
    [initialArray, target],
  );

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={EXPONENTIAL_SEARCH_JAVA_CODE}
      cppCode={EXPONENTIAL_SEARCH_CPP_CODE}
      pseudoCode={EXPONENTIAL_SEARCH_PSEUDO_CODE}
      metadata={EXPONENTIAL_SEARCH_METADATA}
      rendererType="array"
    />
  );
};

export default ExponentialSearchVisualizer;
