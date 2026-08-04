import React, { useState, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import {
  STUDIO_TOPICS,
  getTopicById,
  getMethodById,
  IVisualizationStep,
} from './visualizationStudioRegistry';
import { StudioCanvasRenderer } from './StudioCanvasRenderer';
import { ArrayVisualizationStudio } from './ArrayVisualizationStudio';
import {
  Play,
  Pause,
  RotateCcw,
  SkipBack,
  SkipForward,
  Cpu,
  Code2,
  SlidersHorizontal,
  Zap,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  ShieldAlert,
  Lightbulb,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const InteractiveVisualizationStudio: React.FC = () => {
  // ── LocalStorage Persistence States ──────────────────────────────────────
  const [selectedTopicId, setSelectedTopicId] = useState<string>(() => {
    return localStorage.getItem('visualization_topic') || 'arrays';
  });

  const [selectedMethodId, setSelectedMethodId] = useState<string>(() => {
    return localStorage.getItem('visualization_method') || 'traversal';
  });

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(() => {
    const saved = localStorage.getItem('visualization_speed');
    return saved ? parseFloat(saved) : 1;
  });

  const [language, setLanguage] = useState<'java' | 'cpp' | 'python' | 'js' | 'pseudocode'>(() => {
    const saved = localStorage.getItem('visualization_language');
    return (saved as any) || 'java';
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCodePanel, setShowCodePanel] = useState<boolean>(false);
  const [isCompareMode] = useState<boolean>(false);

  // ── Topic & Method Metadata ──────────────────────────────────────────────
  const activeTopic = useMemo(() => getTopicById(selectedTopicId), [selectedTopicId]);

  const activeMethod = useMemo(() => {
    return getMethodById(selectedTopicId, selectedMethodId);
  }, [selectedTopicId, selectedMethodId]);

  const [customInput, setCustomInput] = useState<string>(activeMethod.defaultInput);

  // Sync input when method changes
  useEffect(() => {
    setCustomInput(activeMethod.defaultInput);
  }, [activeMethod]);

  // Save layout & settings to localStorage
  useEffect(() => {
    localStorage.setItem('visualization_topic', selectedTopicId);
    localStorage.setItem('visualization_method', selectedMethodId);
    localStorage.setItem('visualization_speed', String(playbackSpeed));
    localStorage.setItem('visualization_language', language);
  }, [selectedTopicId, selectedMethodId, playbackSpeed, language]);

  // ── Step Generation & Playback ──────────────────────────────────────────
  const steps: IVisualizationStep[] = useMemo(() => {
    try {
      return activeMethod.generateSteps(customInput);
    } catch {
      return activeMethod.generateSteps(activeMethod.defaultInput);
    }
  }, [activeMethod, customInput]);

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Current active step object & previous step object for comparison
  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)] || steps[0];
  const previousStep = steps[Math.max(0, currentStepIndex - 1)];

  // Auto playback timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const intervalMs = Math.max(100, Math.round(800 / playbackSpeed));
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  // Reset playback step when topic/method/input changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [selectedTopicId, selectedMethodId, customInput]);

  // Get active code snippet string
  const getCodeSnippet = () => {
    if (language === 'java') return activeMethod.codeSnippets.java;
    if (language === 'cpp') return activeMethod.codeSnippets.cpp;
    if (language === 'python') return activeMethod.codeSnippets.python;
    if (language === 'js') {
      return `// JavaScript Implementation of ${activeMethod.name}\nfunction ${activeMethod.id}(arr) {\n  let n = arr.length;\n  for (let i = 0; i < n; i++) {\n    // Step processing...\n  }\n  return arr;\n}`;
    }
    return activeMethod.pseudoCode;
  };

  return (
    <div className={`min-h-screen bg-[#06080d] text-slate-100 font-sans flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : ''}`}>
      {/* ── 1. MINIMALIST APPLE-STYLE FLOATING TOP STRIP ────────────────────────────────────────── */}
      <header className="h-16 bg-[#090c14]/90 backdrop-blur-md border-b border-white/10 px-6 flex items-center justify-between gap-4 shrink-0 shadow-2xl z-30">
        {/* Left: Topic & Algorithm Selector */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedTopicId}
              onChange={(e) => {
                const newTopicId = e.target.value;
                setSelectedTopicId(newTopicId);
                const firstMethod = STUDIO_TOPICS.find((t) => t.id === newTopicId)?.methods[0];
                if (firstMethod) setSelectedMethodId(firstMethod.id);
              }}
              className="bg-[#121622] border border-white/10 text-white text-xs font-mono font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {STUDIO_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>

            <select
              value={selectedMethodId}
              onChange={(e) => setSelectedMethodId(e.target.value)}
              className="bg-[#121622] border border-white/10 text-white text-xs font-mono font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {activeTopic.methods.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Dynamic Custom Input Bar ("What if input changes?") */}
        <div className="hidden lg:flex items-center gap-2 bg-[#121622] border border-white/10 rounded-2xl px-4 py-1.5 text-xs">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">Simulation Input:</span>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Custom Input (e.g. 5, 2, 8, 1, 9)"
            className="bg-transparent text-xs text-white font-mono focus:outline-none w-56"
          />
          <button
            onClick={() => setCustomInput(activeMethod.defaultInput)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Default Input"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Code Drawer Toggle, Speed & Fullscreen */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCodePanel(!showCodePanel)}
            className={`px-3 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showCodePanel
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                : 'bg-[#121622] text-slate-400 hover:text-white border border-white/10'
            }`}
          >
            <Code2 className="w-4 h-4" /> {showCodePanel ? 'Hide Code' : 'Show Code'}
          </button>

          {/* Speed Selector */}
          <div className="flex items-center gap-1 bg-[#121622] px-3 py-2 rounded-xl border border-white/10 text-xs font-mono">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <select
              value={playbackSpeed}
              onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              <option value="0.25">0.25x</option>
              <option value="0.5">0.5x</option>
              <option value="1">1.0x</option>
              <option value="1.5">1.5x</option>
              <option value="2">2.0x</option>
              <option value="4">4.0x</option>
            </select>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2.5 rounded-xl bg-[#121622] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── 2. HERO VISUALIZATION STAGE (OCCUPIES 70%+ AREA) ────────────────────────────────── */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* HERO CANVAS */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#05070c] relative">
          {/* Background Micro Grid */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* TOP METRICS BADGES STRIP */}
          <div className="px-6 py-3 flex items-center justify-between z-10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-black text-white text-sm uppercase tracking-wider">{activeMethod.name}</span>
              <span className="text-[10px] text-slate-400 font-bold bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
                {activeMethod.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-black/40 px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300">
                Time: <span className="text-emerald-400 font-bold">{activeMethod.timeComplexity.avg}</span>
              </div>
              <div className="bg-black/40 px-3 py-1 rounded-full border border-white/10 text-[11px] text-slate-300">
                Space: <span className="text-cyan-400 font-bold">{activeMethod.spaceComplexity}</span>
              </div>
            </div>
          </div>

          {/* MAIN GRAPHICAL ANIMATION ENGINE STAGE */}
          <div className="flex-1 overflow-auto flex flex-col items-center justify-center p-6 relative">
            {selectedTopicId === 'arrays' ? (
              <ArrayVisualizationStudio />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                {isCompareMode && currentStepIndex > 0 && (
                  <div className="w-full max-w-xl p-3 rounded-2xl bg-black/60 border border-purple-500/30 text-xs font-mono space-y-1 mb-2">
                    <span className="text-purple-300 font-bold">Previous Frame (# {currentStepIndex}):</span>
                    <p className="text-slate-400">{previousStep?.description}</p>
                  </div>
                )}
                <StudioCanvasRenderer currentStep={currentStep} />
              </div>
            )}
          </div>

          {/* ── EDUCATIONAL STEP INSIGHT OVERLAY CARD ── */}
          <div className="px-6 py-4 bg-[#090c14]/95 border-t border-white/10 z-20 space-y-3 shrink-0 shadow-2xl">
            {/* Answer 3 Key Questions: What happened? Why? Invariant? */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-sans text-xs">
              <div className="p-3.5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> What Happened?
                </span>
                <p className="text-xs text-white font-semibold leading-relaxed">{currentStep.description}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-emerald-400" /> Why &amp; Invariant
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Subarray up to current pointer index preserves the sorted invariant state.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-400 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Interview Tip
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Always state space complexity and off-by-one pointer boundaries in technical rounds.
                </p>
              </div>
            </div>

            {/* ── TIMELINE SCRUBBER CONTROLS BAR ── */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5 font-mono">
              {/* Playback Button Group */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(0);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                  }}
                  disabled={currentStepIndex === 0}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-40 transition-all cursor-pointer"
                  title="Previous Step"
                >
                  <SkipBack className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`px-6 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 active:scale-95'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" /> Play
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                  }}
                  disabled={currentStepIndex === steps.length - 1}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 disabled:opacity-40 transition-all cursor-pointer"
                  title="Next Step"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
              </div>

              {/* Scrubber Range Slider */}
              <div className="flex-1 w-full sm:w-auto max-w-xl flex items-center gap-3">
                <span className="text-[10px] text-slate-500">0</span>
                <input
                  type="range"
                  min={0}
                  max={steps.length - 1}
                  value={currentStepIndex}
                  onChange={(e) => {
                    setIsPlaying(false);
                    setCurrentStepIndex(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-indigo-500 bg-slate-800 rounded-lg h-2 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">{steps.length - 1}</span>
              </div>

              {/* Frame Indicator */}
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 shrink-0">
                Frame #{currentStepIndex + 1} / {steps.length}
              </span>
            </div>
          </div>
        </div>

        {/* CONDITIONAL CODE VIEWER DRAWER (RIGHT SIDEBAR) */}
        {showCodePanel && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.2 }}
            className="w-80 sm:w-96 bg-[#090b10] border-l border-white/10 flex flex-col shrink-0 z-20 shadow-2xl"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-[#0d111a] border-b border-white/10 flex items-center justify-between text-xs font-mono shrink-0">
              <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-purple-400" /> Live Code Execution
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-white/5 border border-white/10 text-cyan-400 font-mono font-bold text-[10px] uppercase rounded px-2 py-0.5 focus:outline-none cursor-pointer"
              >
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="python">Python</option>
                <option value="js">JS</option>
                <option value="pseudocode">Pseudo</option>
              </select>
            </div>

            {/* Monaco Editor Code Display */}
            <div className="h-72 border-b border-white/10 overflow-hidden relative">
              <Editor
                height="100%"
                language={language === 'java' || language === 'cpp' ? 'cpp' : language === 'python' ? 'python' : 'javascript'}
                theme="vs-dark"
                value={getCodeSnippet()}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 12,
                  scrollBeyondLastLine: false,
                  lineNumbers: 'on',
                  folding: false,
                }}
              />
            </div>

            {/* Live Variables & Memory State */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Live Pointers &amp; Memory State
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentStep.pointerMap || {}).map(([pName, pVal]) => (
                  <div key={pName} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-amber-300 font-bold uppercase text-[10px]">{pName}:</span>
                    <span className="text-white font-bold">{pVal}</span>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">Comparisons:</span>
                  <span className="text-amber-400 font-bold">{currentStep.metrics.comparisons}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">Swaps:</span>
                  <span className="text-rose-400 font-bold">{currentStep.metrics.swaps}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveVisualizationStudio;
