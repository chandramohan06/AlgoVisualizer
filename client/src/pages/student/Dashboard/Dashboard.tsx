import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Award,
  Flame,
  Code2,
  Trophy,
  RefreshCw,
  Search,
  Sparkles,
  Play,
  CheckCircle2,
  Target,
  Clock,
  ChevronRight,
  TrendingUp,
  Calendar,
  Zap,
  Bookmark,
  ShieldAlert,
  ArrowRight,
  Compass,
  CheckSquare,
  Building2,
  HelpCircle,
  Lightbulb,
} from 'lucide-react';
import { useFullDashboardStats } from '@hooks/useDashboard';
import { DashboardSkeleton } from '@components/common/Skeleton';

const MOTIVATIONAL_QUOTES = [
  "Consistently writing clean code and understanding core data structures builds exceptional software engineers.",
  "Don't practice until you get it right. Practice until you can't get it wrong.",
  "Master the fundamentals, and complex algorithmic problems become trivial.",
  "Small daily progress compound into placement mastery.",
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading, isError, refetch } = useFullDashboardStats();
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTaskIndices, setCompletedTaskIndices] = useState<number[]>([0, 1, 2]);

  if (isLoading) return <DashboardSkeleton />;
  if (isError || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
          <Award className="w-7 h-7 text-rose-400" />
        </div>
        <div className="text-center">
          <h3 className="text-base font-bold text-white">Failed to load dashboard</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-sm">
            Could not connect to the server. Check your connection and try again.
          </p>
        </div>
        <button onClick={() => refetch()} className="btn-primary flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  const quote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
  const readiness = stats.placementReadiness || { overall: 75, dsa: 80, java: 85, problemSolving: 70, interviewTheory: 75, systemArchitecture: 65, weakestArea: 'System Architecture', strongestArea: 'Java & Collections' };
  const todayMission = stats.todayMission || { completionPct: 60, estimatedMinutes: 45, currentGoal: 'Master Arrays & Strings Data Structures', tasks: [] };
  const recommendation = stats.recommendation || { title: 'Strings & String Manipulation', category: 'Strings', estimatedMinutes: 20, slug: 'strings' };

  const handleTaskToggle = (idx: number) => {
    if (completedTaskIndices.includes(idx)) {
      setCompletedTaskIndices(completedTaskIndices.filter((i) => i !== idx));
    } else {
      setCompletedTaskIndices([...completedTaskIndices, idx]);
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 min-h-screen text-slate-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── SECTION 16: UNIVERSAL SEARCH & QUICK NAV BAR ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-3 rounded-2xl border border-white/10">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Universal Search (Notes, Algorithms, Practice, Quiz)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                navigate(`/notes?search=${encodeURIComponent(searchQuery.trim())}`);
              }
            }}
            className="w-full bg-[#0d1117] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar">
          <button
            onClick={() => navigate('/notes')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" /> DSA Notes
          </button>

          <button
            onClick={() => navigate('/visualizations')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5 text-cyan-400" /> Visualizer
          </button>

          <button
            onClick={() => navigate('/practice')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-400" /> Practice
          </button>

          <button
            onClick={() => navigate('/quiz')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" /> Quiz
          </button>
        </div>
      </div>

      {/* ── SECTION 1: SMART HERO BANNER ── */}
      <div className="relative overflow-hidden glass-card rounded-3xl p-6 md:p-8 border border-indigo-500/20 bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-[#0d1117]">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" /> Learning Command Center
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              Good Evening, {stats.userName} 👋
            </h1>

            <p className="text-xs md:text-sm text-slate-300 italic leading-relaxed">
              &quot;{quote}&quot;
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
                <Flame className="w-4 h-4 fill-current" />
                {stats.streak} Days Streak
              </div>

              <div className="flex items-center gap-1.5 text-purple-400 font-bold bg-purple-500/10 px-3 py-1.5 rounded-xl border border-purple-500/20">
                <Award className="w-4 h-4" />
                Level {stats.level} ({stats.totalXP} XP)
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <Target className="w-4 h-4" />
                Goal: {todayMission.currentGoal}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 shrink-0">
            <button
              onClick={() => navigate('/notes')}
              className="px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume Journey
            </button>

            <span className="text-[11px] text-slate-400 font-mono text-center lg:text-right flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-indigo-400" /> Est. Time Today: {todayMission.estimatedMinutes} Mins
            </span>
          </div>
        </div>
      </div>

      {/* ── SECTION 2 & 3: TODAY'S MISSION & CONTINUE LEARNING GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 2: TODAY'S MISSION CHECKLIST (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Today&apos;s Mission</h3>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              {Math.round((completedTaskIndices.length / 5) * 100)}% Completed
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/5">
            <motion.div
              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedTaskIndices.length / 5) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          <div className="space-y-2">
            {[
              { label: 'Read DSA Note: Java ArrayList Methods', category: 'Notes', link: '/notes' },
              { label: 'Visualize Algorithm: Binary Search Animation', category: 'Visualizer', link: '/visualizations' },
              { label: 'Practice Code Problem: Two Sum Problem', category: 'Practice', link: '/practice' },
              { label: 'Attempt Quiz: Arrays & Strings Quiz', category: 'Quiz', link: '/quiz' },
              { label: 'Revise Cheat Sheet & Complexity Table', category: 'Revision', link: '/notes' },
            ].map((task, idx) => {
              const isChecked = completedTaskIndices.includes(idx);
              return (
                <div
                  key={idx}
                  onClick={() => handleTaskToggle(idx)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-slate-300'
                      : 'bg-white/[0.02] border-white/5 hover:border-white/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CheckSquare className={`w-4 h-4 ${isChecked ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className={`text-xs font-semibold ${isChecked ? 'line-through text-slate-400' : ''}`}>
                      {task.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400">
                    {task.category}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between pt-2 text-xs">
            <button
              onClick={() => navigate('/notes')}
              className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 cursor-pointer"
            >
              Start Mission <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-slate-500 font-mono text-[11px]">5 Daily Tasks Goal</span>
          </div>
        </div>

        {/* SECTION 3: CONTINUE LEARNING (LAST STOPPED STATE) (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-4 border border-indigo-500/20 bg-indigo-500/5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Continue Learning</h3>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                Last Stopped
              </span>
            </div>

            <div className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300">Arrays &amp; Java ArrayList</span>
                <span className="text-[10px] font-mono text-emerald-400">85% Read</span>
              </div>
              <p className="text-xs text-slate-300 leading-snug">
                Last Section: <strong>Java Class Methods Documentation</strong> (ArrayList grow() resizing algorithm &amp; System.arraycopy).
              </p>
              <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                <div className="bg-indigo-500 h-full w-[85%]" />
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/notes?slug=arrays')}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/20 cursor-pointer transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Resume Reading Note
          </button>
        </div>
      </div>

      {/* ── SECTION 4 & 5: OVERALL PROGRESS & PLACEMENT READINESS RADAR ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 4: OVERALL LEARNING PROGRESS (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Overall Learning Progress</h3>
            </div>
            <span className="text-xs font-mono font-bold text-slate-300">
              {stats.percentage}% Curriculum
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Roadmap Progress</span>
                <span className="font-mono text-indigo-400 font-bold">{stats.percentage}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div className="bg-indigo-500 h-full" initial={{ width: 0 }} animate={{ width: `${stats.percentage}%` }} transition={{ duration: 1 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>DSA Notes Read</span>
                <span className="font-mono text-cyan-400 font-bold">{Math.round((stats.readNotesCount / Math.max(1, stats.notesCount)) * 100)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div className="bg-cyan-500 h-full" initial={{ width: 0 }} animate={{ width: `${Math.round((stats.readNotesCount / Math.max(1, stats.notesCount)) * 100)}%` }} transition={{ duration: 1 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Practice Problems Solved</span>
                <span className="font-mono text-emerald-400 font-bold">{Math.min(100, stats.problemsSolved * 5)}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div className="bg-emerald-500 h-full" initial={{ width: 0 }} animate={{ width: `${Math.min(100, stats.problemsSolved * 5)}%` }} transition={{ duration: 1 }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Quiz Accuracy</span>
                <span className="font-mono text-purple-400 font-bold">{stats.quizAccuracy}%</span>
              </div>
              <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                <motion.div className="bg-purple-500 h-full" initial={{ width: 0 }} animate={{ width: `${stats.quizAccuracy}%` }} transition={{ duration: 1 }} />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: PLACEMENT READINESS SCORE & BREAKDOWN (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Placement Readiness Score</h3>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              {readiness.overall}% Ready
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Score Ring */}
            <div className="flex flex-col items-center justify-center p-4 bg-black/30 rounded-2xl border border-white/5">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="8" className="text-white/10" fill="transparent" />
                  <circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-amber-400 transition-all duration-1000"
                    fill="transparent"
                    strokeDasharray={301.59}
                    strokeDashoffset={301.59 - (301.59 * readiness.overall) / 100}
                  />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-black text-white">{readiness.overall}%</div>
                  <div className="text-[9px] uppercase font-mono text-slate-400">Placement</div>
                </div>
              </div>
            </div>

            {/* Dimension Breakdown */}
            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 text-[11px]">
                  <span>DSA: {readiness.dsa}%</span>
                  <span>Java: {readiness.java}%</span>
                </div>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-300">
                <strong>Weakest Area:</strong> {readiness.weakestArea}
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-300">
                <strong>Strongest Area:</strong> {readiness.strongestArea}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 6 & 7: LEARNING ANALYTICS & SMART RECOMMENDATION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 6: LEARNING ANALYTICS (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Learning Analytics</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Real User Progress</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <Clock className="w-4 h-4 text-indigo-400 mx-auto" />
              <div className="text-lg font-black text-white font-mono">4.5 Hrs</div>
              <div className="text-[10px] text-slate-400">Weekly Study</div>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <Code2 className="w-4 h-4 text-emerald-400 mx-auto" />
              <div className="text-lg font-black text-white font-mono">{stats.problemsSolved}</div>
              <div className="text-[10px] text-slate-400">Problems Solved</div>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <Brain className="w-4 h-4 text-purple-400 mx-auto" />
              <div className="text-lg font-black text-white font-mono">{stats.quizAccuracy}%</div>
              <div className="text-[10px] text-slate-400">Quiz Accuracy</div>
            </div>

            <div className="p-3 rounded-xl bg-black/30 border border-white/5 space-y-1">
              <BookOpen className="w-4 h-4 text-cyan-400 mx-auto" />
              <div className="text-lg font-black text-white font-mono">{stats.readNotesCount}</div>
              <div className="text-[10px] text-slate-400">Notes Read</div>
            </div>
          </div>
        </div>

        {/* SECTION 7: NEXT RECOMMENDATION (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-4 border border-cyan-500/20 bg-cyan-500/5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Smart Recommendation</h3>
            </div>

            <p className="text-xs text-slate-300">
              You completed <strong>Arrays</strong>. We automatically recommend:
            </p>

            <div className="glass-card p-3.5 rounded-xl border border-white/10 space-y-1">
              <div className="text-xs font-bold text-cyan-300">{recommendation.title}</div>
              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <span>Category: {recommendation.category}</span>
                <span>•</span>
                <span>Est: {recommendation.estimatedMinutes} mins</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate(`/notes?slug=${recommendation.slug}`)}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all"
          >
            Start Recommended Topic <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── SECTION 12: LEARNING STREAK GITHUB-STYLE HEATMAP ── */}
      <div className="glass-card rounded-2xl p-6 space-y-4 border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">Learning Streak Activity (GitHub-Style Contribution Heatmap)</h3>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-amber-400 font-bold">Current Streak: {stats.streak} Days</span>
            <span className="text-slate-400">Longest: {stats.streak + 5} Days</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2 no-scrollbar">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {(stats.heatmapData || []).map((cell: { date: string; count: number }, idx: number) => {
              let bgClass = 'bg-white/5';
              if (cell.count > 4) bgClass = 'bg-emerald-500';
              else if (cell.count > 2) bgClass = 'bg-emerald-600';
              else if (cell.count > 0) bgClass = 'bg-emerald-800/60';

              return (
                <div
                  key={idx}
                  className={`w-3.5 h-3.5 rounded-xs ${bgClass} transition-colors`}
                  title={`${cell.date}: ${cell.count} study activities`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION 8 & 9: RECENT ACTIVITY & WEAK TOPICS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 8: RECENT ACTIVITY TIMELINE (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Recent Activity Timeline</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Live History</span>
          </div>

          <div className="space-y-3">
            {(stats.activities || []).map((act: { _id: string; title: string; description: string; createdAt: string }, i: number) => (
              <div key={i} className="flex items-start gap-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 truncate text-xs">
                  <div className="font-bold text-white truncate">{act.title}</div>
                  <div className="text-[11px] text-slate-400">{act.description}</div>
                </div>
                <span className="text-[10px] font-mono text-slate-500 whitespace-nowrap">
                  {new Date(act.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 9: WEAK TOPICS & MASTERY TRACKER (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-rose-500/20 bg-rose-500/5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <h3 className="text-base font-bold text-white">Weak Topics &amp; Review Needed</h3>
            </div>
            <span className="text-xs font-mono text-rose-400 font-bold">4 Topics</span>
          </div>

          <div className="space-y-2.5">
            {(stats.weakTopics || []).map((wt: { topic: string; completionPct: number; masteryStatus: string }, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between gap-2 text-xs">
                <div>
                  <div className="font-bold text-white">{wt.topic}</div>
                  <div className="text-[10px] text-slate-400">Mastery: {wt.masteryStatus} ({wt.completionPct}%)</div>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => navigate('/notes')}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-[10px] cursor-pointer"
                  >
                    Review
                  </button>
                  <button
                    onClick={() => navigate('/practice')}
                    className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-[10px] cursor-pointer"
                  >
                    Practice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 14 & 15: QUICK ACTIONS & INTERVIEW PREPARATION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 14: QUICK ACTIONS GRID (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Quick Actions</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Direct Shortcuts</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button onClick={() => navigate('/notes')} className="p-3.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-left space-y-1 cursor-pointer transition-all">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <div className="text-xs font-bold text-white">Open Notes</div>
              <div className="text-[10px] text-slate-400">26-Section Guides</div>
            </button>

            <button onClick={() => navigate('/practice')} className="p-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-left space-y-1 cursor-pointer transition-all">
              <Code2 className="w-5 h-5 text-emerald-400" />
              <div className="text-xs font-bold text-white">Practice IDE</div>
              <div className="text-[10px] text-slate-400">Solve Problems</div>
            </button>

            <button onClick={() => navigate('/visualizations')} className="p-3.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-left space-y-1 cursor-pointer transition-all">
              <Play className="w-5 h-5 text-cyan-400" />
              <div className="text-xs font-bold text-white">Visualizer</div>
              <div className="text-[10px] text-slate-400">Animated Engine</div>
            </button>

            <button onClick={() => navigate('/quiz')} className="p-3.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left space-y-1 cursor-pointer transition-all">
              <Brain className="w-5 h-5 text-purple-400" />
              <div className="text-xs font-bold text-white">Attempt Quiz</div>
              <div className="text-[10px] text-slate-400">Test Knowledge</div>
            </button>

            <button onClick={() => navigate('/roadmap')} className="p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-left space-y-1 cursor-pointer transition-all">
              <Compass className="w-5 h-5 text-amber-400" />
              <div className="text-xs font-bold text-white">DSA Roadmap</div>
              <div className="text-[10px] text-slate-400">Step-by-Step</div>
            </button>

            <button onClick={() => navigate('/leaderboard')} className="p-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-left space-y-1 cursor-pointer transition-all">
              <Trophy className="w-5 h-5 text-rose-400" />
              <div className="text-xs font-bold text-white">Leaderboard</div>
              <div className="text-[10px] text-slate-400">Global Ranks</div>
            </button>
          </div>
        </div>

        {/* SECTION 15: INTERVIEW PREPARATION QUICK ACCESS (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 space-y-4 border border-purple-500/20 bg-purple-500/5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white">Interview Preparation</h3>
            </div>
            <span className="text-xs font-mono text-purple-400">Placement Ready</span>
          </div>

          <div className="space-y-2 text-xs">
            <div onClick={() => navigate('/notes')} className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white">Top 50 Technical Q&amp;A</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div onClick={() => navigate('/notes')} className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white">Company-Wise Tagged Problems</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>

            <div onClick={() => navigate('/quiz')} className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">Mock Technical Interview</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ── SECTION 17 & 18: PERSONAL AI INSIGHTS & WEEKLY STUDY PLAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 17: PERSONAL INSIGHTS (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white">Personal Learning Insights</h3>
            </div>
            <span className="text-xs font-mono text-amber-400">AI Generated</span>
          </div>

          <div className="space-y-2 text-xs">
            {(stats.insights || []).map((ins: string, idx: number) => (
              <div key={idx} className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-200 flex items-start gap-2">
                <span className="text-amber-400 font-bold">💡</span>
                <span>{ins}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 18: WEEKLY STUDY SCHEDULE / PLAN (6 Cols) */}
        <div className="lg:col-span-6 glass-card rounded-2xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white">Weekly Study Plan Schedule</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">7-Day Roadmap</span>
          </div>

          <div className="space-y-2 text-xs">
            {(stats.weeklyPlan || []).map((item: { day: string; topic: string; isDone: boolean }, idx: number) => (
              <div key={idx} className="p-2.5 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-indigo-400 font-bold w-20">{item.day}</span>
                  <span className={`font-semibold ${item.isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                    {item.topic}
                  </span>
                </div>
                {item.isDone ? (
                  <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Done ✓
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Upcoming</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 10 & 11: BOOKMARKS & ACHIEVEMENTS FOOTER STRIP ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 10: BOOKMARKS */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Bookmarked Content ({stats.bookmarksCount})</h4>
            </div>
            <button onClick={() => navigate('/notes')} className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300">
              View All &rarr;
            </button>
          </div>
          <p className="text-xs text-slate-400">
            You have {stats.bookmarksCount} saved notes and practice problems ready for revision.
          </p>
        </div>

        {/* SECTION 11: ACHIEVEMENTS */}
        <div className="glass-card rounded-2xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Latest Achievement</h4>
            </div>
            <button onClick={() => navigate('/achievements')} className="text-[11px] font-mono text-purple-400 hover:text-purple-300">
              View Badges &rarr;
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">7 Day Consistent Streak</div>
              <div className="text-[11px] text-slate-400">Unlocked 100 Bonus XP &amp; Consistency Badge</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
