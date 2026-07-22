import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authService, type AuthResponse } from '@services/authService';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  isEmailVerified: boolean;
  bio?: string;
  college?: string;
  github?: string;
  linkedin?: string;
  leetcode?: string;
  streak?: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  setAuth: (data: AuthResponse) => void;
  setUser: (user: User) => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (data: AuthResponse) => {
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        set({
          user: data.user as User,
          accessToken: data.accessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      setUser: (user: User) => {
        set({ user });
      },

      logout: async () => {
        try {
          await authService.logout();
        } catch {
          // Logout even if API call fails
        }
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      checkAuth: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          set({ isLoading: false, isAuthenticated: false });
          return;
        }
        try {
          const user = await authService.getMe();
          set({
            user,
            accessToken: token,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      },
    }),
    {
      name: 'algovisualizer-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
