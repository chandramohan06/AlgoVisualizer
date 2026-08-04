import { useQueryClient } from '@tanstack/react-query';

export interface IUserProgressResponse {
  solvedProblemIds: string[];
  attemptedProblemIds: string[];
  bookmarkedProblemIds: string[];
  revisionLevels: Record<string, string>;
}

export const USER_PROGRESS_QUERY_KEY = ['user-progress'];

export const useUserProgress = () => {
  const queryClient = useQueryClient();

  const invalidateProgress = () => {
    queryClient.invalidateQueries({ queryKey: USER_PROGRESS_QUERY_KEY });
  };

  const solvedSet = new Set<string>();
  const attemptedSet = new Set<string>();
  const bookmarkedSet = new Set<string>();

  const isProblemSolved = (_idOrSlugOrNum?: string | number): boolean => false;
  const isProblemAttempted = (_idOrSlugOrNum?: string | number): boolean => false;
  const isProblemBookmarked = (_idOrSlugOrNum?: string | number): boolean => false;

  return {
    progress: {
      solvedProblemIds: [],
      attemptedProblemIds: [],
      bookmarkedProblemIds: [],
      revisionLevels: {},
    } as IUserProgressResponse,
    isLoading: false,
    isError: false,
    refetch: async () => ({}),
    invalidateProgress,
    isProblemSolved,
    isProblemAttempted,
    isProblemBookmarked,
    solvedSet,
    attemptedSet,
    bookmarkedSet,
  };
};

export default useUserProgress;
