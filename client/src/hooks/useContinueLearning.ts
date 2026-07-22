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

const DEFAULT_SESSION: LearningSessionState = {
  category: 'array',
  slug: 'array-traversal',
  title: 'Array Traversal',
  operationId: 'traverse',
  customInput: [5, 2, 8, 1, 9, 3, 7, 4],
  frameIndex: 0,
  speed: 500,
  zoom: 1,
  activeTab: 'explanation',
  scrollY: 0,
  timestamp: Date.now(),
};

export function useContinueLearning() {
  const [session, setSession] = useState<LearningSessionState>(() => {
    try {
      const saved = localStorage.getItem(CONTINUE_LEARNING_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_SESSION;
    } catch {
      return DEFAULT_SESSION;
    }
  });

  const saveSession = useCallback((updates: Partial<LearningSessionState>) => {
    setSession((prev) => {
      const next = {
        ...prev,
        ...updates,
        timestamp: Date.now(),
      };
      localStorage.setItem(CONTINUE_LEARNING_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const restoreSession = useCallback(() => {
    try {
      const saved = localStorage.getItem(CONTINUE_LEARNING_KEY);
      return saved ? (JSON.parse(saved) as LearningSessionState) : DEFAULT_SESSION;
    } catch {
      return DEFAULT_SESSION;
    }
  }, []);

  return {
    session,
    saveSession,
    restoreSession,
  };
}
