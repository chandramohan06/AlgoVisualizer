import React from 'react';
import { motion } from 'framer-motion';
import { type VisualizationFrame } from '@store/visualizationStore';

interface GreedyRendererProps {
  frame: VisualizationFrame | null;
}

export const GreedyRenderer: React.FC<GreedyRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const choices = (frame.data as any) || [
    { id: 1, name: 'Activity 1', start: 1, end: 3, status: 'accepted' },
    { id: 2, name: 'Activity 2', start: 2, end: 5, status: 'rejected' },
    { id: 3, name: 'Activity 3', start: 4, end: 7, status: 'accepted' },
  ];

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-6 shadow-2xl">
      <div className="flex items-center justify-between w-full max-w-md text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold uppercase tracking-wider">
          Greedy Candidate Selections
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Candidates: {choices.length}
        </span>
      </div>

      <div className="w-full max-w-md bg-black/40 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
        {choices.map((c: any, i: number) => {
          let cardStyle = 'bg-[#1E293B] border-white/10 text-slate-300';
          if (c.status === 'accepted') cardStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/30';
          if (c.status === 'rejected') cardStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-lg shadow-rose-500/30 opacity-60';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs font-bold transition-all ${cardStyle}`}
            >
              <span>{c.name || `Item ${c.id}`}</span>
              <span>[{c.start ?? c.weight} - {c.end ?? c.value}]</span>
              <span className="uppercase font-extrabold text-[10px] px-2 py-0.5 rounded bg-black/30">
                {c.status || 'evaluating'}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GreedyRenderer;
