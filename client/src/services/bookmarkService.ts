import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { BookmarkedAlgo } from '../hooks/useBookmarks';

export const bookmarkService = {
  getAll: async (): Promise<BookmarkedAlgo[]> => {
    const { data } = await api.get<{ data: BookmarkedAlgo[] }>(API_ENDPOINTS.USER_BOOKMARKS);
    return data.data;
  },

  toggleBookmark: async (slug: string): Promise<{ bookmarked: boolean }> => {
    const { data } = await api.post<{ data: { bookmarked: boolean } }>(API_ENDPOINTS.ALGORITHM_BOOKMARK(slug));
    return data.data;
  },
};
export default bookmarkService;
