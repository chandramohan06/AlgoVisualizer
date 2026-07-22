import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface DPRendererProps {
  frame: VisualizationFrame | null;
}

export const DynamicProgrammingRenderer: React.FC<DPRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const dpTable = (frame.data as any) || [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 1, 2, 3, 4],
  ];

  const pointers = frame.pointers || {};
  const currRow = (pointers.row ?? pointers.i ?? 0) as number;
  const currCol = (pointers.col ?? pointers.j ?? 0) as number;

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="flex items-center justify-between w-full max-w-md text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
          DP Tabulation Matrix
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Active Cell: [{currRow}, {currCol}]
        </span>
      </div>

      {/* Grid DP Table */}
      <div className="w-full max-w-md bg-black/40 border border-white/10 p-4 rounded-2xl flex flex-col gap-2 overflow-x-auto shadow-inner">
        {Array.isArray(dpTable) &&
          dpTable.map((row: any, rIdx: number) => (
            <div key={rIdx} className="flex gap-2 justify-center">
              {Array.isArray(row) &&
                row.map((cellVal: any, cIdx: number) => {
                  const isActive = rIdx === currRow && cIdx === currCol;

                  return (
                    <motion.div
                      key={`${rIdx}-${cIdx}`}
                      whileHover={{ scale: 1.05 }}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-xs border transition-all ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/40 scale-105 animate-pulse'
                          : 'bg-[#1E293B] border-white/10 text-slate-300'
                      }`}
                    >
                      {cellVal}
                    </motion.div>
                  );
                })}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DynamicProgrammingRenderer;
