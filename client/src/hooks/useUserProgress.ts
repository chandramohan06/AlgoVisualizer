import { useQuery, useQueryClient } from '@tanstack/react-query';
import practiceService, { IUserProgressResponse } from '../services/practiceService';

export const USER_PROGRESS_QUERY_KEY = ['user-progress'];

export const useUserProgress = () => {
  const queryClient = useQueryClient();

  const query = useQuery<IUserProgressResponse>({
    queryKey: USER_PROGRESS_QUERY_KEY,
    queryFn: async () => {
      const data = await practiceService.getUserProgress();
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const invalidateProgress = () => {
    queryClient.invalidateQueries({ queryKey: USER_PROGRESS_QUERY_KEY });
  };

  const solvedSet = new Set<string>(query.data?.solvedProblemIds || []);
  const attemptedSet = new Set<string>(query.data?.attemptedProblemIds || []);
  const bookmarkedSet = new Set<string>(query.data?.bookmarkedProblemIds || []);

  const isProblemSolved = (idOrSlugOrNum?: string | number): boolean => {
    if (idOrSlugOrNum === undefined || idOrSlugOrNum === null || idOrSlugOrNum === '') return false;
    const str = String(idOrSlugOrNum);
    return (
      solvedSet.has(str) ||
      solvedSet.has(str.toLowerCase()) ||
      (str.startsWith('p-') ? solvedSet.has(str.replace(/^p-/i, '')) : solvedSet.has(`p-${str}`))
    );
  };

  const isProblemAttempted = (idOrSlugOrNum?: string | number): boolean => {
    if (idOrSlugOrNum === undefined || idOrSlugOrNum === null || idOrSlugOrNum === '') return false;
    const str = String(idOrSlugOrNum);
    return (
      attemptedSet.has(str) ||
      attemptedSet.has(str.toLowerCase()) ||
      (str.startsWith('p-') ? attemptedSet.has(str.replace(/^p-/i, '')) : attemptedSet.has(`p-${str}`))
    );
  };

  const isProblemBookmarked = (idOrSlugOrNum?: string | number): boolean => {
    if (idOrSlugOrNum === undefined || idOrSlugOrNum === null || idOrSlugOrNum === '') return false;
    const str = String(idOrSlugOrNum);
    return (
      bookmarkedSet.has(str) ||
      bookmarkedSet.has(str.toLowerCase()) ||
      (str.startsWith('p-') ? bookmarkedSet.has(str.replace(/^p-/i, '')) : bookmarkedSet.has(`p-${str}`))
    );
  };

  return {
    progress: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
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
