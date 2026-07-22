import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData } from '@components/visualizer/nodeEngine/types';

export const generateActivitySelectionFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const start = [1, 2, 3, 5];
  const end = [3, 5, 6, 7];
  const n = start.length;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Unprocessed Activity' },
    { color: 'bg-emerald-500', label: 'Selected Activity' },
    { color: 'bg-rose-500', label: 'Rejected Activity (Overlap)' },
    { color: 'bg-amber-400', label: 'Evaluating Activity' },
  ];

  // Selected state: 'selected' | 'rejected' | 'evaluating' | 'unprocessed'
  const states: ('selected' | 'rejected' | 'evaluating' | 'unprocessed')[] = Array(n).fill('unprocessed');

  const getActivityGraphData = (): GraphData => {
    const nodes = start.map((s, idx) => {
      let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
      
      const st = states[idx];
      if (st === 'selected') status = 'success';
      if (st === 'rejected') status = 'danger';
      if (st === 'evaluating') status = 'warning';

      return {
        id: String(idx),
        value: `[${s}, ${end[idx]}]`,
        x: 0,
        y: 0,
        label: `Act ${idx}`,
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
    activeI?: number,
    lastSelectedI?: number,
    codeLineHighlight: number = 0,
  ) => {
    const data = getActivityGraphData();
    const pointers: Record<string, string> = {};
    if (activeI !== undefined) pointers['eval'] = String(activeI);
    if (lastSelectedI !== undefined) pointers['last'] = String(lastSelectedI);

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeI !== undefined ? [String(activeI)] : [],
      pointers,
      codeLineHighlight,
      variables: {
        lastEnd: lastSelectedI !== undefined ? end[lastSelectedI] : 0,
        selectedCount: states.filter(s => s === 'selected').length,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // 1. Initial State
  pushFrame('Activity Selection initialized. Activities sorted by end time.', undefined, undefined, 1);

  // 2. Select first activity
  states[0] = 'selected';
  let lastEndI = 0;
  pushFrame(`Greedy selection: Automatically select the first activity [${start[0]}, ${end[0]}] as it finishes earliest.`, 0, 0, 5);

  // 3. Iterate
  for (let i = 1; i < n; i++) {
    states[i] = 'evaluating';
    const lastEnd = end[lastEndI];
    
    pushFrame(
      `Evaluating Activity ${i} [${start[i]}, ${end[i]}]. Checking if start time (${start[i]}) >= last selected end time (${lastEnd}).`,
      i,
      lastEndI,
      7,
    );

    if (start[i] >= lastEnd) {
      states[i] = 'selected';
      lastEndI = i;
      pushFrame(
        `Activity ${i} is compatible (start ${start[i]} >= end ${lastEnd}). Selecting activity.`,
        i,
        lastEndI,
        9,
      );
    } else {
      states[i] = 'rejected';
      pushFrame(
        `Activity ${i} overlaps with last selected activity (start ${start[i]} < end ${lastEnd}). Rejecting activity.`,
        i,
        lastEndI,
        7,
      );
    }
  }

  pushFrame(`Activity Selection complete. Max selected activities: ${states.filter(s => s === 'selected').length}.`, undefined, lastEndI, 12);

  return frames;
};
