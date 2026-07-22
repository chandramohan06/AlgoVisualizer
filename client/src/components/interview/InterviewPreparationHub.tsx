import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  INTERVIEW_QUESTIONS_DATASET,
  COMPANY_LIST,
  CATEGORY_ROADMAPS,
  InterviewQuestion,
  RevisionLevel,
} from '../../algorithms/metadata/interviewMetadata';
import { useInterviewProgress } from '../../hooks/useInterviewProgress';
import {
  Search,
  CheckCircle2,
  Bookmark,
  Briefcase,
  Layers,
  Sparkles,
  ExternalLink,
  Play,
} from 'lucide-react';

export const InterviewPreparationHub: React.FC = () => {
  const navigate = useNavigate();
  const {
    solvedIds,
    toggleSolved,
    toggleBookmark,
    setRevisionLevel,
    isSolved,
    isBookmarked,
    getRevisionLevel,
  } = useInterviewProgress();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'all' | 'company-playlists' | 'roadmaps'>('all');
  const [activeCompanyPlaylist, setActiveCompanyPlaylist] = useState<string>('Amazon');
  const [visibleLimit, setVisibleLimit] = useState<number>(30);

  // Filter questions dynamically
  const filteredQuestions = useMemo(() => {
    return INTERVIEW_QUESTIONS_DATASET.filter((q) => {
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      if (selectedCompany !== 'all' && !q.companies.includes(selectedCompany)) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = q.title.toLowerCase().includes(query);
        const matchPattern = q.pattern.toLowerCase().includes(query);
        const matchCompany = q.companies.some((c) => c.toLowerCase().includes(query));
        if (!matchTitle && !matchPattern && !matchCompany) return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDifficulty, selectedCompany, searchQuery]);

  const paginatedQuestions = useMemo(() => {
    return filteredQuestions.slice(0, visibleLimit);
  }, [filteredQuestions, visibleLimit]);

  const questionsByPattern = useMemo(() => {
    const map: Record<string, InterviewQuestion[]> = {};
    paginatedQuestions.forEach((q) => {
      if (!map[q.pattern]) map[q.pattern] = [];
      map[q.pattern].push(q);
    });
    return map;
  }, [paginatedQuestions]);

  const solvedCount = solvedIds.size;
  const totalCount = INTERVIEW_QUESTIONS_DATASET.length;
  const progressPercent = Math.round((solvedCount / totalCount) * 100);

  return (
    <div className="w-full min-h-screen bg-[#0A0D14] text-slate-200 p-4 md:p-8 space-y-8 font-sans">
      {/* ── Module 2 Practice Hero ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#111827] via-[#0F172A] to-[#1E1B4B]/80 border border-white/10 p-6 md:p-10 shadow-2xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold font-mono uppercase">
              Module 2: Coding Interview Preparation
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono">
              520 Canonical Interview Questions
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Interview Question Bank & Pattern Tracker
          </h1>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-normal">
            Organized strictly by Category &rarr; Pattern &rarr; Difficulty &rarr; Questions. Includes official LeetCode buttons, revision status tracking, and embedded visualizers.
          </p>

          {/* Solved Progress Bar */}
          <div className="space-y-2 pt-2 max-w-md">
            <div className="flex justify-between text-xs font-mono font-bold">
              <span className="text-slate-400">Mastery Progress</span>
              <span className="text-emerald-400">{solvedCount} / {totalCount} Solved ({progressPercent}%)</span>
            </div>
            <div className="h-2.5 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Navigation Tabs ── */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        {[
          { id: 'all', label: 'All Interview Questions (520)', icon: Layers },
          { id: 'company-playlists', label: 'Company Playlists', icon: Briefcase },
          { id: 'roadmaps', label: 'Pattern Roadmaps', icon: Sparkles },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Content View 1: All Questions ── */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-[#111827]/50 border border-white/10 rounded-2xl p-4 flex flex-wrap items-center gap-3 shadow-xl">
            {/* Search */}
            <div className="flex-1 min-w-[220px] relative">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search question, pattern, or company..."
                className="w-full bg-black/40 border border-white/10 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-black/40 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              <option value="array">Array & Matrix</option>
              <option value="string">String</option>
              <option value="linked-list">Linked List</option>
              <option value="stack">Stack</option>
              <option value="queue">Queue</option>
              <option value="tree">Tree & BST</option>
              <option value="heap">Heap & Priority Queue</option>
              <option value="graph">Graph</option>
              <option value="recursion">Recursion</option>
              <option value="backtracking">Backtracking</option>
              <option value="greedy">Greedy</option>
              <option value="dp">Dynamic Programming</option>
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-black/40 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-black/40 border border-white/10 text-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none cursor-pointer"
            >
              <option value="all">All Companies</option>
              {COMPANY_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Questions Grouped by Pattern */}
          <div className="space-y-6">
            {Object.entries(questionsByPattern).map(([patternName, questions]) => (
              <div key={patternName} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <span className="text-xs font-black text-indigo-400 uppercase tracking-wider font-mono">
                    Pattern: {patternName}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">({questions.length} questions)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {questions.map((q) => {
                    const solved = isSolved(q.id);
                    const bookmarked = isBookmarked(q.id);
                    const revision = getRevisionLevel(q.id);

                    return (
                      <div
                        key={q.id}
                        className="bg-[#111827]/60 border border-white/10 hover:border-indigo-500/50 rounded-2xl p-5 space-y-4 transition-all hover:shadow-xl hover:scale-[1.01] flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-extrabold text-slate-400">
                              #{q.leetcodeNumber || q.id}
                            </span>
                            <span
                              className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                                q.difficulty === 'easy'
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                  : q.difficulty === 'medium'
                                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                  : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </div>

                          <h3
                            onClick={() => navigate(`/interview/${q.category}/${q.id}`)}
                            className="text-base font-extrabold text-white hover:text-indigo-400 transition-colors cursor-pointer leading-snug"
                          >
                            {q.title}
                          </h3>

                          {/* Pattern Badge */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[9px] font-mono font-bold">
                              {q.pattern}
                            </span>
                          </div>

                          {/* Company Tags */}
                          <div className="flex flex-wrap gap-1 pt-1">
                            {q.companies.slice(0, 3).map((c) => (
                              <span key={c} className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-[9px] font-bold text-slate-400">
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Revision Status Selector & Action Controls */}
                        <div className="space-y-3 pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between text-[10px]">
                            <span className="text-slate-400 font-mono">Revision:</span>
                            <select
                              value={revision}
                              onChange={(e) => setRevisionLevel(q.id, e.target.value as RevisionLevel)}
                              className="bg-black/50 text-indigo-300 font-bold border border-white/10 rounded px-2 py-0.5 cursor-pointer"
                            >
                              <option value="unmarked">Unmarked</option>
                              <option value="revision-1">Rev 1</option>
                              <option value="revision-2">Rev 2</option>
                              <option value="revision-3">Rev 3</option>
                              <option value="mastered">Mastered 🏆</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleSolved(q.id)}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  solved ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/5 text-slate-500'
                                }`}
                                title={solved ? 'Solved' : 'Mark Solved'}
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => toggleBookmark(q.id)}
                                className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                  bookmarked ? 'bg-amber-500/20 border-amber-500 text-amber-400' : 'bg-white/5 border-white/5 text-slate-500'
                                }`}
                                title="Bookmark"
                              >
                                <Bookmark className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              {q.leetcodeLink && (
                                <a
                                  href={q.leetcodeLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-[9px] flex items-center gap-1 hover:bg-amber-500/20 transition-all"
                                >
                                  LC #{q.leetcodeNumber || ''} <ExternalLink className="w-3 h-3" />
                                </a>
                              )}

                              <button
                                onClick={() => navigate(`/visualizer/${q.category}/${q.visualizerSlug || 'array-traversal'}`)}
                                className="p-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 transition-all cursor-pointer"
                                title="Visualize Algorithm"
                              >
                                <Play className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => navigate(`/interview/${q.category}/${q.id}`)}
                                className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[10px] uppercase tracking-wider cursor-pointer shadow-md shadow-indigo-600/30"
                              >
                                Solve &rarr;
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {paginatedQuestions.length < filteredQuestions.length && (
            <div className="text-center pt-4">
              <button
                onClick={() => setVisibleLimit((prev) => prev + 30)}
                className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/30 cursor-pointer"
              >
                Load More Questions ({filteredQuestions.length - paginatedQuestions.length} remaining)
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Content View 2: Company Playlists ── */}
      {activeTab === 'company-playlists' && (
        <div className="space-y-6">
          <div className="flex overflow-x-auto gap-2 border-b border-white/5 pb-3">
            {COMPANY_LIST.map((company) => (
              <button
                key={company}
                onClick={() => setActiveCompanyPlaylist(company)}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition-all ${
                  activeCompanyPlaylist === company
                    ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                {company}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {INTERVIEW_QUESTIONS_DATASET.filter((q) => q.companies.includes(activeCompanyPlaylist)).map((q) => (
              <div key={q.id} className="p-5 rounded-2xl bg-[#111827]/60 border border-white/10 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono font-bold text-slate-400">#{q.leetcodeNumber || q.id}</span>
                  <span className="text-[10px] font-bold text-amber-400 uppercase">{q.difficulty}</span>
                </div>
                <h4 className="text-sm font-extrabold text-white">{q.title}</h4>
                <button
                  onClick={() => navigate(`/interview/${q.category}/${q.id}`)}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl cursor-pointer"
                >
                  Start Practice &rarr;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Content View 3: Pattern Roadmaps ── */}
      {activeTab === 'roadmaps' && (
        <div className="space-y-8">
          {Object.entries(CATEGORY_ROADMAPS).map(([catKey, roadmap]) => (
            <div key={catKey} className="bg-[#111827]/50 border border-white/10 rounded-3xl p-6 md:p-8 space-y-4 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-extrabold text-indigo-400 uppercase tracking-wider">
                  Category Roadmap
                </span>
                <h3 className="text-xl md:text-2xl font-black text-white">{roadmap.title}</h3>
                <p className="text-xs text-slate-400">{roadmap.description}</p>
              </div>

              {/* Roadmaps Level Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
                {roadmap.order.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 hover:border-indigo-500/40 transition-all cursor-pointer"
                    onClick={() => {
                      setSelectedCategory(catKey);
                      setSearchQuery(step.pattern);
                      setActiveTab('all');
                    }}
                  >
                    <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-[10px] font-bold uppercase font-mono">
                      {step.level}
                    </span>
                    <h4 className="text-sm font-extrabold text-white">{step.pattern}</h4>
                    <span className="text-[10px] text-slate-500 block font-mono">Click to filter questions &rarr;</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPreparationHub;
