import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateInterpolationSearchFrames } from './generateFrames';
import {
  INTERPOLATION_SEARCH_JAVA_CODE,
  INTERPOLATION_SEARCH_CPP_CODE,
  INTERPOLATION_SEARCH_PSEUDO_CODE,
  INTERPOLATION_SEARCH_METADATA,
} from './constants';

interface Props {
  initialArray?: number[];
  target?: number;
}

const InterpolationSearchVisualizer: React.FC<Props> = ({
  initialArray = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  target = 70,
}) => {
  const frames = useMemo(
    () => generateInterpolationSearchFrames(initialArray, target),
    [initialArray, target],
  );

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={INTERPOLATION_SEARCH_JAVA_CODE}
      cppCode={INTERPOLATION_SEARCH_CPP_CODE}
      pseudoCode={INTERPOLATION_SEARCH_PSEUDO_CODE}
      metadata={INTERPOLATION_SEARCH_METADATA}
      rendererType="array"
    />
  );
};

export default InterpolationSearchVisualizer;
