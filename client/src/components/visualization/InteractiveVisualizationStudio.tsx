import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Activity,
  GripVertical,
  GripHorizontal,
  CheckCircle2,
  Zap,
  StickyNote,
  Save,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  ShieldAlert,
  Lightbulb,
  Split,
} from 'lucide-react';

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

  const [leftWidthPct, setLeftWidthPct] = useState<number>(() => {
    const saved = localStorage.getItem('visualization_left_width');
    return saved ? parseFloat(saved) : 55;
  });

  const [bottomHeightPx, setBottomHeightPx] = useState<number>(() => {
    const saved = localStorage.getItem('visualization_bottom_height');
    return saved ? parseInt(saved, 10) : 230;
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isCompareMode, setIsCompareMode] = useState<boolean>(false);

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
    localStorage.setItem('visualization_left_width', String(leftWidthPct));
    localStorage.setItem('visualization_bottom_height', String(bottomHeightPx));
  }, [selectedTopicId, selectedMethodId, playbackSpeed, language, leftWidthPct, bottomHeightPx]);

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
  const [activeBottomTab, setActiveBottomTab] = useState<'insights' | 'properties' | 'pseudocode' | 'trace' | 'notes'>('insights');
  const [userNote, setUserNote] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

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

  // ── Resizing Handlers (Left/Right & Top/Bottom) ──────────────────────────
  const isDraggingHorizontalRef = useRef(false);
  const isDraggingVerticalRef = useRef(false);

  const handleMouseDownHorizontal = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingHorizontalRef.current = true;

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingHorizontalRef.current) return;
      const windowWidth = window.innerWidth;
      const newPct = (ev.clientX / windowWidth) * 100;
      if (newPct >= 30 && newPct <= 75) {
        setLeftWidthPct(Math.round(newPct));
      }
    };

    const handleMouseUp = () => {
      isDraggingHorizontalRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDownVertical = (e: React.MouseEvent) => {
    e.preventDefault();
    isDraggingVerticalRef.current = true;

    const handleMouseMove = (ev: MouseEvent) => {
      if (!isDraggingVerticalRef.current) return;
      const windowHeight = window.innerHeight;
      const newPx = windowHeight - ev.clientY;
      if (newPx >= 120 && newPx <= 500) {
        setBottomHeightPx(Math.round(newPx));
      }
    };

    const handleMouseUp = () => {
      isDraggingVerticalRef.current = false;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

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
    <div className={`min-h-screen bg-[#07090e] text-slate-100 font-sans flex flex-col ${isFullscreen ? 'fixed inset-0 z-50 overflow-hidden' : ''}`}>
      {/* ── 1. TOP HEADER & CONTROL STRIP ────────────────────────────────────────── */}
      <header className="h-16 bg-[#0a0d14] border-b border-white/10 px-4 flex items-center justify-between gap-4 shrink-0 shadow-lg z-30">
        {/* Left: Brand & Selector Dropdowns */}
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/20">
            <Cpu className="w-5 h-5" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Topic Select */}
            <select
              value={selectedTopicId}
              onChange={(e) => {
                const newTopicId = e.target.value;
                setSelectedTopicId(newTopicId);
                const firstMethod = STUDIO_TOPICS.find((t) => t.id === newTopicId)?.methods[0];
                if (firstMethod) setSelectedMethodId(firstMethod.id);
              }}
              className="bg-[#121620] border border-white/10 text-white text-xs font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {STUDIO_TOPICS.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>

            {/* Method Select */}
            <select
              value={selectedMethodId}
              onChange={(e) => setSelectedMethodId(e.target.value)}
              className="bg-[#121620] border border-white/10 text-white text-xs font-mono font-bold rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 cursor-pointer"
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
        <div className="hidden md:flex items-center gap-2 bg-[#121620] border border-white/10 rounded-2xl px-3 py-1 text-xs">
          <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
          <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">Input:</span>
          <input
            type="text"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Custom Input (e.g. 5, 2, 8, 1, 9)"
            className="bg-transparent text-xs text-white font-mono focus:outline-none w-48 sm:w-64"
          />
          <button
            onClick={() => setCustomInput(activeMethod.defaultInput)}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Default Input"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Language Switcher, Speed & Fullscreen */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center bg-[#121620] p-1 rounded-xl border border-white/10 text-xs font-mono font-bold">
            {(['java', 'cpp', 'python', 'js', 'pseudocode'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 rounded-lg uppercase transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lang === 'pseudocode' ? 'Pseudo' : lang}
              </button>
            ))}
          </div>

          {/* Speed Slider */}
          <div className="hidden lg:flex items-center gap-1.5 bg-[#121620] px-3 py-1.5 rounded-xl border border-white/10 text-xs font-mono">
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
            className="p-2 rounded-xl bg-[#121620] hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── 2. MAIN RESIZABLE SPLIT CONTAINER ────────────────────────────────── */}
      <div className="flex-1 flex flex-col md:flex-row min-h-0 relative overflow-hidden">
        {/* LEFT COLUMN: Interactive Animation Canvas */}
        <div
          className="flex flex-col min-h-0 bg-[#080b11] relative border-b md:border-b-0 md:border-r border-white/10"
          style={{ width: `${leftWidthPct}%` }}
        >
          {/* Canvas Top Bar */}
          <div className="px-4 py-2 bg-[#0d111a] border-b border-white/5 flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-bold text-white uppercase tracking-wider">{activeMethod.name} Canvas</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCompareMode(!isCompareMode)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all flex items-center gap-1 cursor-pointer ${
                  isCompareMode
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                <Split className="w-3 h-3" /> Compare Frames
              </button>

              <span className="text-[10px] text-slate-400 font-bold bg-white/5 px-2 py-0.5 rounded border border-white/10">
                Frame #{currentStepIndex + 1} / {steps.length}
              </span>
            </div>
          </div>

          {/* Graphical Visualization Stage */}
          <div className="flex-1 overflow-auto p-6 flex flex-col items-center justify-center relative">
            {/* Background Canvas Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

            {selectedTopicId === 'arrays' ? (
              <ArrayVisualizationStudio />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                {isCompareMode && currentStepIndex > 0 && (
                  <div className="w-full p-3 rounded-2xl bg-black/40 border border-purple-500/30 text-xs font-mono space-y-1 mb-2">
                    <span className="text-purple-300 font-bold">Previous Step (# {currentStepIndex}):</span>
                    <p className="text-slate-400">{previousStep?.description}</p>
                  </div>
                )}
                <StudioCanvasRenderer currentStep={currentStep} />
              </div>
            )}
          </div>

          {/* ── INTERACTIVE TIMELINE SCRUBBER CONTROL BAR ── */}
          <div className="p-4 bg-[#0d111a] border-t border-white/10 space-y-3 shrink-0">
            {/* Step Explanation Ribbon */}
            <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 min-w-0">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
                <p className="text-indigo-200 font-semibold truncate">{currentStep.description}</p>
              </div>
              <span className="text-[10px] text-slate-400 font-bold shrink-0">
                Step {currentStepIndex + 1} of {steps.length}
              </span>
            </div>

            {/* Scrubber Range Slider */}
            <div className="space-y-1">
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
              <div className="flex justify-between text-[9px] font-mono text-slate-500 font-bold">
                <span>0 (Start)</span>
                <span>Frame {currentStepIndex + 1}</span>
                <span>{steps.length - 1} (End)</span>
              </div>
            </div>

            {/* Playback Button Strip */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(0);
                  }}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
                  title="Reset to Start"
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
                  className={`px-5 py-2.5 rounded-xl font-mono font-bold text-xs flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
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

              <div className="flex items-center gap-3 text-xs font-mono">
                <div className="text-slate-400">
                  Comparisons: <span className="text-amber-400 font-bold">{currentStep.metrics.comparisons}</span>
                </div>
                <div className="text-slate-400">
                  Swaps: <span className="text-rose-400 font-bold">{currentStep.metrics.swaps}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RESIZABLE DIVIDER HANDLER (HORIZONTAL) */}
        <div
          onMouseDown={handleMouseDownHorizontal}
          className="w-1.5 bg-white/5 hover:bg-indigo-500/50 cursor-col-resize flex items-center justify-center transition-colors shrink-0 hidden md:flex"
        >
          <GripVertical className="w-3 h-3 text-slate-600" />
        </div>

        {/* RIGHT COLUMN: Synchronized Code Viewer & Live Memory Inspector */}
        <div className="flex-1 flex flex-col min-h-0 bg-[#090b10]">
          {/* Header */}
          <div className="px-4 py-2 bg-[#0d111a] border-b border-white/5 flex items-center justify-between text-xs font-mono shrink-0">
            <span className="font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-purple-400" /> Live Execution &amp; Memory Inspector
            </span>
            <span className="text-[10px] text-cyan-400 font-bold uppercase">Line #{currentStep.lineHighlight}</span>
          </div>

          {/* Code Viewer Stage */}
          <div className="h-64 sm:h-72 border-b border-white/10 overflow-hidden relative">
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

          {/* Live Variable & Memory Inspection Table */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
            <div className="space-y-2">
              <h4 className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-indigo-400" /> Visual RAM &amp; Pointer References
              </h4>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(currentStep.pointerMap || {}).map(([pName, pVal]) => (
                  <div key={pName} className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <span className="text-amber-300 font-bold uppercase text-[10px]">{pName} Pointer:</span>
                    <span className="text-white font-bold">{pVal}</span>
                  </div>
                ))}
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">Operations:</span>
                  <span className="text-cyan-400 font-bold">{currentStep.metrics.operations}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                  <span className="text-slate-400 text-[10px]">Visited Nodes:</span>
                  <span className="text-purple-400 font-bold">{currentStep.metrics.visitedNodes}</span>
                </div>
              </div>
            </div>

            {/* Recursion / Call Stack */}
            {currentStep.callStackData && currentStep.callStackData.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h4 className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" /> Call Stack Memory Depth
                </h4>
                <div className="space-y-1.5">
                  {currentStep.callStackData.map((frame, idx) => (
                    <div key={idx} className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-300 font-bold">{frame.func}({frame.arg})</span>
                      <span className="text-slate-400">Line {frame.line}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESIZABLE DIVIDER HANDLER (VERTICAL) */}
      <div
        onMouseDown={handleMouseDownVertical}
        className="h-1.5 bg-white/5 hover:bg-indigo-500/50 cursor-row-resize flex items-center justify-center transition-colors shrink-0"
      >
        <GripHorizontal className="w-3 h-3 text-slate-600" />
      </div>

      {/* ── 3. BOTTOM EDUCATIONAL INSIGHTS & TELEMETRY DRAWER ────────────────── */}
      <div
        className="bg-[#0b0e17] border-t border-white/10 flex flex-col shrink-0 overflow-hidden shadow-2xl"
        style={{ height: `${bottomHeightPx}px` }}
      >
        {/* Bottom Navigation Tabs */}
        <div className="px-4 py-2 bg-[#0f131f] border-b border-white/10 flex items-center gap-2 text-xs font-mono overflow-x-auto shrink-0 no-scrollbar">
          {[
            { key: 'insights', label: 'AI Step Insights', icon: Lightbulb },
            { key: 'properties', label: 'Telemetry & Invariants', icon: Cpu },
            { key: 'pseudocode', label: 'Pseudo Code', icon: Code2 },
            { key: 'trace', label: 'Execution Trace Log', icon: Activity },
            { key: 'notes', label: 'Study Notes', icon: StickyNote },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeBottomTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveBottomTab(tab.key as any)}
                className={`px-3 py-1.5 rounded-xl font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-indigo-400'}`} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-xs font-sans">
          {activeBottomTab === 'insights' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-indigo-400 flex items-center gap-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Why this operation occurred
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">{currentStep.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Loop Invariant
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Subarray up to current pointer index maintains sorted or processed invariant state.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-rose-400 flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> Interview Pitfall
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Always state off-by-one loop boundaries and auxiliary space overhead during technical rounds.
                </p>
              </div>
            </div>
          )}

          {activeBottomTab === 'properties' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best Time</div>
                <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{activeMethod.timeComplexity.best}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Average Time</div>
                <div className="text-sm font-black text-amber-400 font-mono mt-0.5">{activeMethod.timeComplexity.avg}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Worst Time</div>
                <div className="text-sm font-black text-rose-400 font-mono mt-0.5">{activeMethod.timeComplexity.worst}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Space Complexity</div>
                <div className="text-sm font-black text-cyan-400 font-mono mt-0.5">{activeMethod.spaceComplexity}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Stability</div>
                <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.stability}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">In-Place</div>
                <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.inPlace}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Recursive</div>
                <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.recursive}</div>
              </div>

              <div className="bg-[#090a0f] p-3 rounded-2xl border border-white/10">
                <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Difficulty</div>
                <div className="text-sm font-black text-indigo-400 font-mono mt-0.5">{activeMethod.difficulty}</div>
              </div>
            </div>
          )}

          {activeBottomTab === 'pseudocode' && (
            <pre className="bg-[#090a0f] p-4 rounded-2xl border border-white/10 font-mono text-xs text-indigo-300 whitespace-pre-wrap leading-relaxed">
              {activeMethod.pseudoCode}
            </pre>
          )}

          {activeBottomTab === 'trace' && (
            <div className="space-y-1.5 font-mono text-xs max-h-40 overflow-y-auto">
              {steps.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStepIndex(idx);
                  }}
                  className={`p-2 rounded-xl border flex items-center justify-between transition-colors cursor-pointer ${
                    idx === currentStepIndex
                      ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold'
                      : 'bg-white/[0.01] border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500">Step #{idx + 1}</span>
                    <span>{s.description}</span>
                  </div>
                  <span className="text-[10px] text-indigo-400">Line {s.lineHighlight}</span>
                </div>
              ))}
            </div>
          )}

          {activeBottomTab === 'notes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono font-bold text-slate-400 uppercase">Personal Study Notes ({activeMethod.name})</label>
                {noteSaved && (
                  <span className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Note Saved!
                  </span>
                )}
              </div>
              <textarea
                value={userNote}
                onChange={(e) => setUserNote(e.target.value)}
                placeholder="Write down personal observations, invariant notes, or interview key points..."
                className="w-full h-24 bg-[#090a0f] border border-white/10 rounded-2xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
              />
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    localStorage.setItem(`visualization_note_${selectedMethodId}`, userNote);
                    setNoteSaved(true);
                    setTimeout(() => setNoteSaved(false), 2500);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" /> Save Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveVisualizationStudio;
