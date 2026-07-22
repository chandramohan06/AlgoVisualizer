import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateTowerOfHanoiFrames = (numDisks: number = 3): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;

  const baseLegend = [
    { color: 'bg-indigo-600', label: 'Disk 3 (Large)' },
    { color: 'bg-amber-400', label: 'Disk 2 (Medium)' },
    { color: 'bg-sky-400', label: 'Disk 1 (Small)' },
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Peg Bases' },
  ];

  // Helper to resolve disk size and color style
  const getDiskInfo = (diskNum: number) => {
    switch (diskNum) {
      case 1: return { color: '#38bdf8', r: 15 }; // Small - Sky blue
      case 2: return { color: '#fbbf24', r: 21 }; // Medium - Amber
      case 3: return { color: '#6366f1', r: 28 }; // Large - Indigo
      default: return { color: '#a855f7', r: 35 };
    }
  };

  // State of rods: list of disk sizes (e.g. 3 is large, 1 is small)
  const rodsState: Record<'A' | 'B' | 'C', number[]> = {
    A: Array.from({ length: numDisks }, (_, i) => numDisks - i), // [3, 2, 1]
    B: [],
    C: [],
  };

  const getHanoiGraphData = (): GraphData => {
    const nodes: GenericNode[] = [];

    // Peg base nodes
    const pegX: Record<'A' | 'B' | 'C', number> = { A: 200, B: 400, C: 600 };
    const pegNames = ['A', 'B', 'C'] as const;

    pegNames.forEach(name => {
      nodes.push({
        id: `peg-${name}`,
        value: `Peg ${name}`,
        x: pegX[name],
        y: 280,
        radius: 12,
        status: 'visited',
      });

      // Draw stacked disks on this peg
      const disksOnPeg = rodsState[name];
      disksOnPeg.forEach((diskNum, idx) => {
        const info = getDiskInfo(diskNum);
        nodes.push({
          id: `disk-${diskNum}`,
          value: String(diskNum),
          x: pegX[name],
          y: 240 - idx * 32, // Stacks vertically upwards
          radius: info.r,
          colorOverride: info.color,
          status: 'highlighted',
        });
      });
    });

    return {
      nodes,
      edges: [],
      layout: 'free',
    };
  };

  const pushFrame = (description: string, activeDiskId?: string, codeLineHighlight: number = 0) => {
    const data = getHanoiGraphData();
    const pointers: Record<string, string> = {};
    if (activeDiskId) {
      pointers['moved'] = activeDiskId;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: activeDiskId ? [activeDiskId] : [],
      pointers,
      codeLineHighlight,
      variables: {
        pegA: [...rodsState.A],
        pegB: [...rodsState.B],
        pegC: [...rodsState.C],
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Initial Frame
  pushFrame('Tower of Hanoi initialized. Place all disks onto Peg A.', undefined, 1);

  // Solve recursive Hanoi moves
  const moveHanoi = (n: number, from: 'A' | 'B' | 'C', to: 'A' | 'B' | 'C', aux: 'A' | 'B' | 'C') => {
    if (n === 0) return;

    // Move n-1 from 'from' to 'aux'
    moveHanoi(n - 1, from, aux, to);

    // Move single disk from 'from' to 'to'
    const disk = rodsState[from].pop();
    if (disk !== undefined) {
      rodsState[to].push(disk);
      pushFrame(`Move disk ${disk} from Peg ${from} to Peg ${to}.`, `disk-${disk}`, 4);
    }

    // Move n-1 from 'aux' to 'to'
    moveHanoi(n - 1, aux, to, from);
  };

  moveHanoi(numDisks, 'A', 'C', 'B');

  pushFrame('Tower of Hanoi complete. All disks moved successfully to Peg C.', undefined, 1);

  return frames;
};
