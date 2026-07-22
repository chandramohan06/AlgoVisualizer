import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { generateUniversalExplanation } from '@algorithms/engine/explanationEngine';
import { useLearningModeStore } from '@store/learningModeStore';
import { Info, ArrowRight, HelpCircle, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';

interface StepExplanationPanelProps {
  frame: VisualizationFrame | null;
  totalFrames: number;
  categorySlug?: string;
  algoTitle?: string;
}

export const StepExplanationPanel: React.FC<StepExplanationPanelProps> = ({
  frame,
  totalFrames,
  categorySlug = 'array',
  algoTitle = 'Algorithm',
}) => {
  const mode = useLearningModeStore((s) => s.mode);

  if (!frame) return null;

  const explanation = generateUniversalExplanation(frame, totalFrames, categorySlug, algoTitle);

  return (
    <div className="w-full bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl space-y-4 font-sans">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Universal Explanation Engine
          </span>
          <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[10px] font-mono font-bold capitalize">
            {mode} Mode
          </span>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-mono text-xs font-bold">
          Step {frame.index + 1} / {totalFrames} &bull; Line #{frame.codeLineHighlight || 1}
        </span>
      </div>

      {/* Main Explanation Banner */}
      <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-3 opacity-10 pointer-events-none">
          <Sparkles className="w-12 h-12 text-indigo-400" />
        </div>
        <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-400 block">
          Current Action Explanation
        </span>
        <p className="text-sm font-semibold text-white leading-relaxed">
          {explanation.what}
        </p>
      </div>

      {/* Structured Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Why this step? */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5 hover:border-amber-500/30 transition-colors">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" /> Why did this happen?
          </span>
          <p className="text-slate-300 leading-relaxed font-sans">{explanation.why}</p>
        </div>

        {/* What happens next? */}
        <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5 hover:border-emerald-500/30 transition-colors">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
            <ArrowRight className="w-3.5 h-3.5" /> What happens next?
          </span>
          <p className="text-slate-300 leading-relaxed font-sans">{explanation.next}</p>
        </div>

        {/* Algorithm Insight (shown in Beginner & Intermediate mode) */}
        {mode !== 'interview' && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5 hover:border-cyan-500/30 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" /> Pedagogical Insight
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">{explanation.algorithmInsight}</p>
          </div>
        )}

        {/* Common Interview Pitfall (shown in Beginner mode) */}
        {mode === 'beginner' && (
          <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-1.5 hover:border-rose-500/30 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" /> Common Interview Pitfall
            </span>
            <p className="text-slate-300 leading-relaxed font-sans">{explanation.commonMistake}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepExplanationPanel;
