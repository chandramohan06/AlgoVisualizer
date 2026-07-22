import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bookmark, ArrowRight } from 'lucide-react';
import { useBookmarks } from '@hooks/useBookmarks';
import { Skeleton } from '@components/common/Skeleton';
import { ROUTES, buildRoute } from '@constants/routes';
import { cn } from '@utils/index';

const difficultyColors = {
  easy: 'badge-easy',
  medium: 'badge-medium',
  hard: 'badge-hard',
};

export const BookmarkPreviewCard: React.FC = () => {
  const navigate = useNavigate();
  const { data: bookmarks, isLoading } = useBookmarks();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="rounded-xl bg-white/[0.02] border border-white/5 p-5 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-blue-400" />
            Bookmarked Modules
          </h2>
          <button
            onClick={() => navigate(ROUTES.ALGORITHMS + '?filter=bookmarked')}
            className="text-xs text-blue-400 hover:text-blue-300 font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            View All
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-12 rounded-lg" count={2} />
          </div>
        ) : !bookmarks?.length ? (
          <div className="text-center py-6 text-xs text-slate-500 font-medium">
            No bookmarks saved yet. Click the bookmark star on algorithm pages to add.
          </div>
        ) : (
          <div className="space-y-2">
            {bookmarks.slice(0, 3).map((bookmark) => (
              <div
                key={bookmark._id}
                onClick={() => navigate(buildRoute(ROUTES.ALGORITHM_DETAIL, { slug: bookmark.slug }))}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.01] border border-white/5 hover:border-blue-500/20 hover:bg-white/[0.02] transition-all cursor-pointer"
              >
                <div className="min-w-0 flex-1 mr-2">
                  <h4 className="text-xs font-semibold text-slate-200 truncate">{bookmark.title}</h4>
                  <p className="text-[10px] text-slate-500 truncate">{bookmark.category}</p>
                </div>
                <span className={cn('text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded shrink-0', difficultyColors[bookmark.difficulty])}>
                  {bookmark.difficulty}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500 font-semibold">
        <span>Saved Items</span>
        <span className="font-bold text-slate-300">{bookmarks?.length ?? 0} Saved</span>
      </div>
    </motion.div>
  );
};
