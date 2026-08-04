import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  Zap,
  Brain,
  ShieldCheck,
  Target,
  Sparkles,
  Lightbulb,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
} from 'lucide-react';
import { ContributionHeatmap } from '@components/dashboard/ContributionHeatmap';
import { SkillRadarChart } from '@components/dashboard/SkillRadarChart';
import { ProgressRing } from '@components/common/ProgressRing';

export const AnalyticsPage: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');

  const insights = [
    { title: 'Strong Pattern Mastery', text: 'You are strongest in Arrays & Two-Pointer patterns with 92% accuracy.', type: 'positive' },
    { title: 'Recommended Focus', text: 'Graphs & Dynamic Programming require 2 more visualizer sessions to reach 80% mastery.', type: 'warning' },
    { title: 'Quiz Improvement', text: 'Your quiz accuracy increased by 12% over the last 14 days.', type: 'positive' },
    { title: 'Streak Consistency', text: 'You are on a 7-day active daily streak. Completing 1 more note unlocks 1,000 XP.', type: 'info' },
    { title: 'Placement Readiness', text: 'Complete DP Tabulation cheat sheet to boost company readiness score to 90%.', type: 'info' },
  ];

  const trendData = {
    daily: [
      { label: 'Mon', xp: 45, time: 25 },
      { label: 'Tue', xp: 60, time: 35 },
      { label: 'Wed', xp: 90, time: 50 },
      { label: 'Thu', xp: 120, time: 60 },
      { label: 'Fri', xp: 75, time: 40 },
      { label: 'Sat', xp: 110, time: 55 },
      { label: 'Sun', xp: 150, time: 70 },
    ],
    weekly: [
      { label: 'W1', xp: 350, time: 180 },
      { label: 'W2', xp: 480, time: 240 },
      { label: 'W3', xp: 620, time: 310 },
      { label: 'W4', xp: 750, time: 390 },
    ],
    monthly: [
      { label: 'May', xp: 1200, time: 600 },
      { label: 'Jun', xp: 1800, time: 920 },
      { label: 'Jul', xp: 2400, time: 1150 },
      { label: 'Aug', xp: 3100, time: 1400 },
    ],
    yearly: [
      { label: '2024', xp: 4500, time: 2200 },
      { label: '2025', xp: 9800, time: 4800 },
      { label: '2026', xp: 15400, time: 7500 },
    ],
  };

  const currentTrend = trendData[timeframe];
  const maxXP = Math.max(...currentTrend.map((t) => t.xp));

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. HEADER BANNER ── */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-indigo-950/20 to-[#0d1117]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-bl from-cyan-500 via-indigo-500 to-transparent" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
              <Activity className="w-3.5 h-3.5" /> Platform Learning Analytics
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-cyan-400" />
              Learning Performance &amp; Insights
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl">
              Deep telemetry tracking your study time, XP growth, topic mastery, consistency, and placement readiness.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/10 shrink-0">
            {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold capitalize transition-all cursor-pointer ${
                  timeframe === t
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. METRIC HIGHLIGHTS STRIP ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" /> Study Time
          </span>
          <div className="text-2xl font-black text-white font-mono">14.5 Hrs</div>
          <p className="text-[11px] text-emerald-400 font-mono">+18% vs last week</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" /> XP Growth
          </span>
          <div className="text-2xl font-black text-white font-mono">1,450 XP</div>
          <p className="text-[11px] text-emerald-400 font-mono">+240 XP today</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
            <Brain className="w-3.5 h-3.5 text-purple-400" /> Quiz Accuracy
          </span>
          <div className="text-2xl font-black text-white font-mono">88%</div>
          <p className="text-[11px] text-emerald-400 font-mono">+12% over 14d</p>
        </div>

        <div className="glass-card p-5 rounded-3xl border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Readiness
          </span>
          <div className="text-2xl font-black text-white font-mono">84%</div>
          <p className="text-[11px] text-indigo-400 font-mono">Top 5% Learner</p>
        </div>
      </div>

      {/* ── 3. XP GROWTH & TIME CHARTS (BAR & AREA) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* BAR CHART: XP Growth */}
        <div className="lg:col-span-7 glass-card rounded-3xl p-6 border border-white/10 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold uppercase font-mono text-white flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" /> XP Growth Trend ({timeframe})
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">Experience points accumulated across study sessions</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 font-bold bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              +{currentTrend[currentTrend.length - 1].xp} XP Peak
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2 border-b border-white/10">
            {currentTrend.map((item, idx) => {
              const heightPct = Math.round((item.xp / maxXP) * 100);
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {item.xp}
                  </span>
                  <div className="w-full bg-slate-800 rounded-t-xl overflow-hidden h-40 flex items-end">
                    <motion.div
                      className="w-full bg-gradient-to-t from-cyan-600 via-indigo-500 to-purple-500 rounded-t-xl"
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.8, delay: idx * 0.05 }}
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* RADAR CHART: Topic Mastery */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-sm font-extrabold uppercase font-mono text-white flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-purple-400" /> Topic Mastery Breakdown
            </h2>
            <span className="text-[11px] font-mono text-slate-400">DSA Skill Radar</span>
          </div>

          <SkillRadarChart />
        </div>
      </div>

      {/* ── 4. INSIGHTS ENGINE ── */}
      <div className="glass-card rounded-3xl p-6 border border-amber-500/20 bg-amber-500/5 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-extrabold text-white font-mono">Automated Learning Insights Engine</h2>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            Real-time Telemetry
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {insights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-2 hover:border-white/10 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> {item.title}
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/5 text-slate-400">
                  {item.type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 5. MODULE COMPLETION & PROGRESS RINGS ── */}
      <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold uppercase font-mono text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" /> Module Completion Progress Rings
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Overall curriculum mastery across core modules</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
          {[
            { label: 'Arrays', pct: 90, sub: '18/20' },
            { label: 'Sorting', pct: 75, sub: '6/8' },
            { label: 'Trees', pct: 60, sub: '6/10' },
            { label: 'Graphs', pct: 40, sub: '4/10' },
            { label: 'DP', pct: 30, sub: '3/10' },
            { label: 'Greedy', pct: 80, sub: '4/5' },
          ].map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <ProgressRing percentage={item.pct} size={72} strokeWidth={6} label={item.label} sublabel={item.sub} />
            </div>
          ))}
        </div>
      </div>

      {/* ── 6. 90-DAY CONTRIBUTION HEATMAP ── */}
      <ContributionHeatmap />
    </motion.div>
  );
};

export default AnalyticsPage;
