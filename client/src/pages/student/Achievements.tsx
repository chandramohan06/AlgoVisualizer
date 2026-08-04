import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Lock, Sparkles, Zap, Filter, Flame, BookOpen, Brain, Play, Trophy, Target, Star, CheckCircle2 } from 'lucide-react';

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlocked: boolean;
  category: 'beginner' | 'learning' | 'speed' | 'quiz' | 'visualizer' | 'streak' | 'milestone' | 'elite';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  progressPct: number;
  unlockCondition: string;
  unlockedAt?: string;
}

const EXTENDED_ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-1',
    title: 'First Note Read',
    description: 'Read and completed your first DSA theory study note.',
    icon: '📚',
    xpReward: 50,
    unlocked: true,
    category: 'beginner',
    rarity: 'common',
    difficulty: 'Easy',
    progressPct: 100,
    unlockCondition: 'Read 1 DSA Note',
    unlockedAt: '2026-08-01',
  },
  {
    id: 'ach-2',
    title: 'First Quiz Master',
    description: 'Scored 80%+ on your first MCQ quiz assessment.',
    icon: '🧠',
    xpReward: 75,
    unlocked: true,
    category: 'quiz',
    rarity: 'common',
    difficulty: 'Easy',
    progressPct: 100,
    unlockCondition: 'Complete 1 Quiz with 80%+ score',
    unlockedAt: '2026-08-02',
  },
  {
    id: 'ach-3',
    title: 'Visualizer Explorer',
    description: 'Stepped through 10 algorithm animations step-by-step.',
    icon: '🎯',
    xpReward: 100,
    unlocked: true,
    category: 'visualizer',
    rarity: 'rare',
    difficulty: 'Medium',
    progressPct: 100,
    unlockCondition: 'Step through 10 Visualizers',
    unlockedAt: '2026-08-03',
  },
  {
    id: 'ach-4',
    title: '7-Day Streak Warrior',
    description: 'Maintained a daily learning streak for 7 consecutive days.',
    icon: '🔥',
    xpReward: 200,
    unlocked: true,
    category: 'streak',
    rarity: 'epic',
    difficulty: 'Medium',
    progressPct: 100,
    unlockCondition: 'Reach a 7-day streak',
    unlockedAt: '2026-08-04',
  },
  {
    id: 'ach-5',
    title: '1,000 XP Milestone',
    description: 'Accumulated over 1,000 XP from quizzes, notes, and visualizers.',
    icon: '🏆',
    xpReward: 250,
    unlocked: false,
    category: 'milestone',
    rarity: 'epic',
    difficulty: 'Hard',
    progressPct: 65,
    unlockCondition: 'Earn 1,000 Total XP',
  },
  {
    id: 'ach-6',
    title: 'Sorting Specialist',
    description: 'Mastered all 8 sorting algorithm visualizers & cheat sheets.',
    icon: '⚡',
    xpReward: 300,
    unlocked: false,
    category: 'learning',
    rarity: 'rare',
    difficulty: 'Medium',
    progressPct: 75,
    unlockCondition: 'Complete Sorting Category',
  },
  {
    id: 'ach-7',
    title: 'Graph Expert',
    description: 'Mastered BFS, DFS, Dijkstra, Bellman-Ford, and Prim/Kruskal MST.',
    icon: '🌐',
    xpReward: 500,
    unlocked: false,
    category: 'elite',
    rarity: 'legendary',
    difficulty: 'Expert',
    progressPct: 40,
    unlockCondition: 'Complete Graph Algorithms Category',
  },
  {
    id: 'ach-8',
    title: 'DP Master',
    description: 'Mastered Knapsack, LCS, LIS, Coin Change, and Edit Distance.',
    icon: '👑',
    xpReward: 600,
    unlocked: false,
    category: 'elite',
    rarity: 'legendary',
    difficulty: 'Expert',
    progressPct: 30,
    unlockCondition: 'Complete Dynamic Programming Category',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All', icon: Sparkles },
  { key: 'beginner', label: 'Beginner', icon: Star },
  { key: 'learning', label: 'Learning', icon: BookOpen },
  { key: 'speed', label: 'Speed', icon: Zap },
  { key: 'quiz', label: 'Quiz', icon: Brain },
  { key: 'visualizer', label: 'Visualizer', icon: Play },
  { key: 'streak', label: 'Streak', icon: Flame },
  { key: 'milestone', label: 'Milestone', icon: Trophy },
  { key: 'elite', label: 'Elite', icon: Target },
];

