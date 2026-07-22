import { useQuery } from '@tanstack/react-query';
import { bookmarkService } from '@services/bookmarkService';

export interface BookmarkedAlgo {
  _id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const MOCK_BOOKMARKS: BookmarkedAlgo[] = [
  { _id: '1', slug: 'quick-sort', title: 'Quick Sort', category: 'Sorting', difficulty: 'medium' },
  { _id: '2', slug: 'dijkstra', title: "Dijkstra's Algorithm", category: 'Graph', difficulty: 'hard' },
  { _id: '3', slug: 'lcs', title: 'Longest Common Subsequence', category: 'DP', difficulty: 'medium' },
];

export const useBookmarks = () =>
  useQuery<BookmarkedAlgo[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      try {
        return await bookmarkService.getAll();
      } catch {
        return MOCK_BOOKMARKS;
      }
    },
    staleTime: 5 * 60 * 1000,
  });
