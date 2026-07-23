import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@utils/index';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
  color: 'indigo' | 'orange' | 'emerald' | 'purple' | 'cyan' | 'rose';
  delay?: number;
  href?: string;
  trend?: number; // positive = up, negative = down
}

const colorMap: Record<StatCardProps['color'], {
  icon: string;
  iconBg: string;
  gradient: string;
  badge: string;
  glow: string;
}> = {
  indigo:  { icon: 'text-indigo-400',  iconBg: 'bg-indigo-500/10 border border-indigo-500/20',  gradient: 'from-indigo-600 to-violet-600',  badge: 'text-indigo-400',  glow: '#6366f1' },
  orange:  { icon: 'text-orange-400',  iconBg: 'bg-orange-500/10 border border-orange-500/20',  gradient: 'from-orange-500 to-amber-500',   badge: 'text-orange-400',  glow: '#f97316' },
  emerald: { icon: 'text-emerald-400', iconBg: 'bg-emerald-500/10 border border-emerald-500/20', gradient: 'from-emerald-500 to-teal-500',   badge: 'text-emerald-400', glow: '#10b981' },
  purple:  { icon: 'text-purple-400',  iconBg: 'bg-purple-500/10 border border-purple-500/20',  gradient: 'from-purple-600 to-pink-600',    badge: 'text-purple-400',  glow: '#a855f7' },
  cyan:    { icon: 'text-cyan-400',    iconBg: 'bg-cyan-500/10 border border-cyan-500/20',      gradient: 'from-cyan-500 to-blue-500',      badge: 'text-cyan-400',    glow: '#06b6d4' },
  rose:    { icon: 'text-rose-400',    iconBg: 'bg-rose-500/10 border border-rose-500/20',      gradient: 'from-rose-500 to-pink-500',      badge: 'text-rose-400',    glow: '#f43f5e' },
};

function useCounter(target: number, duration = 1200, delay = 200): number {
  const [count, setCount] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    const start = performance.now() + delay;
    const animate = (now: number) => {
      if (now < start) { raf.current = requestAnimationFrame(animate); return; }
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration, delay]);
  return count;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, color, delay = 0, href, trend }) => {
  const navigate = useNavigate();
  const c = colorMap[color];

  const numMatch = String(value).match(/(\d+)/);
  const numValue = numMatch ? parseInt(numMatch[1]) : 0;
  const prefix   = String(value).split(/\d/)[0] ?? '';
  const suffix   = numMatch ? String(value).slice(String(value).indexOf(numMatch[0]) + numMatch[0].length) : '';
  const animated = useCounter(numValue, 1400, delay * 150 + 300);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'glass-card rounded-2xl p-5 flex flex-col gap-3 relative overflow-hidden',
        href && 'cursor-pointer'
      )}
      onClick={() => href && navigate(href)}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      {/* Subtle bg gradient orb */}
      <div
        className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${c.glow}, transparent)`, transform: 'translate(30%, -30%)' }}
      />

      {/* Top row: icon + trend */}
      <div className="flex items-start justify-between">
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center shrink-0', c.iconBg)}>
          <Icon className={cn('w-4 h-4', c.icon)} />
        </div>
        {trend !== undefined && (
          <div className={cn(
            'text-[10px] font-mono font-bold flex items-center gap-0.5',
            trend > 0 ? 'text-emerald-400' : trend < 0 ? 'text-rose-400' : 'text-slate-500'
          )}>
            {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'}{Math.abs(trend)}%
          </div>
        )}
      </div>

      {/* Value + Title */}
      <div>
        <div className={cn('text-2xl font-black font-mono tracking-tight', c.badge)}>
          {prefix}{animated}{suffix}
        </div>
        <div className="text-xs font-semibold text-slate-200 mt-0.5">{title}</div>
      </div>

      {/* Subtitle */}
      <p className="text-[11px] text-slate-500 leading-relaxed">{subtitle}</p>

      {/* Bottom accent line */}
      <div className={cn('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r opacity-60', c.gradient)} />
    </motion.div>
  );
};

export default StatCard;
