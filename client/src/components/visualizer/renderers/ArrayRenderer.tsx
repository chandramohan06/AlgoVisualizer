import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface ArrayRendererProps {
  frame: VisualizationFrame | null;
}

const POINTER_COLOR_MAP: Record<string, { text: string; bg: string; border: string }> = {
  i: { text: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
  j: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  left: { text: 'text-sky-400', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  right: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
  low: { text: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
  high: { text: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  pivot: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  current: { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  target: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
};

export const ArrayRenderer: React.FC<ArrayRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const data = Array.isArray(frame.data) ? (frame.data as number[]) : [5, 2, 8, 1, 9];
  const highlights = (frame.highlights || []) as number[];
  const pointers = frame.pointers || {};
  const meta = frame.meta as Record<string, any> | undefined;
  const statusMap = meta?.statusMap as Record<number, string> | undefined;

  const getCellStyles = (idx: number) => {
    const status = statusMap?.[idx];
    if (status === 'danger' || status === 'swapping') {
      return 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/30 scale-105';
    }
    if (status === 'warning' || status === 'comparing') {
      return 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/30 scale-105';
    }
    if (status === 'success' || status === 'sorted') {
      return 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/30';
    }
    if (status === 'visited') {
      return 'bg-white/[0.02] border-white/5 text-slate-600 opacity-50';
    }
    if (highlights.includes(idx)) {
      return 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-lg shadow-indigo-500/30 scale-105';
    }
    return 'bg-[#1E293B] border-white/10 text-slate-200 hover:border-white/20';
  };

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      {/* Dynamic Target Header if available */}
      {meta?.target !== undefined && (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300 font-semibold">
          <span>Target Value:</span>
          <span className="font-mono font-extrabold text-white bg-indigo-600 px-2 py-0.5 rounded-md">{meta.target}</span>
        </div>
      )}

      {/* Array Elements Grid */}
      <div className="flex flex-wrap gap-3 justify-center items-end min-h-[120px] p-2">
        <AnimatePresence mode="popLayout">
          {data.map((val, idx) => {
            const activePointers = Object.entries(pointers).filter(([, pos]) => pos === idx);
            const styleClass = getCellStyles(idx);

            return (
              <motion.div
                key={`cell-${idx}-${val}`}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="flex flex-col items-center gap-1.5"
              >
                {/* Pointer Badges Stack */}
                <div className="flex flex-col items-center gap-1 min-h-[28px] justify-end">
                  {activePointers.map(([pName]) => {
                    const colorStyle = POINTER_COLOR_MAP[pName.toLowerCase()] || {
                      text: 'text-cyan-400',
                      bg: 'bg-cyan-500/10',
                      border: 'border-cyan-500/30',
                    };
                    return (
                      <motion.span
                        key={pName}
                        initial={{ y: -6, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className={`text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${colorStyle.bg} ${colorStyle.border} ${colorStyle.text} shadow-sm animate-pulse`}
                      >
                        {pName}
                      </motion.span>
                    );
                  })}
                </div>

                {/* Main Array Block Cell */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-base font-bold font-mono border transition-all duration-300 ${styleClass}`}
                >
                  {val}
                </motion.div>

                {/* Index Subscript Label */}
                <span className="text-[11px] font-mono text-slate-500 font-bold">[{idx}]</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Color System Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 border-t border-white/5 pt-4 text-[11px] text-slate-400 font-semibold w-full">
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500" /> Default</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Comparing</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Swapping</div>
        <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Sorted / Match</div>
      </div>
    </div>
  );
};

export default ArrayRenderer;
