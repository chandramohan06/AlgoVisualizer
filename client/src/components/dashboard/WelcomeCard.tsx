import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import { useDashboardStats } from '@hooks/useDashboard';

export const WelcomeCard: React.FC = () => {
  const { user } = useAuthStore();
  const { data: stats } = useDashboardStats();
  const streak = stats?.streak ?? 0;

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl p-6 md:p-8"
      style={{
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.08) 50%, rgba(244, 63, 94, 0.04) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-gradient-to-tr from-accent/5 to-transparent rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Welcome Back
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {greeting}, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-lg">
            {streak > 0
              ? `Amazing! You're on a ${streak}-day streak. Keep the momentum going!`
              : 'Start your learning journey today. Every algorithm mastered is progress!'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {streak > 0 && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <Flame className="w-6 h-6 text-orange-400 animate-pulse" />
              <div>
                <p className="text-lg font-bold text-orange-400">{streak}</p>
                <p className="text-[10px] text-orange-400/70 uppercase tracking-wider">Day Streak</p>
              </div>
            </div>
          )}
          <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all hover:shadow-lg hover:shadow-blue-500/20 active:scale-[0.98]">
            Resume Learning
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
