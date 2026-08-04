import { useState, useEffect } from 'react';

export interface BookmarkItem {
  id: string;
  _id?: string;
  slug?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  type: 'algorithm' | 'note' | 'visualizer' | 'quiz';
  title: string;
  category?: string;
  path: string;
  savedAt: string;
}

export type BookmarkedAlgo = BookmarkItem;

const STORAGE_KEY = 'algovisualizer_user_bookmarks';

const INITIAL_BOOKMARKS: BookmarkItem[] = [
  {
    id: 'note-1',
    _id: 'note-1',
    slug: 'arrays-and-arraylist-in-java',
    difficulty: 'easy',
    type: 'note',
    title: 'Arrays & ArrayList in Java',
    category: 'Array',
    path: '/notes?slug=arrays-and-arraylist-in-java',
    savedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'vis-1',
    _id: 'vis-1',
    slug: 'bubble-sort',
    difficulty: 'easy',
    type: 'visualizer',
    title: 'Bubble Sort Visualizer',
    category: 'Sorting',
    path: '/visualizer/sorting/bubble-sort',
    savedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'algo-1',
    _id: 'algo-1',
    slug: 'binary-search-tree',
    difficulty: 'medium',
    type: 'algorithm',
    title: 'Binary Search Tree Traversal',
    category: 'Tree',
    path: '/algorithms',
    savedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'quiz-1',
    _id: 'quiz-1',
    slug: 'dp-quiz',
    difficulty: 'hard',
    type: 'quiz',
    title: 'Dynamic Programming MCQ Quiz',
    category: 'DP',
    path: '/quiz',
    savedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
  },
];

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : INITIAL_BOOKMARKS;
    } catch {
      return INITIAL_BOOKMARKS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (e) {
      console.error('Failed to save bookmarks:', e);
    }
  }, [bookmarks]);

  const addBookmark = (item: Omit<BookmarkItem, 'savedAt'>) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.id === item.id || b._id === item._id)) return prev;
      return [{ ...item, savedAt: new Date().toISOString() }, ...prev];
    });
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id && b._id !== id));
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id || b._id === id);
  };

  const toggleBookmark = (item: Omit<BookmarkItem, 'savedAt'>) => {
    if (isBookmarked(item.id)) {
      removeBookmark(item.id);
    } else {
      addBookmark(item);
    }
  };

  return {
    bookmarks,
    data: bookmarks,
    isLoading: false,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
  };
}
