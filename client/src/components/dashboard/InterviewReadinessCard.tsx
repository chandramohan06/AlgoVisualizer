import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDashboardStats } from '@hooks/useDashboard';

interface ReadinessFactor {
  label: string;
  value: number;
  weight: number;
  color: string;
  icon: React.ReactNode;
}

export const InterviewReadinessCard: React.FC = () => {
  const { data: stats } = useDashboardStats();

  const factors: ReadinessFactor[] = useMemo(() => {
    const problemScore  = Math.min(100, ((stats?.problemsSolved ?? 0) / 150) * 100);
    const quizScore     = stats?.quizAccuracy ?? 0;
    const progressScore = stats?.percentage ?? 0;
    const streakScore   = Math.min(100, ((stats?.streak ?? 0) / 30) * 100);
    const levelScore    = Math.min(100, ((stats?.level ?? 1) / 20) * 100);
    return [
      { label: 'Problems Solved',   value: Math.round(problemScore),  weight: 0.3,  color: '#6366f1', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
      { label: 'Quiz Accuracy',     value: Math.round(quizScore),     weight: 0.25, color: '#10b981', icon: <Target className="w-3.5 h-3.5" /> },
      { label: 'Learning Progress', value: Math.round(progressScore), weight: 0.25, color: '#3b82f6', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
      { label: 'Consistency',       value: Math.round(streakScore),   weight: 0.1,  color: '#f59e0b', icon: <AlertCircle className="w-3.5 h-3.5" /> },
      { label: 'XP Level',          value: Math.round(levelScore),    weight: 0.1,  color: '#8b5cf6', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
    ];
  }, [stats]);

  const readiness = useMemo(() =>
    Math.round(factors.reduce((acc, f) => acc + f.value * f.weight, 0)),
    [factors]
  );

  const R = 54;
  const circumference = 2 * Math.PI * R;
  const offset = circumference - (readiness / 100) * circumference;

  const level =
    readiness >= 80 ? { label: 'Interview Ready',     color: '#10b981' } :
    readiness >= 60 ? { label: 'Almost There',         color: '#f59e0b' } :
    readiness >= 40 ? { label: 'Keep Practicing',      color: '#6366f1' } :
                      { label: 'Just Getting Started', color: '#94a3b8' };

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Interview Readiness</h3>
          <p className="text-xs text-slate-500 mt-0.5">Based on your progress</p>
        </div>
        <span className="badge" style={{ background: `${level.color}20`, color: level.color, border: `1px solid ${level.color}30` }}>
          {level.label}
        </span>
      </div>

      <div className="flex justify-center mb-5">
        <div className="relative">
          <svg width={130} height={130} viewBox="0 0 130 130">
            <circle cx={65} cy={65} r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={10} strokeLinecap="round" />
            <motion.circle cx={65} cy={65} r={R} fill="none" stroke={level.color} strokeWidth={10}
              strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
            <motion.circle cx={65} cy={65} r={R} fill="none" stroke={level.color} strokeWidth={14}
              strokeLinecap="round" strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference, opacity: 0 }} animate={{ strokeDashoffset: offset, opacity: 0.15 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }} />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span className="text-3xl font-black font-mono" style={{ color: level.color }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {readiness}%
            </motion.span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">Readiness</span>
          </div>
        </div>
      </div>

      <div className="space-y-2.5">
        {factors.map((f) => (
          <div key={f.label}>
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <span style={{ color: f.color }}>{f.icon}</span>
                <span className="text-xs text-slate-400">{f.label}</span>
              </div>
              <span className="text-xs font-mono font-semibold" style={{ color: f.color }}>{f.value}%</span>
            </div>
            <div className="progress-track h-1">
              <motion.div className="h-full rounded-full" style={{ background: f.color }}
                initial={{ width: 0 }} animate={{ width: `${f.value}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default InterviewReadinessCard;
