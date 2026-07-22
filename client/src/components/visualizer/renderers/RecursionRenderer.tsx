import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface RecursionRendererProps {
  frame: VisualizationFrame | null;
}

export const RecursionRenderer: React.FC<RecursionRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const stackFrames = (frame.variables?.callStack || [
    { fnName: 'factorial(5)', arg: 'n = 5', status: 'waiting' },
    { fnName: 'factorial(4)', arg: 'n = 4', status: 'waiting' },
    { fnName: 'factorial(3)', arg: 'n = 3', status: 'active' },
  ]) as { fnName: string; arg: string; status?: string; returnVal?: any }[];

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
          Recursion Call Stack Frames
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Stack Depth: {stackFrames.length}
        </span>
      </div>

      {/* Animated Call Stack */}
      <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col-reverse items-center gap-3 min-h-[220px]">
        <AnimatePresence>
          {stackFrames.map((f, idx) => {
            const isActive = idx === stackFrames.length - 1;

            return (
              <motion.div
                key={`rec-${idx}-${f.fnName}`}
                layout
                initial={{ y: -30, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -30, opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-full p-3 rounded-xl border flex items-center justify-between font-mono text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/30'
                    : 'bg-[#1E293B] border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px] text-slate-400">
                    #{idx + 1}
                  </span>
                  <span>{f.fnName}</span>
                </div>
                <span className="text-slate-300">{f.arg}</span>
                {f.returnVal !== undefined && (
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-[10px]">
                    return {f.returnVal}
                  </span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RecursionRenderer;
