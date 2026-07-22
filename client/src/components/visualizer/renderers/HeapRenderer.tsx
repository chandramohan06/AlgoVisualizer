import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface HeapRendererProps {
  frame: VisualizationFrame | null;
}

export const HeapRenderer: React.FC<HeapRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const heapArray = Array.isArray(frame.data) ? (frame.data as number[]) : [10, 20, 15, 30, 40, 25];
  const highlights = (frame.highlights || []) as number[];

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-pink-500/10 border border-pink-500/20 text-pink-400 font-bold uppercase tracking-wider">
          Binary Heap Structure
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Total Elements: {heapArray.length}
        </span>
      </div>

      {/* 1D Array Representation of Heap */}
      <div className="w-full max-w-xl bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col items-center gap-3">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Heap Array Representation</span>
        <div className="flex flex-wrap gap-2 justify-center">
          {heapArray.map((val, idx) => {
            const isHl = highlights.includes(idx);
            return (
              <motion.div key={idx} className="flex flex-col items-center gap-1">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-sm border transition-all ${
                    isHl ? 'bg-pink-600 border-pink-400 text-white shadow-lg shadow-pink-500/40 scale-105' : 'bg-[#1E293B] border-white/10 text-slate-200'
                  }`}
                >
                  {val}
                </div>
                <span className="text-[10px] font-mono text-slate-500 font-bold">[{idx}]</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeapRenderer;
