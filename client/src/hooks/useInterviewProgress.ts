import { useState, useEffect, useCallback } from 'react';
import { type RevisionLevel } from '@algorithms/metadata/interviewMetadata';

const SOLVED_STORAGE_KEY = 'algovisualizer_solved_questions';
const BOOKMARK_STORAGE_KEY = 'algovisualizer_bookmarked_questions';
const REVISION_STORAGE_KEY = 'algovisualizer_revision_status';

export function useInterviewProgress() {
  const [solvedIds, setSolvedIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(SOLVED_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set(['arr-two-sum', 'll-reverse']);
    } catch {
      return new Set(['arr-two-sum', 'll-reverse']);
    }
  });

  const [bookmarkIds, setBookmarkIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARK_STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set(['arr-max-subarray']);
    } catch {
      return new Set(['arr-max-subarray']);
    }
  });

  const [revisionLevels, setRevisionLevels] = useState<Record<string, RevisionLevel>>(() => {
    try {
      const saved = localStorage.getItem(REVISION_STORAGE_KEY);
      return saved ? JSON.parse(saved) : { 'arr-two-sum': 'revision-1', 'll-reverse': 'mastered' };
    } catch {
      return { 'arr-two-sum': 'revision-1', 'll-reverse': 'mastered' };
    }
  });

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem(SOLVED_STORAGE_KEY, JSON.stringify(Array.from(solvedIds)));
  }, [solvedIds]);

  useEffect(() => {
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(Array.from(bookmarkIds)));
  }, [bookmarkIds]);

  useEffect(() => {
    localStorage.setItem(REVISION_STORAGE_KEY, JSON.stringify(revisionLevels));
  }, [revisionLevels]);

  const toggleSolved = useCallback((id: string) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarkIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const setRevisionLevel = useCallback((id: string, level: RevisionLevel) => {
    setRevisionLevels((prev) => ({
      ...prev,
      [id]: level,
    }));
  }, []);

  return {
    solvedIds,
    bookmarkIds,
    revisionLevels,
    toggleSolved,
    toggleBookmark,
    setRevisionLevel,
    isSolved: (id: string) => solvedIds.has(id),
    isBookmarked: (id: string) => bookmarkIds.has(id),
    getRevisionLevel: (id: string) => revisionLevels[id] || 'unmarked',
  };
}
