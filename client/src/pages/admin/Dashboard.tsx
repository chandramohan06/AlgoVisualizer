import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@services/adminService';
import {
  Users, Activity, CheckCircle2, Brain, Percent, UserPlus,
  Trophy, ArrowRight, ShieldCheck, FileSpreadsheet, RefreshCw
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Skeleton } from '@components/common/Skeleton';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  const { data: overview, isLoading, error, refetch, isRefetching } = useQuery({
    queryKey: ['adminOverview'],
    queryFn: () => adminService.getOverview(),
    staleTime: 30 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6 font-sans">
        <Skeleton className="h-20 rounded-2xl" />
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-28 rounded-2xl" count={6} />
        </div>
      </div>
    );
  }

  if (error || !overview) {
    return (
      <div className="p-8 text-center text-sm text-slate-400 font-mono">
        Failed to load Admin Overview. Ensure backend server is running.
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Registered Students',
      value: overview.totalStudents.toLocaleString(),
      icon: Users,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Active Students Today',
      value: overview.activeStudentsToday.toLocaleString(),
      icon: Activity,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Questions Solved Today',
      value: overview.questionsSolvedToday.toLocaleString(),
      icon: CheckCircle2,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    },
    {
      title: 'Quiz Attempts Today',
      value: overview.quizAttemptsToday.toLocaleString(),
      icon: Brain,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
    {
      title: 'Average Quiz Accuracy',
      value: `${overview.averageAccuracy}%`,
      icon: Percent,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'New Registrations Today',
      value: overview.newRegistrationsCount.toLocaleString(),
      icon: UserPlus,
      color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    },
  ];

  return (
    <div className="space-y-6 font-sans text-slate-200">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl font-black text-white tracking-tight">Admin Console Overview</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            System performance metrics, real student activity, and administrative controls.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          disabled={isRefetching}
          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefetching ? 'animate-spin' : ''}`} />
          <span>Sync Overview</span>
        </button>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="p-5 rounded-2xl bg-[#11161d] border border-white/10 flex items-center justify-between shadow-xl"
          >
            <div>
              <span className="text-[11px] font-mono text-slate-400 font-bold block">{card.title}</span>
              <span className="text-2xl font-black text-white mt-1 block font-mono">{card.value}</span>
            </div>
            <div className={`p-3 rounded-xl border ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Grid: Top Performers & Quick Admin Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Top Performers Table */}
        <div className="lg:col-span-2 bg-[#11161d] border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" /> Platform Top Performers
            </h2>
            <button
              onClick={() => navigate('/admin/leaderboard')}
              className="text-xs text-indigo-400 hover:underline font-mono flex items-center gap-1 cursor-pointer"
            >
              Leaderboard Board <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 text-[10px] uppercase font-bold text-slate-500 font-mono">
                  <th className="py-2.5 px-3">Rank</th>
                  <th className="py-2.5 px-3">Student</th>
                  <th className="py-2.5 px-3">College</th>
                  <th className="py-2.5 px-3 text-right">Total XP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {overview.topPerformers.map((student) => (
                  <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-amber-400">
                      #{student.rank}
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img
                          src={student.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}`}
                          alt={student.name}
                          className="w-7 h-7 rounded-full border border-white/10 object-cover"
                        />
                        <span className="font-bold text-white block truncate">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">
                      {student.college || 'General Institute'}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-black text-amber-400">
                      {student.xp.toLocaleString()} XP
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Admin Actions Panel */}
        <div className="bg-[#11161d] border border-white/10 p-5 rounded-2xl space-y-4 shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono flex items-center gap-2 border-b border-white/5 pb-3">
              <ShieldCheck className="w-4 h-4 text-indigo-400" /> Admin Navigation
            </h2>
            <div className="space-y-2 mt-4 font-mono text-xs">
              <button
                onClick={() => navigate('/admin/students')}
                className="w-full p-3 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-left font-bold text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Manage Registered Students</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/admin/leaderboard')}
                className="w-full p-3 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-left font-bold text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>Leaderboard &amp; XP Rules</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/admin/reports')}
                className="w-full p-3 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-left font-bold text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" /> Reports &amp; Export Data
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => navigate('/admin/audit-logs')}
                className="w-full p-3 rounded-xl bg-black/40 hover:bg-white/5 border border-white/10 text-left font-bold text-slate-200 flex items-center justify-between transition-colors cursor-pointer"
              >
                <span>System Audit Logs</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-[10px] text-indigo-300 font-mono">
            🛡️ Protected by Role-Based Access Control (`Role.ADMIN`).
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
