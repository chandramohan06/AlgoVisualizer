import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, Lightbulb, ShieldAlert, Layers } from 'lucide-react';

export interface AITutorPanelProps {
  isOpen: boolean;
  onClose: () => void;
  algorithmTitle?: string;
  category?: string;
  currentFrame?: number;
  totalFrames?: number;
}

export const AITutorPanel: React.FC<AITutorPanelProps> = ({
  isOpen,
  onClose,
  algorithmTitle = 'Bubble Sort',
  category = 'Sorting',
  currentFrame = 1,
  totalFrames = 10,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.25 }}
          className="fixed right-0 top-16 bottom-0 w-80 sm:w-96 glass-strong border-l border-white/10 bg-[#0d1117]/95 shadow-2xl z-40 p-5 overflow-y-auto space-y-6 font-sans"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-black text-white font-mono uppercase tracking-wider">
                  Visualizer AI Tutor
                </h3>
                <p className="text-[10px] text-slate-400 font-mono">Frame #{currentFrame} / {totalFrames}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Current Frame Invariant */}
          <div className="glass-card p-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Frame Step Invariant
            </span>
            <h4 className="text-xs font-bold text-white">Why did this step occur?</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              At frame #{currentFrame}, elements at current pointers are compared. If the left element is larger than the right element, a swap is performed to bubble the largest unsorted element towards the end.
            </p>
          </div>

          {/* Data Structure Live State */}
          <div className="glass-card p-4 rounded-2xl border border-white/10 space-y-3">
            <span className="text-[10px] font-mono uppercase font-bold text-purple-400 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Memory &amp; Execution State
            </span>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Category:</span>
                <span className="text-white font-bold">{category}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Call Stack Depth:</span>
                <span className="text-emerald-400 font-bold">1 Frame</span>
              </div>

              <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <span className="text-slate-400">Auxiliary Queue / Matrix:</span>
                <span className="text-indigo-400 font-bold">O(1) Memory</span>
              </div>
            </div>
          </div>

          {/* Top Interview Tips */}
          <div className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Key Interview Takeaway
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              In technical interviews for {algorithmTitle}, always explain how early exit flags (\`swapped = false\`) optimize best-case time complexity to **O(N)** for already sorted arrays.
            </p>
          </div>

          {/* Common Mistakes */}
          <div className="glass-card p-4 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-2">
            <span className="text-[10px] font-mono uppercase font-bold text-rose-400 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> Common Mistakes
            </span>
            <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside leading-relaxed">
              <li>Off-by-one errors in inner loop boundary (\`N - i - 1\`).</li>
              <li>Forgetting that Bubble Sort is a stable sorting algorithm.</li>
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AITutorPanel;
