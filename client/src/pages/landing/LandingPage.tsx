import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, Play, Pause, RotateCcw, SkipForward, Sliders,
  Zap, BarChart3, Code2, GitBranch, Layers, ChevronDown,
  BookOpen, Cpu, Info, Disc, Star, Activity
} from 'lucide-react';
import { ROUTES } from '@constants/routes';

// Supported algorithm categories for cards display
const SUPPORTED_ALGORITHMS = [
  { name: 'Arrays', desc: 'Linear storage with contiguous memory blocks.', count: 8, icon: Layers },
  { name: 'Strings', desc: 'Sequence processing, matching, and editing.', count: 4, icon: Code2 },
  { name: 'Linked List', desc: 'Dynamic structures linked by address pointers.', count: 3, icon: GitBranch },
  { name: 'Stack', desc: 'Last-In First-Out execution contexts.', count: 1, icon: Cpu },
  { name: 'Queue', desc: 'First-In First-Out buffering queues.', count: 2, icon: Activity },
  { name: 'Trees', desc: 'Hierarchical node parent-child layouts.', count: 5, icon: GitBranch },
  { name: 'BST', desc: 'Sorted binary trees for quick queries.', count: 2, icon: Star },
  { name: 'Heap', desc: 'Priority queues based on binary tree heaps.', count: 2, icon: Star },
  { name: 'Trie', desc: 'Prefix trees for auto-complete and strings.', count: 1, icon: Layers },
  { name: 'Graph', desc: 'Nodes connected by directed/undirected edges.', count: 10, icon: GitBranch },
  { name: 'DP', desc: 'Memoization and tabular state decisions.', count: 7, icon: Cpu },
  { name: 'Greedy', desc: 'Optimal choice strategy algorithms.', count: 4, icon: Zap },
  { name: 'Backtracking', desc: 'Depth-first exploration of state spaces.', count: 4, icon: Info },
  { name: 'Sliding Window', desc: 'Subarray optimization within bounds.', count: 3, icon: Sliders },
  { name: 'Binary Search', desc: 'Interval halving search method.', count: 1, icon: BarChart3 }
];

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Parallax mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    setMousePos({
      x: (clientX - window.innerWidth / 2) / 25,
      y: (clientY - window.innerHeight / 2) / 25,
    });
  };

  // ─── LIVE ALGORITHM DEMO STATE ───
  const initialDemoArray = [18, 42, 8, 33, 21];
  const [demoArray, setDemoArray] = useState<number[]>([...initialDemoArray]);
  const [demoState, setDemoState] = useState<{
    i: number;
    j: number;
    compare: number[];
    swapped: boolean;
    comparisons: number;
    swaps: number;
    isSorted: boolean;
    activeLine: number;
  }>({
    i: 0,
    j: 0,
    compare: [],
    swapped: false,
    comparisons: 0,
    swaps: 0,
    isSorted: false,
    activeLine: 1
  });
  const [demoPlaying, setDemoPlaying] = useState(false);
  const [demoSpeed, setDemoSpeed] = useState(600); // ms delay
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop algorithm loop on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Control loop triggered by playing state or speed adjustments
  useEffect(() => {
    if (demoPlaying && !demoState.isSorted) {
      timerRef.current = setInterval(() => {
        stepSort();
      }, demoSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [demoPlaying, demoArray, demoState, demoSpeed]);

  const resetSort = () => {
    setDemoArray([...initialDemoArray]);
    setDemoState({
      i: 0,
      j: 0,
      compare: [],
      swapped: false,
      comparisons: 0,
      swaps: 0,
      isSorted: false,
      activeLine: 1
    });
    setDemoPlaying(false);
  };

  const stepSort = () => {
    const arr = [...demoArray];
    let { i, j, compare, swapped, comparisons, swaps, isSorted, activeLine } = demoState;

    if (isSorted) {
      setDemoPlaying(false);
      return;
    }

    if (activeLine === 1 || activeLine === 2) {
      if (i >= arr.length) {
        isSorted = true;
        compare = [];
        activeLine = 8;
        setDemoState({ i, j, compare, swapped, comparisons, swaps, isSorted, activeLine });
        setDemoPlaying(false);
        return;
      }
      j = 0;
      activeLine = 3;
      setDemoState({ i, j, compare, swapped, comparisons, swaps, isSorted, activeLine });
      return;
    }

    if (activeLine === 3) {
      if (j < arr.length - i - 1) {
        compare = [j, j + 1];
        comparisons += 1;
        activeLine = 4;
      } else {
        i += 1;
        compare = [];
        activeLine = 2;
      }
      setDemoState({ i, j, compare, swapped, comparisons, swaps, isSorted, activeLine });
      return;
    }

    if (activeLine === 4) {
      if (arr[j] > arr[j + 1]) {
        activeLine = 5;
      } else {
        j += 1;
        compare = [];
        activeLine = 3;
      }
      setDemoState({ i, j, compare, swapped, comparisons, swaps, isSorted, activeLine });
      return;
    }

    if (activeLine === 5) {
      const temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
      swaps += 1;
      setDemoArray(arr);

      j += 1;
      compare = [];
      activeLine = 3;
      setDemoState({ i, j, compare, swapped, comparisons, swaps, isSorted, activeLine });
      return;
    }
  };

  const stats = [
    { label: 'Interactive Algorithms', value: '50+' },
    { label: 'Practice Problems', value: '100+' },
    { label: 'Daily Active Learners', value: '10k+' },
    { label: 'Visual Learning Rate', value: '99.4%' }
  ];

  const faqs = [
    {
      q: "Which coding languages are supported in the playground?",
      a: "Our embedded Monaco Editor supports Java, C++, Python, and JavaScript. You can write your solutions in any of these languages and view matching pseudo-code step highlighting."
    },
    {
      q: "Can I connect this to external platforms like LeetCode?",
      a: "Yes! Every visualization page comes with linked LeetCode problems, code starters, and official solutions, allowing you to bridge the gap between visualization and hands-on practice."
    },
    {
      q: "Is there a dark mode option?",
      a: "AlgoVisualizer is built from the ground up with a premium dark-first SaaS aesthetic, designed to keep your eyes relaxed during late-night study sessions."
    },
    {
      q: "How does the gamification work?",
      a: "You earn XP by completing quiz questions, finishing visualizer modules, and solving practice problems. Maintain a daily streak to multiply your points and climb the global leaderboard!"
    }
  ];

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#09090b] text-white selection:bg-blue-500/20 relative overflow-hidden font-sans"
    >
      {/* Background Parallax Neon Blobs */}
      <motion.div 
        style={{ x: mousePos.x * 0.4, y: mousePos.y * 0.4 }}
        className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: -mousePos.x * 0.3, y: -mousePos.y * 0.3 }}
        className="absolute top-[35%] right-[-5%] w-[450px] h-[450px] bg-accent/80 opacity-[0.05] rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        style={{ x: mousePos.x * 0.2, y: -mousePos.y * 0.2 }}
        className="absolute bottom-[-10%] left-[15%] w-[550px] h-[550px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.007)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.007)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Premium Glass Header */}
      <header className="sticky top-0 z-50 h-20 w-full glass-panel flex items-center justify-between px-6 lg:px-12 border-b border-white/5">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 18, scale: 1.05 }}
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center shadow-lg shadow-blue-500/20 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </motion.div>
          <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
            AlgoVisualizer
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wider uppercase text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-white transition-colors">Visualizer</a>
          <a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a>
          <a href="#github" className="hover:text-white transition-colors">Open Source</a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(ROUTES.LOGIN)}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate(ROUTES.SIGNUP)}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98] cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel-light border border-white/10 text-xs font-semibold text-blue-400">
            <Sparkles className="w-4.5 h-4.5 text-blue-400" />
            Interactive computer science learning suite
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-white">
            Visualize logic. <br />
            <span className="gradient-text">Understand instantly.</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Interact with memory representations, step through execution traces, run and test solutions side-by-side using Monaco sandbox panels.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 max-w-sm mx-auto">
            <button
              onClick={() => navigate(ROUTES.SIGNUP)}
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-blue-500/25 group transition-all cursor-pointer"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#preview"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              <Play className="w-4 h-4 fill-white" />
              Watch Demo
            </a>
          </div>
        </motion.div>

        {/* ─── LIVE ALGORITHM DEMO PANEL ─── */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 glass-card rounded-2xl p-6 lg:p-8 max-w-5xl mx-auto text-left relative overflow-hidden"
        >
          {/* Mock Window Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 mb-6 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="ml-4 text-xs font-bold text-slate-500 font-mono">bubble_sort.ts</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/15">
                <Sparkles className="w-3.5 h-3.5" /> Interactive Playback Engine
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Visualizer and stats side */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-6">
              {/* Dynamic array bar canvas */}
              <div className="h-48 flex items-end justify-center gap-6 bg-black/40 rounded-xl p-6 border border-white/5 relative">
                {demoArray.map((value, idx) => {
                  const isComparing = demoState.compare.includes(idx);
                  const alreadySorted = demoState.isSorted || (idx >= demoArray.length - demoState.i);
                  return (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                      <motion.div
                        layout
                        style={{ height: `${(value / 45) * 100}%` }}
                        className={`w-full rounded-t-lg origin-bottom transition-all ${
                          isComparing
                            ? 'bg-gradient-to-t from-rose-500 to-rose-600 shadow-lg shadow-rose-500/20'
                            : alreadySorted
                            ? 'bg-gradient-to-t from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/10'
                            : 'bg-gradient-to-t from-blue-500 to-accent shadow-md'
                        }`}
                      />
                      <span className={`text-xs font-bold font-mono ${
                        isComparing ? 'text-rose-400' : alreadySorted ? 'text-emerald-400' : 'text-slate-400'
                      }`}>
                        {value}
                      </span>
                    </div>
                  );
                })}

                {demoState.isSorted && (
                  <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-[1px] flex items-center justify-center rounded-xl">
                    <span className="text-xs font-bold text-emerald-400 border border-emerald-500/25 bg-emerald-950/40 px-3 py-1 rounded-full">
                      Array Fully Sorted!
                    </span>
                  </div>
                )}
              </div>

              {/* Dynamic status variable panel */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4 text-blue-400" /> Dynamic variables
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-300">
                  <div>Outer counter (i): <span className="text-blue-400 font-bold">{demoState.i}</span></div>
                  <div>Inner counter (j): <span className="text-blue-400 font-bold">{demoState.j}</span></div>
                  <div>Total comparisons: <span className="text-amber-400 font-bold">{demoState.comparisons}</span></div>
                  <div>Total swaps: <span className="text-rose-400 font-bold">{demoState.swaps}</span></div>
                </div>
              </div>

              {/* Playback action items */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={resetSort}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white transition-all cursor-pointer"
                    title="Reset Simulation"
                  >
                    <RotateCcw className="w-4.5 h-4.5" />
                  </button>
                  <button
                    onClick={() => {
                      setDemoPlaying(!demoPlaying);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-blue-600/15 cursor-pointer"
                  >
                    {demoPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                    {demoPlaying ? 'Pause' : 'Play'}
                  </button>
                  <button
                    onClick={stepSort}
                    disabled={demoPlaying || demoState.isSorted}
                    className="p-2.5 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
                    title="Step Forward"
                  >
                    <SkipForward className="w-4.5 h-4.5" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 uppercase">
                    <Sliders className="w-4 h-4 text-blue-400" />
                    <span>Speed: {demoSpeed}ms</span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={1200}
                    step={200}
                    value={demoSpeed}
                    onChange={(e) => setDemoSpeed(Number(e.target.value))}
                    className="w-20 accent-blue-500 bg-white/5 h-1 rounded-lg cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Code highlighter side */}
            <div className="lg:col-span-5 flex flex-col justify-between font-mono text-xs text-slate-300 bg-black/30 rounded-xl p-5 border border-white/5">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-white/5 pb-2">
                  <span>PSEUDOCODE CONTROLLER</span>
                  <span>TypeScript</span>
                </div>
                <div className="space-y-1.5">
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 1 ? 'code-line-active text-white' : 'text-slate-500'}`}>1  function bubbleSort(arr) &#123;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 2 ? 'code-line-active text-white' : 'text-slate-500'}`}>2    for (let i = 0; i &lt; arr.length; i++) &#123;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 3 ? 'code-line-active text-white' : 'text-slate-500'}`}>3      for (let j = 0; j &lt; arr.length - i - 1; j++) &#123;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 4 ? 'code-line-active text-white' : 'text-slate-400'}`}>4        if (arr[j] &gt; arr[j + 1]) &#123;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 5 ? 'code-line-active text-white' : 'text-slate-400'}`}>5          swap(arr, j, j + 1);</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 6 ? 'code-line-active text-white' : 'text-slate-500'}`}>6        &#125;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 7 ? 'code-line-active text-white' : 'text-slate-500'}`}>7      &#125;</div>
                  <div className={`px-2 py-0.5 rounded transition-all ${demoState.activeLine === 8 ? 'code-line-active text-white' : 'text-slate-500'}`}>8    &#125;</div>
                  <div className="text-slate-500">9  &#125;</div>
                </div>
              </div>

              <div className="text-[10px] text-slate-500 border-t border-white/5 pt-3 mt-4 leading-relaxed font-sans font-semibold">
                Tip: Press Play to animate the execution flow automatically, or use Step to debug line by line.
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Statistics Row */}
      <section className="border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center md:text-left space-y-2">
              <div className="text-4xl font-extrabold tracking-tight text-white">{stat.value}</div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Algorithms Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Supported Algorithm Categories
          </h2>
          <p className="text-slate-400 text-sm">
            Master the most crucial data structures and search algorithms for top interview pipelines.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {SUPPORTED_ALGORITHMS.map((algo, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-5 space-y-4 border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400 mb-3">
                  <algo.icon className="w-4.5 h-4.5" />
                </div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{algo.name}</h3>
                <p className="text-[11px] text-slate-500 leading-normal mt-2 font-medium">{algo.desc}</p>
              </div>
              <div className="text-[10px] font-bold text-blue-400 mt-4">{algo.count} Modules</div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Learning Roadmap */}
      <section id="roadmap" className="bg-white/[0.01] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-3xl font-bold text-white">Step-by-Step Learning Roadmap</h2>
            <p className="text-slate-400 text-sm">A structured syllabus guiding you from foundations to tree recursion and graphs.</p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-8 border-l border-white/5 space-y-12">
            {[
              { title: 'Foundations & Sorting', desc: 'Conquer arrays, memory pointers, Bubble Sort, Merge Sort, and search spaces.', phase: '01', status: 'Completed' },
              { title: 'Linear Structures', desc: 'Deep dive into Stack execution, queue scheduling, and Priority Queues.', phase: '02', status: 'In Progress' },
              { title: 'Tree Hierarchies', desc: 'Binary Trees, BST properties, AVL re-balancing, and prefix Tries.', phase: '03', status: 'Next Phase' },
              { title: 'Graph Traversal & Optimization', desc: 'BFS, DFS, Dijkstra shortest path, Bellman-Ford, and MST algorithms.', phase: '04', status: 'Locked' }
            ].map((node, i) => (
              <div key={i} className="relative space-y-2">
                <div className="absolute left-[-41px] top-1.5 w-6 h-6 rounded-full bg-[#09090b] border-2 border-blue-500 flex items-center justify-center">
                  <div className={`w-2 h-2 rounded-full ${node.status === 'Completed' ? 'bg-blue-500' : 'bg-transparent'}`} />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold text-blue-400">{node.phase}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    node.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                    node.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/15' : 'bg-white/5 text-slate-500'
                  }`}>
                    {node.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white">{node.title}</h3>
                <p className="text-xs text-slate-500 max-w-lg leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 lg:px-12 py-24 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Designed for deep understanding.
          </h2>
          <p className="text-slate-400 text-sm">
            Our visual sandbox provides all tools necessary to map algorithms directly to variables and step-by-step logic.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Interactive Canvas', desc: 'Draw node circles, map array indices, and play transitions at custom speeds.', icon: Layers },
            { title: 'Monaco Sandbox', desc: 'Industrial grade code editor directly integrated for real-time testing.', icon: Code2 },
            { title: 'Execution Details', desc: 'Follow variables and check active memory values inside scope boxes.', icon: Disc },
            { title: 'Quiz System', desc: 'Complete integrated module quizzes to test structural algorithmic knowledge.', icon: Info }
          ].map((feat, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 space-y-4 border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400">
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">{feat.title}</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Source Section */}
      <section id="github" className="bg-white/[0.01] border-y border-white/5 py-24 relative">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg> GitHub Community
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              Open Source Architecture
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              AlgoVisualizer is fully open source. Anyone can check and contribute new algorithm modules, implement visual frame renderers, or customize sandbox settings. Join developers worldwide!
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                Repository
              </a>
              <a
                href="#faq"
                className="flex items-center gap-2 px-5 py-3 rounded-xl hover:bg-white/5 text-slate-400 hover:text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <BookOpen className="w-4 h-4" />
                Documentation
              </a>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-6 border border-white/5 font-mono text-[10px] text-slate-400 space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="text-[9px] font-bold text-slate-500">CONTRIBUTING.md</span>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-slate-300"># Setting up new algorithm frames:</p>
            <p>1. Define custom step markers inside `constants.ts`</p>
            <p>2. Construct immutable frames matching `VisualizationFrame` interface</p>
            <p>3. Map element visual indices inside canvas SVG loops</p>
            <div className="border-t border-white/5 pt-3 flex justify-between text-[8px] text-slate-500">
              <span>Branch: main</span>
              <span>Updated: Just now</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section id="faq" className="max-w-3xl mx-auto px-6 py-24 space-y-12">
        <h2 className="text-2xl font-bold text-center text-white uppercase tracking-wider">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="glass-card rounded-2xl overflow-hidden border border-white/5">
              <button
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-xs text-white hover:bg-white/[0.01] transition-all uppercase tracking-wider"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  activeFaq === idx ? 'rotate-180 text-blue-400' : ''
                }`} />
              </button>
              <AnimatePresence initial={false}>
                {activeFaq === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 pt-2 text-xs leading-relaxed text-slate-400 border-t border-white/5 bg-white/[0.005]">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-white/5 py-12 text-center text-xs text-slate-600 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-accent flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold text-slate-400">AlgoVisualizer</span>
          </div>
          <div>&copy; {new Date().getFullYear()} AlgoVisualizer SaaS Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
