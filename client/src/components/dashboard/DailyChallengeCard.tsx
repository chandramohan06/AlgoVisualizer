import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const DailyChallengeCard: React.FC = () => {
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="glass-card rounded-3xl p-6 border border-emerald-500/20 bg-gradient-to-r from-emerald-950/20 via-slate-900 to-black/40 space-y-4 font-sans"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
              Daily Challenge <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </h2>
            <p className="text-[11px] text-slate-400 font-mono">Solve Today&apos;s Challenge for +100 Bonus XP</p>
          </div>
        </div>

        <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300">
          🔥 2x Streak Multiplier
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[10px] font-mono font-bold uppercase border border-emerald-500/20">
              Array / Two Pointers
            </span>
            <span className="text-[10px] font-mono text-slate-400">Medium Difficulty</span>
          </div>
          <h3 className="text-sm font-bold text-white">Container With Most Water (2-Pointers)</h3>
        </div>

        <button
          onClick={() => {
            if (!completed) {
              setCompleted(true);
            } else {
              navigate('/visualizer/searching/binary-search');
            }
          }}
          className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shrink-0 ${
            completed
              ? 'bg-emerald-600 text-white shadow-emerald-600/30'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95'
          }`}
        >
          {completed ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" /> Completed (+100 XP)
            </>
          ) : (
            <>
              Start Challenge <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default DailyChallengeCard;
