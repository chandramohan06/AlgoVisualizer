import React, {
  useMemo, useState, useEffect, useCallback, useRef,
} from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { useVisualization } from '@hooks/useVisualization';
import { VisualizationRenderer } from '@components/visualizer/VisualizationRenderer';
import { useContinueLearning } from '@hooks/useContinueLearning';
import { generateUniversalExplanation } from '@algorithms/engine/explanationEngine';
import { getCategoryOperations } from '@algorithms/metadata/categoryOperations';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Play, Pause, RotateCcw, ChevronRight,
  Maximize2, Minimize2, Copy, Check, Search, LayoutList, ArrowUpDown,
  Link2, Layers, AlignJustify, GitBranch, Triangle, Share2, RefreshCw,
  Zap, Cpu, CheckCircle2, Sliders, Sun, Moon, Bookmark,
  ZoomIn, ZoomOut, Maximize, FileText, Folder, HelpCircle, Award, Sparkles, AlertTriangle, Lightbulb
} from 'lucide-react';
import { useUIStore } from '@store/uiStore';

export interface AlgorithmMetadata {
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeComplexity: string;
  spaceComplexity: string;
  description: string;
  slug?: string;
}

interface VisualizerLayoutProps {
  frames: VisualizationFrame[];
  javaCode: string;
  cppCode: string;
  pseudoCode: string;
  metadata: AlgorithmMetadata;
  rendererType?: string;
  onCustomInput?: (newInput: number[]) => void;
  onExecuteOperation?: (opId: string, inputParams: Record<string, any>) => void;
  onCategoryChange?: (categorySlug: string) => void;
}

interface CategoryEntry {
  id: string;
  navCategory: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultSlug: string;
}

const ALL_18_CATEGORIES: CategoryEntry[] = [
  { id: 'array', navCategory: 'array', label: 'Arrays', icon: LayoutList, defaultSlug: 'find-maximum' },
  { id: 'sorting', navCategory: 'sorting', label: 'Sorting', icon: ArrowUpDown, defaultSlug: 'bubble-sort' },
  { id: 'binary-search', navCategory: 'array', label: 'Binary Search', icon: Search, defaultSlug: 'binary-search' },
  { id: 'string', navCategory: 'string', label: 'Strings', icon: FileText, defaultSlug: 'reverse-string' },
  { id: 'linked-list', navCategory: 'linked-list', label: 'Linked List', icon: Link2, defaultSlug: 'singly-linked-list' },
  { id: 'stack', navCategory: 'stack', label: 'Stack', icon: Layers, defaultSlug: 'push-pop' },
  { id: 'queue', navCategory: 'queue', label: 'Queue', icon: AlignJustify, defaultSlug: 'enqueue-dequeue' },
  { id: 'recursion', navCategory: 'recursion', label: 'Recursion', icon: GitBranch, defaultSlug: 'factorial' },
  { id: 'bit-manipulation', navCategory: 'bit-manipulation', label: 'Bit Manipulation', icon: Cpu, defaultSlug: 'set-bit' },
  { id: 'sliding-window', navCategory: 'array', label: 'Sliding Window', icon: Sliders, defaultSlug: 'max-sum-subarray' },
  { id: 'two-pointer', navCategory: 'array', label: 'Two Pointer', icon: ArrowUpDown, defaultSlug: 'pair-sum' },
  { id: 'heap', navCategory: 'heap', label: 'Heap', icon: Triangle, defaultSlug: 'max-heap' },
  { id: 'greedy', navCategory: 'greedy', label: 'Greedy', icon: Zap, defaultSlug: 'fractional-knapsack' },
  { id: 'tree', navCategory: 'tree', label: 'Binary Tree', icon: GitBranch, defaultSlug: 'inorder-traversal' },
  { id: 'bst', navCategory: 'tree', label: 'BST', icon: GitBranch, defaultSlug: 'bst-insert' },
  { id: 'graph', navCategory: 'graph', label: 'Graph', icon: Share2, defaultSlug: 'bfs' },
  { id: 'dynamic-programming', navCategory: 'dynamic-programming', label: 'Dynamic Programming', icon: RefreshCw, defaultSlug: '01-knapsack' },
  { id: 'trie', navCategory: 'trie', label: 'Trie', icon: Folder, defaultSlug: 'trie-insert' },
];

