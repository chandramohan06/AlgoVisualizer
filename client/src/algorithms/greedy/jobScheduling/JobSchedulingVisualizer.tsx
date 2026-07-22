import React, { useMemo } from 'react';
import { VisualizerLayout } from '@layouts/VisualizerLayout';
import { generateJobSchedulingFrames } from './generateFrames';
import { jobJavaCode, jobCppCode, jobPseudoCode } from './code';

const JOB_SCHED_METADATA = {
  title: 'Job Scheduling (Greedy)',
  category: 'Greedy',
  difficulty: 'medium' as const,
  timeComplexity: 'O(N^2) / O(N log N) if heap is used',
  spaceComplexity: 'O(N) slots',
  description: 'The Job Scheduling (Sequencing) problem goals to schedule jobs on a single processor timeline, where each job has a deadline and profit. By sorting jobs in descending order of profit and placing them in their latest possible empty slot, we greedily maximize the total profit.',
};

export const JobSchedulingVisualizer: React.FC = () => {
  const frames = useMemo(() => generateJobSchedulingFrames(), []);

  return (
    <VisualizerLayout
      frames={frames}
      javaCode={jobJavaCode}
      cppCode={jobCppCode}
      pseudoCode={jobPseudoCode}
      metadata={JOB_SCHED_METADATA}
      rendererType="graph"
    />
  );
};

export default JobSchedulingVisualizer;
