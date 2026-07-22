import React from 'react';
import { ILeaderboardEntry } from '@algovisualizer/shared';
import { Trophy, Medal, Flame, Award, Sparkles } from 'lucide-react';

interface PodiumCardsProps {
  topThree: ILeaderboardEntry[];
  onUserClick: (userId: string) => void;
}

export const PodiumCards: React.FC<PodiumCardsProps> = ({ topThree, onUserClick }) => {
  if (!topThree || topThree.length === 0) return null;

  // Order for podium display: #2 Silver (left), #1 Gold (center), #3 Bronze (right)
  const first = topThree[0];
  const second = topThree[1];
  const third = topThree[2];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6 items-end">
      {/* SECOND PLACE — SILVER (#2) */}
      {second && (
        <div
          onClick={() => onUserClick(second.userId._id)}
          className="order-2 md:order-1 bg-gradient-to-b from-[#1c2333] to-[#111622] border border-slate-700/60 rounded-2xl p-5 shadow-2xl relative cursor-pointer hover:border-slate-400 transition-all hover:scale-[1.02] group"
        >
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1 font-mono uppercase">
            <Medal className="w-3.5 h-3.5 fill-current" /> #2 Silver
          </div>

          <div className="flex flex-col items-center text-center mt-2 space-y-3">
            <div className="relative">
              <img
                src={second.userId.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${second.userId.name}`}
                alt={second.userId.name}
                className="w-16 h-16 rounded-full border-2 border-slate-300 object-cover shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 bg-slate-400 text-black text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-900">
                2
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                {second.userId.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
                {second.userId.college || 'General Institute'}
              </p>
            </div>

            <div className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center justify-around text-xs font-mono">
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Rank Score</span>
                <span className="font-bold text-slate-200">{second.rankScore.toLocaleString()}</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Streak</span>
                <span className="font-bold text-amber-400 flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-current" /> {second.streak}d
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FIRST PLACE — GOLD (#1) */}
      {first && (
        <div
          onClick={() => onUserClick(first.userId._id)}
          className="order-1 md:order-2 bg-gradient-to-b from-[#2a2211] via-[#1f190e] to-[#111622] border-2 border-amber-500/80 rounded-2xl p-6 shadow-2xl shadow-amber-500/20 relative cursor-pointer hover:border-amber-400 transition-all hover:scale-[1.03] group z-10"
        >
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-black font-black text-xs px-4 py-1 rounded-full shadow-lg shadow-amber-500/40 flex items-center gap-1.5 font-mono uppercase tracking-wider animate-pulse">
            <Trophy className="w-4 h-4 fill-current" /> #1 Champion
          </div>

          <div className="flex flex-col items-center text-center mt-2 space-y-3">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-amber-500/20 animate-ping pointer-events-none" />
              <img
                src={first.userId.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${first.userId.name}`}
                alt={first.userId.name}
                className="w-20 h-20 rounded-full border-4 border-amber-400 object-cover shadow-xl group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-400 text-black text-xs font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-amber-950">
                1
              </span>
            </div>

            <div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors flex items-center justify-center gap-1.5">
                {first.userId.name} <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-amber-200/80 font-mono truncate max-w-[200px]">
                {first.userId.college || 'General Institute'} &bull; {first.userId.batch || '2026'}
              </p>
            </div>

            <div className="w-full bg-black/60 border border-amber-500/30 rounded-xl p-3 flex items-center justify-around text-xs font-mono shadow-inner">
              <div>
                <span className="text-[10px] text-amber-300/70 block uppercase font-bold">Total XP</span>
                <span className="font-black text-amber-300 text-sm">{first.totalPoints.toLocaleString()}</span>
              </div>
              <div className="w-px h-7 bg-amber-500/20" />
              <div>
                <span className="text-[10px] text-amber-300/70 block uppercase font-bold">Score</span>
                <span className="font-black text-white text-sm">{first.rankScore.toLocaleString()}</span>
              </div>
              <div className="w-px h-7 bg-amber-500/20" />
              <div>
                <span className="text-[10px] text-amber-300/70 block uppercase font-bold">Streak</span>
                <span className="font-black text-orange-400 text-sm flex items-center gap-0.5">
                  <Flame className="w-3.5 h-3.5 fill-current" /> {first.streak}d
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* THIRD PLACE — BRONZE (#3) */}
      {third && (
        <div
          onClick={() => onUserClick(third.userId._id)}
          className="order-3 bg-gradient-to-b from-[#261c16] to-[#111622] border border-amber-800/60 rounded-2xl p-5 shadow-2xl relative cursor-pointer hover:border-amber-700 transition-all hover:scale-[1.02] group"
        >
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-700 text-white font-black text-xs px-3 py-0.5 rounded-full shadow-lg flex items-center gap-1 font-mono uppercase">
            <Award className="w-3.5 h-3.5 fill-current" /> #3 Bronze
          </div>

          <div className="flex flex-col items-center text-center mt-2 space-y-3">
            <div className="relative">
              <img
                src={third.userId.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${third.userId.name}`}
                alt={third.userId.name}
                className="w-16 h-16 rounded-full border-2 border-amber-700 object-cover shadow-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute -bottom-1 -right-1 bg-amber-700 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-slate-900">
                3
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {third.userId.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
                {third.userId.college || 'General Institute'}
              </p>
            </div>

            <div className="w-full bg-black/40 border border-white/5 rounded-xl p-2.5 flex items-center justify-around text-xs font-mono">
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Rank Score</span>
                <span className="font-bold text-slate-200">{third.rankScore.toLocaleString()}</span>
              </div>
              <div className="w-px h-6 bg-white/10" />
              <div>
                <span className="text-[9px] text-slate-500 block uppercase">Streak</span>
                <span className="font-bold text-amber-400 flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-current" /> {third.streak}d
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PodiumCards;
