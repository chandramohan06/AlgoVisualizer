import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { useDashboardStats } from '@hooks/useDashboard';

function buildMonthCalendar(streak: number): { day: number; active: boolean; today: boolean }[] {
  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const todayDate = today.getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    const daysAgo = todayDate - day;
    return { day, today: day === todayDate, active: daysAgo >= 0 && daysAgo < streak };
  });
}

const WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export const DailyStreakCalendar: React.FC = () => {
  const { data: stats } = useDashboardStats();
  const streak = stats?.streak ?? 0;
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const calendar = useMemo(() => buildMonthCalendar(streak), [streak]);
  const flames = Math.min(5, Math.max(1, Math.floor(streak / 7)));

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Learning Streak</h3>
          <p className="text-xs text-slate-500 mt-0.5">{MONTHS[today.getMonth()]} {today.getFullYear()}</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: flames }).map((_, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 400 }}>
                <Flame className="w-4 h-4 text-orange-400 animate-streak" />
              </motion.div>
            ))}
          </div>
          <span className="text-lg font-black font-mono text-orange-400">{streak}</span>
          <span className="text-xs text-slate-500">days</span>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {WEEKDAYS.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-semibold text-slate-600">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => <div key={`e${i}`} />)}
        {calendar.map(({ day, active, today: isToday }) => (
          <motion.div key={day} className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: day * 0.01, duration: 0.2 }}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-medium transition-all
              ${isToday ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-500/30'
                : active ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                : 'text-slate-600 hover:text-slate-400'}`}>
              {isToday ? <Flame className="w-3.5 h-3.5 text-orange-300" /> : day}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
        {[
          { label: 'Current',    value: `${streak}d`,                                color: 'text-orange-400' },
          { label: 'This Month', value: `${calendar.filter(d => d.active).length}d`, color: 'text-indigo-400' },
          { label: 'Best',       value: `${Math.max(streak, 7)}d`,                   color: 'text-emerald-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <div className={`text-base font-black font-mono ${color}`}>{value}</div>
            <div className="text-[10px] text-slate-600 mt-0.5">{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default DailyStreakCalendar;
