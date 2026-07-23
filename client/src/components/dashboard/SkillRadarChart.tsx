import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useCategoryProgress } from '@hooks/useDashboard';

interface Axis {
  label: string;
  slug: string;
  angle: number;
}

const AXES: Axis[] = [
  { label: 'Arrays',  slug: 'arrays',   angle: -90 },
  { label: 'Graphs',  slug: 'graph',    angle: -30 },
  { label: 'DP',      slug: 'dp',       angle: 30  },
  { label: 'Trees',   slug: 'tree',     angle: 90  },
  { label: 'Sorting', slug: 'sorting',  angle: 150 },
  { label: 'Strings', slug: 'strings',  angle: 210 },
];

const toRad = (deg: number) => (deg * Math.PI) / 180;

function polarToCart(angle: number, r: number, cx: number, cy: number) {
  return {
    x: cx + r * Math.cos(toRad(angle)),
    y: cy + r * Math.sin(toRad(angle)),
  };
}

function buildPath(values: number[], cx: number, cy: number, maxR: number): string {
  return AXES.map(({ angle }, i) => {
    const r = (values[i] / 100) * maxR;
    const { x, y } = polarToCart(angle, r, cx, cy);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ') + ' Z';
}

function buildGridPath(pct: number, cx: number, cy: number, maxR: number): string {
  return AXES.map(({ angle }, i) => {
    const r = pct * maxR;
    const { x, y } = polarToCart(angle, r, cx, cy);
    return `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`;
  }).join(' ') + ' Z';
}

interface CategoryProgress {
  categoryId: string;
  name: string;
  slug: string;
  icon: string;
  total: number;
  completed: number;
  percentage: number;
}

export const SkillRadarChart: React.FC = () => {
  const { data: categories = [] } = useCategoryProgress();

  const values = useMemo(() =>
    AXES.map(ax => {
      const cat = (categories as CategoryProgress[]).find(c =>
        c.slug.includes(ax.slug) || ax.slug.includes(c.slug.split('-')[0])
      );
      return cat?.percentage ?? 0;
    }),
    [categories]
  );

  const cx = 110;
  const cy = 110;
  const maxR = 80;

  const skillPath = useMemo(() => buildPath(values, cx, cy, maxR), [values]);
  const zeroPath  = useMemo(() => buildPath(AXES.map(() => 0), cx, cy, maxR), []);

  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-white">Skill Radar</h3>
          <p className="text-xs text-slate-500 mt-0.5">Topic mastery overview</p>
        </div>
        <span className="badge badge-indigo">
          {Math.round(values.reduce((a, b) => a + b, 0) / values.length)}% avg
        </span>
      </div>

      <div className="flex justify-center">
        <svg width={220} height={220} viewBox={`0 0 ${cx * 2} ${cy * 2}`}>
          {gridLevels.map((pct) => (
            <path key={pct} d={buildGridPath(pct, cx, cy, maxR)}
              fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          ))}
          {AXES.map(({ angle }) => {
            const end = polarToCart(angle, maxR, cx, cy);
            return <line key={angle} x1={cx} y1={cy} x2={end.x} y2={end.y}
              stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
          })}
          <motion.path d={skillPath} fill="rgba(99,102,241,0.15)"
            stroke="rgba(99,102,241,0.7)" strokeWidth={2} strokeLinejoin="round"
            initial={{ d: zeroPath, opacity: 0 }}
            animate={{ d: skillPath, opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 }} />
          {AXES.map(({ angle }, i) => {
            const r = (values[i] / 100) * maxR;
            const { x, y } = polarToCart(angle, r, cx, cy);
            return (
              <motion.circle key={i} cx={x} cy={y} r={3.5} fill="#6366f1"
                stroke="rgba(99,102,241,0.3)" strokeWidth={4}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }} />
            );
          })}
          {AXES.map(({ angle, label }, i) => {
            const { x, y } = polarToCart(angle, maxR + 18, cx, cy);
            return (
              <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle"
                fontSize={10} fontFamily="Inter, sans-serif" fontWeight={600}
                fill={values[i] >= 70 ? '#818cf8' : values[i] >= 40 ? '#94a3b8' : '#475569'}>
                {label}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="grid grid-cols-2 gap-1.5 mt-2">
        {AXES.map(({ label }, i) => (
          <div key={label} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-slate-500">{label}</span>
            <div className="flex items-center gap-1.5">
              <div className="w-14 h-1.5 rounded-full bg-white/5 overflow-hidden">
                <motion.div className="h-full rounded-full bg-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${values[i]}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.07 }} />
              </div>
              <span className="text-slate-400 font-mono w-6 text-right">{values[i]}%</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillRadarChart;
