import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateJumpSearchFrames } from './generateFrames';
import {
  JUMP_SEARCH_JAVA_CODE,
  JUMP_SEARCH_CPP_CODE,
  JUMP_SEARCH_PSEUDO_CODE,
  JUMP_SEARCH_METADATA,
} from './constants';

interface Props {
  initialArray?: number[];
  target?: number;
}

const JumpSearchVisualizer: React.FC<Props> = ({
  initialArray = [1, 3, 5, 7, 9, 11, 13, 15, 18, 21, 24, 27],
  target = 18,
}) => {
  const frames = useMemo(
    () => generateJumpSearchFrames(initialArray, target),
    [initialArray, target],
  );

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={JUMP_SEARCH_JAVA_CODE}
      cppCode={JUMP_SEARCH_CPP_CODE}
      pseudoCode={JUMP_SEARCH_PSEUDO_CODE}
      metadata={JUMP_SEARCH_METADATA}
      rendererType="array"
    />
  );
};

export default JumpSearchVisualizer;
