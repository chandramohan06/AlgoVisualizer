import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Compass, Search, CheckSquare, Square, Bookmark, ExternalLink,
  ChevronDown, ChevronRight, Clock, Zap, Code2, StickyNote,
  X, Save, CheckCircle2, Target, Flame
} from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import practiceService, { IPracticeQuestionItem } from '@services/practiceService';
import { useUserProgress } from '../../hooks/useUserProgress';
import { useRoadmapProgress } from '../../hooks/useRoadmapProgress';
import {
  A2Z_ROADMAP_MODULES,
  getMappedRoadmapQuestions,
  RoadmapQuestionItem
} from '@algorithms/metadata/a2zRoadmapDataset';

type StatusType = 'Not Started' | 'Attempted' | 'Completed' | 'Revision 1' | 'Revision 2' | 'Mastered';

const STATUS_OPTIONS: StatusType[] = [
  'Not Started',
  'Attempted',
  'Completed',
  'Revision 1',
  'Revision 2',
  'Mastered',
];

const COMPANY_OPTIONS = [
  'Amazon', 'Google', 'Microsoft', 'Adobe', 'Uber',
  'Flipkart', 'Goldman Sachs', 'Oracle', 'Atlassian',
  'Meta', 'Apple', 'Others'
];

export const Algorithms: React.FC = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuthStore();

  const [questions, setQuestions] = useState<RoadmapQuestionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedModules, setExpandedModules] = useState<Record<number, boolean>>({ 1: true, 2: true });
  const [expandedPatterns, setExpandedPatterns] = useState<Record<string, boolean>>({});

  // View Mode: 'modules' | 'bookmarks'
  const [viewMode, setViewMode] = useState<'modules' | 'bookmarks'>('modules');

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<string>('all');

  // Central React Query User Progress & Roadmap Progress Hooks
  const { progress: userProgress, invalidateProgress, isProblemSolved, isProblemBookmarked } = useUserProgress();
  const { isQuestionCompleted, toggleQuestionCompletion, invalidateRoadmapProgress } = useRoadmapProgress();

  // Personal Notes Drawer State
  const [activeNotesQuestion, setActiveNotesQuestion] = useState<RoadmapQuestionItem | null>(null);
  const [noteContent, setNoteContent] = useState<string>('');
  const [savingNote, setSavingNote] = useState<boolean>(false);
  const [noteSaveSuccess, setNoteSaveSuccess] = useState<boolean>(false);

  // Initialize and fetch questions from backend practice service or fallback dataset
  const fetchProgressAndQuestions = async () => {
    try {
      setLoading(true);
      const initialQuestions = getMappedRoadmapQuestions();
      
      const backendQuestions = await practiceService.getQuestions({ limit: 1000 }).catch(() => []);

      const revisionObj = userProgress?.revisionLevels || {};

      const backendMap = new Map<string, IPracticeQuestionItem>();
      if (backendQuestions && backendQuestions.length > 0) {
        backendQuestions.forEach(bq => {
          if (bq.slug) backendMap.set(bq.slug, bq);
          if (bq._id) backendMap.set(bq._id, bq);
          if (bq.leetcodeNumber) backendMap.set(String(bq.leetcodeNumber), bq);
        });
      }

      const merged = initialQuestions.map(q => {
        const bq = backendMap.get(q.id) || (q.leetcodeNumber ? backendMap.get(String(q.leetcodeNumber)) : undefined);
        
        const isSolved = isProblemSolved(q.id) || (q.leetcodeNumber ? isProblemSolved(String(q.leetcodeNumber)) : false) || (bq ? bq.isSolved : false);
        const isBookmarked = isProblemBookmarked(q.id) || (q.leetcodeNumber ? isProblemBookmarked(String(q.leetcodeNumber)) : false) || (bq ? bq.isBookmarked : false);

        const rLevel = revisionObj[q.id] || (q.leetcodeNumber ? revisionObj[String(q.leetcodeNumber)] : '') || (bq ? bq.revisionLevel : '') || '';

        let mappedStatus: StatusType = 'Not Started';
        if (isSolved) mappedStatus = 'Completed';
        
        if (rLevel && rLevel !== 'unmarked') {
          if (rLevel === 'attempted') mappedStatus = 'Attempted';
          else if (rLevel === 'revision-1' || rLevel === 'revision_1') mappedStatus = 'Revision 1';
          else if (rLevel === 'revision-2' || rLevel === 'revision_2') mappedStatus = 'Revision 2';
          else if (rLevel === 'mastered') mappedStatus = 'Mastered';
          else if (rLevel === 'completed') mappedStatus = 'Completed';
        }

        return {
          ...q,
          id: bq?._id || q.id,
          isSolved,
          isBookmarked,
          status: mappedStatus,
        };
      });

      setQuestions(merged);
    } catch (err) {
      console.warn('Backend questions sync fallback to local dataset:', err);
      setQuestions(getMappedRoadmapQuestions());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgressAndQuestions();
  }, []);

  // Total metrics
  const totalQuestionsCount = questions.length;
  const totalSolvedCount = questions.filter(q => q.isSolved || isQuestionCompleted(q.id, q.leetcodeNumber) || ['Completed', 'Mastered', 'Revision 1', 'Revision 2'].includes(q.status || '')).length;
  const overallPercentage = totalQuestionsCount > 0 ? Math.round((totalSolvedCount / totalQuestionsCount) * 100) : 0;
  const totalEstimatedHours = A2Z_ROADMAP_MODULES.reduce((acc, m) => acc + m.estimatedHours, 0);

  // Difficulty counts
  const easyCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length;
  const mediumCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'medium').length;
  const hardCount = questions.filter(q => (q.difficulty || '').toLowerCase() === 'hard').length;

  // Module completion count
  const completedModulesCount = useMemo(() => {
    return A2Z_ROADMAP_MODULES.filter(m => {
      const mQuestions = questions.filter(q => q.moduleNumber === m.moduleNumber);
      if (mQuestions.length === 0) return false;
      const solved = mQuestions.filter(q => q.isSolved || isQuestionCompleted(q.id, q.leetcodeNumber) || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '')).length;
      return solved === mQuestions.length;
    }).length;
  }, [questions, isQuestionCompleted]);

  // Bookmarks list
  const bookmarkedQuestions = useMemo(() => {
    return questions.filter(q => q.isBookmarked);
  }, [questions]);

  // Status & Solved Handler
  const handleStatusChange = async (question: RoadmapQuestionItem, newStatus: StatusType) => {
    const isCompletedType = ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(newStatus);
    const prevSolved = question.isSolved;

    // Optimistic UI update
    setQuestions(prev => prev.map(q => {
      if (q.id === question.id || q.title === question.title) {
        return {
          ...q,
          status: newStatus,
          isSolved: isCompletedType,
        };
      }
      return q;
    }));

    try {
      let backendStatus = 'not_started';
      if (newStatus === 'Attempted') backendStatus = 'attempted';
      else if (newStatus === 'Completed') backendStatus = 'completed';
      else if (newStatus === 'Revision 1') backendStatus = 'revision-1';
      else if (newStatus === 'Revision 2') backendStatus = 'revision-2';
      else if (newStatus === 'Mastered') backendStatus = 'mastered';

      await practiceService.updateStatus(question.id, backendStatus);
      invalidateProgress();
      
      // If newly completed, refresh user auth store to update XP in header / profile
      if (isCompletedType && !prevSolved) {
        checkAuth();
      }
    } catch (error) {
      console.error('Failed to update question status:', error);
    }
  };

  const handleToggleSolved = (question: RoadmapQuestionItem) => {
    const isCompleted = isQuestionCompleted(question.id, question.leetcodeNumber) || Boolean(question.isSolved);
    toggleQuestionCompletion(question.id, Boolean(isCompleted));
    invalidateProgress();
    invalidateRoadmapProgress();
  };

  const handleToggleBookmark = async (question: RoadmapQuestionItem) => {
    const nextBookmarked = !question.isBookmarked;

    setQuestions(prev => prev.map(q => {
      if (q.id === question.id || q.title === question.title) {
        return { ...q, isBookmarked: nextBookmarked };
      }
      return q;
    }));

    try {
      await practiceService.toggleBookmark(question.id);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
    }
  };

  const openNotesDrawer = async (question: RoadmapQuestionItem) => {
    setActiveNotesQuestion(question);
    setNoteContent('');
    setNoteSaveSuccess(false);

    try {
      const details = await practiceService.getQuestionBySlug(question.id);
      if (details && details.personalNote) {
        setNoteContent(details.personalNote);
      }
    } catch {
      // Fallback
    }
  };

  const handleSaveNote = async () => {
    if (!activeNotesQuestion) return;
    try {
      setSavingNote(true);
      await practiceService.saveNote(activeNotesQuestion.id, noteContent);
      setNoteSaveSuccess(true);
      setTimeout(() => setNoteSaveSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to save note:', err);
    } finally {
      setSavingNote(false);
    }
  };

  const toggleModuleExpand = (moduleNumber: number) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleNumber]: !prev[moduleNumber],
    }));
  };

  const togglePatternExpand = (patternKey: string) => {
    setExpandedPatterns(prev => ({
      ...prev,
      [patternKey]: !prev[patternKey],
    }));
  };

  // Filtered Questions helper
  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      // Search Query
      const qTitle = (q.title || '').toLowerCase();
      const qModule = (q.moduleTitle || '').toLowerCase();
      const qPattern = (q.pattern || '').toLowerCase();
      const qCompanies = (q.companies || []).join(' ').toLowerCase();
      const qDiff = (q.difficulty || '').toLowerCase();
      const query = searchQuery.toLowerCase().trim();

      const matchesSearch = !query ||
        qTitle.includes(query) ||
        qModule.includes(query) ||
        qPattern.includes(query) ||
        qCompanies.includes(query) ||
        qDiff.includes(query);

      // Difficulty
      const matchesDifficulty = selectedDifficulty === 'all' || qDiff === selectedDifficulty.toLowerCase();

      // Status
      let matchesStatus = true;
      if (selectedStatus === 'solved' || selectedStatus === 'completed') {
        matchesStatus = q.isSolved || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '');
      } else if (selectedStatus === 'unsolved' || selectedStatus === 'not started') {
        matchesStatus = !q.isSolved && (q.status === 'Not Started' || !q.status);
      } else if (selectedStatus === 'attempted') {
        matchesStatus = q.status === 'Attempted';
      } else if (selectedStatus === 'revision') {
        matchesStatus = q.status === 'Revision 1' || q.status === 'Revision 2';
      } else if (selectedStatus === 'mastered') {
        matchesStatus = q.status === 'Mastered';
      } else if (selectedStatus === 'bookmarked') {
        matchesStatus = !!q.isBookmarked;
      }

      // Company
      let matchesCompany = true;
      if (selectedCompany !== 'all') {
        if (selectedCompany === 'Others') {
          const known = ['amazon', 'google', 'microsoft', 'adobe', 'uber', 'flipkart', 'goldman sachs', 'oracle', 'atlassian', 'meta', 'apple'];
          matchesCompany = (q.companies || []).some(c => !known.includes(c.toLowerCase()));
        } else {
          matchesCompany = (q.companies || []).some(c => c.toLowerCase() === selectedCompany.toLowerCase());
        }
      }

      return matchesSearch && matchesDifficulty && matchesStatus && matchesCompany;
    });
  }, [questions, searchQuery, selectedDifficulty, selectedStatus, selectedCompany]);

  const difficultyBadgeStyle = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
    }
  };

  const statusBadgeStyle = (statusStr?: string) => {
    switch (statusStr) {
      case 'Completed':
        return 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40';
      case 'Mastered':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Revision 1':
      case 'Revision 2':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Attempted':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      default:
        return 'bg-slate-800 text-slate-400 border-white/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-8 animate-fade-in font-sans text-slate-200">
      
      {/* Top Hero Section: DSA Roadmap */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950/90 via-slate-900 to-blue-950/90 border border-white/10 p-6 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-black font-mono uppercase tracking-wide">
              <Compass className="w-4 h-4 text-indigo-400 animate-pulse" /> DSA Roadmap
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
              DSA Roadmap
            </h1>
            
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-normal">
              Master 420 curated interview questions step-by-step across 17 structured modules inspired by the battle-tested Striver A2Z progression.
            </p>

            {/* Daily Goal Widget */}
            <div className="pt-2 flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 bg-black/40 border border-white/10 px-3.5 py-1.5 rounded-xl">
                <Target className="w-4 h-4 text-amber-400" />
                <span className="text-slate-300">Daily Goal:</span>
                <span className="text-amber-400 font-bold">2 / 3 Solved</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <Flame className="w-4 h-4 text-orange-400 animate-bounce" /> 5 Day Streak
              </div>
            </div>
          </div>

          {/* Quick Metrics Header Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-2xl font-black text-white font-mono">17</span>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Modules ({completedModulesCount} Done)</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-2xl font-black text-cyan-400 font-mono">420</span>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Total Questions</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-2xl font-black text-emerald-400 font-mono">
                {totalSolvedCount} / {totalQuestionsCount}
              </span>
              <span className="text-[10px] uppercase font-extrabold text-emerald-400/90 tracking-wider">{overallPercentage}% Progress</span>
            </div>

            <div className="bg-black/60 border border-white/10 p-4 rounded-2xl text-center shadow-lg backdrop-blur-md">
              <span className="block text-2xl font-black text-amber-400 font-mono">{totalEstimatedHours}h</span>
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Est. Learning Hours</span>
            </div>
          </div>
        </div>

        {/* Difficulty Distribution & Overall Progress Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-mono font-bold">
            <div className="flex items-center gap-3">
              <span className="text-slate-300 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Roadmap Difficulty Distribution:
              </span>
              <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">{easyCount} Easy</span>
              <span className="text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">{mediumCount} Medium</span>
              <span className="text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded">{hardCount} Hard</span>
            </div>
            <span className="text-emerald-400">{totalSolvedCount} of {totalQuestionsCount} Solved ({overallPercentage}%)</span>
          </div>

          <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden p-0.5 border border-white/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallPercentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 rounded-full shadow-lg shadow-emerald-500/20"
            />
          </div>
        </div>
      </div>

      {/* Top View Selector Tabs: All 17 Modules vs Bookmarked Section */}
      <div className="flex items-center gap-3 border-b border-white/10 pb-3">
        <button
          onClick={() => setViewMode('modules')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            viewMode === 'modules'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Compass className="w-4 h-4" /> All 17 Roadmap Modules
        </button>

        <button
          onClick={() => setViewMode('bookmarks')}
          className={`px-5 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer ${
            viewMode === 'bookmarks'
              ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
              : 'bg-black/40 text-slate-400 hover:text-white border border-white/5'
          }`}
        >
          <Bookmark className="w-4 h-4 fill-current" /> Bookmarked Questions ({bookmarkedQuestions.length})
        </button>
      </div>

      {/* Global Search & Filters Bar */}
      <div className="bg-[#111827]/80 border border-white/10 rounded-2xl p-4 md:p-6 space-y-4 shadow-xl backdrop-blur-xl">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by question title, module, pattern, or company..."
              className="w-full bg-black/50 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-2 py-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Difficulty Filter */}
            <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
              {['all', 'easy', 'medium', 'hard'].map(diff => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="not started">Not Started</option>
              <option value="attempted">Attempted</option>
              <option value="completed">Completed</option>
              <option value="revision">Revision</option>
              <option value="mastered">Mastered</option>
              <option value="bookmarked">Bookmarked</option>
            </select>

            {/* Company Filter */}
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer max-w-[150px]"
            >
              <option value="all">All Companies</option>
              {COMPANY_OPTIONS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Filter active summary pill */}
        {(searchQuery || selectedDifficulty !== 'all' || selectedStatus !== 'all' || selectedCompany !== 'all') && (
          <div className="flex justify-between items-center pt-2 border-t border-white/5 text-xs text-slate-400 font-mono">
            <span>
              Showing <strong className="text-white">{filteredQuestions.length}</strong> matching questions
            </span>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('all');
                setSelectedStatus('all');
                setSelectedCompany('all');
              }}
              className="text-indigo-400 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-4 animate-pulse">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-[#111827]/60 border border-white/5 rounded-3xl" />
          ))}
        </div>
      ) : viewMode === 'bookmarks' ? (
        /* Bookmarked Questions View */
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2">
            <Bookmark className="w-5 h-5 text-amber-400 fill-current" />
            <h2 className="text-xl font-black text-white">Bookmarked Questions ({bookmarkedQuestions.length})</h2>
          </div>

          {bookmarkedQuestions.length === 0 ? (
            <div className="bg-[#111827]/60 border border-white/10 rounded-3xl p-12 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm text-slate-400 font-mono">No bookmarked questions yet.</p>
              <p className="text-xs text-slate-500">Bookmark questions while browsing modules for quick revision.</p>
            </div>
          ) : (
            <div className="bg-[#111827]/80 border border-white/10 rounded-3xl divide-y divide-white/5 overflow-hidden">
              {bookmarkedQuestions.map(q => {
                const isSolved = q.isSolved || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '');

                return (
                  <div key={q.id || q.title} className="p-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button onClick={() => handleToggleSolved(q)} className="text-slate-400 hover:text-emerald-400 cursor-pointer">
                        {isSolved ? <CheckSquare className="w-5 h-5 text-emerald-400" /> : <Square className="w-5 h-5 text-slate-500" />}
                      </button>

                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono font-bold text-indigo-400">Module {q.moduleNumber}</span>
                          <span className={`text-sm font-extrabold ${isSolved ? 'line-through text-slate-400' : 'text-white'}`}>{q.title}</span>
                          <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded border ${difficultyBadgeStyle(q.difficulty)}`}>{q.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button onClick={() => navigate(`/interview/${q.category}/${q.id}`)} className="px-3 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-mono font-bold flex items-center gap-1">
                        <Code2 className="w-3 h-3" /> Practice
                      </button>

                      <button onClick={() => openNotesDrawer(q)} className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-xs font-mono font-bold flex items-center gap-1">
                        <StickyNote className="w-3 h-3" /> Notes
                      </button>

                      <button onClick={() => handleToggleBookmark(q)} className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* 17 Structured Modules Accordion Grid */
        <div className="space-y-6">
          {A2Z_ROADMAP_MODULES.map((module) => {
            const moduleQuestions = questions.filter(q => q.moduleNumber === module.moduleNumber);
            const filteredModQuestions = filteredQuestions.filter(q => q.moduleNumber === module.moduleNumber);

            const qTotal = moduleQuestions.length || module.questionCount;
            const qSolved = moduleQuestions.filter(q => q.isSolved || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '')).length;
            const qRemaining = Math.max(0, qTotal - qSolved);
            const completionPct = qTotal > 0 ? Math.round((qSolved / qTotal) * 100) : 0;

            const modEasy = moduleQuestions.filter(q => (q.difficulty || '').toLowerCase() === 'easy').length;
            const modMed = moduleQuestions.filter(q => (q.difficulty || '').toLowerCase() === 'medium').length;
            const modHard = moduleQuestions.filter(q => (q.difficulty || '').toLowerCase() === 'hard').length;

            const isExpanded = !!expandedModules[module.moduleNumber];

            if ((searchQuery || selectedDifficulty !== 'all' || selectedStatus !== 'all' || selectedCompany !== 'all') && filteredModQuestions.length === 0) {
              return null;
            }

            return (
              <motion.div
                key={module.moduleNumber}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111827]/70 border border-white/10 hover:border-indigo-500/40 rounded-3xl overflow-hidden shadow-2xl transition-all"
              >
                {/* Module Header Card */}
                <div
                  onClick={() => toggleModuleExpand(module.moduleNumber)}
                  className="p-6 md:p-8 cursor-pointer bg-gradient-to-r from-slate-900/90 via-[#131b2e]/90 to-slate-900/90 hover:from-indigo-950/40 transition-all select-none"
                >
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    
                    {/* Module Number & Title */}
                    <div className="space-y-2 max-w-xl">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center font-mono font-black text-sm">
                          {module.moduleNumber}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-extrabold">
                          Module {module.moduleNumber}
                        </span>
                      </div>

                      <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                        {module.title}
                      </h2>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {module.description}
                      </p>
                    </div>

                    {/* Module Stats & Progress Details */}
                    <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
                      
                      {/* Questions & Solved Count */}
                      <div className="text-left lg:text-right font-mono">
                        <span className="block text-xl font-black text-white">
                          {qSolved} <span className="text-slate-500 text-sm">/ {qTotal} Solved</span>
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          {qRemaining} Remaining • {module.estimatedHours} Hours
                        </span>
                      </div>

                      {/* Difficulty Badges */}
                      <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold">
                        <span className="px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {modEasy} Easy
                        </span>
                        <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          {modMed} Med
                        </span>
                        <span className="px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20">
                          {modHard} Hard
                        </span>
                      </div>

                      {/* Patterns Badge Count */}
                      <span className="text-xs font-mono font-bold bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl text-slate-300">
                        {module.patterns.length} Patterns
                      </span>

                      {/* Continue Learning Expand Trigger Button */}
                      <button className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-indigo-600/30 cursor-pointer">
                        <span>{isExpanded ? 'Collapse' : 'Continue Learning'}</span>
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Module Progress Bar */}
                  <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      <span className="text-slate-400 font-semibold">Module Completion</span>
                      <span className="text-indigo-400 font-bold">{completionPct}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/50 rounded-full overflow-hidden border border-white/5">
                      <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                        style={{ width: `${completionPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Collapsible Pattern & Question List Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-white/10 bg-black/40 p-4 md:p-8 space-y-6"
                    >
                      {/* Patterns Breakdown */}
                      {module.patterns.map((patternName) => {
                        const patternKey = `${module.moduleNumber}-${patternName}`;
                        const patternQuestions = (searchQuery || selectedDifficulty !== 'all' || selectedStatus !== 'all' || selectedCompany !== 'all' ? filteredModQuestions : moduleQuestions).filter(
                          q => q.pattern.toLowerCase().includes(patternName.toLowerCase()) || patternName.toLowerCase().includes(q.pattern.toLowerCase())
                        );

                        const patTotal = patternQuestions.length;
                        if (patTotal === 0) {
                          return null;
                        }

                        const patSolved = patternQuestions.filter(q => q.isSolved || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '')).length;
                        const patPct = patTotal > 0 ? Math.round((patSolved / patTotal) * 100) : 0;
                        const isPatExpanded = expandedPatterns[patternKey] !== false;

                        return (
                          <div
                            key={patternKey}
                            className="bg-[#0e1626]/80 border border-white/10 rounded-2xl overflow-hidden shadow-lg"
                          >
                            {/* Pattern Header */}
                            <div
                              onClick={() => togglePatternExpand(patternKey)}
                              className="p-4 md:px-6 bg-white/[0.02] hover:bg-white/[0.04] flex items-center justify-between cursor-pointer border-b border-white/5"
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                                <h3 className="text-sm font-extrabold text-white tracking-wide">
                                  {patternName}
                                </h3>
                                <span className="text-[10px] font-mono font-bold text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                                  {patSolved} / {patTotal} Solved
                                </span>
                              </div>

                              <div className="flex items-center gap-4">
                                <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-cyan-400">
                                  <span>{patPct}%</span>
                                  <div className="w-20 h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
                                    <div
                                      className="h-full bg-cyan-400 transition-all duration-300"
                                      style={{ width: `${patPct}%` }}
                                    />
                                  </div>
                                </div>

                                <button className="text-slate-400 hover:text-white">
                                  {isPatExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                </button>
                              </div>
                            </div>

                            {/* Question List Table Inside Pattern */}
                            {isPatExpanded && (
                              <div className="divide-y divide-white/5">
                                {patternQuestions.length === 0 ? (
                                  <div className="p-6 text-center text-xs text-slate-500 font-mono">
                                    No questions matching current filter in this pattern.
                                  </div>
                                ) : (
                                  patternQuestions.map((q) => {
                                    const isSolved = q.isSolved || ['Completed', 'Revision 1', 'Revision 2', 'Mastered'].includes(q.status || '');
                                    const currentStatus: StatusType = q.status || (isSolved ? 'Completed' : 'Not Started');

                                    return (
                                      <div
                                        key={q.id || q.title}
                                        className="p-4 md:px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors group"
                                      >
                                        {/* Checkbox & Question Title */}
                                        <div className="flex items-start md:items-center gap-3.5 flex-1 min-w-0">
                                          <button
                                            onClick={() => handleToggleSolved(q)}
                                            className="mt-0.5 md:mt-0 text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer shrink-0"
                                            aria-label="Toggle completion status"
                                          >
                                            {isSolved ? (
                                              <CheckSquare className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
                                            ) : (
                                              <Square className="w-5 h-5 text-slate-500 hover:text-slate-300" />
                                            )}
                                          </button>

                                          <div className="space-y-1 min-w-0">
                                            <div className="flex items-center gap-2 flex-wrap">
                                              <span
                                                onClick={() => navigate(`/interview/${q.category}/${q.id}`)}
                                                className={`text-sm font-extrabold cursor-pointer transition-colors hover:underline ${
                                                  isSolved ? 'text-slate-400 line-through' : 'text-white group-hover:text-indigo-400'
                                                }`}
                                              >
                                                {q.leetcodeNumber ? `#${q.leetcodeNumber} ` : ''}{q.title}
                                              </span>

                                              {/* Difficulty Badge */}
                                              <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${difficultyBadgeStyle(q.difficulty)}`}>
                                                {q.difficulty}
                                              </span>
                                            </div>

                                            {/* Companies Pills */}
                                            {q.companies && q.companies.length > 0 && (
                                              <div className="flex items-center gap-1.5 flex-wrap">
                                                {q.companies.slice(0, 4).map((company) => (
                                                  <span
                                                    key={company}
                                                    className="text-[9px] font-mono font-bold bg-white/5 text-slate-400 border border-white/10 px-2 py-0.5 rounded-md"
                                                  >
                                                    {company}
                                                  </span>
                                                ))}
                                                {q.companies.length > 4 && (
                                                  <span className="text-[9px] font-mono text-slate-500">
                                                    +{q.companies.length - 4} more
                                                  </span>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        </div>

                                        {/* Action Controls: Time, Bookmark, LeetCode, 3 Action Buttons, Status Dropdown */}
                                        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-white/5 pt-3 md:pt-0 flex-wrap">
                                          
                                          {/* Estimated Time */}
                                          <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400 mr-1">
                                            <Clock className="w-3.5 h-3.5 text-slate-500" />
                                            <span>{q.expectedTime || '15m'}</span>
                                          </div>

                                          {/* Action Buttons */}
                                          <button
                                            onClick={() => navigate(`/interview/${q.category}/${q.id}`)}
                                            className="px-2.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                                            title="Open Practice Question"
                                          >
                                            <Code2 className="w-3 h-3" /> Practice
                                          </button>

                                          <button
                                            onClick={() => openNotesDrawer(q)}
                                            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer transition-all"
                                            title="Open Personal Notes"
                                          >
                                            <StickyNote className="w-3 h-3" /> Notes
                                          </button>

                                          {/* Bookmark Button */}
                                          <button
                                            onClick={() => handleToggleBookmark(q)}
                                            className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                                              q.isBookmarked
                                                ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                                                : 'bg-white/5 text-slate-400 border-white/10 hover:text-amber-300 hover:bg-white/10'
                                            }`}
                                            title="Bookmark Question"
                                          >
                                            <Bookmark className={`w-3.5 h-3.5 ${q.isBookmarked ? 'fill-current' : ''}`} />
                                          </button>

                                          {/* LeetCode Button */}
                                          <a
                                            href={q.leetcodeLink || `https://leetcode.com/problemset/all/?search=${encodeURIComponent(q.title)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-1.5 rounded-xl bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 text-slate-300 transition-colors flex items-center gap-1 text-[11px] font-mono"
                                            title="Open on LeetCode"
                                          >
                                            <span className="hidden sm:inline font-bold">LeetCode</span>
                                            <ExternalLink className="w-3 h-3" />
                                          </a>

                                          {/* Status Dropdown Selector */}
                                          <select
                                            value={currentStatus}
                                            onChange={(e) => handleStatusChange(q, e.target.value as StatusType)}
                                            className={`text-[11px] font-mono font-bold border rounded-xl px-2 py-1 focus:outline-none cursor-pointer transition-colors ${statusBadgeStyle(currentStatus)}`}
                                          >
                                            {STATUS_OPTIONS.map((opt) => (
                                              <option key={opt} value={opt} className="bg-slate-900 text-white">
                                                {opt}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    );
                                  })
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Personal Notes Slide-over Modal/Drawer */}
      <AnimatePresence>
        {activeNotesQuestion && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveNotesQuestion(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-[#0e1626] border-l border-white/10 p-6 z-50 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="space-y-1 min-w-0 pr-4">
                    <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">Personal Notes</span>
                    <h3 className="text-lg font-black text-white truncate">{activeNotesQuestion.title}</h3>
                  </div>
                  <button
                    onClick={() => setActiveNotesQuestion(null)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all cursor-pointer shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono font-bold text-slate-400">Personal Key Insights & Revision Notes:</label>
                  <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write key takeaways, approach summaries, edge cases to remember..."
                    className="w-full h-80 bg-black/50 border border-white/10 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500 font-mono resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                {noteSaveSuccess ? (
                  <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Note Saved!
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-slate-500">Auto-saved to your personal account</span>
                )}

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveNotesQuestion(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-mono font-bold text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveNote}
                    disabled={savingNote}
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> {savingNote ? 'Saving...' : 'Save Note'}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Algorithms;
