import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateRatInAMazeFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const N = 4;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Blocked Wall (█)' },
    { color: 'bg-indigo-600', label: 'Unvisited Path' },
    { color: 'bg-emerald-500', label: 'Path of Rat (🐀)' },
    { color: 'bg-amber-400', label: 'Checking Cell' },
    { color: 'bg-rose-500', label: 'Dead End / Backtrack' },
  ];

  // 1 is path, 0 is wall
  const maze = [
    [1, 0, 0, 0],
    [1, 1, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 1, 1],
  ];

  // Solution path state
  const sol: Record<string, boolean> = {};

  const getMazeGraphData = (checkingRow?: number, checkingCol?: number, errorState?: boolean): GraphData => {
    const nodes: GenericNode[] = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const id = `${r},${c}`;
        const isWall = maze[r][c] === 0;
        const inPath = sol[id] === true;

        let value = isWall ? '█' : '';
        if (inPath) value = '🐀';
        if (r === 0 && c === 0 && !inPath) value = 'S'; // Start
        if (r === N - 1 && c === N - 1 && !inPath) value = 'E'; // End

        let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
        if (!isWall) {
          status = inPath ? 'success' : 'highlighted';
        }
        if (r === checkingRow && c === checkingCol) {
          status = errorState ? 'danger' : 'warning';
          if (value === '') value = '?';
        }

        nodes.push({
          id,
          value,
          x: 220 + c * 65,
          y: 90 + r * 65,
          radius: 20,
          label: `(${r},${c})`,
          status,
        });
      }
    }

    return {
      nodes,
      edges: [],
      layout: 'free',
    };
  };

  const pushFrame = (
    description: string,
    checking?: [number, number],
    errorState: boolean = false,
    codeLineHighlight: number = 0,
  ) => {
    const checkRow = checking ? checking[0] : undefined;
    const checkCol = checking ? checking[1] : undefined;

    const data = getMazeGraphData(checkRow, checkCol, errorState);
    const pointers: Record<string, string> = {};
    if (checking) {
      pointers['rat'] = `${checking[0]},${checking[1]}`;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: checking ? [`${checking[0]},${checking[1]}`] : [],
      pointers,
      codeLineHighlight,
      variables: {
        x: checkRow !== undefined ? checkRow : -1,
        y: checkCol !== undefined ? checkCol : -1,
        pathLength: Object.keys(sol).filter(k => sol[k]).length,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Safe checks
  const isSafe = (x: number, y: number): boolean => {
    return x >= 0 && x < N && y >= 0 && y < N && maze[x][y] === 1 && !sol[`${x},${y}`];
  };

  pushFrame('Rat in a Maze initialized. Rat starting at (0, 0), goal is (3, 3).', [0, 0], false, 1);

  const solveMaze = (x: number, y: number): boolean => {
    if (x === N - 1 && y === N - 1) {
      sol[`${x},${y}`] = true;
      pushFrame('Goal (3, 3) reached! Rat found the exit path.', [x, y], false, 4);
      return true;
    }

    if (isSafe(x, y)) {
      sol[`${x},${y}`] = true;
      pushFrame(`Rat moved to cell (${x}, ${y}). Trying next steps.`, [x, y], false, 8);

      // Move Down
      pushFrame(`Trying to move Down from (${x}, ${y}) to (${x + 1}, ${y}).`, [x + 1, y], false, 11);
      if (solveMaze(x + 1, y)) {
        return true;
      }

      // Move Right
      pushFrame(`Trying to move Right from (${x}, ${y}) to (${x}, ${y + 1}).`, [x, y + 1], false, 16);
      if (solveMaze(x, y + 1)) {
        return true;
      }

      // Backtrack
      sol[`${x},${y}`] = false;
      pushFrame(`Dead end at (${x}, ${y})! Backtracking.`, [x, y], true, 20);
    } else {
      pushFrame(`Cannot move to cell (${x}, ${y}). Either blocked wall or already visited.`, [x, y], true, 8);
    }

    return false;
  };

  solveMaze(0, 0);

  return frames;
};
