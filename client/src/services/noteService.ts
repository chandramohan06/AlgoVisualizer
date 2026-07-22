import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { INote, ICreateNoteDto, IUpdateNoteDto } from '@algovisualizer/shared';

export const noteService = {
  getAll: async (params?: Record<string, string>): Promise<INote[]> => {
    const { data } = await api.get<{ data: INote[] }>(API_ENDPOINTS.NOTES, { params });
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

  toggleBookmark: async (id: string): Promise<INote> => {
    const { data } = await api.post<{ data: INote }>(API_ENDPOINTS.NOTE_BOOKMARK(id));
    return data.data;
  },
};
export default noteService;
