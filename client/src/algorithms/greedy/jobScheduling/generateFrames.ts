import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

interface Job {
  id: string;
  deadline: number;
  profit: number;
}

export const generateJobSchedulingFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const maxTime = 3;
  const jobs: Job[] = [
    { id: 'A', deadline: 2, profit: 100 },
    { id: 'C', deadline: 2, profit: 27 },
    { id: 'D', deadline: 1, profit: 25 },
    { id: 'B', deadline: 1, profit: 19 },
    { id: 'E', deadline: 3, profit: 15 },
  ];

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Timeline Slot' },
    { color: 'bg-emerald-500', label: 'Filled Timeline Slot / Job Scheduled' },
  ];

  const slotsFilled = Array(maxTime).fill(false);
  const resultJobs: (string | null)[] = Array(maxTime).fill(null);

  const getJobSchedulingGraphData = (): GraphData => {
    const nodes = resultJobs.map((jobId, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      if (slotsFilled[idx]) {
        status = 'success';
      }

      return {
        id: String(idx),
        value: jobId !== null ? `Slot ${idx + 1}: Job ${jobId}` : `Slot ${idx + 1}: -`,
        x: 0,
        y: 0,
        label: `Deadline <= ${idx + 1}`,
        status,
      };
    });

    return {
      nodes,
      edges: [],
      layout: 'linear-horizontal',
    };
  };

  const pushFrame = (
    description: string,
    evalJob?: Job,
    evalSlot?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getJobSchedulingGraphData();
    const pointers: Record<string, string> = {};
    if (evalSlot !== undefined) {
      pointers['slot'] = String(evalSlot);
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: evalSlot !== undefined ? [String(evalSlot)] : [],
      pointers,
      codeLineHighlight,
      variables: {
        evaluatingJob: evalJob ? `Job ${evalJob.id} (DL: ${evalJob.deadline}, Prof: ${evalJob.profit})` : '-',
        timelineSlots: [...resultJobs],
        totalProfit: resultJobs.reduce((sum, id) => {
          if (!id) return sum;
          const match = jobs.find(j => j.id === id);
          return sum + (match ? match.profit : 0);
        }, 0),
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Job Scheduling initialized. Timeline has 3 empty slots.', undefined, undefined, 1);

  // 2. Process sorted jobs
  for (let i = 0; i < jobs.length; i++) {
    const currJob = jobs[i];
    let scheduled = false;

    // Try slot from deadline - 1 down to 0
    const startSlot = Math.min(maxTime - 1, currJob.deadline - 1);
    
    pushFrame(
      `Job ${currJob.id} (deadline: ${currJob.deadline}, profit: ${currJob.profit}) is processed. Searching latest empty slot <= ${currJob.deadline}.`,
      currJob,
      undefined,
      17,
    );

    for (let j = startSlot; j >= 0; j--) {
      if (!slotsFilled[j]) {
        slotsFilled[j] = true;
        resultJobs[j] = currJob.id;
        scheduled = true;
        
        pushFrame(
          `Found empty slot at index ${j} (Slot ${j + 1}). Scheduling Job ${currJob.id} here.`,
          currJob,
          j,
          19,
        );
        break;
      } else {
        pushFrame(`Slot index ${j} (Slot ${j + 1}) is already filled by Job ${resultJobs[j]}. Checking previous slot.`, currJob, j, 18);
      }
    }

    if (!scheduled) {
      pushFrame(`All slots <= deadline ${currJob.deadline} are full. Job ${currJob.id} is skipped.`, currJob, undefined, 17);
    }
  }

  const finalProfit = resultJobs.reduce((sum, id) => {
    const match = jobs.find(j => j.id === id);
    return sum + (match ? match.profit : 0);
  }, 0);

  pushFrame(`Job Scheduling complete! Scheduled jobs: [${resultJobs.filter(Boolean).join(', ')}]. Total Profit: ${finalProfit}.`, undefined, undefined, 23);

  return frames;
};
