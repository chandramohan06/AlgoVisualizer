import React from 'react';
import { cn } from '@utils/index';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
  sublabel?: string;
  color?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 80,
  strokeWidth = 6,
  className,
  label,
  sublabel,
  color,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return '#10b981'; // success
    if (percentage >= 50) return '#fbbf24'; // warning
    if (percentage >= 25) return '#3b82f6'; // primary brand blue
    return '#64748b'; // muted gray
  };

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={strokeWidth}
          />
          {/* Progress Ring */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={getColor()}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out',
              filter: `drop-shadow(0 0 6px ${getColor()}40)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-bold text-gray-200">{percentage}%</span>
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="text-xs font-medium text-gray-300 leading-tight">{label}</p>
          {sublabel && (
            <p className="text-[10px] text-gray-500">{sublabel}</p>
          )}
        </div>
      )}
    </div>
  );
};
