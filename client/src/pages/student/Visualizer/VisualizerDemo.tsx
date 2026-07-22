import React from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import {
  DEMO_FRAMES,
  DEMO_JAVA_CODE,
  DEMO_CPP_CODE,
  DEMO_PSEUDO_CODE,
  DEMO_METADATA,
} from '@algorithms/engine/mockDemoFrames';

/**
 * VisualizerDemo — Engine Proof-of-Concept Page
 *
 * This page exists ONLY to verify the visualization engine works correctly.
 * Route: /visualizer/demo
 *
 * Verified by this page:
 *   ✓ Play/Pause/Resume/Reset
 *   ✓ Step forward / backward
 *   ✓ Timeline scrubber (jump to any frame)
 *   ✓ Speed slider (0.5x, 1x, 2x)
 *   ✓ Frame counter
 *   ✓ Canvas renders bars with highlight transitions
 *   ✓ Code viewer highlights the active line
 *   ✓ Step info panel shows description and variables
 *
 * When Phase 7 starts, real algorithm pages will replace this
 * by simply calling:
 *   <VisualizerLayout
 *     frames={generateBubbleSortFrames([5, 3, 8, 1, 2])}
 *     javaCode={BUBBLE_JAVA}
 *     cppCode={BUBBLE_CPP}
 *     pseudoCode={BUBBLE_PSEUDO}
 *     metadata={BUBBLE_METADATA}
 *     rendererType="bars"
 *   />
 */
const VisualizerDemo: React.FC = () => {
  return (
    <VisualizerLayout
      frames={DEMO_FRAMES}
      javaCode={DEMO_JAVA_CODE}
      cppCode={DEMO_CPP_CODE}
      pseudoCode={DEMO_PSEUDO_CODE}
      metadata={DEMO_METADATA}
      rendererType="bars"
    />
  );
};

export default VisualizerDemo;
