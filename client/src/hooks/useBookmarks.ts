import { useQuery } from '@tanstack/react-query';
import { bookmarkService } from '@services/bookmarkService';

export interface BookmarkedAlgo {
  _id: string;
  slug: string;
  title: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const useBookmarks = () =>
  useQuery<BookmarkedAlgo[]>({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      try {
        const res = await bookmarkService.getAll();
        return res || [];
      } catch {
        return [];
      }
    },
    staleTime: 5 * 60 * 1000,
  });
