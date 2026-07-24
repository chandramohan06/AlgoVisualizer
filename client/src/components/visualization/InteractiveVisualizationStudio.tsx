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
  Shuffle,
  Cpu,
  Code2,
  SlidersHorizontal,
  FileText,
  Activity,
  GripVertical,
  GripHorizontal,
  CheckCircle2,
  Zap,
  StickyNote,
  Save,
  Maximize2,
  Minimize2,
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

  const [language, setLanguage] = useState<'java' | 'cpp' | 'python'>(() => {
    const saved = localStorage.getItem('visualization_language');
    return saved === 'cpp' || saved === 'python' ? saved : 'java';
  });

  const [leftWidthPct, setLeftWidthPct] = useState<number>(() => {
    const saved = localStorage.getItem('visualization_left_width');
    return saved ? parseFloat(saved) : 55;
  });

  const [bottomHeightPx, setBottomHeightPx] = useState<number>(() => {
    const saved = localStorage.getItem('visualization_bottom_height');
    return saved ? parseInt(saved, 10) : 220;
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

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
  const [activeBottomTab, setActiveBottomTab] = useState<'properties' | 'description' | 'pseudocode' | 'trace' | 'notes'>('properties');
  const [userNote, setUserNote] = useState<string>('');
  const [noteSaved, setNoteSaved] = useState<boolean>(false);

  // Current active step object
  const currentStep = steps[Math.min(currentStepIndex, steps.length - 1)] || steps[0];

  // Auto playback timer
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const delay = Math.max(80, 1000 / playbackSpeed);
      timer = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, steps]);

  // ── Drag Resizing Handlers ──────────────────────────────────────────────
  const [isDraggingH, setIsDraggingH] = useState<boolean>(false);
  const [isDraggingV, setIsDraggingV] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingH && workspaceRef.current) {
        const rect = workspaceRef.current.getBoundingClientRect();
        let newPct = ((e.clientX - rect.left) / rect.width) * 100;
        newPct = Math.min(Math.max(newPct, 30), 75);
        setLeftWidthPct(newPct);
        localStorage.setItem('visualization_left_width', String(newPct));
      }

      if (isDraggingV && leftPanelRef.current) {
        const rect = leftPanelRef.current.getBoundingClientRect();
        let newHeight = rect.bottom - e.clientY;
        newHeight = Math.min(Math.max(newHeight, 120), rect.height - 180);
        setBottomHeightPx(newHeight);
        localStorage.setItem('visualization_bottom_height', String(newHeight));
      }
    };

    const handleMouseUp = () => {
      if (isDraggingH) setIsDraggingH(false);
      if (isDraggingV) setIsDraggingV(false);
    };

    if (isDraggingH || isDraggingV) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingH, isDraggingV]);

  // Handle Topic Change
  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    localStorage.setItem('visualization_topic', topicId);

    const newTopic = getTopicById(topicId);
    const firstMethod = newTopic.methods[0]?.id || 'traversal';
    setSelectedMethodId(firstMethod);
    localStorage.setItem('visualization_method', firstMethod);

    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Handle Method Change
  const handleMethodChange = (methodId: string) => {
    setSelectedMethodId(methodId);
    localStorage.setItem('visualization_method', methodId);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Handle Random Input
  const handleRandomizeInput = () => {
    const randomArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 90) + 10);
    const newStr = randomArray.join(', ');
    setCustomInput(newStr);
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  // Render dedicated Array Studio when Arrays topic is selected
  if (selectedTopicId === 'arrays') {
    return <ArrayVisualizationStudio />;
  }

  return (
    <div
      className={`bg-[#090a0f] text-slate-100 flex flex-col font-sans select-none overflow-hidden ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-screen w-full'
      }`}
    >
      {/* Dragging Overlay */}
      {(isDraggingH || isDraggingV) && (
        <div className={`fixed inset-0 z-50 ${isDraggingH ? 'cursor-col-resize' : 'cursor-row-resize'}`} />
      )}

      {/* TOP NAVBAR TOOLBAR */}
      <header className="h-16 bg-[#12141c] border-b border-white/10 px-4 md:px-6 flex flex-wrap items-center justify-between gap-4 shrink-0 z-20 shadow-xl">
        {/* Topic & Method Selectors */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </span>
            <div className="hidden sm:block">
              <h1 className="text-xs font-black text-white uppercase tracking-wider">
                Visualization Studio
              </h1>
              <span className="text-[10px] text-slate-400 font-mono">Interactive Engine v2.0</span>
            </div>
          </div>

          <div className="h-5 w-px bg-white/10 mx-1" />

          {/* Topic Dropdown */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Topic:</span>
            <select
              value={selectedTopicId}
              onChange={(e) => handleTopicChange(e.target.value)}
              className="bg-transparent text-indigo-300 font-bold focus:outline-none cursor-pointer text-xs"
            >
              {STUDIO_TOPICS.map((t) => (
                <option key={t.id} value={t.id} className="bg-[#12141c] text-white">
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Method Dropdown */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Method:</span>
            <select
              value={selectedMethodId}
              onChange={(e) => handleMethodChange(e.target.value)}
              className="bg-transparent text-emerald-400 font-bold focus:outline-none cursor-pointer text-xs max-w-[160px] truncate"
            >
              {activeTopic.methods.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#12141c] text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input Box & Playback Controls */}
        <div className="flex items-center gap-3">
          {/* Custom Input */}
          <div className="hidden md:flex items-center gap-2 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1 text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Input:</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="bg-transparent text-white font-mono focus:outline-none text-xs w-48 truncate"
              placeholder="e.g. 24, 45, 88, 12"
            />
            <button
              onClick={handleRandomizeInput}
              className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="Randomize Input"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1 bg-[#090a0f] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="p-2.5 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              title="Reset Animation"
            >
              <RotateCcw className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex((prev) => Math.max(0, prev - 1));
                setIsPlaying(false);
              }}
              disabled={currentStepIndex === 0}
              className="p-2.5 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              title="Step Backward"
            >
              <SkipBack className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-4 sm:px-3.5 py-2 sm:py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer min-h-[44px] active:scale-95 ${
                isPlaying
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" /> : <Play className="w-4 h-4 sm:w-3.5 sm:h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex((prev) => Math.min(steps.length - 1, prev + 1));
                setIsPlaying(false);
              }}
              disabled={currentStepIndex >= steps.length - 1}
              className="p-2.5 sm:p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-95"
              title="Step Forward"
            >
              <SkipForward className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Speed Selector */}
          <div className="hidden lg:flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl px-2 py-1 text-xs font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {[0.25, 0.5, 1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  setPlaybackSpeed(spd);
                  localStorage.setItem('visualization_speed', String(spd));
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Studio'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* MAIN WORKSPACE (SPLIT LAYOUT) */}
      <div ref={workspaceRef} className="flex-1 flex flex-col lg:flex-row min-h-0 relative overflow-hidden">
        {/* LEFT WORKSPACE: ANIMATION CANVAS + METRICS + BOTTOM PANEL */}
        <div
          ref={leftPanelRef}
          className="h-full flex flex-col bg-[#0b0c10] overflow-hidden"
          style={{ width: `${leftWidthPct}%` }}
        >
          {/* ANIMATION CANVAS AREA */}
          <div className="flex-1 p-6 relative flex flex-col justify-between overflow-hidden bg-radial from-[#121626] to-[#090a0f]">
            {/* Live Metrics Bar Header */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 shrink-0 bg-[#12141c]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center font-mono shadow-xl z-10">
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Elapsed</div>
                <div className="text-xs font-black text-emerald-400">{currentStep.metrics.elapsedMs} ms</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Compares</div>
                <div className="text-xs font-black text-amber-400">{currentStep.metrics.comparisons}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Swaps/Ops</div>
                <div className="text-xs font-black text-rose-400">{currentStep.metrics.swaps}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Index</div>
                <div className="text-xs font-black text-cyan-400">{currentStep.metrics.currentIndex}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Visited</div>
                <div className="text-xs font-black text-indigo-400">{currentStep.metrics.visitedNodes}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Memory</div>
                <div className="text-xs font-black text-purple-400">{currentStep.metrics.memoryKb} KB</div>
              </div>
            </div>

            {/* Visual Canvas Renderer */}
            <div className="flex-1 flex items-center justify-center my-6 relative overflow-hidden">
              <StudioCanvasRenderer currentStep={currentStep} />
            </div>

            {/* Step Slider & Description Banner */}
            <div className="bg-[#12141c]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-2 font-mono shadow-xl shrink-0 z-10">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-slate-300 truncate">{currentStep.description}</span>
                </div>
                <span className="text-slate-500 font-bold text-[11px] shrink-0">
                  Step {currentStepIndex + 1} / {steps.length}
                </span>
              </div>

              {/* Step Jump Slider */}
              <input
                type="range"
                min="0"
                max={steps.length - 1}
                value={currentStepIndex}
                onChange={(e) => {
                  setCurrentStepIndex(parseInt(e.target.value, 10));
                  setIsPlaying(false);
                }}
                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* VERTICAL SPLITTER (DRAGGABLE UP/DOWN FOR BOTTOM TABS) */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingV(true);
            }}
            className="h-2.5 w-full bg-[#090a0f] hover:bg-indigo-600/50 active:bg-indigo-600 transition-colors cursor-row-resize flex items-center justify-center group z-30 select-none border-y border-white/5 shrink-0"
            title="Drag up/down to resize bottom tabs panel"
          >
            <GripHorizontal className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
          </div>

          {/* BOTTOM TABS RESIZABLE PANEL */}
          <div
            className="shrink-0 bg-[#12141c] border-t border-white/10 flex flex-col overflow-hidden"
            style={{ height: `${bottomHeightPx}px` }}
          >
            {/* Bottom Tab Headers */}
            <div className="flex items-center gap-1 px-4 py-2 bg-[#090a0f] border-b border-white/10 shrink-0 text-xs font-semibold">
              <button
                onClick={() => setActiveBottomTab('properties')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBottomTab === 'properties' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" /> Properties
              </button>

              <button
                onClick={() => setActiveBottomTab('description')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBottomTab === 'description' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Description
              </button>

              <button
                onClick={() => setActiveBottomTab('pseudocode')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBottomTab === 'pseudocode' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> Pseudo Code
              </button>

              <button
                onClick={() => setActiveBottomTab('trace')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBottomTab === 'trace' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Trace Log
              </button>

              <button
                onClick={() => setActiveBottomTab('notes')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeBottomTab === 'notes' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <StickyNote className="w-3.5 h-3.5" /> Notes
              </button>
            </div>

            {/* Bottom Tab Content Body */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-xs font-sans">
              {activeBottomTab === 'properties' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best Time</div>
                    <div className="text-sm font-black text-emerald-400 font-mono mt-0.5">{activeMethod.timeComplexity.best}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Average Time</div>
                    <div className="text-sm font-black text-amber-400 font-mono mt-0.5">{activeMethod.timeComplexity.avg}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Worst Time</div>
                    <div className="text-sm font-black text-rose-400 font-mono mt-0.5">{activeMethod.timeComplexity.worst}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Space Complexity</div>
                    <div className="text-sm font-black text-cyan-400 font-mono mt-0.5">{activeMethod.spaceComplexity}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Stability</div>
                    <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.stability}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">In-Place</div>
                    <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.inPlace}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Recursive</div>
                    <div className="text-sm font-black text-slate-200 font-mono mt-0.5">{activeMethod.recursive}</div>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10">
                    <div className="text-[10px] text-slate-400 uppercase font-bold font-mono">Difficulty</div>
                    <div className="text-sm font-black text-indigo-400 font-mono mt-0.5">{activeMethod.difficulty}</div>
                  </div>
                </div>
              )}

              {activeBottomTab === 'description' && (
                <div className="space-y-2 text-slate-300 leading-relaxed font-mono">
                  <p>{activeMethod.description}</p>
                </div>
              )}

              {activeBottomTab === 'pseudocode' && (
                <pre className="bg-[#090a0f] p-3 rounded-xl border border-white/10 font-mono text-xs text-indigo-300 whitespace-pre-wrap">
                  {activeMethod.pseudoCode}
                </pre>
              )}

              {activeBottomTab === 'trace' && (
                <div className="space-y-1 font-mono text-[11px]">
                  {steps.map((st, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setCurrentStepIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border ${
                        idx === currentStepIndex
                          ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                          : 'bg-[#090a0f] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Step {idx + 1}: {st.description}</span>
                      <span className="text-slate-500 font-bold">{st.metrics.elapsedMs}ms</span>
                    </div>
                  ))}
                </div>
              )}

              {activeBottomTab === 'notes' && (
                <div className="space-y-2 font-sans">
                  <textarea
                    value={userNote}
                    onChange={(e) => setUserNote(e.target.value)}
                    placeholder="Record key algorithm invariants or learnings..."
                    rows={4}
                    className="w-full bg-[#090a0f] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        localStorage.setItem(`note_${activeMethod.id}`, userNote);
                        setNoteSaved(true);
                        setTimeout(() => setNoteSaved(false), 2000);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {noteSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Save className="w-3.5 h-3.5" />}
                      {noteSaved ? 'Saved' : 'Save Note'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* HORIZONTAL SPLITTER DIVIDER (DRAGGABLE LEFT/RIGHT) */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingH(true);
          }}
          className="w-2.5 h-full bg-[#090a0f] hover:bg-indigo-600/50 active:bg-indigo-600 transition-colors cursor-col-resize flex items-center justify-center group z-30 select-none border-x border-white/5 shrink-0"
          title="Drag left/right to resize workspace panels"
        >
          <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
        </div>

        {/* RIGHT WORKSPACE: LIVE CODE VIEWER & MONACO EDITOR */}
        <div
          className="flex flex-col h-full bg-[#0d0e12] overflow-hidden"
          style={{ width: `${100 - leftWidthPct}%` }}
        >
          {/* Header Code Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#12141c] border-b border-white/10 shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-white">Live Execution Code</span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1.5">
              {[
                { id: 'java', label: 'Java' },
                { id: 'cpp', label: 'C++' },
                { id: 'python', label: 'Python' },
              ].map((langItem) => (
                <button
                  key={langItem.id}
                  onClick={() => {
                    setLanguage(langItem.id as any);
                    localStorage.setItem('visualization_language', langItem.id);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                    language === langItem.id
                      ? 'bg-indigo-600 text-white shadow'
                      : 'bg-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  {langItem.label}
                </button>
              ))}
            </div>
          </div>

          {/* Monaco Editor Read-Only Container */}
          <div className="flex-1 min-h-0 relative">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : 'python'}
              theme="vs-dark"
              value={activeMethod.codeSnippets[language]}
              options={{
                readOnly: true,
                fontSize: 13,
                lineNumbers: 'on',
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 4,
                padding: { top: 12, bottom: 12 },
                fontFamily: 'Fira Code, JetBrains Mono, Menlo, Monaco, Consolas, monospace',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveVisualizationStudio;
