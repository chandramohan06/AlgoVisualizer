import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { History } from 'lucide-react';

interface StepHistoryPanelProps {
  frames: VisualizationFrame[];
  currentFrameIndex: number;
  seekTo: (index: number) => void;
}

export const StepHistoryPanel: React.FC<StepHistoryPanelProps> = ({ frames, currentFrameIndex, seekTo }) => {
  if (!frames || frames.length === 0) return null;

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step Execution History</span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Total Steps: {frames.length}</span>
      </div>

      <div className="space-y-1.5 max-h-[240px] overflow-y-auto pr-1">
        {frames.map((f, idx) => {
          const isActive = idx === currentFrameIndex;

          return (
            <div
              key={idx}
              onClick={() => seekTo(idx)}
              className={`p-2.5 rounded-xl border flex items-center justify-between font-mono text-xs font-semibold cursor-pointer transition-all ${
                isActive
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-md'
                  : 'bg-black/30 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <span className="truncate">
                #{idx + 1}: {f.description}
              </span>
              <span className="text-[10px] font-bold text-slate-500 shrink-0">Line {f.codeLineHighlight || 1}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepHistoryPanel;
