import api from './api';
import { API_ENDPOINTS } from '@constants/api';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  college?: string;
  course?: string;
  year?: string;
  profileImage?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    isEmailVerified: boolean;
  };
}

export const authService = {
  login: async (payload: LoginPayload) => {
    const { data } = await api.post<{ data: AuthResponse }>(API_ENDPOINTS.AUTH_LOGIN, payload);
    return data.data;
  },

  register: async (payload: RegisterPayload) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH_REGISTER, payload);
    return data.data;
  },

  logout: async () => {
    await api.post(API_ENDPOINTS.AUTH_LOGOUT);
  },

  getMe: async () => {
    const { data } = await api.get(API_ENDPOINTS.AUTH_ME);
    return data.data;
  },

  forgotPassword: async (email: string) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email });
    return data;
  },

  resetPassword: async (token: string, password: string) => {
    const { data } = await api.post(API_ENDPOINTS.AUTH_RESET_PASSWORD(token), { password });
    return data;
  },

  verifyEmail: async (token: string) => {
    const { data } = await api.get(API_ENDPOINTS.AUTH_VERIFY_EMAIL(token));
    return data;
  },
};
