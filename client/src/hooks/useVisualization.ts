import { useEffect, useRef } from 'react';
import { useVisualizationStore, type VisualizationFrame } from '@store/visualizationStore';

export const useVisualization = (initialFrames?: VisualizationFrame[]) => {
  const {
    isPlaying,
    currentFrameIndex,
    speed,
    frames,
    setFrames,
    nextStep,
    prevStep,
    seekTo,
    togglePlay,
    reset,
    setSpeed
  } = useVisualizationStore();

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Load frames if provided
  useEffect(() => {
    if (initialFrames && initialFrames.length > 0) {
      setFrames(initialFrames);
    }
  }, [initialFrames, setFrames]);

  // Handle autoplay interval
  useEffect(() => {
    if (isPlaying) {
      const run = () => {
        if (currentFrameIndex >= frames.length - 1) {
          useVisualizationStore.setState({ isPlaying: false });
          return;
        }
        nextStep();
      };
      timerRef.current = setInterval(run, speed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, currentFrameIndex, speed, frames.length, nextStep]);

  const currentFrame = frames[currentFrameIndex] || null;

  return {
    isPlaying,
    currentFrameIndex,
    totalFrames: frames.length,
    speed,
    currentFrame,
    togglePlay,
    nextStep,
    prevStep,
    seekTo,
    reset,
    setSpeed
  };
};
export default useVisualization;