const RARITY_STYLES: Record<AchievementItem['rarity'], { badge: string; border: string; glow: string; text: string }> = {
  legendary: { badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40', border: 'border-amber-500/30', glow: '0 0 25px rgba(245,158,11,0.25)', text: 'text-amber-400' },
  epic: { badge: 'bg-purple-500/20 text-purple-300 border-purple-500/40', border: 'border-purple-500/30', glow: '0 0 20px rgba(168,85,247,0.2)', text: 'text-purple-400' },
  rare: { badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40', border: 'border-cyan-500/30', glow: '0 0 15px rgba(6,182,212,0.15)', text: 'text-cyan-400' },
  common: { badge: 'bg-slate-500/20 text-slate-300 border-slate-500/40', border: 'border-white/10', glow: 'none', text: 'text-slate-400' },
};

export const Achievements: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [rarityFilter, setRarityFilter] = useState<string>('all');

  const unlockedCount = EXTENDED_ACHIEVEMENTS.filter((a) => a.unlocked).length;
  const totalCount = EXTENDED_ACHIEVEMENTS.length;
  const totalXP = EXTENDED_ACHIEVEMENTS.filter((a) => a.unlocked).reduce((acc, a) => acc + a.xpReward, 0);
  const completionPercentage = Math.round((unlockedCount / totalCount) * 100);

  const filtered = EXTENDED_ACHIEVEMENTS.filter((item) => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchRarity =
      rarityFilter === 'all' ||
      (rarityFilter === 'unlocked' && item.unlocked) ||
      (rarityFilter === 'locked' && !item.unlocked) ||
      item.rarity === rarityFilter;
    return matchCat && matchRarity;
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. HERO ACHIEVEMENTS 2.0 BANNER ── */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-[#0d1117]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-bl from-purple-500 via-indigo-500 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Achievements &amp; Badges 2.0
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-400" />
              Trophy Gallery &amp; Milestones
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Earn XP, unlock rare badges, and showcase your algorithmic mastery on your developer profile.
            </p>
          </div>

          {/* Progress Pill */}
          <div className="flex items-center gap-6 glass-card px-6 py-4 rounded-2xl border border-white/10 shrink-0">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-16 h-16 -rotate-90">
                <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="5" />
                <motion.circle
                  cx="32"
                  cy="32"
                  r="26"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="5"
                  strokeDasharray={2 * Math.PI * 26}
                  initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 26 * (1 - completionPercentage / 100) }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute font-mono font-bold text-xs text-purple-300">{completionPercentage}%</span>
            </div>

            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">Total Unlocked</div>
              <div className="text-2xl font-black font-mono text-white mt-0.5">
                {unlockedCount} <span className="text-slate-500 text-sm">/ {totalCount}</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-mono text-amber-400 font-bold mt-0.5">
                <Zap className="w-3.5 h-3.5 fill-current" /> +{totalXP} XP Earned
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CATEGORY TABS ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* ── 3. RARITY & STATUS FILTERS ── */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { key: 'all', label: 'All Badges' },
            { key: 'unlocked', label: 'Unlocked' },
            { key: 'locked', label: 'Locked' },
            { key: 'legendary', label: 'Legendary' },
            { key: 'epic', label: 'Epic' },
            { key: 'rare', label: 'Rare' },
            { key: 'common', label: 'Common' },
          ].map((r) => (
            <button
              key={r.key}
              onClick={() => setRarityFilter(r.key)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                rarityFilter === r.key
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5 text-indigo-400" /> Showing {filtered.length} Badges
        </div>
      </div>

      {/* ── 4. ACHIEVEMENTS & BADGES CARDS GRID ── */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((item) => {
            const style = RARITY_STYLES[item.rarity];
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`glass-card rounded-3xl p-5 flex flex-col justify-between relative overflow-hidden group transition-all ${
                  item.unlocked ? style.border : 'opacity-60 border-white/5 bg-black/40'
                }`}
                style={{ boxShadow: item.unlocked ? style.glow : 'none' }}
              >
                {/* Glow Backdrop */}
                {item.unlocked && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />
                )}

                <div className="space-y-3">
                  {/* Icon & Rarity Tag */}
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-transform group-hover:scale-110 shadow-lg ${
                        item.unlocked ? 'bg-white/5 border border-white/10' : 'bg-black/40 grayscale'
                      }`}
                    >
                      {item.icon}
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full border text-[9px] font-mono font-extrabold uppercase ${style.badge}`}>
                        {item.rarity}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 font-bold">{item.difficulty}</span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Progress Bar & Condition */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-500">{item.unlockCondition}</span>
                      <span className="text-indigo-400 font-bold">{item.progressPct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.progressPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer XP & Status */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-current" /> +{item.xpReward} XP
                  </span>

                  {item.unlocked ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" /> Unlocked {item.unlockedAt ? `(${item.unlockedAt})` : ''}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                      <Lock className="w-3 h-3" /> Locked
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default Achievements;
