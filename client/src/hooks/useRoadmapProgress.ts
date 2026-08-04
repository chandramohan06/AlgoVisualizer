import { useState, useEffect, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';

export const ROADMAP_PROGRESS_QUERY_KEY = ['roadmap-progress'];
const STORAGE_KEY = 'algovisualizer_roadmap_progress_v2';

export interface IRoadmapProgressData {
  completedQuestionIds: string[];
  bookmarkedQuestionIds: string[];
  revisionLevels: Record<string, string>;
}

const getStoredProgress = (): IRoadmapProgressData => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (err) {
    console.error('Failed to read roadmap progress from localStorage:', err);
  }
  return {
    completedQuestionIds: [],
    bookmarkedQuestionIds: [],
    revisionLevels: {},
  };
};

const saveStoredProgress = (data: IRoadmapProgressData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save roadmap progress to localStorage:', err);
  }
};

export const useRoadmapProgress = () => {
  const queryClient = useQueryClient();
  const [localProgress, setLocalProgress] = useState<IRoadmapProgressData>(getStoredProgress);

  // Sync state with localStorage
  useEffect(() => {
    saveStoredProgress(localProgress);
  }, [localProgress]);

  // Fetch backend progress if available
  const query = useQuery<IRoadmapProgressData>({
    queryKey: ROADMAP_PROGRESS_QUERY_KEY,
    queryFn: async () => {
      try {
        const { data } = await api.get('/progress/summary');
        if (data?.data?.completedQuestionIds) {
          return {
            completedQuestionIds: data.data.completedQuestionIds || [],
            bookmarkedQuestionIds: data.data.bookmarkedQuestionIds || [],
            revisionLevels: data.data.revisionLevels || {},
          };
        }
      } catch {
        // Fallback to local storage if offline or endpoint not returning full details
      }
      return getStoredProgress();
    },
    staleTime: 1000 * 60 * 5,
    initialData: localProgress,
  });

  const completedSet = new Set<string>([
    ...localProgress.completedQuestionIds,
    ...(query.data?.completedQuestionIds || []),
  ]);

  const bookmarkedSet = new Set<string>([
    ...localProgress.bookmarkedQuestionIds,
    ...(query.data?.bookmarkedQuestionIds || []),
  ]);

  const isQuestionCompleted = useCallback(
    (questionId: string, leetcodeNumber?: number | string): boolean => {
      if (completedSet.has(questionId) || completedSet.has(questionId.toLowerCase())) {
        return true;
      }
      if (leetcodeNumber && (completedSet.has(String(leetcodeNumber)) || completedSet.has(`p-${leetcodeNumber}`))) {
        return true;
      }
      return false;
    },
    [completedSet]
  );

  const isQuestionBookmarked = useCallback(
    (questionId: string, leetcodeNumber?: number | string): boolean => {
      if (bookmarkedSet.has(questionId) || bookmarkedSet.has(questionId.toLowerCase())) {
        return true;
      }
      if (leetcodeNumber && (bookmarkedSet.has(String(leetcodeNumber)) || bookmarkedSet.has(`p-${leetcodeNumber}`))) {
        return true;
      }
      return false;
    },
    [bookmarkedSet]
  );

  const toggleQuestionCompletion = useCallback(
    async (questionId: string, isCurrentlyCompleted: boolean, status?: string) => {
      const willBeCompleted = !isCurrentlyCompleted;

      setLocalProgress((prev) => {
        const newCompleted = willBeCompleted
          ? Array.from(new Set([...prev.completedQuestionIds, questionId]))
          : prev.completedQuestionIds.filter((id) => id !== questionId && id !== questionId.toLowerCase());

        const newRevision = {
          ...prev.revisionLevels,
          [questionId]: status || (willBeCompleted ? 'Completed' : 'Not Started'),
        };

        const updated = {
          ...prev,
          completedQuestionIds: newCompleted,
          revisionLevels: newRevision,
        };

        saveStoredProgress(updated);
        return updated;
      });

      // Background API sync
      try {
        await api.post('/progress/toggle', {
          questionId,
          isCompleted: willBeCompleted,
          status: status || (willBeCompleted ? 'Completed' : 'Not Started'),
        });
      } catch (err) {
        // Saved in localStorage offline fallback
      }

      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
    },
    [queryClient]
  );

  const toggleBookmark = useCallback(
    async (questionId: string) => {
      setLocalProgress((prev) => {
        const isBookmarked = prev.bookmarkedQuestionIds.includes(questionId);
        const newBookmarked = isBookmarked
          ? prev.bookmarkedQuestionIds.filter((id) => id !== questionId)
          : [...prev.bookmarkedQuestionIds, questionId];

        const updated = { ...prev, bookmarkedQuestionIds: newBookmarked };
        saveStoredProgress(updated);
        return updated;
      });

      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
    },
    [queryClient]
  );

  return {
    progress: localProgress,
    isLoading: query.isLoading,
    completedCount: completedSet.size,
    isQuestionCompleted,
    isQuestionBookmarked,
    toggleQuestionCompletion,
    toggleBookmark,
    invalidateRoadmapProgress: () => {
      queryClient.invalidateQueries({ queryKey: ROADMAP_PROGRESS_QUERY_KEY });
    },
  };
};

export default useRoadmapProgress;
