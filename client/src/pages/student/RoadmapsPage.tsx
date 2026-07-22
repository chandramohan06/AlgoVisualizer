import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_ROADMAPS } from '@algorithms/metadata/interviewMetadata';
import {
  Compass, ArrowRight, Layers,
  ChevronRight, Zap
} from 'lucide-react';

export const RoadmapsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('array');

  const roadmapsList = Object.entries(CATEGORY_ROADMAPS);
  const currentRoadmap = CATEGORY_ROADMAPS[activeCategory] || CATEGORY_ROADMAPS['array'];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in font-sans text-slate-200">
      {/* Module 4 Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-950/80 via-slate-900 to-indigo-950/80 border border-white/10 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold font-mono uppercase">
            <Compass className="w-3.5 h-3.5" /> Module 4: Structured Pattern Roadmaps
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            DSA Learning Paths & Roadmaps
          </h1>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Never get lost. Follow battle-tested learning sequences designed to guide you step-by-step from foundational topics to advanced interview patterns.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto gap-2 p-1.5 bg-black/40 border border-white/5 rounded-2xl scrollbar-none select-none">
        {roadmapsList.map(([key, r]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-4 py-2.5 rounded-xl text-xs font-extrabold shrink-0 flex items-center gap-2 transition-all cursor-pointer ${
              activeCategory === key
                ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{r.title.split(' ')[0]}</span>
          </button>
        ))}
      </div>

      {/* Active Roadmap Visual Timeline */}
      <div className="bg-[#111827]/60 border border-white/10 rounded-3xl p-6 md:p-10 space-y-8 shadow-2xl backdrop-blur-xl">
        <div className="space-y-2 max-w-2xl border-b border-white/5 pb-4">
          <span className="text-[10px] font-mono font-extrabold text-cyan-400 uppercase tracking-widest">Active Roadmap</span>
          <h2 className="text-2xl md:text-3xl font-black text-white">{currentRoadmap.title}</h2>
          <p className="text-xs text-slate-300 leading-relaxed">{currentRoadmap.description}</p>
        </div>

        {/* Step-by-Step Interactive Nodes Flow */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-extrabold text-white uppercase tracking-wider">Step-by-Step Learning Hierarchy</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {currentRoadmap.order.map((step, idx) => (
              <div
                key={idx}
                className="bg-black/40 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 space-y-4 transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer group flex flex-col justify-between"
                onClick={() => navigate('/practice')}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="w-7 h-7 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-xs">
                      {idx + 1}
                    </span>
                    <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border ${
                      step.level === 'Beginner'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : step.level === 'Intermediate'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    }`}>
                      {step.level}
                    </span>
                  </div>

                  <h3 className="text-base font-extrabold text-white group-hover:text-cyan-400 transition-colors">
                    {step.pattern}
                  </h3>
                  <p className="text-xs text-slate-400 font-normal">
                    Master essential pattern mechanics, invariant checks, and complexity bounds.
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-cyan-400 font-mono font-bold flex items-center gap-1">
                    Explore Questions <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <button className="p-1.5 rounded-lg bg-white/5 group-hover:bg-cyan-600 group-hover:text-white text-slate-400 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapsPage;
