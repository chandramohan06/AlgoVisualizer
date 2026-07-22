import React, { useState } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Sliders,
  RefreshCw,
  Square,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';

interface PlaybackProps {
  isPlaying: boolean;
  currentFrameIndex: number;
  totalFrames: number;
  speed: number;
  togglePlay: () => void;
  nextStep: () => void;
  prevStep: () => void;
  seekTo: (index: number) => void;
  reset: () => void;
  setSpeed: (speed: number) => void;
}

export const PlaybackControlPanel: React.FC<PlaybackProps> = ({
  isPlaying,
  currentFrameIndex,
  totalFrames,
  speed,
  togglePlay,
  nextStep,
  prevStep,
  seekTo,
  reset,
  setSpeed,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const percentComplete = totalFrames > 1 ? (currentFrameIndex / (totalFrames - 1)) * 100 : 0;

  const getSpeedLabel = (ms: number) => {
    if (ms >= 1200) return '0.25x';
    if (ms >= 800) return '0.5x';
    if (ms <= 200) return '4.0x';
    if (ms <= 400) return '2.0x';
    return '1.0x';
  };

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val === 1) setSpeed(1200);
    if (val === 2) setSpeed(800);
    if (val === 3) setSpeed(500);
    if (val === 4) setSpeed(300);
    if (val === 5) setSpeed(150);
  };

  const currentSpeedVal = speed >= 1200 ? 1 : speed >= 800 ? 2 : speed <= 150 ? 5 : speed <= 300 ? 4 : 3;

  // Handle stop (pause + reset to step 0)
  const handleStop = () => {
    if (isPlaying) togglePlay();
    reset();
  };

  // Generate step dots markers (e.g. max 10 dots)
  const stepDotsCount = Math.min(totalFrames, 10);
  const stepDotsIndices = Array.from({ length: stepDotsCount }, (_, i) =>
    Math.floor((i / Math.max(stepDotsCount - 1, 1)) * (totalFrames - 1))
  );

  return (
    <div className="w-full bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 md:p-5 space-y-4 shadow-2xl font-sans">
      {/* ── Interactive Draggable Timeline Bar with Step Dots ── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold">
          <span className="text-indigo-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Step {String(currentFrameIndex + 1).padStart(2, '0')} / {String(totalFrames).padStart(2, '0')}
          </span>
          <span className="text-slate-400">{Math.round(percentComplete)}% Completed</span>
        </div>

        <div className="relative flex items-center group py-2">
          {/* Main Track line */}
          <div className="h-2.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/10 relative">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-150"
              style={{ width: `${percentComplete}%` }}
            />
          </div>

          {/* Draggable Range Input */}
          <input
            type="range"
            min={0}
            max={Math.max(totalFrames - 1, 0)}
            value={currentFrameIndex}
            onChange={(e) => seekTo(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
            disabled={totalFrames <= 1}
          />

          {/* Interactive Step Dot Markers: ●────●────●────● */}
          <div className="absolute inset-x-0 flex justify-between px-1 pointer-events-none z-10">
            {stepDotsIndices.map((dotIdx, i) => {
              const isPassed = currentFrameIndex >= dotIdx;
              return (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full transition-all transform ${
                    isPassed ? 'bg-indigo-400 scale-110 shadow-sm shadow-indigo-500' : 'bg-slate-700'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Button Controls Row ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1 border-t border-white/5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Run / Pause */}
          <button
            onClick={togglePlay}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/30 active:scale-[0.98] cursor-pointer text-xs uppercase tracking-wider"
            title={isPlaying ? 'Pause (Space)' : 'Run Algorithm (Space)'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" /> Pause
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" /> Run Algorithm
              </>
            )}
          </button>

          {/* Stop Button */}
          <button
            onClick={handleStop}
            className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Stop & Reset [S]"
          >
            <Square className="w-3.5 h-3.5 fill-current" />
            <span className="hidden md:inline text-[10px]">Stop</span>
          </button>

          {/* Previous Step */}
          <button
            onClick={prevStep}
            disabled={currentFrameIndex === 0}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            title="Previous Step (←)"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Next Step */}
          <button
            onClick={nextStep}
            disabled={currentFrameIndex >= totalFrames - 1}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
            title="Next Step (→)"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Replay */}
          <button
            onClick={() => seekTo(0)}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Replay from Step 1"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Reset */}
          <button
            onClick={reset}
            className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 text-slate-400 hover:text-white transition-colors cursor-pointer"
            title="Reset (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed Slider & Zoom Tools */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-black/40 border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.7))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] font-mono text-slate-300 px-1 font-bold">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.5))}
              className="p-1 text-slate-400 hover:text-white rounded"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Speed Slider */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold">
              <Sliders className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-white font-mono font-bold bg-black/40 border border-white/10 px-2 py-0.5 rounded-md text-[10px]">
                {getSpeedLabel(speed)}
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              value={currentSpeedVal}
              onChange={handleSpeedChange}
              className="w-20 accent-indigo-500 bg-white/5 h-1.5 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaybackControlPanel;
