import React from 'react';
import { cn } from '@utils/index';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = 'rectangular',
  width,
  height,
  count = 1,
}) => {
  const baseClasses = 'skeleton animate-pulse rounded bg-white/10';
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-xl h-32',
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(baseClasses, variantClasses[variant], className)}
          style={{ width, height }}
        />
      ))}
    </>
  );
};

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6 p-6 animate-fade-in font-sans">
    <Skeleton className="h-40 w-full rounded-2xl" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-28 rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-40 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
    </div>
  </div>
);

export const CardSkeleton: React.FC<{ lines?: number }> = ({ lines = 3 }) => (
  <div className="rounded-xl p-5 space-y-3 bg-black/40 border border-white/10 font-sans">
    <Skeleton className="h-5 w-1/3" />
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton key={i} className="h-4" width={`${100 - i * 15}%`} />
    ))}
  </div>
);

export const LeaderboardSkeleton: React.FC = () => (
  <div className="space-y-6 p-6 font-sans">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-48 rounded-2xl" />
      ))}
    </div>
    <Skeleton className="h-96 rounded-2xl" />
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 6 }) => (
  <div className="space-y-3 p-4 bg-[#11161d] border border-white/10 rounded-2xl font-sans">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-12 rounded-xl" />
    ))}
  </div>
);

export const CodePanelSkeleton: React.FC = () => (
  <div className="space-y-3 p-5 bg-[#090d14] border border-white/10 rounded-2xl font-mono">
    <Skeleton className="h-6 w-1/4" />
    <Skeleton className="h-48 w-full rounded-xl" />
  </div>
);
