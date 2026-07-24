import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { noteService } from '@services/noteService';
import { INote, INoteQueryFilter } from '@algovisualizer/shared';
import SyntaxHighlighter from '@components/notes/SyntaxHighlighter';
import { printNote, downloadPDF } from '@utils/NotePDFExporter';

import {
  BookOpen,
  Search,
  Star,
  CheckCircle2,
  Play,
  Code,
  FileQuestion,
  Printer,
  Download,
  Share2,
  Clock,
  Sparkles,
  ChevronRight,
  BookMarked,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  Layers,
  Flame,
  FileText,
  Check,
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

const CATEGORIES = [
  'All',
  'Arrays',
  'Strings',
  'Sorting',
  'Searching',
  'Linked List',
  'Stack',
  'Queue',
  'Deque',
  'Tree',
  'BST',
  'Heap',
  'Trie',
  'Graph',
  'Recursion',
  'Backtracking',
  'Dynamic Programming',
  'Greedy',
  'Sliding Window',
  'Two Pointer',
  'Prefix Sum',
  'HashMap',
  'HashSet',
  'Bit Manipulation',
  'Math',
  'Segment Tree',
  'Fenwick Tree',
  'Disjoint Set Union',
  'Topological Sort',
  'Shortest Path',
  'Minimum Spanning Tree',
  'Binary Indexed Tree',
];

export const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [filterBookmarked, setFilterBookmarked] = useState<boolean>(false);
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'algorithm' | 'complexity' | 'code' | 'interview' | 'revision'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch Notes
  const filterQuery: INoteQueryFilter = {
    category: selectedCategory !== 'All' ? selectedCategory : undefined,
    difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
    search: searchTerm.trim() || undefined,
    bookmarked: filterBookmarked ? 'true' : undefined,
    completed: filterCompleted ? 'true' : undefined,
  };

  const { data: notes = [], isLoading } = useQuery<INote[]>({
    queryKey: ['notes', filterQuery],
    queryFn: () => noteService.getAll(filterQuery),
  });

  // Select first note automatically if none selected
  useEffect(() => {
    const slugParam = searchParams.get('slug') || searchParams.get('id');
    if (slugParam && notes.length > 0) {
      const match = notes.find((n) => n.slug === slugParam || n._id === slugParam);
      if (match) setActiveNoteId(match._id);
    } else if (!activeNoteId && notes.length > 0) {
      setActiveNoteId(notes[0]._id);
    }
  }, [notes, searchParams]);

  const activeNote = notes.find((n) => n._id === activeNoteId) || notes[0] || null;

  // Track read time when active note changes
  useEffect(() => {
    if (!activeNote?._id) return;
    const timer = setTimeout(() => {
      noteService.recordReadTime(activeNote._id, 1);
    }, 60000);
    return () => clearTimeout(timer);
  }, [activeNote?._id]);

  // Mutations
  const bookmarkMutation = useMutation({
    mutationFn: (id: string) => noteService.toggleBookmark(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const completeMutation = useMutation({
    mutationFn: (id: string) => noteService.toggleComplete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  const handleShare = () => {
    if (!activeNote) return;
    const shareUrl = `${window.location.origin}/notes?slug=${activeNote.slug}`;
    if (navigator.share) {
      navigator.share({
        title: `${activeNote.title} - AlgoVisualizer`,
        text: activeNote.description,
        url: shareUrl,
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Hard':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Page Title Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Core Learning Library
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-400" />
            DSA Knowledge Base &amp; Notes
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Complete, interview-ready study material for every major Data Structure &amp; Algorithm with multi-language code snippets.
          </p>
        </div>

        {/* Top Stats Overview */}
        <div className="flex items-center gap-3">
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <BookMarked className="w-5 h-5 text-amber-400" />
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Bookmarked</div>
              <div className="text-sm font-bold text-white">
                {notes.filter((n) => n.isBookmarked).length} Notes
              </div>
            </div>
          </div>
          <div className="glass-card px-4 py-2 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Completed</div>
              <div className="text-sm font-bold text-white">
                {notes.filter((n) => n.isCompleted).length} / {notes.length}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Category Filters Pills Bar ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30'
                : 'bg-white/[0.03] text-slate-400 hover:text-slate-200 border border-white/5 hover:bg-white/[0.06]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Main Layout Grid: Left Sidebar (List & Search) + Right Notes Viewer ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search & Notes List (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search topics, definitions, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121624] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Quick Filter Bar */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-[#121624] border border-white/10 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none text-xs"
            >
              <option value="All">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setFilterBookmarked(!filterBookmarked)}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  filterBookmarked
                    ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                    : 'bg-[#121624] border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Filter Bookmarked"
              >
                <Star className={`w-3.5 h-3.5 ${filterBookmarked ? 'fill-amber-400' : ''}`} />
              </button>

              <button
                onClick={() => setFilterCompleted(!filterCompleted)}
                className={`p-1.5 rounded-lg border text-xs cursor-pointer transition-all ${
                  filterCompleted
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : 'bg-[#121624] border-white/10 text-slate-400 hover:text-white'
                }`}
                title="Filter Completed"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Notes List Scrollable */}
          <div className="glass-card rounded-2xl p-2 space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto">
            {isLoading ? (
              <Skeleton className="h-20 rounded-xl" count={5} />
            ) : notes.length === 0 ? (
              <div className="text-center py-16 text-xs text-slate-500 font-mono">
                No DSA notes matched your search criteria.
              </div>
            ) : (
              notes.map((note) => {
                const isActive = activeNoteId === note._id;
                return (
                  <motion.div
                    key={note._id}
                    onClick={() => setActiveNoteId(note._id)}
                    whileHover={{ x: 2 }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      isActive
                        ? 'bg-indigo-600/15 border-indigo-500/40 shadow-lg shadow-indigo-500/10'
                        : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.03]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2 truncate">
                        <FileText className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <h4 className="text-xs font-bold text-slate-200 truncate">{note.title}</h4>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        {note.isBookmarked && <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />}
                        {note.isCompleted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 mt-1.5 font-sans leading-snug">
                      {note.description}
                    </p>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-white/5 text-[10px]">
                      <span className={`px-2 py-0.5 rounded border font-mono font-semibold ${getDifficultyBadge(note.difficulty)}`}>
                        {note.difficulty}
                      </span>
                      <span className="text-slate-500 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {note.estimatedReadTime} min read
                      </span>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Note Content Viewer (8 Cols) */}
        <div className="lg:col-span-8">
          {activeNote ? (
            <div className="glass-card rounded-2xl p-6 space-y-6">
              {/* Note Header & Action Buttons */}
              <div className="space-y-4 border-b border-white/10 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold">
                      {activeNote.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold ${getDifficultyBadge(activeNote.difficulty)}`}>
                      {activeNote.difficulty}
                    </span>
                  </div>

                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Est. Read: {activeNote.estimatedReadTime} mins
                  </span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                  {activeNote.title}
                </h2>

                <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
                  {activeNote.description}
                </p>

                {/* ── Interactive Action Buttons Bar ── */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {/* Bookmark Button */}
                  <button
                    onClick={() => bookmarkMutation.mutate(activeNote._id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeNote.isBookmarked
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-md shadow-amber-500/10'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${activeNote.isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
                    {activeNote.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                  </button>

                  {/* Mark Completed Button */}
                  <button
                    onClick={() => completeMutation.mutate(activeNote._id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeNote.isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-md shadow-emerald-500/10'
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {activeNote.isCompleted ? 'Completed' : 'Mark Completed'}
                  </button>

                  {/* Visualize Algorithm */}
                  <button
                    onClick={() =>
                      navigate(
                        activeNote.visualizationId
                          ? `/visualizer/${activeNote.visualizationId}`
                          : '/visualizations'
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Visualize Algorithm
                  </button>

                  {/* Practice Problems */}
                  <button
                    onClick={() => navigate('/practice')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 transition-all cursor-pointer"
                  >
                    <Code className="w-3.5 h-3.5" />
                    Practice Problems
                  </button>

                  {/* Attempt Quiz */}
                  <button
                    onClick={() => navigate('/quiz')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 transition-all cursor-pointer"
                  >
                    <FileQuestion className="w-3.5 h-3.5" />
                    Attempt Quiz
                  </button>

                  {/* PDF Download */}
                  <button
                    onClick={() => downloadPDF(activeNote)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF
                  </button>

                  {/* Print Notes */}
                  <button
                    onClick={() => printNote(activeNote)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title="Print Note"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    Print
                  </button>

                  {/* Share Link */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                    title="Share Note"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5" />
                        Share
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ── Content Section Tabs ── */}
              <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto no-scrollbar pb-1">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'overview'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Overview &amp; Working
                </button>
                <button
                  onClick={() => setActiveTab('algorithm')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'algorithm'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Algorithm &amp; Dry Run
                </button>
                <button
                  onClick={() => setActiveTab('complexity')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'complexity'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Complexity &amp; Pros/Cons
                </button>
                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'code'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Code Implementations
                </button>
                <button
                  onClick={() => setActiveTab('interview')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'interview'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Interview &amp; Problems
                </button>
                <button
                  onClick={() => setActiveTab('revision')}
                  className={`px-4 py-2 text-xs font-bold transition-all border-b-2 cursor-pointer ${
                    activeTab === 'revision'
                      ? 'border-indigo-500 text-indigo-400'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Revision &amp; Cheat Sheet
                </button>
              </div>

              {/* ── Active Tab Content Area ── */}
              <div className="space-y-6">
                {/* 1. Overview Tab */}
                {activeTab === 'overview' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Definition */}
                    <div className="glass-card p-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-500/5 space-y-1.5">
                      <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                        <BookOpen className="w-4 h-4" /> 1. Definition
                      </h4>
                      <p className="text-xs md:text-sm text-slate-200 leading-relaxed">{activeNote.definition}</p>
                    </div>

                    {/* Introduction */}
                    {activeNote.introduction && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <Layers className="w-4 h-4 text-cyan-400" /> 2. Introduction
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                          {activeNote.introduction}
                        </p>
                      </div>
                    )}

                    {/* Why It Is Used */}
                    {activeNote.whyUsed && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-400" /> 3. Why It Is Used
                        </h4>
                        <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                          {activeNote.whyUsed}
                        </p>
                      </div>
                    )}

                    {/* Working Principle */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Flame className="w-4 h-4 text-rose-400" /> 4. Working Principle
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                        {activeNote.working}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* 2. Algorithm & Flow Tab */}
                {activeTab === 'algorithm' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Step-by-Step Algorithm */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Code className="w-4 h-4 text-emerald-400" /> 5. Step-by-Step Algorithm
                      </h4>
                      <pre className="text-xs font-mono text-slate-200 whitespace-pre-wrap bg-[#0a0d14] p-4 rounded-xl border border-white/10 leading-relaxed">
                        {activeNote.algorithm}
                      </pre>
                    </div>

                    {/* Flow Explanation */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-indigo-400" /> 6. Flow Explanation
                      </h4>
                      <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                        {activeNote.flow}
                      </p>
                    </div>

                    {/* Dry Run */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-400" /> 7. Step-by-Step Dry Run
                      </h4>
                      <pre className="text-xs font-mono text-amber-300/90 whitespace-pre-wrap bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 leading-relaxed">
                        {activeNote.dryRun}
                      </pre>
                    </div>
                  </motion.div>
                )}

                {/* 3. Complexity & Pros/Cons Tab */}
                {activeTab === 'complexity' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Time & Space Complexity Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Time Complexity */}
                      <div className="glass-card p-4 rounded-xl border border-indigo-500/30 space-y-2">
                        <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                          8. Time Complexity
                        </h4>
                        <div className="grid grid-cols-3 gap-2 font-mono text-xs text-center py-2">
                          <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500">Best</div>
                            <div className="text-emerald-400 font-bold">{activeNote.timeComplexity?.best || 'O(1)'}</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500">Average</div>
                            <div className="text-amber-400 font-bold">{activeNote.timeComplexity?.average || 'O(N)'}</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500">Worst</div>
                            <div className="text-rose-400 font-bold">{activeNote.timeComplexity?.worst || 'O(N)'}</div>
                          </div>
                        </div>
                        {activeNote.timeComplexity?.description && (
                          <p className="text-xs text-slate-400 pt-1 font-mono">{activeNote.timeComplexity.description}</p>
                        )}
                      </div>

                      {/* Space Complexity */}
                      <div className="glass-card p-4 rounded-xl border border-purple-500/30 space-y-2">
                        <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                          9. Space Complexity
                        </h4>
                        <div className="grid grid-cols-2 gap-2 font-mono text-xs text-center py-2">
                          <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500">Auxiliary</div>
                            <div className="text-purple-400 font-bold">{activeNote.spaceComplexity?.auxiliary || 'O(1)'}</div>
                          </div>
                          <div className="bg-black/30 p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-slate-500">Worst</div>
                            <div className="text-rose-400 font-bold">{activeNote.spaceComplexity?.worst || 'O(N)'}</div>
                          </div>
                        </div>
                        {activeNote.spaceComplexity?.description && (
                          <p className="text-xs text-slate-400 pt-1 font-mono">{activeNote.spaceComplexity.description}</p>
                        )}
                      </div>
                    </div>

                    {/* Advantages & Disadvantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Advantages */}
                      {activeNote.advantages && activeNote.advantages.length > 0 && (
                        <div className="glass-card p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                            10. Advantages
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-200">
                            {activeNote.advantages.map((adv, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-emerald-400 font-bold">•</span>
                                <span>{adv}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Disadvantages */}
                      {activeNote.disadvantages && activeNote.disadvantages.length > 0 && (
                        <div className="glass-card p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                          <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                            11. Disadvantages
                          </h4>
                          <ul className="space-y-1.5 text-xs text-slate-200">
                            {activeNote.disadvantages.map((dis, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>{dis}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Applications */}
                    {activeNote.applications && activeNote.applications.length > 0 && (
                      <div className="glass-card p-4 rounded-xl border border-indigo-500/20 space-y-2">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                          12. Applications
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {activeNote.applications.map((app, i) => (
                            <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                              {app}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 4. Code Implementations Tab */}
                {activeTab === 'code' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                      13-15. Multi-Language Implementations
                    </h4>

                    {/* Code Component */}
                    <SyntaxHighlighter
                      javaCode={activeNote.javaCode}
                      cppCode={activeNote.cppCode}
                      pythonCode={activeNote.pythonCode}
                      jsCode={activeNote.jsCode}
                    />

                    {/* Example & Output */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeNote.example && (
                        <div className="space-y-1.5">
                          <h5 className="text-xs font-bold text-slate-400 uppercase font-mono">16. Example Input / Usage</h5>
                          <pre className="text-xs font-mono text-cyan-300 bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                            {activeNote.example}
                          </pre>
                        </div>
                      )}

                      {activeNote.output && (
                        <div className="space-y-1.5">
                          <h5 className="text-xs font-bold text-slate-400 uppercase font-mono">17. Expected Output</h5>
                          <pre className="text-xs font-mono text-emerald-300 bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                            {activeNote.output}
                          </pre>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* 5. Interview Questions & Related Problems Tab */}
                {activeTab === 'interview' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Interview Questions */}
                    {activeNote.interviewQuestions && activeNote.interviewQuestions.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                          <HelpCircle className="w-4 h-4" /> 18. Common Interview Questions
                        </h4>
                        <div className="space-y-3">
                          {activeNote.interviewQuestions.map((iq, idx) => (
                            <div key={idx} className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="text-xs font-bold text-slate-200">
                                  Q{idx + 1}: {iq.question}
                                </h5>
                                {iq.companyTags && iq.companyTags.length > 0 && (
                                  <div className="flex items-center gap-1 shrink-0">
                                    {iq.companyTags.map((comp) => (
                                      <span key={comp} className="px-2 py-0.5 text-[9px] font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded">
                                        {comp}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-slate-300 bg-black/20 p-3 rounded-lg border border-white/5 leading-relaxed font-sans">
                                <strong>Answer:</strong> {iq.answer}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    {activeNote.commonMistakes && activeNote.commonMistakes.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4" /> 19. Common Pitfalls &amp; Mistakes
                        </h4>
                        <ul className="space-y-2">
                          {activeNote.commonMistakes.map((mistake, i) => (
                            <li key={i} className="text-xs text-slate-300 bg-rose-500/5 border border-rose-500/20 p-3 rounded-xl flex items-start gap-2">
                              <span className="text-rose-400 font-bold">⚠️</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Related Problems */}
                    {activeNote.relatedProblems && activeNote.relatedProblems.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                          <Code className="w-4 h-4" /> 20. Recommended Practice Problems
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {activeNote.relatedProblems.map((prob, i) => (
                            <div
                              key={i}
                              onClick={() => navigate(prob.link || '/practice')}
                              className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 cursor-pointer transition-all flex items-center justify-between"
                            >
                              <div>
                                <div className="text-xs font-bold text-slate-200">{prob.title}</div>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border inline-block mt-1 ${getDifficultyBadge(prob.difficulty || 'Medium')}`}>
                                  {prob.difficulty || 'Medium'}
                                </span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-emerald-400" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* 6. Revision & Cheat Sheet Tab */}
                {activeTab === 'revision' && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
                    {/* Revision Notes */}
                    {activeNote.revisionNotes && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> 21. Quick Revision Notes
                        </h4>
                        <p className="text-xs md:text-sm text-slate-200 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl leading-relaxed">
                          {activeNote.revisionNotes}
                        </p>
                      </div>
                    )}

                    {/* Cheat Sheet */}
                    {activeNote.cheatSheet && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                          <FileText className="w-4 h-4" /> 22. Cheat Sheet Summary
                        </h4>
                        <pre className="text-xs font-mono text-cyan-300 bg-[#0a0d14] p-4 rounded-xl border border-white/10 whitespace-pre-wrap leading-relaxed">
                          {activeNote.cheatSheet}
                        </pre>
                      </div>
                    )}

                    {/* References */}
                    {activeNote.references && activeNote.references.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          23. References &amp; Readings
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-400 font-mono">
                          {activeNote.references.map((ref, i) => (
                            <li key={i}>• {ref}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-3">
              <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">Select a Topic</h3>
              <p className="text-xs max-w-sm mx-auto">
                Choose a Data Structure or Algorithm from the left navigation panel to read complete study material.
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Notes;
