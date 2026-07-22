import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { generate100EasyQuestions, IPracticeQuestion } from '../../data/practice100EasyQuestions';
import practiceService from '../../services/practiceService';
import { useUserProgress } from '../../hooks/useUserProgress';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Circle,
  Clock,
  Building2,
  Tag,
  ChevronRight,
  Flame,
  Zap,
  Percent,
  Layers,
  Award,
  BookOpen,
  Send,
} from 'lucide-react';

const TOPICS_LIST = [
  'All',
  'Arrays',
  'Strings',
  'Binary Search',
  'Sorting',
  'Linked List',
  'Stack',
  'Queue',
  'Tree',
  'BST',
  'Heap',
  'HashMap',
  'Recursion',
  'Two Pointer',
  'Sliding Window',
];

const COMPANIES_LIST = [
  'All',
  'Amazon',
  'Google',
  'Microsoft',
  'Meta',
  'Apple',
  'Uber',
  'Adobe',
  'Netflix',
  'Flipkart',
  'Bloomberg',
];

export const PracticeList: React.FC = () => {
  const navigate = useNavigate();

  // Central React Query Progress hook - Single Source of Truth
  const { progress, isLoading: isProgressLoading, invalidateProgress, isProblemSolved, isProblemAttempted, isProblemBookmarked } = useUserProgress();

  // Dataset & Loading State
  const rawQuestions = useMemo(() => generate100EasyQuestions(), []);

  // Merge static catalog with React Query User Progress
  const questions: IPracticeQuestion[] = useMemo(() => {
    const map = progress?.problemProgressMap || {};

    return rawQuestions.map((q) => {
      const detail = map[q.id] || map[q.slug || ''] || map[String(q.number)];
      const isSolved = isProblemSolved(q.id) || isProblemSolved(q.slug) || isProblemSolved(q.number);
      const isAttempted = isProblemAttempted(q.id) || isProblemAttempted(q.slug) || isProblemAttempted(q.number);
      const isBookmarked = isProblemBookmarked(q.id) || isProblemBookmarked(q.slug) || isProblemBookmarked(q.number);

      let currentStatus: 'Not Attempted' | 'Attempted' | 'Solved' = 'Not Attempted';
      if (isSolved) currentStatus = 'Solved';
      else if (isAttempted) currentStatus = 'Attempted';

      return {
        ...q,
        isSolved,
        isBookmarked,
        status: currentStatus,
        firstAcTime: detail?.firstAcceptedAt ? new Date(detail.firstAcceptedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : q.firstAcTime,
        bestRuntime: detail?.bestRuntime || q.bestRuntime,
        bestMemory: detail?.bestMemory || q.bestMemory,
      };
    });
  }, [rawQuestions, progress, isProblemSolved, isProblemAttempted, isProblemBookmarked]);

  // Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedCompany, setSelectedCompany] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Topic Statistics Breakdown (Dynamically Calculated)
  const topicStatsMap = useMemo(() => {
    const map: Record<string, { solved: number; total: number }> = {};
    TOPICS_LIST.filter((t) => t !== 'All').forEach((t) => {
      map[t] = { solved: 0, total: 0 };
    });

    questions.forEach((q) => {
      const top = q.topic || q.category || 'Arrays';
      if (!map[top]) {
        map[top] = { solved: 0, total: 0 };
      }
      map[top].total++;
      if (q.isSolved || q.status === 'Solved') {
        map[top].solved++;
      }
    });
    return map;
  }, [questions]);

  // Pattern Statistics Breakdown (Dynamically Calculated)
  const patternStatsMap = useMemo(() => {
    const map: Record<string, { solved: number; total: number }> = {};
    questions.forEach((q) => {
      const pat = q.pattern || q.tags[0] || 'Fundamentals';
      if (!map[pat]) {
        map[pat] = { solved: 0, total: 0 };
      }
      map[pat].total++;
      if (q.isSolved || q.status === 'Solved') {
        map[pat].solved++;
      }
    });
    return map;
  }, [questions]);

  // Filtered Questions list
  const filteredQuestions = useMemo(() => {
    return questions.filter((q: IPracticeQuestion) => {
      const matchesSearch =
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        q.companies.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic || q.category === selectedTopic;
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      const matchesCompany = selectedCompany === 'All' || q.companies.includes(selectedCompany);

      let matchesStatus = true;
      if (selectedStatus === 'solved') matchesStatus = q.isSolved === true || q.status === 'Solved';
      else if (selectedStatus === 'attempted') matchesStatus = q.status === 'Attempted';
      else if (selectedStatus === 'bookmarked') matchesStatus = q.isBookmarked === true;

      return matchesSearch && matchesTopic && matchesDifficulty && matchesCompany && matchesStatus;
    });
  }, [questions, searchQuery, selectedTopic, selectedDifficulty, selectedCompany, selectedStatus]);

  // Toggle Bookmark Handler
  const handleToggleBookmark = async (e: React.MouseEvent, questionId: string) => {
    e.stopPropagation();
    try {
      await practiceService.toggleBookmark(questionId);
      invalidateProgress();
    } catch {
      // Fallback
    }
  };

  // Quick Stats
  const solvedCount = questions.filter((q) => q.isSolved || q.status === 'Solved').length;
  const bookmarkedCount = questions.filter((q) => q.isBookmarked).length;
  const attemptedCount = questions.filter((q) => q.status === 'Attempted').length;
  const currentStreak = progress?.overallStats?.currentStreak || (solvedCount > 0 ? 1 : 0);
  const totalXP = progress?.overallStats?.totalXP || solvedCount * 15;
  const acceptanceRate = progress?.overallStats?.acceptanceRate || (solvedCount > 0 ? '64.2%' : '0.0%');

  return (
    <div className="min-h-screen bg-[#090a0f] text-slate-100 p-4 md:p-8 space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#12141c] via-[#1a1d2b] to-[#12141c] p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
              <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                Practice Problems Hub
              </h1>
              <span className="text-xs px-3 py-1 rounded-full font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                100 Easy Problems
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">
              Master essential Data Structures & Algorithms patterns with full MongoDB progress persistence.
              Your solved status, timestamp, XP, and streak automatically sync across sessions.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 shrink-0">
            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Solved
              </div>
              <div className="text-lg font-black text-emerald-400 font-mono mt-1">
                {solvedCount} / {questions.length}
              </div>
            </div>

            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Circle className="w-3.5 h-3.5 text-amber-400" /> Attempted
              </div>
              <div className="text-lg font-black text-amber-400 font-mono mt-1">
                {attemptedCount}
              </div>
            </div>

            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Bookmark className="w-3.5 h-3.5 text-indigo-400" /> Saved
              </div>
              <div className="text-lg font-black text-indigo-400 font-mono mt-1">
                {bookmarkedCount}
              </div>
            </div>

            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400" /> Streak
              </div>
              <div className="text-lg font-black text-orange-400 font-mono mt-1">
                {currentStreak} Days
              </div>
            </div>

            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-300" /> Total XP
              </div>
              <div className="text-lg font-black text-amber-300 font-mono mt-1">
                +{totalXP}
              </div>
            </div>

            <div className="bg-[#090a0f]/80 p-3 rounded-xl border border-white/10 text-center min-w-[90px]">
              <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center justify-center gap-1">
                <Percent className="w-3.5 h-3.5 text-cyan-400" /> Accuracy
              </div>
              <div className="text-lg font-black text-cyan-400 font-mono mt-1">
                {acceptanceRate}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topic & Pattern Progress Widget */}
      <div className="bg-[#12141c] p-4 rounded-xl border border-white/10 space-y-3 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Layers className="w-4 h-4 text-indigo-400" /> Topic & Pattern Progress
          </div>
          <span className="text-[10px] text-slate-500 font-mono">Single Source of Truth</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {Object.entries(topicStatsMap).slice(0, 6).map(([top, stat]) => (
            <button
              key={top}
              onClick={() => setSelectedTopic(top)}
              className={`p-2.5 rounded-lg border text-left transition-all ${
                selectedTopic === top
                  ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-200'
                  : 'bg-[#090a0f] border-white/5 text-slate-300 hover:border-white/20'
              }`}
            >
              <div className="text-[11px] font-bold truncate">{top}</div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>{stat.solved} / {stat.total} Solved</span>
                <span className="text-emerald-400">{stat.total > 0 ? Math.round((stat.solved / stat.total) * 100) : 0}%</span>
              </div>
              <div className="w-full bg-white/5 h-1 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${stat.total > 0 ? (stat.solved / stat.total) * 100 : 0}%` }}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Pattern Progress */}
        <div className="pt-2 border-t border-white/5">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
            <Award className="w-3 h-3 text-amber-400" /> Key Pattern Mastery
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.entries(patternStatsMap).slice(0, 6).map(([pat, stat]) => (
              <div key={pat} className="bg-[#090a0f] p-2 rounded-lg border border-white/5 text-left">
                <div className="text-[10px] font-semibold text-slate-300 truncate">{pat}</div>
                <div className="text-[9px] text-slate-400 font-mono mt-0.5">
                  {stat.solved} / {stat.total} Solved
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-[#12141c] p-4 rounded-xl border border-white/10 space-y-4 shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem title, tags, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#090a0f] border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 bg-[#090a0f] p-1 rounded-xl border border-white/5 text-xs w-full md:w-auto">
            {[
              { id: 'all', label: 'All Problems' },
              { id: 'solved', label: 'Solved' },
              { id: 'attempted', label: 'Attempted' },
              { id: 'bookmarked', label: 'Bookmarked' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedStatus(tab.id)}
                className={`flex-1 md:flex-none px-4 py-1.5 rounded-lg font-semibold transition-all ${
                  selectedStatus === tab.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dropdown Selectors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
          {/* Topic Select */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
              Topic / Pattern
            </label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {TOPICS_LIST.map((t) => (
                <option key={t} value={t} className="bg-[#12141c]">
                  {t} {t !== 'All' && topicStatsMap[t] ? `(${topicStatsMap[t].solved}/${topicStatsMap[t].total})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Select */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
              Difficulty Level
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="All" className="bg-[#12141c]">All</option>
              <option value="Easy" className="bg-[#12141c]">Easy</option>
              <option value="Medium" className="bg-[#12141c]">Medium</option>
              <option value="Hard" className="bg-[#12141c]">Hard</option>
            </select>
          </div>

          {/* Company Select */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
              Target Company
            </label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              {COMPANIES_LIST.map((c) => (
                <option key={c} value={c} className="bg-[#12141c]">
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Question Cards Grid / Skeleton Loader / Empty State */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
          <span>Showing {filteredQuestions.length} practice problems</span>
          <span>Click any card to open IDE</span>
        </div>

        {isProgressLoading ? (
          /* SKELETON LOADER GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#12141c] p-5 rounded-2xl border border-white/10 space-y-4 animate-pulse"
              >
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-white/10 rounded w-1/2" />
                  <div className="h-4 bg-white/10 rounded-full w-12" />
                </div>
                <div className="h-3 bg-white/5 rounded w-3/4" />
                <div className="flex gap-2 pt-2">
                  <div className="h-5 bg-white/10 rounded w-16" />
                  <div className="h-5 bg-white/10 rounded w-16" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredQuestions.length === 0 ? (
          /* EMPTY FILTER STATE */
          <div className="bg-[#12141c] p-12 rounded-2xl border border-white/10 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-400 border border-white/10">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">No Matching Practice Problems</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No problems match your current search query or active filter parameters.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedTopic('All');
                setSelectedDifficulty('All');
                setSelectedCompany('All');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold transition-all shadow-lg shadow-indigo-600/20"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* QUESTION CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuestions.map((question: IPracticeQuestion) => {
              const difficultyColor =
                question.difficulty === 'Easy'
                  ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                  : question.difficulty === 'Medium'
                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                  : 'text-rose-400 bg-rose-500/10 border-rose-500/20';

              const isSolved = question.isSolved || question.status === 'Solved';
              const isAttempted = question.status === 'Attempted';

              return (
                <div
                  key={question.id}
                  onClick={() => navigate(`/practice/question/${question.slug || question.id}`)}
                  className={`group relative bg-[#12141c] hover:bg-[#181b26] p-5 rounded-2xl border transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                    isSolved
                      ? 'border-emerald-500/30 bg-emerald-950/10'
                      : isAttempted
                      ? 'border-amber-500/30 bg-amber-950/10'
                      : 'border-white/10 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Row: Q Number, Title, Bookmark */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-indigo-400 transition-colors">
                          #{question.number}
                        </span>
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                          {question.title}
                        </h3>
                      </div>

                      <button
                        onClick={(e) => handleToggleBookmark(e, question.id)}
                        className={`p-1.5 rounded-lg border transition-all ${
                          question.isBookmarked
                            ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                        title={question.isBookmarked ? 'Bookmarked' : 'Bookmark Question'}
                      >
                        <Bookmark className="w-3.5 h-3.5" fill={question.isBookmarked ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Sub Badges: Difficulty, Acceptance, Status */}
                    <div className="flex items-center gap-2 flex-wrap text-[10px]">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold border ${difficultyColor}`}>
                        {question.difficulty}
                      </span>

                      {isSolved ? (
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Solved
                        </span>
                      ) : isAttempted ? (
                        <span className="px-2.5 py-0.5 rounded-full font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                          <Circle className="w-3 h-3 text-amber-400" /> Attempted
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full font-medium bg-white/5 text-slate-400 border border-white/10">
                          Not Attempted
                        </span>
                      )}

                      <span className="text-slate-400 font-mono">
                        {question.acceptanceRate} AC
                      </span>

                      {isSolved && question.firstAcTime && (
                        <span className="text-emerald-400/80 font-mono text-[9px] ml-auto">
                          {question.firstAcTime}
                        </span>
                      )}
                    </div>

                    {/* Tags & Companies */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {question.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}

                      {question.companies.slice(0, 2).map((comp) => (
                        <span
                          key={comp}
                          className="px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10 text-[10px] flex items-center gap-1"
                        >
                          <Building2 className="w-2.5 h-2.5" />
                          {comp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer Statistics */}
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1" title="Estimated Time">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {question.estimatedTime}
                      </span>
                      <span className="flex items-center gap-1" title="Total Submissions">
                        <Send className="w-3 h-3 text-slate-500" />
                        {(question.totalSubmissions || 8000).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-indigo-400 group-hover:translate-x-1 transition-transform font-bold text-xs">
                      Solve <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeList;
