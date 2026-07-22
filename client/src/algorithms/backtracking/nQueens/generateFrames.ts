import { type VisualizationFrame } from '@store/visualizationStore';
import type { GraphData, GenericNode } from '@components/visualizer/nodeEngine/types';

export const generateNQueensFrames = (): VisualizationFrame[] => {
  const frames: VisualizationFrame[] = [];
  let frameIdx = 0;
  const N = 4;

  const baseLegend = [
    { color: 'bg-white/10 opacity-60 border border-white/5', label: 'Empty Cell' },
    { color: 'bg-emerald-500', label: 'Placed Queen' },
    { color: 'bg-amber-400', label: 'Checking Cell Safety' },
    { color: 'bg-rose-500', label: 'Attacked Cell / Backtrack Conflict' },
  ];

  // Board state: mapping coordinate key 'row,col' to queen boolean
  const board: Record<string, boolean> = {};

  const getChessboardData = (checkingRow?: number, checkingCol?: number, errorRow?: number, errorCol?: number): GraphData => {
    const nodes: GenericNode[] = [];

    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        const id = `${r},${c}`;
        const hasQueen = board[id] === true;
        let value = hasQueen ? '♛' : '';
        
        let status: 'default' | 'warning' | 'success' | 'danger' | 'info' | 'visited' | 'highlighted' = 'visited';
        if (hasQueen) {
          status = 'success';
        }
        if (r === checkingRow && c === checkingCol) {
          status = 'warning';
          if (value === '') value = '?';
        }
        if (r === errorRow && c === errorCol) {
          status = 'danger';
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
    error?: [number, number],
    codeLineHighlight: number = 0,
  ) => {
    const checkRow = checking ? checking[0] : undefined;
    const checkCol = checking ? checking[1] : undefined;
    const errRow = error ? error[0] : undefined;
    const errCol = error ? error[1] : undefined;

    const data = getChessboardData(checkRow, checkCol, errRow, errCol);
    const pointers: Record<string, string> = {};
    if (checking) {
      pointers['check'] = `${checking[0]},${checking[1]}`;
    }

    frames.push({
      index: frameIdx++,
      description,
      data,
      highlights: checking ? [`${checking[0]},${checking[1]}`] : [],
      pointers,
      codeLineHighlight,
      variables: {
        currentCol: checking ? checking[1] : -1,
        activeQueens: Object.keys(board).filter(k => board[k]).length,
      },
      meta: { statusMap: {}, legend: baseLegend },
      timestamp: frameIdx * 600,
    });
  };

  // Check safety helper
  const isSafe = (row: number, col: number): boolean => {
    // Check row on left side
    for (let i = 0; i < col; i++) {
      if (board[`${row},${i}`]) return false;
    }
    // Check upper diagonal on left side
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
      if (board[`${i},${j}`]) return false;
    }
    // Check lower diagonal on left side
    for (let i = row, j = col; i < N && j >= 0; i++, j--) {
      if (board[`${i},${j}`]) return false;
    }
    return true;
  };

  pushFrame('N-Queens initialized empty. Placing 4 queens on a 4x4 board.', undefined, undefined, 1);

  const solveNQueens = (col: number): boolean => {
    if (col >= N) {
      pushFrame('All 4 queens successfully placed! Solution found.', undefined, undefined, 4);
      return true;
    }

    for (let i = 0; i < N; i++) {
      pushFrame(`Checking safety for cell (${i}, ${col}).`, [i, col], undefined, 8);

      if (isSafe(i, col)) {
        board[`${i},${col}`] = true;
        pushFrame(`Cell (${i}, ${col}) is safe. Placed Queen here. Recursively solving for next column.`, [i, col], undefined, 9);

        if (solveNQueens(col + 1)) {
          return true;
        }

        // Backtrack
        board[`${i},${col}`] = false;
        pushFrame(`Conflict detected ahead! Backtracking. Removed Queen from (${i}, ${col}).`, [i, col], [i, col], 13);
      } else {
        pushFrame(`Cell (${i}, ${col}) is under attack. Checking next row.`, [i, col], [i, col], 8);
      }
    }

    return false;
  };

  solveNQueens(0);

  return frames;
};
