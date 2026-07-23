import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, TrendingDown } from 'lucide-react';
import { useCategoryProgress } from '@hooks/useDashboard';
import { ROUTES } from '@constants/routes';


interface CategoryProgress {
  categoryId: string;
  name: string;
  slug: string;
  icon: string;
  total: number;
  completed: number;
  percentage: number;
}

const difficultyColor = (pct: number): { bar: string; text: string } => {
  if (pct >= 70) return { bar: '#10b981', text: '#34d399' };
  if (pct >= 40) return { bar: '#f59e0b', text: '#fbbf24' };
  return { bar: '#f43f5e', text: '#fb7185' };
};

export const TopicMasteryList: React.FC = () => {
  const { data: categories = [] } = useCategoryProgress();
  const navigate = useNavigate();

  const sorted = useMemo(() =>
    [...categories].sort((a: CategoryProgress, b: CategoryProgress) => a.percentage - b.percentage),
    [categories]
  );

  const weakest = sorted[0] as CategoryProgress | undefined;

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Topic Mastery</h3>
          <p className="text-xs text-slate-500 mt-0.5">{categories.length} topics tracked</p>
        </div>
        <button
          onClick={() => navigate(ROUTES.ALGORITHMS)}
          className="btn-ghost text-xs py-1.5 px-3"
        >
          View All
        </button>
      </div>

      {/* Weakest topic CTA */}
      {weakest && weakest.percentage < 50 && (
        <div
          className="mb-4 p-3 rounded-xl border border-rose-500/15 bg-rose-500/5 flex items-center justify-between cursor-pointer group"
          onClick={() => navigate(`${ROUTES.ALGORITHMS}?category=${weakest.slug}`)}
        >
          <div>
            <div className="flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-rose-400" />
              <span className="text-xs font-semibold text-rose-400">Weakest: {weakest.name}</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {weakest.completed}/{weakest.total} completed — {weakest.percentage}% mastery
            </p>
          </div>
          <ArrowRight className="w-4 h-4 text-rose-400/60 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
        </div>
      )}

      {/* Topic list */}
      <div className="space-y-2.5">
        {sorted.map((cat: CategoryProgress) => {
          const c = difficultyColor(cat.percentage);
          return (
            <div
              key={cat.categoryId}
              className="group cursor-pointer"
              onClick={() => navigate(`${ROUTES.ALGORITHMS}?category=${cat.slug}`)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                    {cat.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {cat.completed}/{cat.total}
                  </span>
                  <span className="text-xs font-mono font-semibold w-9 text-right" style={{ color: c.text }}>
                    {cat.percentage}%
                  </span>
                </div>
              </div>
              <div className="progress-track h-1.5">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: c.bar }}
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percentage}%` }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default TopicMasteryList;
