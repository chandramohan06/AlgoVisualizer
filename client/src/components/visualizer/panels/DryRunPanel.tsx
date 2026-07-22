import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { CheckCircle2, ArrowDown, Play } from 'lucide-react';

interface DryRunPanelProps {
  frames: VisualizationFrame[];
  currentFrameIndex: number;
  seekTo: (index: number) => void;
}

export const DryRunPanel: React.FC<DryRunPanelProps> = ({ frames, currentFrameIndex, seekTo }) => {
  if (!frames || frames.length === 0) {
    return (
      <div className="p-4 text-xs text-slate-500 font-mono text-center">
        Initialize animation frames to view dry run flowchart.
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl p-5 shadow-xl space-y-4">
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Interactive Dry Run Flowchart
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400">
          Step {currentFrameIndex + 1} of {frames.length}
        </span>
      </div>

      {/* Flowchart Vertical Sequence */}
      <div className="flex flex-col items-center gap-2 max-h-[280px] overflow-y-auto pr-1">
        {frames.map((f, idx) => {
          const isCompleted = idx < currentFrameIndex;
          const isActive = idx === currentFrameIndex;

          return (
            <React.Fragment key={idx}>
              <div
                onClick={() => seekTo(idx)}
                className={`w-full p-3 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono font-bold transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isActive
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]'
                    : 'bg-black/30 border-white/5 text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-500 text-black'
                        : isActive
                        ? 'bg-indigo-500 text-white animate-pulse'
                        : 'bg-white/5 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                  </div>
                  <span className="truncate">{f.description || `Step #${idx + 1}`}</span>
                </div>

                <span className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                  Line {f.codeLineHighlight || 1}
                </span>
              </div>

              {idx < frames.length - 1 && (
                <ArrowDown className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-500/50' : 'text-slate-700'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DryRunPanel;
