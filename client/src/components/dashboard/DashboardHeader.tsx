import React from 'react';
import { Calendar } from 'lucide-react';
import { formatDate } from '@utils/index';

export const DashboardHeader: React.FC = () => {
  const currentDate = formatDate(new Date().toISOString());

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2">
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Student Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome to your central hub for learning algorithms and data structures.</p>
      </div>
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white/[0.02] border border-white/5 px-3.5 py-2 rounded-xl shrink-0 w-fit">
        <Calendar className="w-4 h-4 text-blue-400" />
        {currentDate}
      </div>
    </div>
  );
};
