import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { leaderboardService, LeaderboardQueryParams } from '@services/leaderboardService';
import { PodiumCards } from '@components/leaderboard/PodiumCards';
import { StudentProfileModal } from '@components/leaderboard/StudentProfileModal';
import { useAuthStore } from '@store/authStore';
import { getInitials } from '@utils/index';
import {
  Trophy, Flame, Search, Filter, ArrowUpRight, ArrowDownRight,
  RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const Leaderboard: React.FC = () => {
  const { user: currentUser } = useAuthStore();
  // Leaderboard filters & view state
  const [viewType, setViewType] = useState<'global' | 'college' | 'batch' | 'weekly' | 'monthly' | 'alltime'>('global');
  const [collegeFilter, setCollegeFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  // Fetch rankings with real-time filters
  const queryParams: LeaderboardQueryParams = {
    type: viewType,
    college: collegeFilter,
    batch: batchFilter,
    company: companyFilter,
    search: searchQuery,
    page,
    limit: 20,
  };

  const { data, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['leaderboard', queryParams],
    queryFn: () => leaderboardService.getLeaderboard(queryParams),
    staleTime: 30 * 1000,
  });

  const rankings = data?.entries || [];
  const topThree = rankings.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6 font-sans text-slate-200">
      
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-purple-500/10 border border-white/10 p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Real-Time DSA Leaderboard</h1>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-mono font-bold uppercase">
              Live Rankings
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
            Multi-factor weighted ranking rewarding consistency, learning speed, accuracy, coding performance, and placement readiness across real platform students.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
          <span>Sync Real-Time</span>
        </button>
      </div>

      {/* Top 3 Podium Display */}
      {!isLoading && topThree.length > 0 && (
        <PodiumCards topThree={topThree} onUserClick={(id) => setSelectedUserId(id)} />
      )}

      {/* Control Toolbar — Views & Filters */}
      <div className="rounded-2xl bg-[#11161d] border border-white/10 p-4 space-y-4 shadow-xl">
        {/* Row 1: Leaderboard View Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/5 pb-3">
          <div className="flex rounded-xl bg-black/40 border border-white/5 p-1 overflow-x-auto max-w-full">
            {(
              [
                { id: 'global',  label: 'Global' },
                { id: 'college', label: 'College' },
                { id: 'batch',   label: 'Batch' },
                { id: 'weekly',  label: 'Weekly' },
                { id: 'monthly', label: 'Monthly' },
                { id: 'alltime', label: 'All Time' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setViewType(tab.id); setPage(1); }}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  viewType === tab.id
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              placeholder="Search student name..."
              className="w-full h-8 pl-8 pr-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>
        </div>

        {/* Row 2: Secondary Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span className="uppercase font-bold text-[10px]">Filters:</span>
          </div>

          {/* College Select */}
          <select
            value={collegeFilter}
            onChange={(e) => { setCollegeFilter(e.target.value); setPage(1); }}
            className="h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Colleges</option>
            <option value="IIT Bombay">IIT Bombay</option>
            <option value="BITS Pilani">BITS Pilani</option>
            <option value="NIT Trichy">NIT Trichy</option>
            <option value="VIT Vellore">VIT Vellore</option>
            <option value="Delhi Technological University">DTU Delhi</option>
            <option value="IIIT Hyderabad">IIIT Hyderabad</option>
            <option value="IIT Delhi">IIT Delhi</option>
            <option value="RV College of Engineering">RVCE Bangalore</option>
          </select>

          {/* Batch Select */}
          <select
            value={batchFilter}
            onChange={(e) => { setBatchFilter(e.target.value); setPage(1); }}
            className="h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="">All Batches</option>
            <option value="2025">Batch 2025</option>
            <option value="2026">Batch 2026</option>
            <option value="2027">Batch 2027</option>
          </select>

          {/* Company Prep Select */}
          <select
            value={companyFilter}
            onChange={(e) => { setCompanyFilter(e.target.value); setPage(1); }}
            className="h-8 px-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono cursor-pointer focus:outline-none focus:border-indigo-500"
          >
            <option value="">Target Company</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="Meta">Meta</option>
            <option value="TCS">TCS</option>
            <option value="Accenture">Accenture</option>
            <option value="Cognizant">Cognizant</option>
          </select>

          {(collegeFilter || batchFilter || companyFilter || searchQuery) && (
            <button
              onClick={() => { setCollegeFilter(''); setBatchFilter(''); setCompanyFilter(''); setSearchQuery(''); setPage(1); }}
              className="text-[11px] text-amber-400 hover:underline cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Ranking Table */}
      <div className="rounded-2xl bg-[#11161d] border border-white/10 overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-6 space-y-3">
            <Skeleton className="h-12 rounded-xl" count={6} />
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-slate-400">
            Failed to load rankings. Please ensure backend is running.
          </div>
        ) : rankings.length === 0 ? (
          <div className="p-16 text-center text-sm text-slate-400 font-mono flex flex-col items-center justify-center space-y-2">
            <Trophy className="w-12 h-12 text-slate-600 mb-2 opacity-50" />
            <span className="text-base font-bold text-slate-300">No students have registered yet.</span>
            <span className="text-xs text-slate-500">As soon as students sign up, they will automatically appear on the live leaderboard.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="border-b border-white/10 bg-[#161d27] text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                  <th className="py-3.5 px-4 text-center">Rank</th>
                  <th className="py-3.5 px-4">Student</th>
                  <th className="py-3.5 px-4">College &amp; Batch</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 text-center">Questions</th>
                  <th className="py-3.5 px-4 text-center">Quiz Acc.</th>
                  <th className="py-3.5 px-4 text-center">Readiness</th>
                  <th className="py-3.5 px-4 text-right">Score</th>
                  <th className="py-3.5 px-4 text-right">XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {rankings.map((entry) => {
                  const isTop3 = entry.currentRank <= 3;
                  const isCurrentUser = currentUser && entry.userId._id === currentUser._id;

                  return (
                    <tr
                      key={entry._id}
                      onClick={() => setSelectedUserId(entry.userId._id)}
                      className={`transition-colors cursor-pointer group ${
                        isCurrentUser
                          ? 'bg-indigo-600/20 hover:bg-indigo-600/30 border-l-4 border-l-indigo-500 font-semibold'
                          : 'hover:bg-indigo-600/10'
                      }`}
                    >
                      {/* Rank & Trend */}
                      <td className="py-3.5 px-4 font-mono text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <span className={`font-bold ${isTop3 ? 'text-amber-400 text-sm' : 'text-slate-400'}`}>
                            #{entry.currentRank}
                          </span>
                          {entry.rankTrend === 'up' && (
                            <span className="text-[10px] text-emerald-400 font-bold flex items-center" title={`Up ${entry.trendValue} places`}>
                              <ArrowUpRight className="w-3 h-3" />+{entry.trendValue}
                            </span>
                          )}
                          {entry.rankTrend === 'down' && (
                            <span className="text-[10px] text-rose-400 font-bold flex items-center" title={`Down ${entry.trendValue} places`}>
                              <ArrowDownRight className="w-3 h-3" />-{entry.trendValue}
                            </span>
                          )}
                          {entry.rankTrend === 'new' && (
                            <span className="text-[9px] text-cyan-400 font-bold px-1 rounded bg-cyan-500/10 border border-cyan-500/30">
                              NEW
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Student Profile Info */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          {entry.userId.avatar ? (
                            <img
                              src={entry.userId.avatar}
                              alt={entry.userId.name}
                              className="w-8 h-8 rounded-full border border-white/10 object-cover shrink-0 group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full border border-white/10 bg-indigo-600/30 text-indigo-200 text-xs font-bold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform font-mono">
                              {getInitials(entry.userId.name)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                                {entry.userId.name}
                              </span>
                              {isCurrentUser && (
                                <span className="px-1.5 py-0.2 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-[9px] font-mono font-bold shrink-0">
                                  My Rank
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono block truncate">
                              Target: {entry.userId.targetCompany || 'Amazon'}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* College & Batch */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-300 block truncate max-w-[180px]">
                          {entry.userId.college || 'General Institute'}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          Batch {entry.userId.batch || '2026'}
                        </span>
                      </td>

                      {/* Streak */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="inline-flex items-center gap-1 font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/20">
                          <Flame className="w-3 h-3 fill-current" />
                          {entry.streak}d
                        </span>
                      </td>

                      {/* Questions Solved */}
                      <td className="py-3.5 px-4 text-center font-mono text-slate-200">
                        {entry.questionsSolved}
                      </td>

                      {/* Quiz Accuracy */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                        {entry.accuracy}%
                      </td>

                      {/* Placement Readiness Badge */}
                      <td className="py-3.5 px-4 text-center font-mono">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                          {entry.userId.targetCompany || 'Amazon'} {(entry.placementReadiness as any)?.[entry.userId.targetCompany || 'Amazon'] || 84}%
                        </span>
                      </td>

                      {/* Weighted Rank Score */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        {entry.rankScore.toLocaleString()}
                      </td>

                      {/* Total XP */}
                      <td className="py-3.5 px-4 text-right font-mono font-black text-amber-400">
                        {entry.totalPoints.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer Pagination */}
        {data && data.totalPages > 1 && (
          <div className="p-4 border-t border-white/10 bg-[#161d27] flex items-center justify-between font-mono text-xs text-slate-400">
            <span>
              Page {data.page} of {data.totalPages} ({data.total} entries)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Detailed Student Profile Modal */}
      <StudentProfileModal
        userId={selectedUserId}
        onClose={() => setSelectedUserId(null)}
      />

    </div>
  );
};

export default Leaderboard;
