import { useQueryClient } from '@tanstack/react-query';
import { useRoadmapProgress } from './useRoadmapProgress';

export interface IUserProgressResponse {
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  bookmarkedProblemIds: string[];
  revisionLevels: Record<string, string>;
}

export const USER_PROGRESS_QUERY_KEY = ['user-progress'];

export const useUserProgress = () => {
  const queryClient = useQueryClient();
  const { progress, isQuestionCompleted, isQuestionBookmarked, toggleQuestionCompletion, toggleBookmark } = useRoadmapProgress();

  const invalidateProgress = () => {
    queryClient.invalidateQueries({ queryKey: USER_PROGRESS_QUERY_KEY });
  };

  const solvedSet = new Set<string>(progress.completedQuestionIds || []);
  const bookmarkedSet = new Set<string>(progress.bookmarkedQuestionIds || []);
  const attemptedSet = new Set<string>(Object.keys(progress.revisionLevels || {}));

  const isProblemSolved = (idOrSlugOrNum?: string | number): boolean => {
    if (!idOrSlugOrNum) return false;
    return isQuestionCompleted(String(idOrSlugOrNum));
  };

  const isProblemAttempted = (idOrSlugOrNum?: string | number): boolean => {
    if (!idOrSlugOrNum) return false;
    const str = String(idOrSlugOrNum);
    return attemptedSet.has(str) || isProblemSolved(str);
  };

  const isProblemBookmarked = (idOrSlugOrNum?: string | number): boolean => {
    if (!idOrSlugOrNum) return false;
    return isQuestionBookmarked(String(idOrSlugOrNum));
  };

  return {
    progress: {
      solvedProblemIds: progress.completedQuestionIds,
      attemptedProblemIds: Array.from(attemptedSet),
      bookmarkedProblemIds: progress.bookmarkedQuestionIds,
      revisionLevels: progress.revisionLevels,
    } as IUserProgressResponse,
    isLoading: false,
    isError: false,
    refetch: async () => ({}),
    invalidateProgress,
    isProblemSolved,
    isProblemAttempted,
    isProblemBookmarked,
    toggleQuestionCompletion,
    toggleBookmark,
    solvedSet,
    attemptedSet,
    bookmarkedSet,
  };
};

export default useUserProgress;
