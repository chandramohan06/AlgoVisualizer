import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, StickyNote, Folder, ArrowRight, X, Brain, Play, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@store/uiStore';

export interface SearchResult {
  id: string;
  title: string;
  type: 'algorithm' | 'quiz' | 'note' | 'visualizer';
  category?: string;
  path: string;
  description?: string;
}

const EXTENDED_MOCK_DB: SearchResult[] = [
  { id: '1', title: 'Bubble Sort Visualizer', type: 'visualizer', category: 'Sorting', path: '/visualizer/sorting/bubble-sort', description: 'Step-by-step array exchange animation' },
  { id: '2', title: 'Quick Sort Visualizer', type: 'visualizer', category: 'Sorting', path: '/visualizer/sorting/quick-sort', description: 'Pivot partitioning visualization' },
  { id: '3', title: 'Binary Search Visualizer', type: 'visualizer', category: 'Searching', path: '/visualizer/searching/binary-search', description: 'Logarithmic search space halving' },
  { id: '4', title: 'Breadth First Search (BFS)', type: 'algorithm', category: 'Graph', path: '/algorithms', description: 'Level-order graph and tree traversal' },
  { id: '5', title: 'Depth First Search (DFS)', type: 'algorithm', category: 'Graph', path: '/algorithms', description: 'Stack-based recursive graph traversal' },
  { id: '6', title: 'Arrays & ArrayList Study Note', type: 'note', category: 'Array', path: '/notes?slug=arrays-and-arraylist-in-java', description: '26-section DSA theory note' },
  { id: '7', title: 'Linked List Deep Dive Note', type: 'note', category: 'Linked List', path: '/notes?slug=linked-list', description: 'Singly vs Doubly Linked List complexity' },
  { id: '8', title: 'Dynamic Programming Patterns Note', type: 'note', category: 'DP', path: '/notes?slug=dynamic-programming', description: 'Memoization vs Tabulation' },
  { id: '9', title: 'Array Two-Pointer Quiz', type: 'quiz', category: 'Array', path: '/quiz', description: '10 MCQ questions with score tracking' },
  { id: '10', title: 'Tree Traversal MCQ Quiz', type: 'quiz', category: 'Tree', path: '/quiz', description: 'In-order, Pre-order & Post-order quiz' },
  { id: '11', title: 'Dijkstra Shortest Path Visualizer', type: 'visualizer', category: 'Graph', path: '/visualizer/graph/dijkstra', description: 'Weighted graph shortest path finder' },
  { id: '12', title: 'Two Sum Problem Pattern', type: 'algorithm', category: 'Array', path: '/algorithms', description: 'Hash table & Two Pointer techniques' },
];

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen } = useUIStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'algorithm' | 'note' | 'quiz' | 'visualizer'>('all');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Bubble Sort',
    'Binary Search',
    'Dynamic Programming Note',
    'Arrays Quiz',
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const qLower = query.toLowerCase();
    const filtered = EXTENDED_MOCK_DB.filter((item) => {
      const categoryMatch = activeCategory === 'all' || item.type === activeCategory;
      const textMatch =
        item.title.toLowerCase().includes(qLower) ||
        (item.category && item.category.toLowerCase().includes(qLower)) ||
        (item.description && item.description.toLowerCase().includes(qLower));
      return categoryMatch && textMatch;
    });
    setResults(filtered);
  }, [query, activeCategory]);

  // Handle ESC & Cmd/Ctrl+K keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const handleSelect = (result: SearchResult) => {
    if (!recentSearches.includes(result.title)) {
      setRecentSearches([result.title, ...recentSearches.slice(0, 3)]);
    }
    setSearchOpen(false);
    navigate(result.path);
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'algorithm':
        return <Folder className="w-4 h-4 text-indigo-400" />;
      case 'visualizer':
        return <Play className="w-4 h-4 text-cyan-400 fill-current" />;
      case 'note':
        return <StickyNote className="w-4 h-4 text-emerald-400" />;
      case 'quiz':
        return <Brain className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] p-4 bg-black/70 backdrop-blur-md font-sans"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.95, y: -15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: -15 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117]/95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Box */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <Search className="w-5 h-5 text-indigo-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Algorithms, Visualizers, Notes & Quizzes..."
                className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none font-medium"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-slate-400 hover:text-white p-1">
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-white/5 border border-white/10 px-2 py-1 rounded-lg">
                ESC to close
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-1.5 px-5 py-2.5 border-b border-white/5 bg-black/20 overflow-x-auto no-scrollbar">
              {[
                { key: 'all', label: 'All Results' },
                { key: 'algorithm', label: 'Algorithms' },
                { key: 'visualizer', label: 'Visualizer' },
                { key: 'note', label: 'Notes' },
                { key: 'quiz', label: 'Quiz' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveCategory(tab.key as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.key
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search Results / Recent Searches Body */}
            <div className="max-h-[380px] overflow-y-auto p-3 space-y-1">
              {!query.trim() ? (
                <div className="p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <History className="w-3.5 h-3.5 text-indigo-400" /> Recent Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => setQuery(item)}
                          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-300 font-mono flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Search className="w-3 h-3 text-slate-500" /> {item}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 text-center text-xs text-slate-500 font-mono">
                    Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">⌘K</kbd> or <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white">Ctrl+K</kbd> anywhere to open search
                  </div>
                </div>
              ) : results.length === 0 ? (
                <div className="py-14 text-center space-y-2">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-400">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">No search results found</h4>
                  <p className="text-xs text-slate-500">No matches found for &quot;{query}&quot; in {activeCategory} category.</p>
                </div>
              ) : (
                results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="group flex items-center justify-between p-3 rounded-2xl hover:bg-white/[0.04] cursor-pointer transition-all border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-105 transition-transform">
                        {getIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {item.description || `${item.type.toUpperCase()} • ${item.category || 'General'}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                        {item.type}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalSearchModal;