type LangKey = 'java' | 'cpp' | 'python' | 'pseudo';
const LANG_LABELS: Record<LangKey, string> = {
  java: 'Java', cpp: 'C++', python: 'Python', pseudo: 'Pseudo Code',
};

export const VisualizerLayout: React.FC<VisualizerLayoutProps> = React.memo(({
  frames, javaCode, cppCode, pseudoCode, metadata, rendererType = 'array',
  onCustomInput, onExecuteOperation, onCategoryChange,
}) => {
  const navigate = useNavigate();
  const theme = useUIStore((state) => state.theme);
  const toggleTheme = useUIStore((state) => state.toggleTheme);

  const [activeLang, setActiveLang] = useState<LangKey>('java');
  const [selectedOpId] = useState<string>('traverse');
  const [methodInputs, setMethodInputs] = useState<Record<string, any>>({});
  const [dryRunSearch, setDryRunSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [pendingRun, setPendingRun] = useState(false);
  const [showPredictionPrompt, setShowPredictionPrompt] = useState(false);
  const [predictionRevealed, setPredictionRevealed] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});

  const slug = metadata.slug || metadata.title.toLowerCase().replace(/\s+/g, '-');
  const operations = useMemo(() => getCategoryOperations(metadata.category), [metadata.category]);

  const {
    currentFrame, currentFrameIndex, isPlaying, speed,
    totalFrames, nextStep, prevStep, reset, seekTo, setSpeed, togglePlay,
  } = useVisualization(frames);

  const codeContainerRef = useRef<HTMLDivElement>(null);
  const dryRunContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll Dry Run timeline when frame advances
  useEffect(() => {
    if (dryRunContainerRef.current) {
      const stepEl = dryRunContainerRef.current.querySelector(`[data-step-index="${currentFrameIndex}"]`);
      if (stepEl) stepEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [currentFrameIndex]);

  // Fullscreen & Zoom States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomLevel(1);

  const explanation = useMemo(
    () => generateUniversalExplanation(currentFrame, totalFrames, metadata.category, metadata.title),
    [currentFrame, totalFrames, metadata.category, metadata.title],
  );

  const activeOp = useMemo(
    () => operations.find((o) => o.id === selectedOpId) || operations[0],
    [operations, selectedOpId],
  );

  const handleRun = useCallback(() => {
    if (onExecuteOperation && activeOp) {
      onExecuteOperation(selectedOpId, methodInputs);
      setPendingRun(true);
    } else {
      reset();
      setReplayCount(prev => prev + 1);
      if (!isPlaying) togglePlay();
    }
  }, [onExecuteOperation, activeOp, selectedOpId, methodInputs, reset, isPlaying, togglePlay]);

  useEffect(() => {
    if (pendingRun && frames.length > 0) {
      reset();
      setPendingRun(false);
      if (!isPlaying) togglePlay();
    }
  }, [pendingRun, frames, reset, isPlaying, togglePlay]);

  const { saveSession } = useContinueLearning();
  useEffect(() => {
    saveSession({
      category: metadata.category, slug: slug,
      title: metadata.title, frameIndex: currentFrameIndex,
      speed, activeTab: 'dry-run',
    });
  }, [saveSession, metadata.category, slug, metadata.title, currentFrameIndex, speed]);

  const handleCustomInputSubmit = (val: string) => {
    const nums = val.split(',').map(n => parseInt(n.trim(), 10)).filter(n => !isNaN(n));
    if (nums.length > 0 && onCustomInput) onCustomInput(nums);
  };

  const currentCode = useMemo(() => {
    switch (activeLang) {
      case 'java': return javaCode || '// Java code definition';
      case 'cpp': return cppCode || '// C++ code definition';
      case 'python': return '# Python code definition\ndef solution():\n    pass';
      case 'pseudo': return pseudoCode || '// Pseudocode definition';
      default: return javaCode;
    }
  }, [activeLang, javaCode, cppCode, pseudoCode]);

  const codeLines = useMemo(() => currentCode.split('\n'), [currentCode]);
  const codeLineHighlight = currentFrame?.codeLineHighlight ?? 1;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyDryRun = () => {
    const text = frames.map((f, i) => `Step ${i + 1}: ${f.description}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const quizQuestions = [
    {
      q: `What is the worst-case time complexity of ${metadata.title}?`,
      options: [metadata.timeComplexity, 'O(1)', 'O(N³)', 'O(2^N)'],
      ans: 0,
    },
    {
      q: `What is the primary auxiliary space complexity of ${metadata.title}?`,
      options: ['O(N²)', metadata.spaceComplexity, 'O(N!)', 'O(2^N)'],
      ans: 1,
    },
    {
      q: 'Which condition triggers a state update or element swap during traversal?',
      options: ['When elements satisfy the algorithm invariant', 'Randomly on every step', 'Only when array size is even', 'Never'],
      ans: 0,
    },
  ];

  return (
    <div className={`h-screen flex flex-col overflow-hidden select-none ${theme === 'dark' ? 'bg-[#090d14] text-white' : 'bg-slate-900 text-slate-100'}`}>
      
      {/* ── TOP HEADER BAR ─────────────────────────────────────────────────── */}
      <header className="h-14 border-b border-white/[0.08] bg-[#0c1017] px-4 flex items-center justify-between shrink-0 font-mono text-xs z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/roadmaps')}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Back to Roadmaps"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
              {metadata.category}
            </span>
            <span className="text-slate-600">/</span>
            <h1 className="text-sm font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-[300px]">
              {metadata.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer ${
              isBookmarked ? 'bg-amber-500/20 border-amber-500/50 text-amber-400' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
            }`}
            title="Bookmark Algorithm"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          <button
            onClick={() => setIsCompleted(!isCompleted)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              isCompleted ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isCompleted ? 'Completed (+15 XP)' : 'Mark Complete'}</span>
          </button>

          <button onClick={toggleTheme} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer">
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
          </button>
        </div>
      </header>

      {/* ── 4-PANEL IDE WORKSPACE ─────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        
        {/* ── LEFT PANEL (20%) — VS Code style Collapsible Explorer ──────── */}
        <aside className="w-[20%] min-w-[220px] max-w-[320px] bg-[#0c1017] border-r border-white/[0.08] flex flex-col shrink-0 overflow-hidden">
          <div className="h-9 px-3 border-b border-white/[0.08] bg-[#141a24] flex items-center justify-between font-mono text-[11px] text-slate-400 font-bold uppercase tracking-wider">
            <span className="flex items-center gap-1.5"><Folder className="w-3.5 h-3.5 text-indigo-400" /> Categories (18)</span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs scrollbar-thin">
            {ALL_18_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActiveCat = cat.navCategory.toLowerCase() === metadata.category.toLowerCase();

              return (
                <div key={cat.id} className="space-y-0.5">
                  <button
                    onClick={() => onCategoryChange ? onCategoryChange(cat.navCategory) : navigate(`/visualizations/${cat.navCategory}/${cat.defaultSlug}`)}
                    className={`w-full px-2.5 py-1.5 rounded-lg flex items-center gap-2 text-left transition-colors cursor-pointer ${
                      isActiveCat ? 'bg-indigo-600/20 text-indigo-300 font-bold border border-indigo-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-xs truncate flex-1">{cat.label}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </aside>

        {/* ── CENTER PANEL (55%) — Animation Canvas & Left Controls ──── */}
        <main className="flex-1 flex flex-col overflow-hidden min-w-0 bg-[#090d14]">
          
          {/* Top: Dynamic Input Area */}
          <div className="h-10 border-b border-white/[0.08] bg-[#111622] px-4 flex items-center justify-between shrink-0 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Input Area:</span>
              {activeOp?.inputs && activeOp.inputs.length > 0 ? (
                activeOp.inputs.slice(0, 2).map((inp) => (
                  <div key={inp.name} className="flex items-center gap-1.5">
                    <span className="text-[11px] text-slate-300">{inp.label}:</span>
                    <input
                      type={inp.type === 'number' ? 'number' : 'text'}
                      value={methodInputs[inp.name] ?? ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        setMethodInputs((prev) => ({ ...prev, [inp.name]: val }));
                        handleCustomInputSubmit(val);
                      }}
                      className="h-6 w-20 bg-black/50 border border-white/10 rounded px-2 text-[11px] text-white focus:outline-none focus:border-indigo-500 font-mono"
                    />
                  </div>
                ))
              ) : (
                <span className="text-[11px] text-slate-400">Array: [10, 20, 30, 40, 50]</span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRun}
                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer shadow-md shadow-indigo-600/30 flex items-center gap-1"
              >
                <Play className="w-3 h-3 fill-current" /> Run Input
              </button>
            </div>
          </div>

          {/* Large Animation Canvas */}
          <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-0">
            <div
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center', transition: 'transform 0.2s ease-out' }}
              className="w-full h-full flex items-center justify-center"
            >
              <VisualizationRenderer
                frame={currentFrame}
                type={rendererType}
                category={metadata.category}
              />
            </div>
          </div>

          {/* Control Bar (POSITIONED ON THE LEFT) */}
          <div className="h-12 border-t border-white/[0.08] bg-[#111622] px-4 flex items-center justify-between shrink-0 z-20">
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={togglePlay}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                className="h-8 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-600/30"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                onClick={prevStep}
                disabled={currentFrameIndex <= 0}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Previous Step (←)"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>

              <button
                onClick={() => {
                  if (showPredictionPrompt && !predictionRevealed) {
                    setPredictionRevealed(true);
                  } else {
                    setPredictionRevealed(false);
                    nextStep();
                  }
                }}
                disabled={currentFrameIndex >= totalFrames - 1}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 disabled:opacity-30 cursor-pointer"
                title="Next Step (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button onClick={reset} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer" title="Reset (R)">
                <RotateCcw className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Speed:</span>
                <input
                  type="range" min={50} max={1000} step={50}
                  value={1050 - speed}
                  onChange={(e) => setSpeed(1050 - Number(e.target.value))}
                  className="w-16 h-1 accent-indigo-500 cursor-pointer"
                />
              </div>

              <div className="w-px h-4 bg-white/10 mx-1" />

              <span className="text-xs font-mono font-bold text-slate-300">
                {String(currentFrameIndex + 1).padStart(2, '0')} / {String(totalFrames || 1).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setShowPredictionPrompt(!showPredictionPrompt)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1 transition-all cursor-pointer ${
                  showPredictionPrompt ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
                title="Toggle Next Step Prediction"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Predict Next
              </button>
              <button onClick={handleZoomIn} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer" title="Zoom In"><ZoomIn className="w-4 h-4" /></button>
              <button onClick={handleZoomOut} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer" title="Zoom Out"><ZoomOut className="w-4 h-4" /></button>
              <button onClick={handleResetZoom} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer" title="Fit to Screen"><Maximize className="w-4 h-4" /></button>
              <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 cursor-pointer" title="Fullscreen">
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </main>

        {/* ── RIGHT PANEL (25%) — Code Viewer, Live Variables, AI Tutor Panel ── */}
        <aside className="w-[25%] min-w-[280px] max-w-[400px] bg-[#0c1017] border-l border-white/[0.08] flex flex-col overflow-hidden shrink-0">
          
          {/* Language Tabs */}
          <div className="h-9 shrink-0 border-b border-white/[0.08] bg-[#141a24] flex items-center justify-between px-2">
            <div className="flex items-center">
              {(Object.keys(LANG_LABELS) as LangKey[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-3 py-1.5 text-[10px] font-bold font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                    activeLang === lang ? 'text-white border-b-2 border-indigo-500 bg-white/5' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {LANG_LABELS[lang]}
                </button>
              ))}
            </div>
            <button onClick={handleCopyCode} className="p-1 text-slate-500 hover:text-white transition-colors cursor-pointer" title="Copy Code">
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Read-Only Code Viewer */}
          <div ref={codeContainerRef} className="flex-1 overflow-auto bg-[#080b11] p-2 min-h-0 font-mono text-[11px]">
            {codeLines.map((line, i) => {
              const lineNum = i + 1;
              const isHighlighted = lineNum === codeLineHighlight;
              return (
                <div
                  key={i}
                  data-line-number={lineNum}
                  onClick={() => {
                    const matchIdx = frames.findIndex(f => f.codeLineHighlight === lineNum);
                    if (matchIdx !== -1) seekTo(matchIdx);
                  }}
                  className={`flex items-center px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    isHighlighted ? 'bg-indigo-600/30 border-l-2 border-indigo-500 text-white font-bold' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span className={`w-7 text-right pr-3 select-none shrink-0 ${isHighlighted ? 'text-indigo-400 font-bold' : 'text-slate-600'}`}>{lineNum}</span>
                  <span className="whitespace-pre">{line || ' '}</span>
                </div>
              );
            })}
          </div>

          {/* AI TUTOR & WHY PANEL */}
          <div className="p-3 border-t border-white/[0.08] bg-[#0f141e] space-y-2 font-mono text-xs overflow-y-auto max-h-[220px] scrollbar-thin shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Tutor & Why Panel
              </span>
              <span className="text-[10px] text-slate-500">Step #{currentFrameIndex + 1}</span>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="bg-indigo-950/40 p-2 rounded border border-indigo-500/20">
                <span className="text-indigo-300 font-bold block mb-0.5">What happened:</span>
                <span className="text-slate-200 block">{explanation.what}</span>
              </div>

              <div className="bg-amber-950/30 p-2 rounded border border-amber-500/20">
                <span className="text-amber-300 font-bold block mb-0.5 flex items-center gap-1">
                  <Lightbulb className="w-3 h-3" /> Why it happened:
                </span>
                <span className="text-slate-200 block">{explanation.why}</span>
              </div>

              <div className="bg-rose-950/30 p-2 rounded border border-rose-500/20">
                <span className="text-rose-300 font-bold block mb-0.5 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" /> Common Mistake:
                </span>
                <span className="text-slate-300 block">{explanation.commonMistake}</span>
              </div>
            </div>
          </div>

          {/* Scoped Live Variables */}
          <div className="p-2.5 border-t border-white/[0.08] bg-[#0c1017] space-y-1 font-mono text-xs shrink-0">
            <span className="text-[10px] uppercase font-bold text-indigo-400 block">Live Scoped Variables</span>
            {currentFrame?.pointers || currentFrame?.variables ? (
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                {Object.entries({ ...(currentFrame.pointers || {}), ...(currentFrame.variables || {}) }).slice(0, 6).map(([k, v]) => (
                  <div key={k} className="bg-black/50 p-1 rounded border border-white/10 flex justify-between items-center px-2">
                    <span className="text-slate-400 uppercase font-bold">{k}</span>
                    <span className="text-indigo-300 font-bold truncate max-w-[70px]">{typeof v === 'object' ? JSON.stringify(v) : String(v)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-[10px] text-slate-500 block">Run animation to inspect live variables</span>
            )}
          </div>
        </aside>
      </div>

      {/* ── BOTTOM PANEL (100% Full Width) — Always Visible Dry Run Timeline ── */}
      <footer className="h-[200px] shrink-0 border-t border-white/[0.08] bg-[#0b0e14] flex flex-col overflow-hidden z-30">
        <div className="h-8 px-4 border-b border-white/[0.06] bg-[#141a24] flex items-center justify-between shrink-0 font-mono text-xs">
          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase text-slate-300 tracking-wider flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-cyan-400 fill-current" /> Full-Width Dry Run Timeline
            </span>
            <span className="text-[10px] text-slate-500">Step {currentFrameIndex + 1} of {totalFrames || 1}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3 h-3 text-slate-500 absolute left-2 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={dryRunSearch}
                onChange={(e) => setDryRunSearch(e.target.value)}
                placeholder="Search steps..."
                className="h-5 w-36 pl-6 pr-2 bg-black/40 border border-white/10 rounded text-[10px] text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button onClick={handleCopyDryRun} className="px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[10px] flex items-center gap-1 cursor-pointer">
              <Copy className="w-3 h-3" /> Copy Timeline
            </button>
          </div>
        </div>

        <div ref={dryRunContainerRef} className="flex-1 overflow-y-auto p-2.5 space-y-1.5 font-mono scrollbar-thin">
          {frames.length === 0 ? (
            <div className="text-slate-500 text-center py-6 text-xs font-mono">Click Run to generate dry run execution steps.</div>
          ) : (
            frames
              .filter(f => !dryRunSearch || (f.description || '').toLowerCase().includes(dryRunSearch.toLowerCase()))
              .map((f, idx) => {
                const isActive = idx === currentFrameIndex;
                return (
                  <div
                    key={idx}
                    data-step-index={idx}
                    onClick={() => seekTo(idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-2 text-xs ${
                      isActive ? 'bg-indigo-600/20 border-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/10' : 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        isActive ? 'bg-indigo-500 text-white' : 'bg-white/10 text-slate-400'
                      }`}>{idx + 1}</span>
                      <div className="space-y-0.5 min-w-0">
                        <span className="block font-bold text-white text-xs truncate">{f.description || `Step ${idx + 1}`}</span>
                        <span className="block text-[10px] text-slate-400 truncate">Explanation: {explanation.algorithmInsight}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[10px] shrink-0">
                      {f.pointers && <div className="bg-black/40 px-2 py-0.5 rounded border border-white/5 text-cyan-300">Pointers: {JSON.stringify(f.pointers)}</div>}
                      <span className="text-slate-500 font-bold">Line #{f.codeLineHighlight || 1}</span>
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </footer>

      {/* ── COMPLETION SUMMARY & CONCEPT QUIZ MODAL ───────────────────────── */}
      {currentFrameIndex === totalFrames - 1 && totalFrames > 1 && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-[#0c1017] border border-white/10 rounded-2xl p-6 space-y-5 font-mono shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <h2 className="text-base font-extrabold text-white uppercase tracking-wider">Algorithm Completed!</h2>
              </div>
              <span className="text-xs text-indigo-400 font-bold">+15 XP Granted</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Total Steps</span>
                <span className="text-base font-bold text-cyan-400">{totalFrames}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Replay Count</span>
                <span className="text-base font-bold text-amber-400">{replayCount}</span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5 space-y-1">
                <span className="text-[10px] text-slate-400 block">Time Complexity</span>
                <span className="text-base font-bold text-rose-400">{metadata.timeComplexity}</span>
              </div>
            </div>

            {/* Quick Concept Quiz */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Quick Concept Quiz
              </h3>

              {quizQuestions.map((qq, qIdx) => (
                <div key={qIdx} className="bg-black/40 p-3 rounded-xl border border-white/5 space-y-2 text-xs">
                  <span className="text-slate-200 font-bold block">{qIdx + 1}. {qq.q}</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {qq.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === oIdx;
                      const isCorrect = qq.ans === oIdx;
                      let btnStyle = 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10';
                      if (quizScore !== null) {
                        if (isCorrect) btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                        else if (isSelected) btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                      } else if (isSelected) {
                        btnStyle = 'bg-indigo-600 border-indigo-500 text-white font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => setSelectedAnswers(prev => ({ ...prev, [qIdx]: oIdx }))}
                          className={`p-2 rounded-lg border text-[11px] text-left transition-colors cursor-pointer ${btnStyle}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  let score = 0;
                  quizQuestions.forEach((qq, i) => {
                    if (selectedAnswers[i] === qq.ans) score++;
                  });
                  setQuizScore(score);
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Submit Quiz
              </button>

              <button
                onClick={reset}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-bold rounded-xl transition-all cursor-pointer"
              >
                Replay Animation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default VisualizerLayout;