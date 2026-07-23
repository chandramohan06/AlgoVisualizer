import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useDashboardStats } from '@hooks/useDashboard';
import { useRecentActivity } from '@hooks/useDashboard';

interface HeatmapDay {
  date: Date;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

type TooltipState = {
  x: number;
  y: number;
  day: HeatmapDay;
} | null;

function buildHeatmapData(recentActivity: { createdAt: string }[]): HeatmapDay[] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activityMap = new Map<string, number>();
  recentActivity.forEach((a) => {
    const d = new Date(a.createdAt);
    d.setHours(0, 0, 0, 0);
    const key = d.toDateString();
    activityMap.set(key, (activityMap.get(key) ?? 0) + 1);
  });

  const startDate = new Date(today);
  startDate.setDate(today.getDate() - 364);
  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  const days: HeatmapDay[] = [];
  const cur = new Date(startDate);

  while (cur <= today) {
    const key = cur.toDateString();
    const count = activityMap.get(key) ?? 0;
    const level = count === 0 ? 0 : count === 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4;
    days.push({ date: new Date(cur), count, level: level as 0 | 1 | 2 | 3 | 4 });
    cur.setDate(cur.getDate() + 1);
  }
  return days;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS   = ['Sun', 'Mon', '', 'Wed', '', 'Fri', ''];

const levelColors: Record<number, string> = {
  0: 'rgba(255,255,255,0.04)',
  1: 'rgba(99,102,241,0.25)',
  2: 'rgba(99,102,241,0.45)',
  3: 'rgba(99,102,241,0.65)',
  4: 'rgba(99,102,241,0.9)',
};

export const ContributionHeatmap: React.FC = () => {
  const { data: stats } = useDashboardStats();
  const { data: activity = [] } = useRecentActivity();
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  const days = useMemo(() => buildHeatmapData(activity), [activity]);

  const weeks = useMemo(() => {
    const w: HeatmapDay[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      w.push(days.slice(i, i + 7));
    }
    return w;
  }, [days]);

  const monthLabels = useMemo(() => {
    const labels: { month: string; col: number }[] = [];
    weeks.forEach((week, col) => {
      const firstDay = week[0];
      if (firstDay && (col === 0 || firstDay.date.getDate() <= 7)) {
        const m = MONTHS[firstDay.date.getMonth()];
        if (labels.length === 0 || labels[labels.length - 1].month !== m) {
          labels.push({ month: m, col });
        }
      }
    });
    return labels;
  }, [weeks]);

  const totalActive = useMemo(() => days.filter(d => d.count > 0).length, [days]);

  return (
    <div className="glass-card rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Learning Activity</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {totalActive} active days in the past year
            {stats?.streak ? ` · ${stats.streak} day streak` : ''}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map(l => (
            <div key={l} className="w-3 h-3 rounded-sm" style={{ background: levelColors[l] }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div style={{ minWidth: 700 }}>
          <div className="flex mb-1 pl-7">
            {weeks.map((_, col) => {
              const lbl = monthLabels.find(m => m.col === col);
              return (
                <div key={col} className="flex-shrink-0" style={{ width: 14, marginRight: 2 }}>
                  {lbl && <span className="text-[10px] text-slate-500 font-medium">{lbl.month}</span>}
                </div>
              );
            })}
          </div>

          <div className="flex gap-0">
            <div className="flex flex-col gap-0.5 mr-2 pr-1">
              {DAYS.map((d, i) => (
                <div key={i} className="text-[10px] text-slate-600 font-medium h-3" style={{ lineHeight: '12px' }}>
                  {d}
                </div>
              ))}
            </div>

            <div className="flex gap-0.5">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-0.5">
                  {week.map((day, di) => (
                    <motion.div
                      key={di}
                      className="w-3 h-3 rounded-sm heatmap-cell relative"
                      style={{ background: levelColors[day.level] }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: (wi * 7 + di) * 0.001 }}
                      onMouseEnter={(e) => {
                        const rect = (e.target as HTMLElement).getBoundingClientRect();
                        setTooltip({ x: rect.left, y: rect.top, day });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {tooltip && (
        <div
          className="fixed z-50 chart-tooltip text-xs pointer-events-none"
          style={{ left: tooltip.x + 16, top: tooltip.y - 44 }}
        >
          <div className="font-semibold text-white">
            {tooltip.day.count === 0 ? 'No activity' : `${tooltip.day.count} activit${tooltip.day.count === 1 ? 'y' : 'ies'}`}
          </div>
          <div className="text-slate-400 mt-0.5">
            {tooltip.day.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionHeatmap;
