import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Brain, StickyNote, Code2, Compass } from 'lucide-react';
import { ROUTES } from '@constants/routes';

interface ActionItem {
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  color: string;
  glow: string;
}

const actions: ActionItem[] = [
  {
    title: 'Resume Learning',
    description: 'Jump back to your last algorithm module',
    icon: BookOpen,
    path: ROUTES.ALGORITHMS,
    color: 'from-blue-500 to-indigo-600 text-blue-400',
    glow: 'group-hover:shadow-blue-500/20',
  },
  {
    title: 'Take Quiz',
    description: 'Test your understanding on active topics',
    icon: Brain,
    path: ROUTES.ALGORITHMS, // will filter or navigate to list
    color: 'from-pink-500 to-rose-600 text-rose-400',
    glow: 'group-hover:shadow-rose-500/20',
  },
  {
    title: 'Open Notes',
    description: 'Create and review your algorithm cheatsheets',
    icon: StickyNote,
    path: ROUTES.NOTES,
    color: 'from-amber-500 to-orange-600 text-orange-400',
    glow: 'group-hover:shadow-orange-500/20',
  },
  {
    title: 'Practice Problems',
    description: 'Solve coding challenges to earn leaderboard points',
    icon: Code2,
    path: ROUTES.PRACTICE,
    color: 'from-emerald-500 to-teal-600 text-emerald-400',
    glow: 'group-hover:shadow-emerald-500/20',
  },
];

export const QuickActionCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl bg-white/[0.02] border border-white/5 p-5">
      <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
        <Compass className="w-5 h-5 text-blue-400" />
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ y: -3 }}
            onClick={() => navigate(action.path)}
            className="group flex flex-col justify-between p-4 rounded-xl bg-white/[0.01] border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer hover:shadow-md"
          >
            <div>
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${action.color.replace('text-', 'bg-').split(' ')[0]} bg-opacity-10 border border-white/5 flex items-center justify-center mb-3`}>
                <action.icon className={`w-5 h-5 ${action.color.split(' ')[2]}`} />
              </div>
              <h3 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors uppercase tracking-wider">
                {action.title}
              </h3>
              <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed font-semibold">
                {action.description}
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs text-blue-400 font-bold group-hover:underline">
              Go now &rarr;
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
