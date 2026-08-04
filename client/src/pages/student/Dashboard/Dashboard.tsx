import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Brain,
  Award,
  RefreshCw,
  Search,
  Sparkles,
  Play,
  Clock,
  ChevronRight,
  Zap,
  Bookmark,
  Compass,
  Building2,
  HelpCircle,
} from 'lucide-react';
import { useFullDashboardStats } from '@hooks/useDashboard';
import { DashboardSkeleton } from '@components/common/Skeleton';
import { WelcomeCard } from '@components/dashboard/WelcomeCard';
import { ProgressSection } from '@components/dashboard/ProgressSection';
import { ContinueLearningCard } from '@components/dashboard/ContinueLearningCard';
import { RecentActivityCard } from '@components/dashboard/RecentActivityCard';
import { ContributionHeatmap } from '@components/dashboard/ContributionHeatmap';
import { GoalCard } from '@components/dashboard/GoalCard';
import { useUIStore } from '@store/uiStore';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data: stats, isLoading, isError, refetch } = useFullDashboardStats();
  const { setSearchOpen } = useUIStore();

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
        <button onClick={() => refetch()} className="btn-primary flex items-center gap-2 cursor-pointer">
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 min-h-screen text-slate-200 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. UNIVERSAL SEARCH & QUICK NAV BAR ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 glass-card p-3.5 rounded-2xl border border-white/10 shadow-lg">
        <div
          onClick={() => setSearchOpen(true)}
          className="relative w-full md:w-96 cursor-pointer group"
        >
          <Search className="w-4 h-4 text-indigo-400 absolute left-3.5 top-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform" />
          <input
            type="text"
            readOnly
            placeholder="Universal Search (Algorithms, Notes, Quiz, Visualizer)..."
            className="w-full bg-[#0d1117] border border-white/10 rounded-xl pl-10 pr-12 py-2 text-xs text-white placeholder-slate-500 cursor-pointer focus:outline-none group-hover:border-indigo-500/50 transition-all font-mono"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded">
            ⌘K
          </span>
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
            onClick={() => navigate('/quiz')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Brain className="w-3.5 h-3.5 text-purple-400" /> Quiz
          </button>

          <button
            onClick={() => navigate('/algorithms')}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5 text-emerald-400" /> DSA Roadmap
          </button>
        </div>
      </div>

      {/* ── 2. HERO WELCOME COMMAND CENTER CARD ── */}
      <WelcomeCard onNavigateToLearning={() => navigate('/algorithms')} />

      {/* ── 3. CONTINUE LEARNING SESSIONS ── */}
      <ContinueLearningCard />

      {/* ── 4. DAILY PROGRESS BREAKDOWN & CATEGORY MASTERY ── */}
      <ProgressSection stats={stats} />

      {/* ── 5. LEARNING ANALYTICS METRICS GRID ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-1 text-center">
          <Zap className="w-5 h-5 text-amber-400 mx-auto" />
          <div className="text-xl font-black text-white font-mono">{stats.todayXP || 115} XP</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Today&apos;s XP</div>
        </div>

        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-1 text-center">
          <Award className="w-5 h-5 text-indigo-400 mx-auto" />
          <div className="text-xl font-black text-white font-mono">{stats.totalXP || 650} XP</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Weekly XP</div>
        </div>

        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-1 text-center">
          <Clock className="w-5 h-5 text-cyan-400 mx-auto" />
          <div className="text-xl font-black text-white font-mono">{stats.learningTimeToday || '45m'}</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Learning Time</div>
        </div>

        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-1 text-center">
          <BookOpen className="w-5 h-5 text-emerald-400 mx-auto" />
          <div className="text-xl font-black text-white font-mono">{stats.readNotesCount || 15}</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Modules Completed</div>
        </div>

        <div className="glass-card p-4 rounded-3xl border border-white/10 space-y-1 text-center col-span-2 sm:col-span-1">
          <Brain className="w-5 h-5 text-purple-400 mx-auto" />
          <div className="text-xl font-black text-white font-mono">{stats.quizAccuracy || 82}%</div>
          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Avg Quiz Score</div>
        </div>
      </div>

      {/* ── 6. RECENT ACTIVITY TIMELINE & GOAL TRACKING ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RecentActivityCard />
        </div>
        <div className="lg:col-span-5">
          <GoalCard />
        </div>
      </div>

      {/* ── 7. WEEKLY LEARNING HEATMAP ── */}
      <ContributionHeatmap />

      {/* ── 8. QUICK ACCESS SHORTCUTS & INTERVIEW PREPARATION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* QUICK ACCESS (7 Cols) */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" />
              <h3 className="text-base font-bold text-white font-mono">Quick Access Cards</h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Direct Navigation</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onClick={() => navigate('/visualizations')} className="p-4 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-left space-y-2 cursor-pointer transition-all active:scale-95 group">
              <Play className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-extrabold text-white">Visualizer</div>
                <div className="text-[10px] text-slate-400">Step-by-Step</div>
              </div>
            </button>

            <button onClick={() => navigate('/notes')} className="p-4 rounded-2xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-left space-y-2 cursor-pointer transition-all active:scale-95 group">
              <BookOpen className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-extrabold text-white">DSA Notes</div>
                <div className="text-[10px] text-slate-400">26 Sections</div>
              </div>
            </button>

            <button onClick={() => navigate('/quiz')} className="p-4 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 text-left space-y-2 cursor-pointer transition-all active:scale-95 group">
              <Brain className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-extrabold text-white">Quiz Engine</div>
                <div className="text-[10px] text-slate-400">Test Accuracy</div>
              </div>
            </button>

            <button onClick={() => navigate('/algorithms')} className="p-4 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-left space-y-2 cursor-pointer transition-all active:scale-95 group">
              <Compass className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div>
                <div className="text-xs font-extrabold text-white">DSA Roadmap</div>
                <div className="text-[10px] text-slate-400">A2Z Guide</div>
              </div>
            </button>
          </div>
        </div>

        {/* INTERVIEW PREPARATION (5 Cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 space-y-4 border border-purple-500/20 bg-purple-500/5">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-purple-400" />
              <h3 className="text-base font-bold text-white font-mono">Interview Preparation</h3>
            </div>
            <span className="text-xs font-mono text-purple-400 font-bold">Placement Hub</span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div onClick={() => navigate('/notes')} className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all group">
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span className="font-bold text-white group-hover:text-purple-300">Top 50 Technical Q&amp;A</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <div onClick={() => navigate('/notes')} className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all group">
              <div className="flex items-center gap-2.5">
                <Building2 className="w-4 h-4 text-cyan-400" />
                <span className="font-bold text-white group-hover:text-cyan-300">Company-Wise Tagged Topics</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>

            <div onClick={() => navigate('/quiz')} className="p-3 rounded-2xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-purple-500/40 cursor-pointer transition-all group">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white group-hover:text-amber-300">Mock Placement Quiz</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* ── 9. BOOKMARKS & ACHIEVEMENTS FOOTER STRIP ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BOOKMARKS */}
        <div className="glass-card rounded-3xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Bookmarked Content ({stats.bookmarksCount || 0})</h4>
            </div>
            <button onClick={() => navigate('/notes')} className="text-[11px] font-mono text-indigo-400 hover:text-indigo-300 font-bold">
              View All &rarr;
            </button>
          </div>
          <p className="text-xs text-slate-400">
            {stats.bookmarksCount > 0
              ? `You have ${stats.bookmarksCount} saved notes ready for revision.`
              : 'No bookmarked items yet.'}
          </p>
        </div>

        {/* ACHIEVEMENTS */}
        <div className="glass-card rounded-3xl p-5 border border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">Latest Achievement</h4>
            </div>
            <button onClick={() => navigate('/achievements')} className="text-[11px] font-mono text-purple-400 hover:text-purple-300 font-bold">
              View Badges &rarr;
            </button>
          </div>
          {stats.latestAchievement ? (
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{stats.latestAchievement.title}</div>
                <div className="text-[11px] text-slate-400">{stats.latestAchievement.description}</div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-1">No achievements unlocked yet.</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
