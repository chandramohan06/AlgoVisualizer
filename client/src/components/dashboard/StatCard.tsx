import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@utils/index';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color: 'indigo' | 'cyan' | 'emerald' | 'orange' | 'rose' | 'purple' | 'amber';
  trend?: { value: number; label: string };
  delay?: number;
}

const colorMap = {
  indigo: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    icon: 'text-blue-400',
    glow: 'shadow-blue-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
    icon: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    icon: 'text-emerald-400',
    glow: 'shadow-emerald-500/20',
  },
  orange: {
    bg: 'bg-orange-500/10',
    border: 'border-orange-500/20',
    icon: 'text-orange-400',
    glow: 'shadow-orange-500/20',
  },
  rose: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/20',
    icon: 'text-rose-400',
    glow: 'shadow-rose-500/20',
  },
  purple: {
    bg: 'bg-accent/10',
    border: 'border-accent/20',
    icon: 'text-accent',
    glow: 'shadow-accent/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    icon: 'text-amber-400',
    glow: 'shadow-amber-500/20',
  },
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
  trend,
  delay = 0,
}) => {
  const c = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        'group relative rounded-xl p-4 md:p-5 border transition-all duration-300',
        'bg-white/[0.02] hover:bg-white/[0.04]',
        'border-white/5 hover:border-white/10',
        'hover:shadow-lg',
        `hover:${c.glow}`,
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('p-2.5 rounded-lg', c.bg, 'border', c.border)}>
          <Icon className={cn('w-5 h-5', c.icon)} />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            trend.value >= 0 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400',
          )}>
            {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
          </span>
        )}
      </div>
      <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{value}</p>
      <p className="text-xs text-gray-500">{title}</p>
      {subtitle && <p className="text-[10px] text-gray-600 mt-0.5">{subtitle}</p>}
    </motion.div>
  );
};
