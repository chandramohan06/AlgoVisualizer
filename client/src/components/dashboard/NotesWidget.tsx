import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { noteService, IDashboardNotesResponse } from '@services/noteService';
import { BookOpen, Star, Clock, ChevronRight, Sparkles, BookMarked } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const NotesWidget: React.FC = () => {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery<IDashboardNotesResponse>({
    queryKey: ['dashboard-notes'],
    queryFn: () => noteService.getDashboardData(),
  });

  if (isLoading) {
    return <Skeleton className="h-48 rounded-2xl" />;
  }

  if (!data) return null;

  const { continueReading, bookmarkedNotes, recentlyAdded } = data;

  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">DSA Knowledge Base</h3>
            <p className="text-[11px] text-slate-400">Continue reading study notes and revision cheat sheets</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/notes')}
          className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
        >
          Explore All Notes <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Continue Reading */}
        <div className="bg-gradient-to-br from-indigo-900/30 to-purple-900/20 border border-indigo-500/30 p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-indigo-400">
              <Sparkles className="w-3 h-3" /> Continue Reading
            </div>
            {continueReading ? (
              <>
                <h4 className="text-xs font-bold text-white line-clamp-1">{continueReading.title}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-2">{continueReading.description}</p>
              </>
            ) : (
              <p className="text-xs text-slate-400">Start exploring DSA study notes.</p>
            )}
          </div>

          <button
            onClick={() => navigate(continueReading ? `/notes?slug=${continueReading.slug}` : '/notes')}
            className="w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-indigo-500/20"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Resume Reading
          </button>
        </div>

        {/* Bookmarked Notes */}
        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-amber-400">
            <BookMarked className="w-3 h-3" /> Bookmarked Notes ({bookmarkedNotes.length})
          </div>

          {bookmarkedNotes.length === 0 ? (
            <p className="text-xs text-slate-500 py-3 font-mono">No bookmarked notes yet.</p>
          ) : (
            <div className="space-y-1.5 max-h-28 overflow-y-auto no-scrollbar">
              {bookmarkedNotes.slice(0, 3).map((note) => (
                <div
                  key={note._id}
                  onClick={() => navigate(`/notes?slug=${note.slug}`)}
                  className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="truncate text-slate-200 font-medium">{note.title}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recently Added Notes */}
        <div className="bg-black/20 border border-white/5 p-4 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] uppercase font-mono font-bold text-emerald-400">
            <Clock className="w-3 h-3" /> Recently Added
          </div>

          {recentlyAdded.length === 0 ? (
            <p className="text-xs text-slate-500 py-3 font-mono">No notes available.</p>
          ) : (
            <div className="space-y-1.5 max-h-28 overflow-y-auto no-scrollbar">
              {recentlyAdded.slice(0, 3).map((note) => (
                <div
                  key={note._id}
                  onClick={() => navigate(`/notes?slug=${note.slug}`)}
                  className="p-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 cursor-pointer flex items-center justify-between text-xs"
                >
                  <span className="truncate text-slate-200 font-medium">{note.title}</span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {note.difficulty}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
