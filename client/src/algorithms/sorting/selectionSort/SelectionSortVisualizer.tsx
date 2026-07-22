import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateSelectionSortFrames } from './generateFrames';
import {
  SELECTION_SORT_JAVA_CODE,
  SELECTION_SORT_CPP_CODE,
  SELECTION_SORT_PSEUDO_CODE,
  SELECTION_SORT_METADATA,
} from './constants';

interface SelectionSortVisualizerProps {
  initialArray?: number[];
}

const SelectionSortVisualizer: React.FC<SelectionSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateSelectionSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={SELECTION_SORT_JAVA_CODE}
      cppCode={SELECTION_SORT_CPP_CODE}
      pseudoCode={SELECTION_SORT_PSEUDO_CODE}
      metadata={SELECTION_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default SelectionSortVisualizer;
