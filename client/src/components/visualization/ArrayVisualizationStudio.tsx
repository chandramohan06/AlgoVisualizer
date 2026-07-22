import React, { useState, useEffect, useMemo, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ALL_ALGORITHMS, IArrayAnimationFrame, ElementState } from './arrayFrameEngine';
import { StudioCanvasRenderer } from './StudioCanvasRenderer';
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
  Activity,
  GripVertical,
  GripHorizontal,
  Zap,
  Maximize2,
  Minimize2,
  Database,
  Table,
  CheckCircle2,
  Crown,
  Gem,
  BookOpen,
  HelpCircle,
  Lightbulb,
  AlertTriangle,
  Compass,
  Variable,
  Award,
  ArrowRight,
  Bot,
  Columns,
  LineChart,
  CheckSquare,
  Square,
  Send,
} from 'lucide-react';

export const ArrayVisualizationStudio: React.FC = () => {
  // ── States ──────────────────────────────────────────────────────────────
  const [selectedAlgoId, setSelectedAlgoId] = useState<string>(() => {
    return localStorage.getItem('array_algo_id') || 'find-max';
  });

  const [compareAlgoId, setCompareAlgoId] = useState<string>('traversal');
  const [isDualCompare, setIsDualCompare] = useState<boolean>(false);

  const [playbackSpeed, setPlaybackSpeed] = useState<number>(() => {
    const saved = localStorage.getItem('array_speed');
    return saved ? parseFloat(saved) : 1;
  });

  const [language, setLanguage] = useState<'java' | 'cpp' | 'python'>(() => {
    const saved = localStorage.getItem('array_language');
    return saved === 'cpp' || saved === 'python' ? saved : 'java';
  });

  const [mode, setMode] = useState<'learning' | 'challenge' | 'exam'>('learning');
  const [showQuizModal, setShowQuizModal] = useState<boolean>(false);
  const [showComplexityModal, setShowComplexityModal] = useState<boolean>(false);
  const [showAiTutor, setShowAiTutor] = useState<boolean>(false);

  // Prediction Challenge state
  const [challengePromptAnswered, setChallengePromptAnswered] = useState<boolean>(false);
  const [challengeSelectedOption, setChallengeSelectedOption] = useState<number | null>(null);
  const [challengeErrorReason, setChallengeErrorReason] = useState<string | null>(null);

  // Quiz state
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Revision checklist state
  const [checkedRevision, setCheckedRevision] = useState<Record<string, boolean>>({});

  // AI Tutor Q&A state
  const [aiChatMessages, setAiChatMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([
    { sender: 'ai', text: 'Hello! I am your AI DSA Tutor. Ask me any question about the current algorithm frame, memory address, or time complexity!' },
  ]);
  const [aiInputText, setAiInputText] = useState<string>('');

  const [leftWidthPct, setLeftWidthPct] = useState<number>(() => {
    const saved = localStorage.getItem('array_left_width');
    return saved ? parseFloat(saved) : 55;
  });

  const [bottomHeightPx, setBottomHeightPx] = useState<number>(() => {
    const saved = localStorage.getItem('array_bottom_height');
    return saved ? parseInt(saved, 10) : 260;
  });

  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showMemoryView, setShowMemoryView] = useState<boolean>(true);

  const activeAlgo = useMemo(() => {
    return ALL_ALGORITHMS.find((a) => a.id === selectedAlgoId) || ALL_ALGORITHMS[0];
  }, [selectedAlgoId]);

  const compareAlgo = useMemo(() => {
    return ALL_ALGORITHMS.find((a) => a.id === compareAlgoId) || ALL_ALGORITHMS[0];
  }, [compareAlgoId]);

  const [customInput, setCustomInput] = useState<string>(activeAlgo.defaultInput);

  useEffect(() => {
    setCustomInput(activeAlgo.defaultInput);
    setShowQuizModal(false);
    setQuizSelectedOption(null);
    setQuizSubmitted(false);
    setChallengePromptAnswered(false);
    setChallengeSelectedOption(null);
    setChallengeErrorReason(null);
  }, [activeAlgo]);

  // ── Frame Generation & Playback ─────────────────────────────────────────
  const frames: IArrayAnimationFrame[] = useMemo(() => {
    try {
      return activeAlgo.generateFrames(customInput);
    } catch {
      return activeAlgo.generateFrames(activeAlgo.defaultInput);
    }
  }, [activeAlgo, customInput]);

  const compareFrames: IArrayAnimationFrame[] = useMemo(() => {
    try {
      return compareAlgo.generateFrames(customInput);
    } catch {
      return compareAlgo.generateFrames(compareAlgo.defaultInput);
    }
  }, [compareAlgo, customInput]);

  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeBottomTab, setActiveBottomTab] = useState<'storytelling' | 'why' | 'dryrun' | 'variables' | 'knowledge' | 'pseudocode' | 'trace'>('storytelling');

  const currentFrame = frames[Math.min(currentFrameIdx, frames.length - 1)] || frames[0];
  const currentCompareFrame = compareFrames[Math.min(currentFrameIdx, compareFrames.length - 1)] || compareFrames[0];

  // Pause playback if prediction challenge is present in Challenge Mode
  useEffect(() => {
    if (mode === 'challenge' && currentFrame.predictionChallenge && !challengePromptAnswered) {
      setIsPlaying(false);
    }
  }, [currentFrameIdx, mode, challengePromptAnswered, currentFrame]);

  // Auto Timer & Completion Quiz Trigger
  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      const delay = Math.max(35, 850 / playbackSpeed);
      timer = setInterval(() => {
        setCurrentFrameIdx((prev) => {
          if (prev >= frames.length - 1) {
            setIsPlaying(false);
            if (mode === 'learning' || mode === 'challenge') {
              setShowQuizModal(true);
            }
            return prev;
          }
          return prev + 1;
        });
      }, delay);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playbackSpeed, frames, mode]);

  // Drag listeners
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
        localStorage.setItem('array_left_width', String(newPct));
      }

      if (isDraggingV && leftPanelRef.current) {
        const rect = leftPanelRef.current.getBoundingClientRect();
        let newHeight = rect.bottom - e.clientY;
        newHeight = Math.min(Math.max(newHeight, 120), rect.height - 180);
        setBottomHeightPx(newHeight);
        localStorage.setItem('array_bottom_height', String(newHeight));
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

  // AI Tutor Q&A generator
  const handleAiSend = () => {
    if (!aiInputText.trim()) return;
    const userMsg = aiInputText.trim();
    setAiChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setAiInputText('');

    setTimeout(() => {
      let response = `In this frame (#${currentFrameIdx + 1}), ${currentFrame.explanation}. The current goal is: "${currentFrame.storytelling?.goal}". The time complexity is ${activeAlgo.timeComplexity}.`;
      if (userMsg.toLowerCase().includes('why') || userMsg.toLowerCase().includes('reason')) {
        response = currentFrame.storytelling?.whyRationale || `We inspect elements sequentially because unsorted contiguous RAM has no pre-indexed ordering.`;
      } else if (userMsg.toLowerCase().includes('memory') || userMsg.toLowerCase().includes('address')) {
        response = `RAM addresses are simulated 32-bit hex values (e.g. 0x7FFF00). Each integer takes 4 bytes in memory. Address = Base + Index * 4.`;
      } else if (userMsg.toLowerCase().includes('crown') || userMsg.toLowerCase().includes('max')) {
        response = `The Gold Crown indicates the current maximum value found so far (${currentFrame.metrics.maximum}). It flies whenever a larger value is discovered!`;
      }
      setAiChatMessages((prev) => [...prev, { sender: 'ai', text: response }]);
    }, 400);
  };

  // Color map function
  const getColorStyle = (state: ElementState) => {
    switch (state) {
      case 'current':
        return 'bg-blue-600/30 border-blue-400 text-blue-200 ring-2 ring-blue-500/50 shadow-xl shadow-blue-500/30 scale-105';
      case 'visited':
        return 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20';
      case 'comparing':
        return 'bg-amber-500/30 border-amber-400 text-amber-300 ring-2 ring-amber-500/50 shadow-xl shadow-amber-500/30 scale-105';
      case 'swapping':
        return 'bg-orange-600/30 border-orange-400 text-orange-200 ring-2 ring-orange-500/50 shadow-xl shadow-orange-500/30 scale-105';
      case 'inserted':
        return 'bg-purple-600/30 border-purple-400 text-purple-200 ring-2 ring-purple-500/50 shadow-xl shadow-purple-500/30 scale-105';
      case 'deleted':
        return 'bg-rose-600/30 border-rose-400 text-rose-300 ring-2 ring-rose-500/50 shadow-xl shadow-rose-500/30 opacity-40 scale-90';
      case 'max':
        return 'bg-amber-400/40 border-amber-300 text-amber-100 ring-4 ring-amber-400/60 shadow-2xl shadow-amber-400/40 scale-110';
      case 'min':
        return 'bg-cyan-500/30 border-cyan-400 text-cyan-200 ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-400/30';
      default:
        return 'bg-[#12141c] border-white/10 text-slate-200 shadow-md';
    }
  };

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

      {/* TOP HEADER TOOLBAR */}
      <header className="h-16 bg-[#12141c] border-b border-white/10 px-4 md:px-6 flex flex-wrap items-center justify-between gap-4 shrink-0 z-20 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </span>
            <div className="hidden sm:block">
              <h1 className="text-xs font-black text-white uppercase tracking-wider">
                Professor Storytelling Studio
              </h1>
              <span className="text-[10px] text-slate-400 font-mono">Interactive Educational Engine</span>
            </div>
          </div>

          <div className="h-5 w-px bg-white/10 mx-1" />

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl p-1 text-xs">
            <button
              onClick={() => setMode('learning')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                mode === 'learning' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3 h-3" /> Learning Mode
            </button>
            <button
              onClick={() => setMode('challenge')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                mode === 'challenge' ? 'bg-amber-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3 h-3" /> Challenge Mode
            </button>
            <button
              onClick={() => setMode('exam')}
              className={`px-2.5 py-1 rounded-lg font-bold flex items-center gap-1 transition-all cursor-pointer ${
                mode === 'exam' ? 'bg-emerald-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Zap className="w-3 h-3" /> Exam Mode
            </button>
          </div>

          {/* Algorithm Selector */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1.5 text-xs">
            <span className="text-[10px] text-slate-400 uppercase font-bold mr-1">Algorithm:</span>
            <select
              value={selectedAlgoId}
              onChange={(e) => {
                const id = e.target.value;
                setSelectedAlgoId(id);
                localStorage.setItem('array_algo_id', id);
                setCurrentFrameIdx(0);
                setIsPlaying(false);
              }}
              className="bg-transparent text-indigo-300 font-bold focus:outline-none cursor-pointer text-xs"
            >
              {ALL_ALGORITHMS.map((a: any) => (
                <option key={a.id} value={a.id} className="bg-[#12141c] text-white">
                  {a.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Input & Features Toolbar */}
        <div className="flex items-center gap-3">
          {/* Custom Input & Randomize */}
          <div className="hidden md:flex items-center gap-2 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1 text-xs">
            <span className="text-[10px] text-slate-400 font-bold uppercase font-mono">Input:</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => {
                setCustomInput(e.target.value);
                setCurrentFrameIdx(0);
                setIsPlaying(false);
              }}
              className="bg-transparent text-white font-mono focus:outline-none text-xs w-36 truncate"
              placeholder="e.g. 24, 45, 88, 12"
            />
            <button
              onClick={() => {
                const rand = Array.from({ length: 5 }, () => Math.floor(Math.random() * 90) + 10).join(', ');
                setCustomInput(rand);
                setCurrentFrameIdx(0);
                setIsPlaying(false);
              }}
              className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
              title="Randomize Array Input"
            >
              <Shuffle className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* RAM View Toggle */}
          <button
            onClick={() => setShowMemoryView(!showMemoryView)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showMemoryView ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300' : 'bg-white/5 border-white/10 text-slate-400'
            }`}
            title="Toggle RAM Simulated Memory Address View"
          >
            <Database className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">RAM View</span>
          </button>

          {/* Speed Selector */}
          <div className="hidden xl:flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded-xl px-2 py-1 text-xs font-mono">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400 ml-1" />
            {[0.25, 0.5, 1, 2, 4].map((spd) => (
              <button
                key={spd}
                onClick={() => {
                  setPlaybackSpeed(spd);
                  localStorage.setItem('array_speed', String(spd));
                }}
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  playbackSpeed === spd ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>

          {/* Dual Compare Toggle */}
          <button
            onClick={() => setIsDualCompare(!isDualCompare)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isDualCompare ? 'bg-purple-600/30 border-purple-400 text-purple-200' : 'bg-white/5 border-white/10 text-slate-400'
            }`}
            title="Side-by-Side Algorithm Dual Comparison"
          >
            <Columns className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Compare Dual View</span>
          </button>

          {/* Complexity Growth Chart Toggle */}
          <button
            onClick={() => setShowComplexityModal(!showComplexityModal)}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            title="Complexity Growth Visualization"
          >
            <LineChart className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">O(N) Chart</span>
          </button>

          {/* AI Tutor Chat Drawer Toggle */}
          <button
            onClick={() => setShowAiTutor(!showAiTutor)}
            className={`px-2.5 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              showAiTutor ? 'bg-amber-600/30 border-amber-400 text-amber-300' : 'bg-white/5 border-white/10 text-slate-400'
            }`}
            title="Ask AI Tutor"
          >
            <Bot className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">AI Tutor</span>
          </button>

          {/* Controls */}
          <div className="flex items-center gap-1 bg-[#090a0f] p-1 rounded-xl border border-white/10">
            <button
              onClick={() => {
                setCurrentFrameIdx(0);
                setIsPlaying(false);
                setChallengePromptAnswered(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              title="Reset Micro Frames"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setCurrentFrameIdx((prev) => Math.max(0, prev - 1));
                setIsPlaying(false);
              }}
              disabled={currentFrameIdx === 0}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors cursor-pointer"
              title="Previous Micro Step"
            >
              <SkipBack className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                  : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => {
                setCurrentFrameIdx((prev) => Math.min(frames.length - 1, prev + 1));
                setIsPlaying(false);
              }}
              disabled={currentFrameIdx >= frames.length - 1}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 disabled:opacity-40 transition-colors cursor-pointer"
              title="Next Micro Step"
            >
              <SkipForward className="w-3.5 h-3.5" />
            </button>
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

      {/* MAIN WORKSPACE */}
      <div ref={workspaceRef} className="flex-1 flex flex-col lg:flex-row min-h-0 relative overflow-hidden">
        {/* LEFT WORKSPACE: ANIMATION CANVAS + RAM VIEW + METRICS */}
        <div
          ref={leftPanelRef}
          className="h-full flex flex-col bg-[#0b0c10] overflow-hidden"
          style={{ width: `${leftWidthPct}%` }}
        >
          {/* ANIMATION CANVAS (DUAL VIEW VS SINGLE VIEW) */}
          <motion.div
            animate={{ scale: currentFrame.cameraZoom ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6 relative flex flex-col justify-between overflow-hidden bg-radial from-[#121626] to-[#090a0f]"
          >
            {/* Live Metrics Header Bar */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 shrink-0 bg-[#12141c]/90 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-center font-mono shadow-xl z-10">
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Time</div>
                <div className="text-xs font-black text-emerald-400">{currentFrame.metrics.elapsedTimeMs} ms</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Ops</div>
                <div className="text-xs font-black text-indigo-400">{currentFrame.metrics.operations}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Compares</div>
                <div className="text-xs font-black text-amber-400">{currentFrame.metrics.comparisons}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Swaps</div>
                <div className="text-xs font-black text-rose-400">{currentFrame.metrics.swaps}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Visited</div>
                <div className="text-xs font-black text-purple-400">{currentFrame.metrics.visitedCount}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Index</div>
                <div className="text-xs font-black text-cyan-400">{currentFrame.metrics.currentIndex}</div>
              </div>
              <div>
                <div className="text-[9px] text-slate-400 uppercase font-bold">Value</div>
                <div className="text-xs font-black text-amber-300">{currentFrame.metrics.currentValue}</div>
              </div>
            </div>

            {/* DUAL VIEW ALGORITHM COMPARISON CANVAS */}
            {isDualCompare ? (
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 my-2 overflow-hidden">
                {/* CANVAS 1 */}
                <div className="bg-[#090a0f]/90 border border-indigo-500/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="text-xs font-bold font-mono text-indigo-300 border-b border-white/10 pb-2 flex items-center justify-between">
                    <span>Algorithm 1: {activeAlgo.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono">Ops: {currentFrame.metrics.operations}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 my-4 flex-wrap">
                    {currentFrame.array.map((el, idx) => (
                      <div key={el.id} className={`w-12 h-14 rounded-xl border text-center flex flex-col justify-center font-mono font-bold text-xs ${getColorStyle(el.state)}`}>
                        {el.val}
                        <span className="text-[8px] text-slate-500">[{idx}]</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CANVAS 2 */}
                <div className="bg-[#090a0f]/90 border border-purple-500/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div className="text-xs font-bold font-mono text-purple-300 border-b border-white/10 pb-2 flex items-center justify-between">
                    <select
                      value={compareAlgoId}
                      onChange={(e) => setCompareAlgoId(e.target.value)}
                      className="bg-transparent text-purple-300 font-bold focus:outline-none cursor-pointer text-xs"
                    >
                      {ALL_ALGORITHMS.map((a: any) => (
                        <option key={a.id} value={a.id} className="bg-[#12141c] text-white">
                          Compare: {a.name}
                        </option>
                      ))}
                    </select>
                    <span className="text-[10px] text-purple-400 font-mono">Ops: {currentCompareFrame.metrics.operations}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 my-4 flex-wrap">
                    {currentCompareFrame.array.map((el, idx) => (
                      <div key={el.id} className={`w-12 h-14 rounded-xl border text-center flex flex-col justify-center font-mono font-bold text-xs ${getColorStyle(el.state)}`}>
                        {el.val}
                        <span className="text-[8px] text-slate-500">[{idx}]</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : currentFrame.graphData ? (
              /* GRAPH VISUAL CANVAS (GRAPH IS PERMANENT PRIMARY VISUALIZATION) */
              <div className="flex-1 flex flex-col items-center justify-between my-2 relative w-full overflow-hidden space-y-3">
                <div className="w-full flex-1 flex items-center justify-center">
                  <StudioCanvasRenderer currentStep={currentFrame as any} />
                </div>
                {/* DEDICATED SECONDARY DATA PANEL (QUEUE / DISTANCES / TRAVERSAL) */}
                <div className="w-full max-w-xl bg-[#090a0f]/90 border border-cyan-500/30 rounded-xl p-3 font-mono text-xs shadow-xl flex items-center justify-between z-20">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Auxiliary Data Panel:</span>
                  <span className="text-amber-300 font-extrabold tracking-widest">
                    {currentFrame.storytelling.variableWatch?.currentQueue || currentFrame.storytelling.variableWatch?.visited || currentFrame.storytelling.variableWatch?.result || currentFrame.array.map((e) => e.label || String.fromCharCode(e.val)).join(' → ')}
                  </span>
                </div>
              </div>
            ) : currentFrame.treeData ? (
              /* TREE VISUAL CANVAS (TREE IS PERMANENT PRIMARY VISUALIZATION) */
              <div className="flex-1 flex flex-col items-center justify-between my-2 relative w-full overflow-hidden space-y-3">
                <div className="w-full flex-1 flex items-center justify-center">
                  <StudioCanvasRenderer currentStep={currentFrame as any} />
                </div>
                {/* SEPARATE DEDICATED TRAVERSAL OUTPUT PANEL */}
                <div className="w-full max-w-xl bg-[#090a0f]/90 border border-indigo-500/30 rounded-xl p-3 font-mono text-xs shadow-xl flex items-center justify-between z-20">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Traversal Output Panel:</span>
                  <span className="text-amber-300 font-extrabold tracking-widest">
                    {currentFrame.storytelling.variableWatch?.traversalOutput || currentFrame.storytelling.variableWatch?.finalOutput || currentFrame.array.map((e) => e.val).join(' → ')}
                  </span>
                </div>
              </div>
            ) : (
              /* SINGLE VIEW MAIN VISUAL CANVAS */
              <div className="flex-1 flex flex-col items-center justify-center my-4 relative overflow-hidden space-y-6">
                <div className="flex items-center justify-center gap-3 md:gap-4 w-full px-4 flex-wrap">
                  {currentFrame.array.map((el, idx) => {
                    const styleClass = getColorStyle(el.state);

                    return (
                      <motion.div
                        key={el.id}
                        layout
                        animate={{
                          y: el.arcOffset || 0,
                          x: el.shake ? [-6, 6, -6, 6, 0] : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        className="flex flex-col items-center gap-2 relative"
                      >
                        {/* Floating Gold Crown */}
                        {el.hasCrown && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: -6, opacity: 1 }}
                            className="absolute -top-7 text-amber-300 z-20 flex flex-col items-center"
                          >
                            <Crown className="w-5 h-5 fill-amber-400 animate-bounce" />
                          </motion.div>
                        )}

                        {/* Floating Cyan Crystal */}
                        {el.hasCrystal && (
                          <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: -6, opacity: 1 }}
                            className="absolute -top-7 text-cyan-300 z-20 flex flex-col items-center"
                          >
                            <Gem className="w-4 h-4 fill-cyan-400 animate-bounce" />
                          </motion.div>
                        )}

                        {/* Particle Sparks Badge */}
                        {el.particleType && (
                          <span className="absolute -top-3 px-1.5 py-0.2 text-[8px] font-extrabold bg-amber-400 text-black rounded-full uppercase animate-ping z-30">
                            ✦ {el.particleType}
                          </span>
                        )}

                        {/* Pointer Badges */}
                        <div className="h-6 flex flex-col items-center justify-end font-mono text-[10px] font-bold text-amber-300">
                          {currentFrame.pointers.map((p) => (
                            p.index === idx ? (
                              <span key={p.name} className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] uppercase tracking-wider animate-bounce">
                                {p.name}
                              </span>
                            ) : null
                          ))}
                        </div>

                        {/* Rounded Element Box */}
                        <div className={`w-16 h-20 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between items-center py-2 relative ${styleClass}`}>
                          {el.label && (
                            <span className="absolute -top-2.5 px-1.5 py-0.2 text-[8px] font-extrabold bg-purple-500 text-white rounded-full uppercase">
                              {el.label}
                            </span>
                          )}
                          <span className="font-mono text-base font-black">{el.val}</span>
                        </div>

                        {/* Index Label */}
                        <span className="text-[10px] font-mono text-slate-500 font-bold">[{idx}]</span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Simulated RAM Memory Address View Bar */}
                {showMemoryView && currentFrame.memoryAddresses && (
                  <div className="w-full max-w-2xl bg-[#090a0f]/90 border border-white/10 rounded-2xl p-3 shadow-2xl space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-indigo-400 font-bold uppercase tracking-wider border-b border-white/5 pb-1">
                      <span className="flex items-center gap-1"><Database className="w-3 h-3" /> RAM Memory Layout (Simulated 32-bit Hex Addresses)</span>
                      <span>4 Bytes / Int</span>
                    </div>

                    <div className="flex items-center justify-start gap-2 overflow-x-auto custom-scrollbar py-1">
                      {currentFrame.memoryAddresses.map((mem) => (
                        <div
                          key={mem.index}
                          className={`px-2.5 py-1.5 rounded-xl border text-center font-mono text-[10px] flex flex-col shrink-0 transition-colors ${
                            mem.state === 'current' || mem.state === 'comparing'
                              ? 'bg-indigo-600/30 border-indigo-400 text-white font-bold ring-1 ring-indigo-400'
                              : 'bg-[#12141c] border-white/10 text-slate-400'
                          }`}
                        >
                          <span className="text-[9px] text-slate-500">{mem.address}</span>
                          <span className="font-bold text-slate-200 font-mono text-xs">{mem.val}</span>
                          {mem.pointer && <span className="text-[8px] font-bold text-amber-400 uppercase">{mem.pointer}</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PREDICTION CHALLENGE PROMPT CARD */}
            {mode === 'challenge' && currentFrame.predictionChallenge && !challengePromptAnswered && (
              <div className="bg-amber-600/20 border border-amber-500/40 backdrop-blur-md p-4 rounded-2xl space-y-3 font-mono shadow-2xl mb-2 z-30">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase">
                  <Award className="w-4 h-4" /> Prediction Challenge: What Happens Next?
                </div>
                <p className="text-white text-xs font-bold">{currentFrame.predictionChallenge.prompt}</p>

                <div className="space-y-1.5">
                  {currentFrame.predictionChallenge.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setChallengeSelectedOption(idx);
                        if (idx === currentFrame.predictionChallenge?.correctIndex) {
                          setChallengePromptAnswered(true);
                          setChallengeErrorReason(null);
                          setIsPlaying(true);
                        } else {
                          setChallengeErrorReason(currentFrame.predictionChallenge?.mistakeExplanations[idx] || 'Incorrect prediction! Try again.');
                        }
                      }}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer font-mono ${
                        challengeSelectedOption === idx
                          ? 'bg-amber-600/30 border-amber-400 text-amber-200 font-bold'
                          : 'bg-[#090a0f] border-white/10 hover:border-amber-400 text-slate-300 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {challengeErrorReason && (
                  <div className="p-2 rounded-xl bg-rose-600/30 border border-rose-500/50 text-rose-200 text-[11px] font-mono">
                    ⚠️ {challengeErrorReason}
                  </div>
                )}
              </div>
            )}

            {/* Educational Step Explanation Banner & Timeline Scrubbing */}
            <div className="bg-[#12141c]/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-2 font-mono shadow-xl shrink-0 z-10">
              <div className="flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <span className="text-slate-200 font-bold truncate">{currentFrame.explanation}</span>
                </div>
                <span className="text-indigo-400 font-bold text-[11px] shrink-0">
                  Micro Step {currentFrameIdx + 1} / {frames.length}
                </span>
              </div>

              {/* Step Jump Timeline Slider */}
              <input
                type="range"
                min="0"
                max={frames.length - 1}
                value={currentFrameIdx}
                onChange={(e) => {
                  setCurrentFrameIdx(parseInt(e.target.value, 10));
                  setIsPlaying(false);
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </motion.div>

          {/* VERTICAL SPLITTER */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingV(true);
            }}
            className="h-2.5 w-full bg-[#090a0f] hover:bg-indigo-600/50 active:bg-indigo-600 transition-colors cursor-row-resize flex items-center justify-center group z-30 select-none border-y border-white/5 shrink-0"
            title="Drag up/down to resize bottom panel"
          >
            <GripHorizontal className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
          </div>

          {/* BOTTOM STORYTELLING TABS PANEL */}
          <div
            className="shrink-0 bg-[#12141c] border-t border-white/10 flex flex-col overflow-hidden"
            style={{ height: `${bottomHeightPx}px` }}
          >
            {/* Header Tabs */}
            <div className="flex items-center gap-1 px-4 py-2 bg-[#090a0f] border-b border-white/10 shrink-0 text-xs font-semibold overflow-x-auto custom-scrollbar">
              <button
                onClick={() => setActiveBottomTab('storytelling')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'storytelling' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Compass className="w-3.5 h-3.5" /> Storytelling Explanation
              </button>

              <button
                onClick={() => setActiveBottomTab('why')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'why' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <HelpCircle className="w-3.5 h-3.5" /> WHY Panel
              </button>

              <button
                onClick={() => setActiveBottomTab('variables')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'variables' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Variable className="w-3.5 h-3.5" /> Live Variables
              </button>

              <button
                onClick={() => setActiveBottomTab('knowledge')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'knowledge' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Lightbulb className="w-3.5 h-3.5" /> Analogy & Invariants
              </button>

              <button
                onClick={() => setActiveBottomTab('dryrun')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'dryrun' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Table className="w-3.5 h-3.5" /> Dry Run
              </button>

              <button
                onClick={() => setActiveBottomTab('pseudocode')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'pseudocode' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> Pseudo Code
              </button>

              <button
                onClick={() => setActiveBottomTab('trace')}
                className={`px-3 py-1.5 rounded-lg font-mono flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  activeBottomTab === 'trace' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Activity className="w-3.5 h-3.5" /> Trace Log
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar text-xs font-sans">
              {/* TAB 1: STORYTELLING PANEL */}
              {activeBottomTab === 'storytelling' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 font-mono">
                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] text-indigo-400 uppercase font-bold flex items-center gap-1">
                      <Compass className="w-3 h-3" /> Current Goal
                    </div>
                    <p className="text-slate-200 text-xs font-semibold">{currentFrame.storytelling?.goal || 'Execute step'}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] text-cyan-400 uppercase font-bold flex items-center gap-1">
                      <Cpu className="w-3 h-3" /> Current State
                    </div>
                    <p className="text-slate-200 text-xs font-semibold">{currentFrame.storytelling?.currentState || 'Running'}</p>
                  </div>

                  {currentFrame.storytelling?.comparison && (
                    <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1">
                      <div className="text-[10px] text-amber-400 uppercase font-bold flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Comparison
                      </div>
                      <p className="text-amber-300 text-xs font-bold">{currentFrame.storytelling.comparison}</p>
                    </div>
                  )}

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] text-emerald-400 uppercase font-bold flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Decision
                    </div>
                    <p className="text-emerald-300 text-xs font-semibold">{currentFrame.storytelling?.decision}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1 md:col-span-2">
                    <div className="text-[10px] text-purple-400 uppercase font-bold flex items-center gap-1">
                      <Lightbulb className="w-3 h-3" /> Reason
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{currentFrame.storytelling?.reason}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-1">
                    <div className="text-[10px] text-indigo-300 uppercase font-bold flex items-center gap-1">
                      <ArrowRight className="w-3 h-3" /> Next Action
                    </div>
                    <p className="text-slate-300 text-xs">{currentFrame.storytelling?.nextAction}</p>
                  </div>
                </div>
              )}

              {/* TAB 2: WHY PANEL */}
              {activeBottomTab === 'why' && (
                <div className="bg-[#090a0f] p-4 rounded-xl border border-indigo-500/30 font-mono space-y-2">
                  <h4 className="text-xs font-black text-indigo-300 uppercase flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-400" /> WHY IS THIS OPERATION PERFORMED?
                  </h4>
                  <p className="text-slate-200 text-xs leading-relaxed">
                    {currentFrame.storytelling?.whyRationale || activeAlgo.description}
                  </p>
                </div>
              )}

              {/* TAB 3: LIVE VARIABLES WATCH */}
              {activeBottomTab === 'variables' && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                  {currentFrame.storytelling?.variableWatch ? (
                    Object.entries(currentFrame.storytelling.variableWatch).map(([key, val]) => (
                      <div key={key} className="bg-[#090a0f] p-3 rounded-xl border border-white/10 flex flex-col justify-between">
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{key}</span>
                        <span className="text-base font-black text-amber-300 mt-1">{String(val)}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400">No active variables</div>
                  )}
                </div>
              )}

              {/* TAB 4: ANALOGY & INVARIANTS */}
              {activeBottomTab === 'knowledge' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono">
                  <div className="bg-[#090a0f] p-3.5 rounded-xl border border-amber-500/30 space-y-1.5">
                    <h4 className="text-xs font-bold text-amber-300 uppercase flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5" /> Real-World Analogy
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{activeAlgo.analogy}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3.5 rounded-xl border border-indigo-500/30 space-y-1.5">
                    <h4 className="text-xs font-bold text-indigo-300 uppercase flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Algorithm Invariant
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{activeAlgo.invariant}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3.5 rounded-xl border border-rose-500/30 space-y-1.5">
                    <h4 className="text-xs font-bold text-rose-300 uppercase flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" /> Typical Interview Mistake
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{activeAlgo.commonMistake}</p>
                  </div>

                  <div className="bg-[#090a0f] p-3.5 rounded-xl border border-emerald-500/30 space-y-1.5">
                    <h4 className="text-xs font-bold text-emerald-300 uppercase flex items-center gap-1">
                      <Award className="w-3.5 h-3.5" /> Pro Interview Tip
                    </h4>
                    <p className="text-slate-300 text-xs leading-relaxed">{activeAlgo.interviewTip}</p>
                  </div>
                </div>
              )}

              {/* DRY RUN TABLE */}
              {activeBottomTab === 'dryrun' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse font-mono text-[11px]">
                    <thead>
                      <tr className="border-b border-white/10 text-indigo-300 bg-[#090a0f]">
                        <th className="p-2">Step</th>
                        <th className="p-2">Current Index</th>
                        <th className="p-2">Current Value</th>
                        <th className="p-2">Max</th>
                        <th className="p-2">Min</th>
                        <th className="p-2">Action / Micro Explanation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frames.map((fr, idx) => {
                        const isActive = idx === currentFrameIdx;
                        const row = fr.dryRunRow;
                        return (
                          <tr
                            key={idx}
                            onClick={() => {
                              setCurrentFrameIdx(idx);
                              setIsPlaying(false);
                            }}
                            className={`border-b border-white/5 cursor-pointer transition-colors ${
                              isActive ? 'bg-indigo-600/30 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <td className="p-2 font-bold">#{row.step}</td>
                            <td className="p-2 text-cyan-300">{row.currentIndex}</td>
                            <td className="p-2 text-amber-300">{row.currentValue}</td>
                            <td className="p-2 text-amber-400">{row.maxVal}</td>
                            <td className="p-2 text-cyan-400">{row.minVal}</td>
                            <td className="p-2 text-slate-300 truncate max-w-md">{row.action}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PSEUDOCODE */}
              {activeBottomTab === 'pseudocode' && (
                <pre className="bg-[#090a0f] p-3 rounded-xl border border-white/10 font-mono text-xs text-indigo-300 whitespace-pre-wrap">
                  {activeAlgo.pseudoCode}
                </pre>
              )}

              {/* TRACE LOG */}
              {activeBottomTab === 'trace' && (
                <div className="space-y-1.5 font-mono text-[11px]">
                  {frames.map((fr, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setCurrentFrameIdx(idx);
                        setIsPlaying(false);
                      }}
                      className={`p-2 rounded-lg cursor-pointer flex items-center justify-between border ${
                        idx === currentFrameIdx
                          ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200 font-bold'
                          : 'bg-[#090a0f] border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <span>Micro Step {idx + 1}: {fr.explanation}</span>
                      <span className="text-slate-500">{fr.metrics.elapsedTimeMs}ms</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* HORIZONTAL SPLITTER */}
        <div
          onMouseDown={(e) => {
            e.preventDefault();
            setIsDraggingH(true);
          }}
          className="w-2.5 h-full bg-[#090a0f] hover:bg-indigo-600/50 active:bg-indigo-600 transition-colors cursor-col-resize flex items-center justify-center group z-30 select-none border-x border-white/5 shrink-0"
          title="Drag left/right to resize workspace"
        >
          <GripVertical className="w-3.5 h-3.5 text-slate-600 group-hover:text-white transition-colors" />
        </div>

        {/* RIGHT WORKSPACE: LIVE MONACO CODE VIEWER */}
        <div
          className="flex flex-col h-full bg-[#0d0e12] overflow-hidden"
          style={{ width: `${100 - leftWidthPct}%` }}
        >
          <div className="flex items-center justify-between px-4 py-2 bg-[#12141c] border-b border-white/10 shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span className="font-bold text-white">Live Execution Code</span>
            </div>

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
                    localStorage.setItem('array_language', langItem.id);
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

          <div className="flex-1 min-h-0 relative">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language === 'java' ? 'java' : 'python'}
              theme="vs-dark"
              value={activeAlgo.codeSnippets[language]}
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

      {/* AI TUTOR PANEL DRAWER */}
      <AnimatePresence>
        {showAiTutor && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 w-80 sm:w-96 bg-[#12141c] border border-amber-500/40 rounded-3xl p-4 shadow-2xl font-mono flex flex-col h-96"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 shrink-0">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
                <Bot className="w-4 h-4" /> AI DSA Tutor Panel
              </div>
              <button onClick={() => setShowAiTutor(false)} className="text-slate-400 hover:text-white text-xs font-bold">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto my-2 space-y-2 custom-scrollbar pr-1 text-xs">
              {aiChatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-indigo-600 text-white ml-auto rounded-br-none'
                      : 'bg-[#090a0f] border border-white/10 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-white/10 shrink-0">
              <input
                type="text"
                value={aiInputText}
                onChange={(e) => setAiInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSend()}
                placeholder="Ask about current frame..."
                className="flex-1 bg-[#090a0f] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none font-mono"
              />
              <button
                onClick={handleAiSend}
                className="p-2 rounded-xl bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPLEXITY GROWTH VISUALIZATION MODAL */}
      <AnimatePresence>
        {showComplexityModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#12141c] border border-emerald-500/40 rounded-3xl p-6 max-w-xl w-full font-sans shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase">
                  <LineChart className="w-5 h-5 text-emerald-400" /> Complexity Growth Visualization: O(N)
                </div>
                <button onClick={() => setShowComplexityModal(false)} className="text-slate-400 hover:text-white text-sm font-bold">
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300 font-mono">
                Visualizing total operation steps as array input size <strong className="text-amber-300">N</strong> grows from 5 to 500:
              </p>

              <div className="bg-[#090a0f] p-4 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
                {[5, 50, 100, 500].map((nVal) => (
                  <div key={nVal} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-300">N = {nVal} elements</span>
                      <span className="text-emerald-400 font-bold">{nVal} Ops (Linear O(N))</span>
                    </div>
                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (nVal / 500) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setShowComplexityModal(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  Close Chart
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* REVISION CHECKLIST & MASTERY SUMMARY MODAL ON COMPLETION */}
      <AnimatePresence>
        {showQuizModal && activeAlgo.quizQuestion && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[#12141c] border border-indigo-500/40 rounded-3xl p-6 max-w-xl w-full font-sans shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-bold uppercase">
                  <Award className="w-5 h-5 text-amber-400" /> Mastery & Revision Checklist
                </div>
                <button onClick={() => setShowQuizModal(false)} className="text-slate-400 hover:text-white text-sm font-bold">
                  ✕
                </button>
              </div>

              {/* Quiz section */}
              <div className="space-y-3 font-mono border-b border-white/10 pb-4">
                <h3 className="text-xs font-bold text-white">
                  Concept Check: {activeAlgo.quizQuestion.question}
                </h3>

                <div className="space-y-1.5 text-xs">
                  {activeAlgo.quizQuestion.options.map((opt, idx) => {
                    const isSelected = quizSelectedOption === idx;
                    const isCorrect = idx === activeAlgo.quizQuestion.correctIndex;
                    let btnClass = 'bg-[#090a0f] border-white/10 text-slate-300 hover:border-indigo-500';

                    if (quizSubmitted) {
                      if (isCorrect) btnClass = 'bg-emerald-600/30 border-emerald-400 text-emerald-200 font-bold';
                      else if (isSelected) btnClass = 'bg-rose-600/30 border-rose-400 text-rose-200';
                    } else if (isSelected) {
                      btnClass = 'bg-indigo-600/30 border-indigo-400 text-indigo-200 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={quizSubmitted}
                        onClick={() => setQuizSelectedOption(idx)}
                        className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                      >
                        <span>{opt}</span>
                        {quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {!quizSubmitted && (
                  <button
                    disabled={quizSelectedOption === null}
                    onClick={() => setQuizSubmitted(true)}
                    className="px-4 py-1.5 rounded-xl bg-indigo-600 text-white font-mono font-bold text-xs hover:bg-indigo-500 disabled:opacity-40 transition-all cursor-pointer shadow-lg shadow-indigo-600/30"
                  >
                    Submit Answer
                  </button>
                )}
              </div>

              {/* Revision Checklist */}
              <div className="space-y-2 font-mono text-xs">
                <h4 className="text-amber-400 font-bold uppercase text-[11px] flex items-center gap-1">
                  <CheckSquare className="w-3.5 h-3.5" /> End-of-Lesson Revision Checklist
                </h4>

                {[
                  'Understood why contiguous memory enables O(1) random access',
                  'Understood linear O(N) scanning trade-offs',
                  'Verified array boundary conditions and edge cases',
                  'Reviewed related LeetCode problems',
                ].map((item, idx) => {
                  const isChecked = !!checkedRevision[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => setCheckedRevision((prev) => ({ ...prev, [idx]: !prev[idx] }))}
                      className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                        isChecked ? 'bg-emerald-600/20 border-emerald-500/50 text-emerald-200 font-bold' : 'bg-[#090a0f] border-white/10 text-slate-300'
                      }`}
                    >
                      {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-400" /> : <Square className="w-4 h-4 text-slate-500" />}
                      <span>{item}</span>
                    </div>
                  );
                })}
              </div>

              {/* Related LeetCode Problems */}
              <div className="bg-[#090a0f] p-3 rounded-xl border border-white/10 space-y-2 font-mono text-xs">
                <span className="text-indigo-300 font-bold uppercase text-[10px]">Recommended Practice Problems:</span>
                <div className="flex flex-wrap gap-2">
                  {activeAlgo.relatedProblems.map((prob) => (
                    <span key={prob.slug} className="px-2.5 py-1 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-[11px] font-bold">
                      {prob.title} ({prob.difficulty})
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowQuizModal(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs hover:bg-emerald-500 transition-all cursor-pointer shadow-lg shadow-emerald-600/30"
                >
                  Complete Lesson
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Icon Component
function ShieldCheck(props: any) {
  return (
    <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}

export default ArrayVisualizationStudio;
