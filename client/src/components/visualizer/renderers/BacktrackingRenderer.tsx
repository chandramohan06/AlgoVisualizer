import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface BacktrackingRendererProps {
  frame: VisualizationFrame | null;
}

export const BacktrackingRenderer: React.FC<BacktrackingRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const N = 4;
  const board = (frame.data as any) || [
    ['.', 'Q', '.', '.'],
    ['.', '.', '.', 'Q'],
    ['Q', '.', '.', '.'],
    ['.', '.', 'Q', '.'],
  ];

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="flex items-center justify-between w-full max-w-sm text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold uppercase tracking-wider">
          Backtracking Decision Board
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Grid: {N}x{N}
        </span>
      </div>

      {/* Grid Board Render */}
      <div className="grid grid-cols-4 gap-2 bg-black/40 border border-white/10 p-3 rounded-2xl shadow-inner">
        {Array.isArray(board) &&
          board.map((row: any, rIdx: number) =>
            Array.isArray(row)
              ? row.map((cell: any, cIdx: number) => {
                  const isQueen = cell === 'Q';
                  const isDark = (rIdx + cIdx) % 2 === 1;

                  return (
                    <motion.div
                      key={`${rIdx}-${cIdx}`}
                      whileHover={{ scale: 1.05 }}
                      className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold font-mono text-lg border transition-all ${
                        isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-900/80 border-slate-800'
                      } ${isQueen ? 'bg-pink-600/30 border-pink-500 text-pink-300 shadow-lg shadow-pink-500/30 font-extrabold' : 'text-slate-600'}`}
                    >
                      {isQueen ? '♛' : '.'}
                    </motion.div>
                  );
                })
              : null
          )}
      </div>
    </div>
  );
};

export default BacktrackingRenderer;
