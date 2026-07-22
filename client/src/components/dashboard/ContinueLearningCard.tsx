import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useContinueLearning } from '@hooks/useContinueLearning';

export const ContinueLearningCard: React.FC = () => {
  const navigate = useNavigate();
  const { session } = useContinueLearning();

  const handleResume = () => {
    navigate(`/visualizer/${session.category}/${session.slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-purple-950/40 border border-white/10 p-5 space-y-4 shadow-xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-300">Continue Learning Session</h2>
        </div>
        <span className="text-[10px] font-mono text-slate-500">
          Last active: {new Date(session.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      <div className="bg-black/40 border border-white/5 p-4 rounded-xl flex items-center justify-between flex-wrap gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-mono font-bold uppercase">
              {session.category}
            </span>
            <span className="text-xs font-mono text-slate-400">Step #{session.frameIndex ? session.frameIndex + 1 : 1}</span>
          </div>
          <h3 className="text-base font-black text-white">{session.title}</h3>
        </div>

        <button
          onClick={handleResume}
          className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer uppercase tracking-wider"
        >
          <Play className="w-4 h-4 fill-current" /> Resume Session
        </button>
      </div>
    </motion.div>
  );
};

export default ContinueLearningCard;
