import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { INote, ICreateNoteDto, IUpdateNoteDto, INoteQueryFilter } from '@algovisualizer/shared';

export interface IDashboardNotesResponse {
  stats: {
    notesReadCount: number;
    completedCount: number;
    bookmarkedCount: number;
    totalReadingTimeMinutes: number;
  };
  continueReading: INote | null;
  recentlyOpened: INote[];
  bookmarkedNotes: INote[];
  recentlyAdded: INote[];
}

export const noteService = {
  getAll: async (params?: INoteQueryFilter): Promise<INote[]> => {
    const { data } = await api.get<{ data: INote[] }>(API_ENDPOINTS.NOTES, { params });
    return data.data;
  },

  getBySlugOrId: async (idOrSlug: string): Promise<INote> => {
    const { data } = await api.get<{ data: INote }>(API_ENDPOINTS.NOTE_BY_ID(idOrSlug));
    return data.data;
  },

  getDashboardData: async (): Promise<IDashboardNotesResponse> => {
    const { data } = await api.get<{ data: IDashboardNotesResponse }>(API_ENDPOINTS.NOTE_DASHBOARD);
    return data.data;
  },

  create: async (payload: ICreateNoteDto): Promise<INote> => {
    const { data } = await api.post<{ data: INote }>(API_ENDPOINTS.NOTES, payload);
    return data.data;
  },

  update: async (id: string, payload: IUpdateNoteDto): Promise<INote> => {
    const { data } = await api.put<{ data: INote }>(API_ENDPOINTS.NOTE_BY_ID(id), payload);
    return data.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINTS.NOTE_BY_ID(id));
  },

  toggleBookmark: async (id: string): Promise<{ noteId: string; isBookmarked: boolean }> => {
    const { data } = await api.post<{ data: { noteId: string; isBookmarked: boolean } }>(API_ENDPOINTS.NOTE_BOOKMARK(id));
    return data.data;
  },

  toggleComplete: async (id: string): Promise<{ noteId: string; isCompleted: boolean }> => {
    const { data } = await api.post<{ data: { noteId: string; isCompleted: boolean } }>(API_ENDPOINTS.NOTE_COMPLETE(id));
    return data.data;
  },

  recordReadTime: async (id: string, minutes: number = 1): Promise<void> => {
    await api.post(API_ENDPOINTS.NOTE_READ_TIME(id), { minutes });
  },

  togglePublish: async (id: string): Promise<INote> => {
    const { data } = await api.put<{ data: INote }>(API_ENDPOINTS.NOTE_PUBLISH(id));
    return data.data;
  },

  duplicate: async (id: string): Promise<INote> => {
    const { data } = await api.post<{ data: INote }>(API_ENDPOINTS.NOTE_DUPLICATE(id));
    return data.data;
  },

  reorder: async (orderedIds: string[]): Promise<void> => {
    await api.put(API_ENDPOINTS.NOTE_REORDER, { orderedIds });
  },
};

export default noteService;
