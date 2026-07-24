import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
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
  ExternalLink,
  Layers,
  FileText,
  Check,
  Building2,
  Zap,
  ListChecks,
  Table,
  Terminal,
  ShieldCheck,
  PanelLeftClose,
  PanelLeftOpen,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sun,
  Moon,
  Coffee,
  X,
  GripVertical,
  Menu,
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

const PREFS_KEY = 'algovisualizer_reader_prefs';

interface IReaderPrefs {
  sidebarWidth: number;
  readerMode: 'split' | 'focus' | 'fullscreen';
  fontSize: number; // 14, 16, 18, 20, 22, 24
  lineHeight: number; // 1.4, 1.6, 1.8, 2.0
  contentWidth: 'narrow' | 'medium' | 'wide' | 'full';
  readerTheme: 'dark' | 'sepia' | 'light';
}

const DEFAULT_PREFS: IReaderPrefs = {
  sidebarWidth: 320,
  readerMode: 'split',
  fontSize: 16,
  lineHeight: 1.6,
  contentWidth: 'wide',
  readerTheme: 'dark',
};

export const Notes: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Reader Preferences (with localStorage persistence)
  const [prefs, setPrefs] = useState<IReaderPrefs>(() => {
    try {
      const saved = localStorage.getItem(PREFS_KEY);
      if (saved) return { ...DEFAULT_PREFS, ...JSON.parse(saved) };
    } catch {
      // Fallback
    }
    return DEFAULT_PREFS;
  });

  // Save prefs on change
  useEffect(() => {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore
    }
  }, [prefs]);

  // Resizable sidebar dragging logic
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();
      const newWidth = e.clientX - containerRect.left;
      const clampedWidth = Math.max(250, Math.min(500, newWidth));
      setPrefs((prev) => ({ ...prev, sidebarWidth: clampedWidth }));
    };

    const handleMouseUp = () => {
      if (isResizing) setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [filterBookmarked, setFilterBookmarked] = useState<boolean>(false);
  const [filterCompleted, setFilterCompleted] = useState<boolean>(false);

  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'methods' | 'algorithm' | 'complexity' | 'code' | 'interview' | 'revision'
  >('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [iqSearchTerm, setIqSearchTerm] = useState('');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

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

  // Keyboard Shortcuts (Ctrl++, Ctrl--, ESC, F11)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && prefs.readerMode === 'fullscreen') {
        e.preventDefault();
        setPrefs((prev) => ({ ...prev, readerMode: 'split' }));
      } else if (e.key === 'F11') {
        e.preventDefault();
        setPrefs((prev) => ({
          ...prev,
          readerMode: prev.readerMode === 'fullscreen' ? 'split' : 'fullscreen',
        }));
      } else if (e.ctrlKey && (e.key === '=' || e.key === '+')) {
        e.preventDefault();
        setPrefs((prev) => ({ ...prev, fontSize: Math.min(24, prev.fontSize + 2) }));
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        setPrefs((prev) => ({ ...prev, fontSize: Math.max(14, prev.fontSize - 2) }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prefs.readerMode]);

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
        title: `${activeNote.title} - AlgoVisualizer Knowledge Base`,
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

  // Content width classes
  const getContentWidthClass = () => {
    switch (prefs.contentWidth) {
      case 'narrow':
        return 'max-w-2xl mx-auto';
      case 'medium':
        return 'max-w-3xl mx-auto';
      case 'wide':
        return 'max-w-5xl mx-auto';
      case 'full':
        return 'w-full';
    }
  };

  // Reader theme container classes
  const getThemeClass = () => {
    switch (prefs.readerTheme) {
      case 'sepia':
        return 'bg-[#1b1713] text-[#e8ded1] border-[#382f27]';
      case 'light':
        return 'bg-[#f8fafc] text-slate-900 border-slate-200';
      case 'dark':
      default:
        return 'bg-[#0d1117] text-slate-200 border-white/10';
    }
  };

  // ── RENDER TOPIC LIST SIDEBAR CONTENT ──
  const renderTopicList = () => (
    <div className="space-y-4 h-full flex flex-col">
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

      {/* Scrollable list */}
      <div className="glass-card rounded-2xl p-2 space-y-2 flex-1 overflow-y-auto min-h-[300px]">
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
                onClick={() => {
                  setActiveNoteId(note._id);
                  setMobileSidebarOpen(false);
                }}
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
  );

  // ── RENDER TOOLBAR READ CONTROLS ──
  const renderReadingToolbar = () => (
    <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-black/40 border border-white/10 rounded-xl text-xs backdrop-blur-md">
      {/* Mode Controls */}
      <div className="flex items-center gap-1">
        <button
          onClick={() =>
            setPrefs((prev) => ({
              ...prev,
              readerMode: prev.readerMode === 'focus' ? 'split' : 'focus',
            }))
          }
          className={`p-1.5 rounded-lg border cursor-pointer transition-all flex items-center gap-1 ${
            prefs.readerMode === 'focus'
              ? 'bg-indigo-600/30 border-indigo-500/50 text-indigo-300'
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
          }`}
          title={prefs.readerMode === 'focus' ? 'Show Sidebar (Split Mode)' : 'Focus Mode (Collapse Sidebar)'}
        >
          {prefs.readerMode === 'focus' ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          <span className="hidden sm:inline text-[11px] font-semibold">
            {prefs.readerMode === 'focus' ? 'Split' : 'Focus'}
          </span>
        </button>

        <button
          onClick={() =>
            setPrefs((prev) => ({
              ...prev,
              readerMode: prev.readerMode === 'fullscreen' ? 'split' : 'fullscreen',
            }))
          }
          className={`p-1.5 rounded-lg border cursor-pointer transition-all flex items-center gap-1 ${
            prefs.readerMode === 'fullscreen'
              ? 'bg-purple-600/30 border-purple-500/50 text-purple-300'
              : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
          }`}
          title="Full Screen Reader Mode (F11 / ESC)"
        >
          {prefs.readerMode === 'fullscreen' ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          <span className="hidden sm:inline text-[11px] font-semibold">
            {prefs.readerMode === 'fullscreen' ? 'Exit Full' : 'Full Screen'}
          </span>
        </button>
      </div>

      {/* Font Size Controls */}
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
        <button
          onClick={() => setPrefs((prev) => ({ ...prev, fontSize: Math.max(14, prev.fontSize - 2) }))}
          className="p-1 text-slate-300 hover:text-white cursor-pointer"
          title="Decrease Font Size (Ctrl -)"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <span className="px-1.5 font-mono text-[11px] text-slate-200">{prefs.fontSize}px</span>
        <button
          onClick={() => setPrefs((prev) => ({ ...prev, fontSize: Math.min(24, prev.fontSize + 2) }))}
          className="p-1 text-slate-300 hover:text-white cursor-pointer"
          title="Increase Font Size (Ctrl +)"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => setPrefs((prev) => ({ ...prev, fontSize: 16, lineHeight: 1.6 }))}
          className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer border-l border-white/10 ml-0.5"
          title="Reset Font & Line Height"
        >
          <RotateCcw className="w-3 h-3" />
        </button>
      </div>

      {/* Line Height Controls */}
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
        <span className="text-[10px] text-slate-400 font-mono px-1">Line Height:</span>
        {[1.4, 1.6, 1.8, 2.0].map((lh) => (
          <button
            key={lh}
            onClick={() => setPrefs((prev) => ({ ...prev, lineHeight: lh }))}
            className={`px-1.5 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-all ${
              prefs.lineHeight === lh ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {lh}
          </button>
        ))}
      </div>

      {/* Content Width Selector */}
      <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
        <span className="text-[10px] text-slate-400 font-mono px-1">Width:</span>
        {(['narrow', 'medium', 'wide', 'full'] as const).map((w) => (
          <button
            key={w}
            onClick={() => setPrefs((prev) => ({ ...prev, contentWidth: w }))}
            className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-mono cursor-pointer transition-all ${
              prefs.contentWidth === w ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {w[0]}
          </button>
        ))}
      </div>

      {/* Reader Theme Toggle */}
      <div className="flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-lg">
        <button
          onClick={() => setPrefs((prev) => ({ ...prev, readerTheme: 'dark' }))}
          className={`p-1 rounded cursor-pointer ${
            prefs.readerTheme === 'dark' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Dark Theme"
        >
          <Moon className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setPrefs((prev) => ({ ...prev, readerTheme: 'sepia' }))}
          className={`p-1 rounded cursor-pointer ${
            prefs.readerTheme === 'sepia' ? 'bg-amber-700 text-amber-100' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Sepia Theme"
        >
          <Coffee className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => setPrefs((prev) => ({ ...prev, readerTheme: 'light' }))}
          className={`p-1 rounded cursor-pointer ${
            prefs.readerTheme === 'light' ? 'bg-slate-200 text-slate-900' : 'text-slate-400 hover:text-slate-200'
          }`}
          title="Light Theme"
        >
          <Sun className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  // ── RENDER NOTE CONTENT BODY ──
  const renderNoteContent = () => {
    if (!activeNote) {
      return (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-500 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">Select a DSA Topic</h3>
          <p className="text-xs max-w-sm mx-auto">
            Select a topic from the sidebar to open Notion/Medium-style Reader.
          </p>
        </div>
      );
    }

    return (
      <div
        className={`glass-card rounded-2xl p-6 md:p-8 space-y-6 transition-all duration-300 ${getThemeClass()} ${getContentWidthClass()}`}
        style={{
          fontSize: `${prefs.fontSize}px`,
          lineHeight: prefs.lineHeight,
        }}
      >
        {/* Header & Action Buttons */}
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

          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {activeNote.title}
          </h2>

          <p className="text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
            {activeNote.description}
          </p>

          {/* Interactive Reading Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => bookmarkMutation.mutate(activeNote._id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeNote.isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Star className={`w-3.5 h-3.5 ${activeNote.isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
              {activeNote.isBookmarked ? 'Bookmarked' : 'Bookmark'}
            </button>

            <button
              onClick={() => completeMutation.mutate(activeNote._id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                activeNote.isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {activeNote.isCompleted ? 'Completed' : 'Mark Completed'}
            </button>

            <button
              onClick={() => downloadPDF(activeNote)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>

            <button
              onClick={() => printNote(activeNote)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              Print
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
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

        {/* 7 Content Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-white/10 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'overview' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            1. Overview &amp; Types
          </button>

          <button
            onClick={() => setActiveTab('methods')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'methods' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            2. Operations &amp; Java Methods
          </button>

          <button
            onClick={() => setActiveTab('algorithm')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'algorithm' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            3. Algorithm &amp; Dry Run
          </button>

          <button
            onClick={() => setActiveTab('complexity')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'complexity' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            4. Complexities &amp; Best Practices
          </button>

          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'code' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            5. Multi-Language Code
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'interview' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            6. Interview Questions &amp; Companies
          </button>

          <button
            onClick={() => setActiveTab('revision')}
            className={`px-3 py-2 text-xs font-bold transition-all border-b-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'revision' ? 'border-indigo-500 text-indigo-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            7. Revision &amp; Cheat Sheet
          </button>
        </div>

        {/* Tab Body Contents */}
        <div className="space-y-6">
          {/* TAB 1 */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="glass-card p-4 rounded-xl border-l-4 border-indigo-500 bg-indigo-500/5 space-y-1.5">
                <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> 1. Definition
                </h4>
                <p className="leading-relaxed">{activeNote.definition}</p>
              </div>

              {activeNote.characteristics && activeNote.characteristics.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <ListChecks className="w-4 h-4" /> 2. Core Characteristics
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {activeNote.characteristics.map((char, i) => (
                      <div key={i} className="p-3 bg-black/20 rounded-xl border border-white/5 flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{char}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeNote.types && activeNote.types.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4" /> 3. Types &amp; Variations
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeNote.types.map((typeItem, i) => (
                      <div key={i} className="glass-card p-3 rounded-xl border border-white/10 space-y-1">
                        <div className="font-bold text-amber-300">{typeItem.name}</div>
                        <div className="text-slate-400 leading-snug">{typeItem.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeNote.internalWorking && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4" /> 6. Internal Working Mechanism
                  </h4>
                  <p className="bg-black/30 p-4 rounded-xl border border-white/10 leading-relaxed">
                    {activeNote.internalWorking}
                  </p>
                </div>
              )}

              {activeNote.memoryRepresentation && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <Table className="w-4 h-4" /> 7. Memory Representation &amp; Layout
                  </h4>
                  <p className="font-mono text-indigo-200 bg-indigo-500/10 p-4 rounded-xl border border-indigo-500/20">
                    {activeNote.memoryRepresentation}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 2 */}
          {activeTab === 'methods' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              {activeNote.operations && activeNote.operations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" /> 4. Standard Operations
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-white/10 rounded-xl overflow-hidden">
                      <thead>
                        <tr className="bg-slate-900/80 font-mono text-slate-400 text-[11px]">
                          <th className="p-3 border-b border-white/10">Operation</th>
                          <th className="p-3 border-b border-white/10">Description</th>
                          <th className="p-3 border-b border-white/10">Time Complexity</th>
                          <th className="p-3 border-b border-white/10">Space Complexity</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-sans">
                        {activeNote.operations.map((op, idx) => (
                          <tr key={idx} className="hover:bg-white/[0.02]">
                            <td className="p-3 font-bold text-emerald-300 font-mono">{op.name}</td>
                            <td className="p-3 text-slate-300">{op.description}</td>
                            <td className="p-3 font-mono text-amber-400">{op.timeComplexity}</td>
                            <td className="p-3 font-mono text-purple-400">{op.spaceComplexity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeNote.javaMethods && activeNote.javaMethods.length > 0 && (
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-purple-400" /> 5. Java Class Methods Documentation
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      java.util API Reference
                    </span>
                  </div>

                  <div className="space-y-4">
                    {activeNote.javaMethods.map((m, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-xl border border-purple-500/20 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                          <div className="font-black text-purple-300 font-mono">{m.name}</div>
                          <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded">
                            {m.timeComplexity}
                          </span>
                        </div>

                        {m.purpose && (
                          <p className="text-slate-200">
                            <strong>Purpose:</strong> {m.purpose}
                          </p>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono">
                          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                            <span className="text-slate-400 block text-[10px]">Syntax:</span>
                            <code className="text-emerald-400">{m.syntax}</code>
                          </div>

                          <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                            <span className="text-slate-400 block text-[10px]">Return Type:</span>
                            <code className="text-cyan-400">{m.returnType}</code>
                          </div>
                        </div>

                        <div className="font-mono bg-black/30 p-2.5 rounded-lg border border-white/5">
                          <span className="text-slate-400 block text-[10px]">Parameters:</span>
                          <span className="text-slate-200">{m.parameters}</span>
                        </div>

                        {m.example && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-mono text-slate-400 uppercase">Usage Example:</span>
                            <pre className="font-mono text-slate-200 bg-[#0a0d14] p-3 rounded-lg border border-white/10 whitespace-pre-wrap">
                              {m.example}
                            </pre>
                          </div>
                        )}

                        {m.notes && (
                          <p className="text-[11px] text-amber-300/90 italic">
                            Note: {m.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3 */}
          {activeTab === 'algorithm' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Code className="w-4 h-4 text-emerald-400" /> 13. Step-by-Step Algorithm
                </h4>
                <pre className="font-mono text-slate-200 whitespace-pre-wrap bg-[#0a0d14] p-4 rounded-xl border border-white/10 leading-relaxed">
                  {activeNote.algorithm}
                </pre>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-indigo-400" /> 14. Flow Explanation
                </h4>
                <p className="text-slate-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                  {activeNote.flow}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" /> 16. Step-by-Step Dry Run Trace
                </h4>
                <pre className="font-mono text-amber-300/90 whitespace-pre-wrap bg-amber-500/5 p-4 rounded-xl border border-amber-500/20 leading-relaxed">
                  {activeNote.dryRun}
                </pre>
              </div>
            </motion.div>
          )}

          {/* TAB 4 */}
          {activeTab === 'complexity' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl border border-indigo-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                    8. Time Complexity Breakdown
                  </h4>
                  <div className="grid grid-cols-3 gap-2 font-mono text-center py-2">
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
                    <p className="text-slate-400 pt-1 font-mono">{activeNote.timeComplexity.description}</p>
                  )}
                </div>

                <div className="glass-card p-4 rounded-xl border border-purple-500/30 space-y-2">
                  <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                    9. Space Complexity Breakdown
                  </h4>
                  <div className="grid grid-cols-2 gap-2 font-mono text-center py-2">
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
                    <p className="text-slate-400 pt-1 font-mono">{activeNote.spaceComplexity.description}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeNote.advantages && activeNote.advantages.length > 0 && (
                  <div className="glass-card p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      10. Advantages
                    </h4>
                    <ul className="space-y-1.5 text-slate-200">
                      {activeNote.advantages.map((adv, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{adv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeNote.disadvantages && activeNote.disadvantages.length > 0 && (
                  <div className="glass-card p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-2">
                    <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                      11. Disadvantages
                    </h4>
                    <ul className="space-y-1.5 text-slate-200">
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

              {activeNote.applications && activeNote.applications.length > 0 && (
                <div className="glass-card p-4 rounded-xl border border-indigo-500/20 space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    12. Real-World Applications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeNote.applications.map((app, i) => (
                      <span key={i} className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeNote.bestPractices && activeNote.bestPractices.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4" /> 23. Production Best Practices
                  </h4>
                  <div className="space-y-2">
                    {activeNote.bestPractices.map((bp, i) => (
                      <div key={i} className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl text-slate-200 flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 5 */}
          {activeTab === 'code' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                13-15. Production Code Implementations (Java, C++, Python, JS)
              </h4>

              <SyntaxHighlighter
                javaCode={activeNote.javaCode}
                cppCode={activeNote.cppCode}
                pythonCode={activeNote.pythonCode}
                jsCode={activeNote.jsCode}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeNote.example && (
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase font-mono">16. Example Input / Usage</h5>
                    <pre className="font-mono text-cyan-300 bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                      {activeNote.example}
                    </pre>
                  </div>
                )}

                {activeNote.output && (
                  <div className="space-y-1.5">
                    <h5 className="text-xs font-bold text-slate-400 uppercase font-mono">17. Expected Output</h5>
                    <pre className="font-mono text-emerald-300 bg-black/40 p-3 rounded-xl border border-white/5 whitespace-pre-wrap">
                      {activeNote.output}
                    </pre>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 6 */}
          {activeTab === 'interview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-4 h-4" /> 19. Technical Interview Questions ({activeNote.interviewQuestions.length} Questions)
                </h4>

                <input
                  type="text"
                  placeholder="Search interview questions..."
                  value={iqSearchTerm}
                  onChange={(e) => setIqSearchTerm(e.target.value)}
                  className="bg-[#121624] border border-white/10 text-slate-200 rounded-lg px-3 py-1.5 text-xs w-56 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {activeNote.companyWiseQuestions && activeNote.companyWiseQuestions.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> 21. Company-Wise Asked Problems
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {activeNote.companyWiseQuestions.map((compItem, i) => (
                      <div key={i} className="glass-card p-3 rounded-xl border border-white/10 space-y-2">
                        <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          {compItem.company}
                        </div>
                        <ul className="space-y-1 text-slate-300 font-sans text-[11px]">
                          {compItem.questions.map((q, idx) => (
                            <li key={idx}>• {q}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeNote.interviewQuestions && activeNote.interviewQuestions.length > 0 && (
                <div className="space-y-3">
                  {activeNote.interviewQuestions
                    .filter((q) => q.question.toLowerCase().includes(iqSearchTerm.toLowerCase()) || q.answer.toLowerCase().includes(iqSearchTerm.toLowerCase()))
                    .map((iq, idx) => (
                      <div key={idx} className="glass-card p-4 rounded-xl border border-white/10 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-slate-200">
                            {iq.question}
                          </h5>
                          {iq.companyTags && iq.companyTags.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 shrink-0">
                              {iq.companyTags.map((comp) => (
                                <span key={comp} className="px-2 py-0.5 font-mono font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded text-[9px]">
                                  {comp}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-slate-300 bg-black/30 p-3 rounded-lg border border-white/5 leading-relaxed font-sans">
                          <strong>Detailed Answer:</strong> {iq.answer}
                        </p>
                      </div>
                    ))}
                </div>
              )}

              {activeNote.commonMistakes && activeNote.commonMistakes.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> 22. Common Pitfalls &amp; Mistakes
                  </h4>
                  <ul className="space-y-2">
                    {activeNote.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-slate-300 bg-rose-500/5 border border-rose-500/20 p-3 rounded-xl flex items-start gap-2">
                        <span className="text-rose-400 font-bold">⚠️</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeNote.relatedProblems && activeNote.relatedProblems.length > 0 && (
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <Code className="w-4 h-4" /> 20. Frequently Asked Coding Problems
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeNote.relatedProblems.map((prob, i) => (
                      <div
                        key={i}
                        onClick={() => navigate(prob.link || '/practice')}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 hover:bg-emerald-500/5 cursor-pointer transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-200">{prob.title}</div>
                          <span className={`font-mono px-2 py-0.5 rounded border inline-block mt-1 ${getDifficultyBadge(prob.difficulty || 'Medium')}`}>
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

          {/* TAB 7 */}
          {activeTab === 'revision' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
              {activeNote.revisionNotes && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" /> 25. Placement Revision Summary
                  </h4>
                  <p className="text-slate-200 bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-xl leading-relaxed">
                    {activeNote.revisionNotes}
                  </p>
                </div>
              )}

              {activeNote.cheatSheet && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4" /> 24. Cheat Sheet &amp; Complexity Table
                  </h4>
                  <pre className="font-mono text-cyan-300 bg-[#0a0d14] p-4 rounded-xl border border-white/10 whitespace-pre-wrap leading-relaxed">
                    {activeNote.cheatSheet}
                  </pre>
                </div>
              )}

              {activeNote.references && activeNote.references.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    26. Standard Documentation &amp; References
                  </h4>
                  <ul className="space-y-1 text-slate-400 font-mono">
                    {activeNote.references.map((ref, i) => (
                      <li key={i}>• {ref}</li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Related Learning Resources Cards ── */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" /> Related Learning Resources
            </h4>
            <span className="text-[10px] text-slate-400 font-mono">Interactive Modules</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Card 1: Visualization */}
            <div
              onClick={() =>
                navigate(
                  activeNote.visualizationId
                    ? `/visualizer/${activeNote.visualizationId}`
                    : '/visualizations'
                )
              }
              className="glass-card p-4 rounded-xl border border-indigo-500/20 hover:border-indigo-500/50 bg-indigo-500/5 hover:bg-indigo-500/10 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <ChevronRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Interactive Visualization
                </h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Step through algorithm execution with animation, data controls, and execution pointer.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-400 font-mono">
                Visualize Algorithm &rarr;
              </span>
            </div>

            {/* Card 2: Practice Problems */}
            <div
              onClick={() => navigate('/practice')}
              className="glass-card p-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Code className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white group-hover:text-emerald-300">
                  Practice Coding Problems
                </h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Solve curated LeetCode/GFG coding problems for {activeNote.title} in the IDE.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 font-mono">
                Solve Problems &rarr;
              </span>
            </div>

            {/* Card 3: Attempt Quiz */}
            <div
              onClick={() => navigate('/quiz')}
              className="glass-card p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/50 bg-purple-500/5 hover:bg-purple-500/10 cursor-pointer transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                  <FileQuestion className="w-5 h-5" />
                </div>
                <ChevronRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />
              </div>
              <div>
                <h5 className="text-xs font-bold text-white group-hover:text-purple-300">
                  Test Your Knowledge
                </h5>
                <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                  Take an interactive timed quiz with instant explanations and score analytics.
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-purple-400 font-mono">
                Attempt Quiz &rarr;
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      className="max-w-full mx-auto px-4 md:px-6 py-6 space-y-6 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* ── Page Header (Hidden in Full Screen Mode) ── */}
      {prefs.readerMode !== 'fullscreen' && (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Notion &amp; Medium Style Reader Mode
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-400" />
              DSA &amp; Placement Knowledge Base
            </h1>
            <p className="text-xs md:text-sm text-slate-400 mt-1">
              Flexible resizable reader, focus mode, custom typography settings, and instant full-screen technical reading.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Trigger Button */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md"
            >
              <Menu className="w-4 h-4" /> Topics
            </button>

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
      )}

      {/* ── Category Filters Pills Bar (Hidden in Full Screen Mode) ── */}
      {prefs.readerMode !== 'fullscreen' && (
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
      )}

      {/* ── MODE 3: FULL SCREEN READING OVERLAY ── */}
      {prefs.readerMode === 'fullscreen' && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0d1117] p-4 md:p-8 space-y-4">
          {/* Full Screen Top Control Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 p-3 bg-black/80 border border-white/10 rounded-2xl backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3 truncate">
              <BookOpen className="w-5 h-5 text-indigo-400 shrink-0" />
              <h3 className="text-sm font-bold text-white truncate">
                {activeNote ? activeNote.title : 'Full Screen Reader'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              {renderReadingToolbar()}
              <button
                onClick={() => setPrefs((prev) => ({ ...prev, readerMode: 'split' }))}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all cursor-pointer"
                title="Close Full Screen (ESC)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Full Screen Main Content */}
          {renderNoteContent()}
        </div>
      )}

      {/* ── MODE 1 & 2: MAIN RESIZABLE SPLIT / FOCUS LAYOUT ── */}
      {prefs.readerMode !== 'fullscreen' && (
        <div ref={containerRef} className="flex flex-col lg:flex-row gap-0 relative items-stretch">
          {/* Left Column: Topics Sidebar */}
          {prefs.readerMode === 'split' && (
            <div
              style={{ width: `${prefs.sidebarWidth}px` }}
              className="hidden lg:block shrink-0 transition-all duration-75 pr-3"
            >
              {renderTopicList()}
            </div>
          )}

          {/* Draggable Vertical Divider Handle */}
          {prefs.readerMode === 'split' && (
            <div
              onMouseDown={startResizing}
              className={`hidden lg:flex w-3 cursor-col-resize items-center justify-center group hover:bg-indigo-500/20 rounded-full transition-all relative ${
                isResizing ? 'bg-indigo-500/40' : ''
              }`}
              title="Drag to resize topic sidebar (250px - 500px)"
            >
              <div className="w-1 h-8 bg-white/20 group-hover:bg-indigo-400 rounded-full flex items-center justify-center transition-all">
                <GripVertical className="w-3 h-3 text-slate-400 group-hover:text-indigo-200" />
              </div>
            </div>
          )}

          {/* Right Column: Main Reading Content Area */}
          <div className="flex-1 space-y-4 min-w-0 pl-0 lg:pl-3">
            {/* Toolbar above note content */}
            {renderReadingToolbar()}

            {/* Note Content View */}
            {renderNoteContent()}
          </div>
        </div>
      )}

      {/* ── MOBILE SIDEBAR DRAWER ── */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-80 max-w-[85vw] bg-[#0d1117] border-r border-white/10 p-4 shadow-2xl h-full flex flex-col z-10"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <BookOpen className="w-4 h-4 text-indigo-400" /> Select Topic
                </div>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {renderTopicList()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Notes;
