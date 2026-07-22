import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateQuickSortFrames } from './generateFrames';
import {
  QUICK_SORT_JAVA_CODE,
  QUICK_SORT_CPP_CODE,
  QUICK_SORT_PSEUDO_CODE,
  QUICK_SORT_METADATA,
} from './constants';

interface QuickSortVisualizerProps {
  initialArray?: number[];
}

const QuickSortVisualizer: React.FC<QuickSortVisualizerProps> = ({
  initialArray = [5, 3, 8, 1, 2],
}) => {
  const frames = useMemo(() => generateQuickSortFrames(initialArray), [initialArray]);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={QUICK_SORT_JAVA_CODE}
      cppCode={QUICK_SORT_CPP_CODE}
      pseudoCode={QUICK_SORT_PSEUDO_CODE}
      metadata={QUICK_SORT_METADATA}
      rendererType="bars"
    />
  );
};

export default QuickSortVisualizer;
