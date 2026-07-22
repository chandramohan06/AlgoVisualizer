import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface QueueRendererProps {
  frame: VisualizationFrame | null;
}

export const QueueRenderer: React.FC<QueueRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const queueData = Array.isArray(frame.data) ? (frame.data as number[]) : [];
  const frontIndex = 0;
  const rearIndex = queueData.length - 1;

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      {/* Header Info */}
      <div className="flex items-center justify-between w-full max-w-md text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold uppercase tracking-wider">
          FIFO Queue Pipeline
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Length: {queueData.length}
        </span>
      </div>

      {/* Queue Horizontal Chamber */}
      <div className="relative w-full max-w-xl h-32 border-t-2 border-b-2 border-emerald-500/40 bg-black/40 flex items-center justify-start p-4 gap-3 overflow-x-auto rounded-2xl shadow-inner scrollbar-none">
        {queueData.length === 0 && (
          <div className="w-full text-center text-xs font-semibold text-slate-600 uppercase tracking-widest">
            Queue Empty
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {queueData.map((val, idx) => {
            const isFront = idx === frontIndex;
            const isRear = idx === rearIndex;

            return (
              <motion.div
                key={`queue-${idx}-${val}`}
                layout
                initial={{ x: 100, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                exit={{ x: -100, opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex flex-col items-center gap-1.5 shrink-0"
              >
                {/* Pointer tags */}
                <div className="flex gap-1 items-center min-h-[20px]">
                  {isFront && (
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow">
                      FRONT
                    </span>
                  )}
                  {isRear && (
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 shadow">
                      REAR
                    </span>
                  )}
                </div>

                {/* Queue Block Cell */}
                <div className="w-14 h-14 rounded-2xl bg-[#1E293B] border border-white/10 flex items-center justify-center font-mono text-base font-bold text-white shadow-lg">
                  {val}
                </div>

                <span className="text-[10px] font-mono text-slate-500 font-bold">[{idx}]</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QueueRenderer;
