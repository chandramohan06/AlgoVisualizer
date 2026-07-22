import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, StickyNote, Code2, Folder, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@store/uiStore';
import { ROUTES, buildRoute } from '@constants/routes';

interface SearchResult {
  id: string;
  title: string;
  type: 'algorithm' | 'category' | 'note' | 'problem';
  category?: string;
  path: string;
}

// Realistic mock results
const MOCK_DB: SearchResult[] = [
  { id: '1', title: 'Bubble Sort', type: 'algorithm', category: 'Sorting', path: buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: 'bubble-sort' }) },
  { id: '2', title: 'Quick Sort', type: 'algorithm', category: 'Sorting', path: buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: 'quick-sort' }) },
  { id: '3', title: 'Binary Search', type: 'algorithm', category: 'Searching', path: buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: 'binary-search' }) },
  { id: '4', title: 'Binary Search Tree', type: 'algorithm', category: 'Tree', path: buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: 'binary-search-tree' }) },
  { id: '5', title: 'Sorting Algorithms', type: 'category', path: ROUTES.ALGORITHMS + '?category=sorting' },
  { id: '6', title: 'Graph Algorithms', type: 'category', path: ROUTES.ALGORITHMS + '?category=graph' },
  { id: '7', title: 'DFS vs BFS comparison notes', type: 'note', path: ROUTES.NOTES },
  { id: '8', title: 'My custom BST insertion notes', type: 'note', path: ROUTES.NOTES },
  { id: '9', title: 'Two Sum Problem', type: 'problem', path: ROUTES.PRACTICE },
  { id: '10', title: 'Reverse Linked List Challenge', type: 'problem', path: ROUTES.PRACTICE },
];

export const GlobalSearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen } = useUIStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const filtered = MOCK_DB.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category?.toLowerCase().includes(query.toLowerCase()),
    );
    setResults(filtered);
  }, [query]);

  // Handle ESC key close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
      // Cmd/Ctrl + K to open search modal
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSearchOpen]);

  const handleSelect = (path: string) => {
    setSearchOpen(false);
    navigate(path);
  };

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'algorithm':
        return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'category':
        return <Folder className="w-4 h-4 text-indigo-400" />;
      case 'note':
        return <StickyNote className="w-4 h-4 text-amber-400" />;
      case 'problem':
        return <Code2 className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.97, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.97, y: -10 }}
            transition={{ duration: 0.15 }}
            className="w-full max-w-xl glass-strong rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input Header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5 bg-white/[0.01]">
              <Search className="w-5 h-5 text-gray-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search algorithms, categories, notes, practice problems..."
                className="w-full bg-transparent text-sm text-gray-200 placeholder:text-gray-600 focus:outline-none"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-500 transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results body */}
            <div className="max-h-[350px] overflow-y-auto p-2 space-y-1">
              {!query ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  Type to search. Use <kbd className="bg-white/10 px-1 py-0.5 rounded font-mono">⌘K</kbd> to toggle.
                </div>
              ) : results.length === 0 ? (
                <div className="py-12 text-center text-xs text-gray-500">
                  No results found matching "{query}"
                </div>
              ) : (
                results.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item.path)}
                    className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/[0.03] cursor-pointer transition-all border border-transparent hover:border-white/5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                        {getIcon(item.type)}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-gray-200 truncate group-hover:text-indigo-400 transition-colors">
                          {item.title}
                        </h4>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-gray-500">
                          {item.type} {item.category && `• ${item.category}`}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-700 opacity-0 group-hover:opacity-100 group-hover:text-indigo-400 transition-all shrink-0" />
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
