import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaderboardService } from '@services/leaderboardService';
import { LearningHeatmap } from './LearningHeatmap';
import {
  X, Trophy, Flame, Award, Clock, Target,
  Briefcase, GraduationCap, MapPin, Activity, BookOpen,
  Sparkles, Zap
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

interface StudentProfileModalProps {
  userId: string | null;
  onClose: () => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({ userId, onClose }) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'activity' | 'achievements'>('overview');

  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['studentProfile', userId],
    queryFn: () => (userId ? leaderboardService.getProfile(userId) : null),
    enabled: Boolean(userId),
  });

  if (!userId) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="bg-[#0f141c] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl relative font-sans text-slate-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isLoading ? (
          <div className="p-8 space-y-6">
            <Skeleton className="h-24 rounded-2xl" />
            <Skeleton className="h-48 rounded-2xl" />
          </div>
        ) : error || !profile ? (
          <div className="p-12 text-center text-sm text-slate-400">
            Failed to load student profile details.
          </div>
        ) : (
          <>
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900/40 via-purple-900/30 to-slate-900 p-6 border-b border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shrink-0">
              <div className="flex items-center gap-4 min-w-0">
                {profile.user.avatar ? (
                  <img
                    src={profile.user.avatar}
                    alt={profile.user.name}
                    className="w-16 h-16 rounded-full border-2 border-indigo-500/80 object-cover shadow-lg shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full border-2 border-indigo-500/80 bg-indigo-600/30 text-indigo-200 text-xl font-black flex items-center justify-center shadow-lg shrink-0">
                    {profile.user.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-extrabold text-white truncate">{profile.user.name}</h2>
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[10px] font-mono font-bold uppercase">
                      Rank #{profile.rankInfo.currentRank}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap font-mono">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                      {profile.user.college} ({profile.user.batch})
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                      Target: {profile.user.targetCompany}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      {profile.user.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Quick Stats */}
              <div className="flex items-center gap-3 shrink-0 self-end md:self-center font-mono">
                <div className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">Total XP</span>
                  <span className="text-sm font-black text-amber-400">{profile.rankInfo.totalXP.toLocaleString()}</span>
                </div>
                <div className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">Streak</span>
                  <span className="text-sm font-black text-orange-400 flex items-center justify-center gap-0.5">
                    <Flame className="w-3.5 h-3.5 fill-current" /> {profile.stats.streak}d
                  </span>
                </div>
                <div className="bg-black/40 border border-white/10 px-3 py-1.5 rounded-xl text-center">
                  <span className="text-[9px] text-slate-500 uppercase block font-bold">Score</span>
                  <span className="text-sm font-black text-indigo-300">{profile.rankInfo.rankScore.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Sub-Navigation Tabs */}
            <div className="flex items-center border-b border-white/10 bg-[#141a24] px-6 shrink-0">
              {[
                { id: 'overview',     label: 'Overview & Readiness' },
                { id: 'activity',     label: 'Activity & Heatmap' },
                { id: 'achievements', label: 'Achievements & Badges' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as any)}
                  className={`px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                    activeSubTab === tab.id
                      ? 'text-white border-indigo-500 bg-white/[0.03]'
                      : 'text-slate-500 border-transparent hover:text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">

              {/* SUB-TAB 1: OVERVIEW & READINESS */}
              {activeSubTab === 'overview' && (
                <div className="space-y-6">

                  {/* Placement Readiness Breakdown */}
                  <div className="space-y-3">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" /> Placement Readiness Scores
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                      {Object.entries(profile.placementReadiness).map(([company, readiness]) => (
                        <div key={company} className="bg-black/40 border border-white/10 rounded-xl p-3 text-center space-y-1">
                          <span className="text-[10px] text-slate-400 font-mono font-bold block">{company}</span>
                          <span className="text-base font-black text-emerald-400 font-mono">{readiness}%</span>
                          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${readiness}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Topic Progress & Pattern Mastery */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Topic Progress Bars */}
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" /> Topic Progress
                      </h4>
                      <div className="space-y-2 font-mono text-xs">
                        {Object.entries(profile.topicProgress).slice(0, 6).map(([topic, pct]) => (
                          <div key={topic} className="space-y-1">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-300">{topic}</span>
                              <span className="text-indigo-300 font-bold">{pct}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pattern Mastery */}
                    <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Pattern Mastery
                      </h4>
                      <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                        {Object.entries(profile.patternMastery).slice(0, 6).map(([pattern, pct]) => (
                          <div key={pattern} className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                            <span className="text-[10px] text-slate-400 block truncate">{pattern}</span>
                            <span className="text-sm font-black text-amber-300">{pct}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Quiz Analytics & Performance */}
                  <div className="bg-black/30 border border-white/10 rounded-2xl p-4 space-y-3 font-mono">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5" /> Quiz & Coding Analytics
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase">Questions Solved</span>
                        <span className="block text-sm font-bold text-white">{profile.stats.questionsSolved}</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase">Quiz Accuracy</span>
                        <span className="block text-sm font-bold text-emerald-400">{profile.stats.quizAccuracy}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase">Coding Accuracy</span>
                        <span className="block text-sm font-bold text-cyan-300">{profile.stats.codingAccuracy}%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-0.5">
                        <span className="text-[10px] text-slate-500 uppercase">MCQs Correct</span>
                        <span className="block text-sm font-bold text-amber-300">{profile.stats.mcqsCorrect}/{profile.stats.mcqsAttempted}</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 2: ACTIVITY & HEATMAP */}
              {activeSubTab === 'activity' && (
                <div className="space-y-6">
                  {/* GitHub-style Learning Heatmap */}
                  <LearningHeatmap data={profile.heatmap} />

                  {/* Recent Activity Timeline */}
                  <div className="space-y-3 font-mono">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-400" /> Recent Activity Timeline
                    </h3>
                    <div className="space-y-2">
                      {profile.recentActivity.map((log) => (
                        <div key={log._id} className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-3 text-xs">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                              <Zap className="w-3.5 h-3.5" />
                            </span>
                            <div>
                              <span className="font-bold text-white block">{log.title}</span>
                              <span className="text-[10px] text-slate-400">{log.description}</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                            +{log.xpEarned} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: ACHIEVEMENTS & BADGES */}
              {activeSubTab === 'achievements' && (
                <div className="space-y-4 font-mono">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" /> Unlocked Achievements & Badges
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {profile.achievements.map((ach) => (
                      <div key={ach.id} className="p-4 rounded-xl bg-black/40 border border-amber-500/30 flex items-start gap-3 shadow-md">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{ach.title}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5">{ach.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentProfileModal;
