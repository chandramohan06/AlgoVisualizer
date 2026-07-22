import { create } from 'zustand';

export interface VisualizationFrame {
  index: number;
  description: string;
  data: number[] | { nodes: any[]; edges: any[] } | Record<string, any>;
  highlights: number[] | string[];          // Highlight indices or node IDs
  pointers: Record<string, number | string>; // Pointers like { i: 2, j: 4 }
  codeLineHighlight: number;                 // Line to highlight in editor
  variables: Record<string, any>;            // Scoped variables like { swaps: 3, temp: 12 }
  meta?: Record<string, any>;
  timestamp: number;
}

interface VisualizationState {
  isPlaying: boolean;
  currentFrameIndex: number;
  speed: number; // in milliseconds delay
  frames: VisualizationFrame[];
  
  setFrames: (frames: VisualizationFrame[]) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  nextStep: () => void;
  prevStep: () => void;
  seekTo: (index: number) => void;
  setSpeed: (speed: number) => void;
  reset: () => void;
}

export const useVisualizationStore = create<VisualizationState>((set) => ({
  isPlaying: false,
  currentFrameIndex: 0,
  speed: 600, // default 600ms per step
  frames: [],

  setFrames: (frames) => set({ frames, currentFrameIndex: 0, isPlaying: false }),
  
  play: () => set((state) => {
    if (state.currentFrameIndex >= state.frames.length - 1) {
      return { isPlaying: true, currentFrameIndex: 0 };
    }
    return { isPlaying: true };
  }),
  
  pause: () => set({ isPlaying: false }),
  
  togglePlay: () => set((state) => {
    if (state.currentFrameIndex >= state.frames.length - 1) {
      return { isPlaying: !state.isPlaying, currentFrameIndex: 0 };
    }
    return { isPlaying: !state.isPlaying };
  }),
  
  nextStep: () => set((state) => {
    if (state.currentFrameIndex < state.frames.length - 1) {
      return { currentFrameIndex: state.currentFrameIndex + 1 };
    }
    return { isPlaying: false };
  }),
  
  prevStep: () => set((state) => ({
    currentFrameIndex: Math.max(state.currentFrameIndex - 1, 0)
  })),
  
  seekTo: (index) => set((state) => ({
    currentFrameIndex: Math.min(Math.max(index, 0), state.frames.length - 1)
  })),
  
  setSpeed: (speed) => set({ speed }),
  
  reset: () => set({ currentFrameIndex: 0, isPlaying: false }),
}));
export default useVisualizationStore;
