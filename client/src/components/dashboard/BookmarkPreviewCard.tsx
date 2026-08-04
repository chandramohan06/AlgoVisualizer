import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useBookmarks, BookmarkItem } from '@hooks/useBookmarks';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES, buildRoute } from '@constants/routes';
import { cn } from '@utils/index';

const difficultyColors: Record<string, string> = {
  easy: 'badge-easy',
  medium: 'badge-medium',
  hard: 'badge-hard',
};

export const BookmarkPreviewCard: React.FC = () => {
  const navigate = useNavigate();
  const { bookmarks, isLoading } = useBookmarks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5 flex flex-col justify-between h-full font-sans"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 font-mono">
            <Bookmark className="w-5 h-5 text-amber-400" />
            Bookmarked Modules
          </h2>
          <button
            onClick={() => navigate(ROUTES.PROFILE)}
            className="text-xs text-amber-400 hover:text-amber-300 font-bold font-mono transition-colors flex items-center gap-1 cursor-pointer"
          >
            View Profile
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 rounded-lg" count={2} />
          </div>
        ) : !bookmarks?.length ? (
          <div className="text-center py-6 text-xs text-slate-500 font-medium">
            No bookmarks saved yet. Bookmark notes or visualizers to see them here.
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.slice(0, 3).map((bookmark: BookmarkItem) => {
              const diffKey = bookmark.difficulty || 'medium';
              const diffClass = difficultyColors[diffKey] || 'badge-medium';
              return (
                <div
                  key={bookmark.id || bookmark._id}
                  onClick={() => navigate(bookmark.path || buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: bookmark.slug || '' }))}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-amber-500/20 hover:bg-white/[0.02] transition-all cursor-pointer"
                >
                  <div className="min-w-0 flex-1 mr-2">
                    <h4 className="text-xs font-semibold text-slate-200 truncate">{bookmark.title}</h4>
                    <p className="text-[10px] text-slate-500 truncate">{bookmark.category}</p>
                  </div>
                  <span className={cn('text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0', diffClass)}>
                    {diffKey}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-semibold font-mono">
        <span>Saved Items</span>
        <span className="font-bold text-slate-300">{bookmarks?.length ?? 0} Saved</span>
      </div>
    </motion.div>
  );
};

export default BookmarkPreviewCard;
