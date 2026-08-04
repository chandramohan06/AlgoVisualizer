import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Award,
  Flame,
  Zap,
  Globe,
  Download,
  Building2,
  Bookmark,
  Sparkles,
  ExternalLink,
  Trash2,
  BookOpen,
  Play,
  Brain,
  Clock,
  Code2,
} from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { useBookmarks } from '@hooks/useBookmarks';
import { useNavigate } from 'react-router-dom';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { bookmarks, removeBookmark } = useBookmarks();
  const [activeTab, setActiveTab] = useState<'overview' | 'bookmarks' | 'badges' | 'activity'>('overview');

  const name = user?.name || 'Chandra Mohan Kumar';
  const email = user?.email || 'student@algovisualizer.com';
  const streak = user?.streak || 7;
  const xp = (user as any)?.totalXP ?? (user as any)?.xp ?? 650;
  const level = Math.max(1, Math.floor(xp / 300) + 1);

  const college = 'Indian Institute of Technology (IIT)';
  const targetCompany = 'Google / Microsoft / Amazon';
  const github = 'https://github.com/chandramohan06';
  const portfolio = 'https://algovisualizer.onrender.com';
  const bio = 'Passionate Full Stack & Algorithmic Software Engineer mastering Data Structures and Systems Design.';

  const badges = [
    { title: 'First Note Read', icon: '📚', rarity: 'Common', date: 'Aug 2026' },
    { title: 'Quiz Master', icon: '🧠', rarity: 'Common', date: 'Aug 2026' },
    { title: 'Visualizer Explorer', icon: '🎯', rarity: 'Rare', date: 'Aug 2026' },
    { title: '7-Day Streak Warrior', icon: '🔥', rarity: 'Epic', date: 'Aug 2026' },
  ];

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. PORTFOLIO COVER BANNER & PROFILE HEADER ── */}
      <div className="glass-card rounded-3xl overflow-hidden border border-white/10 relative shadow-2xl">
        {/* Cover Banner */}
        <div className="h-44 md:h-56 bg-gradient-to-r from-indigo-900 via-purple-900 to-cyan-900 relative p-6 flex items-end">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-black/60 pointer-events-none" />

          {/* Social Links & Resume Download Button */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 flex flex-wrap items-center gap-2.5 z-10">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="GitHub Profile"
              >
                <Code2 className="w-4 h-4" />
              </a>
            )}
            {portfolio && (
              <a
                href={portfolio}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-2xl bg-black/40 hover:bg-black/60 border border-white/10 text-slate-300 hover:text-white transition-all"
                title="Portfolio Website"
              >
                <Globe className="w-4 h-4" />
              </a>
            )}
            <button
              onClick={() => alert('Downloading Developer Portfolio Resume PDF...')}
              className="px-4 py-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer transition-all active:scale-95"
            >
              <Download className="w-3.5 h-3.5" /> Resume PDF
            </button>
          </div>
        </div>

        {/* User Info Bar */}
        <div className="p-6 md:p-8 pt-0 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 -mt-16 md:-mt-20">
            {/* Avatar & Badges */}
            <div className="flex flex-col sm:flex-row items-center md:items-end gap-5 text-center sm:text-left">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-1 shadow-2xl border-4 border-[#0d1117] shrink-0">
                <div className="w-full h-full rounded-2xl bg-[#0d1117] flex items-center justify-center text-4xl font-black text-indigo-400">
                  {name.charAt(0)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-2xl md:text-3xl font-black text-white">{name}</h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
                    Level {level}
                  </span>
                </div>
                <p className="text-xs font-mono text-slate-400 flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> {email}
                </p>
                <p className="text-xs text-slate-300 max-w-xl pt-1 leading-relaxed">{bio}</p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="flex items-center justify-center gap-3 shrink-0">
              <div className="px-4 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
                <div className="text-xl font-black text-amber-300 font-mono flex items-center justify-center gap-1">
                  <Flame className="w-5 h-5 text-amber-400 fill-current" /> {streak} Days
                </div>
                <div className="text-[10px] font-mono text-amber-400/80 uppercase tracking-wider">Active Streak</div>
              </div>

              <div className="px-4 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
                <div className="text-xl font-black text-indigo-300 font-mono flex items-center justify-center gap-1">
                  <Zap className="w-5 h-5 text-indigo-400 fill-current" /> {xp} XP
                </div>
                <div className="text-[10px] font-mono text-indigo-400/80 uppercase tracking-wider">Total XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. PROFILE TABBED NAVIGATION ── */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar">
        {[
          { key: 'overview', label: 'Overview & Target' },
          { key: 'bookmarks', label: `Bookmarked (${bookmarks.length})` },
          { key: 'badges', label: `Badges (${badges.length})` },
          { key: 'activity', label: 'Learning History' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.key
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── 3. TAB CONTENT ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-extrabold font-mono uppercase text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-purple-400" /> Career &amp; Academic Background
            </h3>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">College / University</span>
                <p className="font-extrabold text-white">{college}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-500 uppercase">Target Companies</span>
                <p className="font-extrabold text-cyan-300">{targetCompany}</p>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
            <h3 className="text-sm font-extrabold font-mono uppercase text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" /> Streak &amp; Target Goal Status
            </h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-slate-400 font-mono">Current Learning Streak</span>
                <span className="font-black text-amber-400 font-mono text-sm">{streak} Days 🔥</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-slate-400 font-mono">Longest Historical Streak</span>
                <span className="font-black text-indigo-400 font-mono text-sm">14 Days</span>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-2xl bg-black/30 border border-white/5">
                <span className="text-slate-400 font-mono">Freeze Days Available</span>
                <span className="font-black text-emerald-400 font-mono text-sm">2 Freeze Days</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookmarks' && (
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-sm font-extrabold font-mono uppercase text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-amber-400" /> Bookmarked Content Gallery
            </h3>
            <span className="text-xs font-mono text-slate-400">{bookmarks.length} Saved Items</span>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-mono">
              No saved bookmarks. Click the bookmark icon on any note or visualizer to save it here!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 flex items-center justify-between gap-4 transition-all"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-mono font-bold uppercase">
                        {item.type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                    </div>
                    <h4 className="text-xs font-extrabold text-white truncate">{item.title}</h4>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => navigate(item.path)}
                      className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer"
                      title="Open Bookmarked Page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => removeBookmark(item.id)}
                      className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all cursor-pointer"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b, idx) => (
            <div key={idx} className="glass-card p-5 rounded-3xl border border-purple-500/20 space-y-2 text-center">
              <div className="text-4xl">{b.icon}</div>
              <h4 className="text-xs font-extrabold text-white">{b.title}</h4>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 text-[10px] font-mono font-bold">
                {b.rarity} • {b.date}
              </span>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="glass-card rounded-3xl p-6 border border-white/10 space-y-3">
          {[
            { title: 'Read Arrays & ArrayList Note', date: '2 hours ago', icon: BookOpen },
            { title: 'Visualized BFS Traversal', date: '5 hours ago', icon: Play },
            { title: 'Completed Arrays MCQ Quiz', date: 'Yesterday', icon: Brain },
            { title: 'Unlocked 7-Day Streak Warrior Badge', date: '2 days ago', icon: Award },
          ].map((act, idx) => {
            const Icon = act.icon;
            return (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-xs">
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-indigo-400" />
                  <span className="font-extrabold text-white">{act.title}</span>
                </div>
                <span className="font-mono text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {act.date}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
