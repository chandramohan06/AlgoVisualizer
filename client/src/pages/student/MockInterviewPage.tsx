import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Clock,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Brain,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const MockInterviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'setup' | 'mcq' | 'algo' | 'behavioral' | 'results'>('setup');
  const [selectedCompany, setSelectedCompany] = useState('Amazon');
  const [difficulty, setDifficulty] = useState<'Medium' | 'Hard'>('Medium');
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 mins
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState<number | null>(null);

  // Timer countdown during active rounds
  useEffect(() => {
    if (step === 'setup' || step === 'results') return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStep('results');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [step]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const sampleMCQs = [
    {
      id: 1,
      q: 'What is the average time complexity of QuickSort partitioning?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(1)'],
      correct: 1,
    },
    {
      id: 2,
      q: 'Which data structure is optimal for level-order tree traversal (BFS)?',
      options: ['Stack', 'Queue / Deque', 'Priority Queue', 'Array'],
      correct: 1,
    },
    {
      id: 3,
      q: 'What is the worst-case space complexity of recursive Depth-First Search (DFS) on a tree of height H?',
      options: ['O(1)', 'O(H)', 'O(V + E)', 'O(N log N)'],
      correct: 1,
    },
  ];

  const handleFinishMock = () => {
    let correctCount = 0;
    sampleMCQs.forEach((mcq, idx) => {
      if (selectedAnswers[idx] === mcq.correct) correctCount++;
    });
    const finalScore = Math.round((correctCount / sampleMCQs.length) * 100);
    setScore(finalScore);
    setStep('results');
  };

  return (
    <motion.div
      className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. HEADER BANNER ── */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-[#0d1117]">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              <Brain className="w-3.5 h-3.5 text-amber-400" /> AI Interview Simulator
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Building2 className="w-8 h-8 text-purple-400" />
              Mock Technical Interview
            </h1>
            <p className="text-xs md:text-sm text-slate-300">
              Simulate realistic company interview rounds with automated scoring and feedback.
            </p>
          </div>

          {step !== 'setup' && step !== 'results' && (
            <div className="px-4 py-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 font-mono font-bold text-amber-300 text-sm flex items-center gap-2 shrink-0">
              <Clock className="w-4 h-4 text-amber-400 animate-pulse" /> Time Remaining: {formatTime(timerSeconds)}
            </div>
          )}
        </div>
      </div>

      {/* ── STEP 1: SETUP ── */}
      {step === 'setup' && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
          <h2 className="text-base font-black text-white font-mono uppercase tracking-wider">
            Configure Interview Parameters
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase">Target Company</label>
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="w-full bg-[#0d1117] border border-white/10 rounded-2xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500 font-mono font-bold"
              >
                {['Amazon', 'Google', 'Microsoft', 'Cisco', 'Adobe', 'TCS', 'Infosys'].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400 font-bold uppercase">Round Difficulty</label>
              <div className="flex items-center gap-3 pt-1">
                {(['Medium', 'Hard'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-3 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      difficulty === d
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    {d} Round
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              onClick={() => {
                setTimerSeconds(600);
                setStep('mcq');
              }}
              className="px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer transition-all active:scale-95"
            >
              Start Interview Round <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: MCQ ROUND ── */}
      {step === 'mcq' && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase">
              Round 1: Technical MCQ Assessment ({selectedCompany})
            </span>
            <span className="text-xs font-mono text-slate-400 font-bold">3 Questions</span>
          </div>

          <div className="space-y-6">
            {sampleMCQs.map((item, idx) => (
              <div key={item.id} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                <h3 className="text-xs font-extrabold text-white font-mono">
                  Q{idx + 1}. {item.q}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {item.options.map((opt, optIdx) => (
                    <button
                      key={optIdx}
                      onClick={() => setSelectedAnswers({ ...selectedAnswers, [idx]: optIdx })}
                      className={`p-3 rounded-xl text-xs font-mono text-left transition-all cursor-pointer ${
                        selectedAnswers[idx] === optIdx
                          ? 'bg-purple-600 text-white font-bold shadow-md'
                          : 'bg-black/30 border border-white/5 text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}. {opt}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setStep('setup')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Cancel Round
            </button>
            <button
              onClick={() => setStep('algo')}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              Next: Algorithmic Scenario <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: ALGORITHM SCENARIO ── */}
      {step === 'algo' && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
              Round 2: Algorithmic Coding Problem
            </span>
            <span className="text-xs font-mono text-slate-400 font-bold">{selectedCompany} Tagged</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">Problem Statement: Merge K Sorted Lists</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Given an array of \`k\` linked lists, each list sorted in ascending order, merge all lists into one sorted linked list and return it.
            </p>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 font-mono text-xs text-indigo-300 space-y-1">
              <div>// Optimal Approach Hint:</div>
              <div>Use a Min-Heap (Priority Queue) to store head nodes of all K lists. Time: O(N log K), Space: O(K).</div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setStep('mcq')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Back
            </button>
            <button
              onClick={() => setStep('behavioral')}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              Next: Behavioral Round <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: BEHAVIORAL SCENARIO ── */}
      {step === 'behavioral' && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase">
              Round 3: Behavioral &amp; STAR Method Scenario
            </span>
            <span className="text-xs font-mono text-slate-400 font-bold">Leadership &amp; Ownership</span>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-black text-white">Scenario: Technical Trade-off &amp; Deadline Pressure</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Describe a situation where you had to compromise technical perfection (e.g. refactoring) to hit an urgent production launch deadline.
            </p>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setStep('algo')}
              className="text-xs font-mono text-slate-400 hover:text-white"
            >
              Back
            </button>
            <button
              onClick={handleFinishMock}
              className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/30"
            >
              Submit Mock Interview &amp; Generate Report <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 5: RESULTS SCORECARD ── */}
      {step === 'results' && (
        <div className="glass-card rounded-3xl p-6 md:p-8 border border-emerald-500/20 bg-emerald-500/5 space-y-6">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto text-3xl">
              🏆
            </div>
            <h2 className="text-2xl font-black text-white">Mock Interview Scorecard ({selectedCompany})</h2>
            <p className="text-xs text-slate-300">
              Completed {difficulty} difficulty technical round simulation.
            </p>
          </div>

          {/* Score Badge */}
          <div className="p-6 rounded-3xl bg-black/40 border border-white/10 text-center max-w-sm mx-auto space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Overall Score</span>
            <div className="text-4xl font-black text-emerald-400 font-mono">{score ?? 85}%</div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-mono font-bold inline-block border border-emerald-500/20">
              Passed - Placement Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-emerald-400 font-bold">✓ Technical Strengths</span>
              <p className="text-slate-300 text-[11px]">Strong grasp of Time/Space complexity and Priority Queue invariants.</p>
            </div>

            <div className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
              <span className="text-amber-400 font-bold">⚠️ Recommended Focus</span>
              <p className="text-slate-300 text-[11px]">Review STAR method formatting for behavioral scenario responses.</p>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-center gap-3">
            <button
              onClick={() => setStep('setup')}
              className="px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Retake Mock Interview
            </button>

            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/30"
            >
              Return to Dashboard <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MockInterviewPage;
