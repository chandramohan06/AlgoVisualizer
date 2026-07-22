import api from './api';
import { API_ENDPOINTS } from '@constants/api';
import { IUser, IUpdateProfileDto, IChangePasswordDto, ISystemSettings } from '@algovisualizer/shared';

export const userService = {
  getProfile: async (): Promise<IUser> => {
    const { data } = await api.get<{ data: IUser }>(API_ENDPOINTS.USER_PROFILE);
    return data.data;
  },

  updateProfile: async (dto: IUpdateProfileDto): Promise<IUser> => {
    const { data } = await api.put<{ data: IUser }>(API_ENDPOINTS.USER_PROFILE, dto);
    return data.data;
  },

  updateSettings: async (dto: IUpdateProfileDto): Promise<IUser> => {
    const { data } = await api.put<{ data: IUser }>(API_ENDPOINTS.USER_SETTINGS, dto);
    return data.data;
  },

  changePassword: async (dto: IChangePasswordDto): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(API_ENDPOINTS.USER_CHANGE_PASSWORD, dto);
    return data;
  },

  exportUserData: async (): Promise<Blob> => {
    const { data } = await api.get(API_ENDPOINTS.USER_EXPORT_DATA, { responseType: 'blob' });
    return data;
  },

  deleteAccount: async (password: string): Promise<{ message: string }> => {
    const { data } = await api.post<{ message: string }>(API_ENDPOINTS.USER_DELETE_ACCOUNT, { password });
    return data;
  },

  getSystemSettings: async (): Promise<ISystemSettings> => {
    const { data } = await api.get<{ data: ISystemSettings }>(API_ENDPOINTS.ADMIN_SYSTEM_SETTINGS);
    return data.data;
  },

  updateSystemSettings: async (settings: Partial<ISystemSettings>): Promise<ISystemSettings> => {
    const { data } = await api.put<{ data: ISystemSettings }>(API_ENDPOINTS.ADMIN_SYSTEM_SETTINGS, settings);
    return data.data;
  },

  uploadAvatar: async (fileOrBase64: File | string): Promise<IUser> => {
    if (typeof fileOrBase64 === 'string') {
      const { data } = await api.put<{ data: IUser }>(API_ENDPOINTS.USER_AVATAR, { avatar: fileOrBase64 });
      return data.data;
    }
    const formData = new FormData();
    formData.append('avatar', fileOrBase64);
    const { data } = await api.put<{ data: IUser }>(API_ENDPOINTS.USER_AVATAR, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  },

  deleteAvatar: async (): Promise<IUser> => {
    const { data } = await api.delete<{ data: IUser }>(API_ENDPOINTS.USER_AVATAR);
    return data.data;
  },
};

export default userService;
