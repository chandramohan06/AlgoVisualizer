import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateSudokuFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const N = 4;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Cell' },
    { color: 'bg-indigo-600', label: 'Pre-filled Clue' },
    { color: 'bg-emerald-500', label: 'Valid Number Placed' },
    { color: 'bg-amber-400', label: 'Checking Constraint' },
    { color: 'bg-rose-500', label: 'Constraint Conflict / Backtrack' },
  ];

  // Initial board layout (4x4)
  // 0 represents empty
  const board: number[][] = [
    [1, 0, 0, 4],
    [0, 3, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 1],
  ];

  // Remember which cells are pre-filled clues
  const isClue: Record<string, boolean> = {};
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      if (board[r][c] !== 0) {
        isClue[`${r},${c}`] = true;
      }
    }
  }

  const getSudokuGraphData = (checkingRow?: number, checkingCol?: number, checkingNum?: number, errorState?: boolean): GraphData => {
    const nodes: GenericNode[] = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const id = `${r},${c}`;
        const val = board[r][c];
        const valStr = val === 0 ? '' : String(val);

        let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
        if (val !== 0) {
          status = isClue[id] ? 'highlighted' : 'success'; // clue or correctly placed
        }
        if (r === checkingRow && c === checkingCol) {
          status = errorState ? 'danger' : 'warning';
        }

        nodes.push({
          id,
          value: (r === checkingRow && c === checkingCol && checkingNum !== undefined) ? String(checkingNum) : valStr,
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
    checking?: [number, number, number],
    errorState: boolean = false,
    codeLineHighlight: number = 0,
  ) => {
    const checkRow = checking ? checking[0] : undefined;
    const checkCol = checking ? checking[1] : undefined;
    const checkNum = checking ? checking[2] : undefined;

    const data = getSudokuGraphData(checkRow, checkCol, checkNum, errorState);
    const pointers: Record<string, string> = {};
    if (checking) {
      pointers['cell'] = `${checking[0]},${checking[1]}`;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: checking ? [`${checking[0]},${checking[1]}`] : [],
      pointers,
      codeLineHighlight,
      variables: {
        currentRow: checkRow !== undefined ? checkRow : -1,
        currentCol: checkCol !== undefined ? checkCol : -1,
        tryingNum: checkNum !== undefined ? checkNum : '-',
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Safe checks helper
  const isSafe = (row: number, col: number, num: number): boolean => {
    for (let x = 0; x < N; x++) {
      if (board[row][x] === num || board[x][col] === num) {
        return false;
      }
    }
    const boxRowStart = row - (row % 2);
    const boxColStart = col - (col % 2);
    for (let r = 0; r < 2; r++) {
      for (let d = 0; d < 2; d++) {
        if (board[r + boxRowStart][d + boxColStart] === num) {
          return false;
        }
      }
    }
    return true;
  };

  pushFrame('Sudoku solver initialized. Solid indigo represents fixed clues.', undefined, false, 1);

  const solveSudoku = (): boolean => {
    for (let row = 0; row < N; row++) {
      for (let col = 0; col < N; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= N; num++) {
            pushFrame(`Testing number ${num} in cell (${row}, ${col}).`, [row, col, num], false, 9);

            if (isSafe(row, col, num)) {
              board[row][col] = num;
              pushFrame(`Placed number ${num} in cell (${row}, ${col}). Recursively solving.`, [row, col, num], false, 10);

              if (solveSudoku()) {
                return true;
              }

              // Backtrack
              board[row][col] = 0;
              pushFrame(`Dead end detected! Removing number ${num} from cell (${row}, ${col}) and backtracking.`, [row, col, num], true, 13);
            } else {
              pushFrame(`Conflict: Number ${num} violates Sudoku rules in cell (${row}, ${col}).`, [row, col, num], true, 9);
            }
          }
          return false; // trigger backtracking
        }
      }
    }
    return true;
  };

  solveSudoku();
  pushFrame('Sudoku puzzle solved successfully!', undefined, false, 1);

  return frames;
};
