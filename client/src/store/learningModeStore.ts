import { create } from 'zustand';

export type LearningMode = 'beginner' | 'intermediate' | 'interview';

interface LearningModeState {
  mode: LearningMode;
  setMode: (mode: LearningMode) => void;
}

const LOCAL_STORAGE_KEY = 'algovisualizer_learning_mode';

export const useLearningModeStore = create<LearningModeState>((set) => ({
  mode: (localStorage.getItem(LOCAL_STORAGE_KEY) as LearningMode) || 'beginner',
  setMode: (mode) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, mode);
    set({ mode });
  },
}));

export default useLearningModeStore;
