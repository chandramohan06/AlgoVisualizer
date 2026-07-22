import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface StackRendererProps {
  frame: VisualizationFrame | null;
}

export const StackRenderer: React.FC<StackRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const stackData = Array.isArray(frame.data) ? (frame.data as number[]) : [];
  const topIndex = stackData.length - 1;
  const maxCapacity = 8;

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      {/* Header Info */}
      <div className="flex items-center justify-between w-full max-w-sm text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
          LIFO Stack Structure
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Size: {stackData.length} / {maxCapacity}
        </span>
      </div>

      {/* Vertical Stack Chamber Container */}
      <div className="relative w-64 h-72 border-b-4 border-l-4 border-r-4 border-indigo-500/40 rounded-b-2xl bg-black/40 flex flex-col-reverse items-center p-3 gap-2 overflow-hidden shadow-inner">
        {stackData.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Stack Empty
          </div>
        )}

        <AnimatePresence initial={false}>
          {stackData.map((val, idx) => {
            const isTop = idx === topIndex;

            return (
              <motion.div
                key={`stack-${idx}-${val}`}
                layout
                initial={{ y: -100, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -100, opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className={`w-full h-11 rounded-xl flex items-center justify-between px-4 font-mono text-sm font-bold border transition-all ${
                  isTop
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/40'
                    : 'bg-[#1E293B] border-white/10 text-slate-300'
                }`}
              >
                <span>[{idx}]</span>
                <span className="text-base">{val}</span>
                {isTop ? (
                  <span className="text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-cyan-400 text-black animate-pulse">
                    TOP
                  </span>
                ) : (
                  <span className="w-8" />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StackRenderer;
