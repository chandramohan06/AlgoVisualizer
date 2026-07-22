import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateLinearSearchFrames } from './generateFrames';
import {
  LINEAR_SEARCH_JAVA_CODE,
  LINEAR_SEARCH_CPP_CODE,
  LINEAR_SEARCH_PSEUDO_CODE,
  LINEAR_SEARCH_METADATA,
} from './constants';

interface Props {
  /** Array to search. Defaults to an unsorted demo array. */
  initialArray?: number[];
  /** Value to find. Defaults to 7. */
  target?: number;
}

const LinearSearchVisualizer: React.FC<Props> = ({
  initialArray = [4, 2, 7, 1, 9, 3, 8, 5],
  target = 7,
}) => {
  const frames = useMemo(
    () => generateLinearSearchFrames(initialArray, target),
    [initialArray, target],
  );

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={LINEAR_SEARCH_JAVA_CODE}
      cppCode={LINEAR_SEARCH_CPP_CODE}
      pseudoCode={LINEAR_SEARCH_PSEUDO_CODE}
      metadata={LINEAR_SEARCH_METADATA}
      rendererType="array"
    />
  );
};

export default LinearSearchVisualizer;
