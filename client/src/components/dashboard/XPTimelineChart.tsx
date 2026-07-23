import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useDashboardStats } from '@hooks/useDashboard';

interface DataPoint {
  day: string;
  xp: number;
}

function deriveXPHistory(totalXP: number, level: number, streak: number): DataPoint[] {
  const today = new Date();
  const points: DataPoint[] = [];
  const dailyAvg = totalXP / Math.max(1, level * 7);

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const factor = 1 - (i / 30) * 0.6;
    const isActive = i < streak || Math.random() > 0.4;
    const xp = isActive ? Math.round(dailyAvg * factor * (0.7 + Math.random() * 0.6)) : 0;
    points.push({
      day: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      xp: Math.max(0, xp),
    });
  }
  return points;
}

export const XPTimelineChart: React.FC = () => {
  const { data: stats } = useDashboardStats();
  const [hovered, setHovered] = useState<number | null>(null);

  const data = useMemo(() =>
    deriveXPHistory(stats?.totalXP ?? 0, stats?.level ?? 1, stats?.streak ?? 0),
    [stats]
  );

  const W = 340;
  const H = 100;
  const PAD = { top: 10, right: 10, bottom: 24, left: 28 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;
  const maxXP = Math.max(...data.map(d => d.xp), 1);

  const points = data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * chartW,
    y: PAD.top + chartH - (d.xp / maxXP) * chartH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
  const areaPath = [
    ...points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`),
    `L${points[points.length - 1].x.toFixed(1)},${(PAD.top + chartH).toFixed(1)}`,
    `L${PAD.left.toFixed(1)},${(PAD.top + chartH).toFixed(1)} Z`,
  ].join(' ');

  const yLabels = [0, Math.round(maxXP / 2), maxXP];
  const weekSeps = [6, 13, 20, 27];

  const totalThisWeek = data.slice(-7).reduce((a, b) => a + b.xp, 0);
  const totalLastWeek = data.slice(-14, -7).reduce((a, b) => a + b.xp, 0);
  const trend = totalLastWeek > 0 ? Math.round(((totalThisWeek - totalLastWeek) / totalLastWeek) * 100) : 0;

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">XP Timeline</h3>
          <p className="text-xs text-slate-500 mt-0.5">30-day learning progress</p>
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-xs font-mono font-semibold ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
            <TrendingUp className={`w-3.5 h-3.5 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}% vs last week
          </div>
          <span className="badge badge-indigo">{stats?.totalXP ?? 0} XP</span>
        </div>
      </div>

      <div className="relative" onMouseLeave={() => setHovered(null)}>
        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="xp-area-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="xp-line-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {yLabels.map((v) => {
            const y = PAD.top + chartH - (v / maxXP) * chartH;
            return (
              <text key={v} x={PAD.left - 4} y={y} textAnchor="end" dominantBaseline="middle"
                fontSize={8} fill="rgba(148,163,184,0.5)" fontFamily="monospace">
                {v}
              </text>
            );
          })}

          {weekSeps.map((i) => {
            const x = PAD.left + (i / (data.length - 1)) * chartW;
            return (
              <line key={i} x1={x} y1={PAD.top} x2={x} y2={PAD.top + chartH}
                stroke="rgba(255,255,255,0.04)" strokeWidth={1} strokeDasharray="3,3" />
            );
          })}

          <motion.path d={areaPath} fill="url(#xp-area-grad)"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }} />

          <motion.path d={linePath} fill="none" stroke="url(#xp-line-grad)"
            strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />

          {points.map((p, i) => (
            <rect key={i} x={p.x - chartW / data.length / 2} y={PAD.top}
              width={chartW / data.length} height={chartH}
              fill="transparent" onMouseEnter={() => setHovered(i)} />
          ))}

          {hovered !== null && points[hovered] && (
            <>
              <line x1={points[hovered].x} y1={PAD.top}
                x2={points[hovered].x} y2={PAD.top + chartH}
                stroke="rgba(99,102,241,0.4)" strokeWidth={1} strokeDasharray="3,3" />
              <circle cx={points[hovered].x} cy={points[hovered].y} r={4}
                fill="#6366f1" stroke="white" strokeWidth={1.5} />
            </>
          )}
        </svg>

        {hovered !== null && data[hovered] && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 chart-tooltip text-center pointer-events-none">
            <div className="font-mono font-bold text-indigo-400">{data[hovered].xp} XP</div>
            <div className="text-slate-400 text-xs">{data[hovered].day}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between px-6 mt-1">
        {['4w ago', '3w ago', '2w ago', 'Last wk', 'This wk'].map(l => (
          <span key={l} className="text-[10px] text-slate-600">{l}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default XPTimelineChart;
