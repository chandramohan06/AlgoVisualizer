import { useState, useCallback } from 'react';

const CONTINUE_LEARNING_KEY = 'algovisualizer_continue_learning_session';

export interface LearningSessionState {
  category: string;
  slug: string;
  title: string;
  operationId?: string;
  customInput?: any;
  frameIndex?: number;
  speed?: number;
  zoom?: number;
  activeTab?: string;
  scrollY?: number;
  timestamp: number;
}

export function useContinueLearning() {
  const [session, setSession] = useState<LearningSessionState | null>(() => {
    try {
      const saved = localStorage.getItem(CONTINUE_LEARNING_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const saveSession = useCallback((updates: Partial<LearningSessionState>) => {
    setSession((prev) => {
      const next = {
        ...(prev || { category: '', slug: '', title: '' }),
        ...updates,
        timestamp: Date.now(),
      } as LearningSessionState;
      localStorage.setItem(CONTINUE_LEARNING_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const restoreSession = useCallback(() => {
    try {
      const saved = localStorage.getItem(CONTINUE_LEARNING_KEY);
      return saved ? (JSON.parse(saved) as LearningSessionState) : null;
    } catch {
      return null;
    }
  }, []);

  return {
    session,
    saveSession,
    restoreSession,
  };
}
