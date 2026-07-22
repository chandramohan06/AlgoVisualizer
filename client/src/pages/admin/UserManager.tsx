import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminService } from '@services/adminService';
import { StudentProfileModal } from '@components/leaderboard/StudentProfileModal';
import {
  Users, Search, Filter, Lock, KeyRound, Award, ChevronLeft, ChevronRight, Eye
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const UserManager: React.FC = () => {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [college, setCollege] = useState('');
  const [batch, setBatch] = useState('');
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [page, setPage] = useState(1);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  const queryParams = { search, college, batch, company, status, sortBy, page, limit: 15 };

  const { data, isLoading, error } = useQuery({
    queryKey: ['adminStudents', queryParams],
    queryFn: () => adminService.getStudents(queryParams),
  });

  const students = data?.students || [];

  const banMutation = useMutation({
    mutationFn: (userId: string) => adminService.toggleBan(userId),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['adminStudents'] });
      setMsg(`Student ${updated.name} status updated (isBanned: ${updated.isBanned})`);
      setTimeout(() => setMsg(''), 3000);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (userId: string) => adminService.resetStudentPassword(userId),
    onSuccess: (res) => {
      setMsg(res.message);
      setTimeout(() => setMsg(''), 3000);
    },
  });

  const grantBadgeMutation = useMutation({
    mutationFn: ({ userId, badge }: { userId: string; badge: string }) => adminService.grantBadge(userId, badge),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['adminStudents'] });
      setMsg(res.message);
      setTimeout(() => setMsg(''), 3000);
    },
  });

  return (
    <div className="space-y-6 font-sans text-slate-200">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> Student Management Directory
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            View, search, filter, moderate, and inspect registered student profiles and progress analytics.
          </p>
        </div>

        {data && (
          <div className="px-3.5 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-300">
            Total Students: <span className="font-bold text-indigo-400">{data.total}</span>
          </div>
        )}
      </div>

      {msg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
          {msg}
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="bg-[#11161d] border border-white/10 p-4 rounded-2xl space-y-3 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Search student by name or email..."
              className="w-full h-9 pl-9 pr-3 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Sort By Select */}
          <div className="flex items-center gap-2 text-xs font-mono w-full sm:w-auto">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white font-mono cursor-pointer focus:outline-none focus:border-indigo-500"
            >
              <option value="createdAt">Date Registered</option>
              <option value="xp">Total XP</option>
              <option value="streak">Streak</option>
            </select>
          </div>

        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono pt-2 border-t border-white/5">
          <span className="text-slate-500 text-[10px] uppercase font-bold flex items-center gap-1">
            <Filter className="w-3 h-3 text-indigo-400" /> Filters:
          </span>

          <select
            value={college}
            onChange={(e) => { setCollege(e.target.value); setPage(1); }}
            className="h-8 px-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono cursor-pointer"
          >
            <option value="">All Colleges</option>
            <option value="IIT Bombay">IIT Bombay</option>
            <option value="BITS Pilani">BITS Pilani</option>
            <option value="NIT Trichy">NIT Trichy</option>
            <option value="VIT Vellore">VIT Vellore</option>
            <option value="DTU">DTU Delhi</option>
          </select>

          <select
            value={batch}
            onChange={(e) => { setBatch(e.target.value); setPage(1); }}
            className="h-8 px-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono cursor-pointer"
          >
            <option value="">All Batches</option>
            <option value="2025">Batch 2025</option>
            <option value="2026">Batch 2026</option>
            <option value="2027">Batch 2027</option>
          </select>

          <select
            value={company}
            onChange={(e) => { setCompany(e.target.value); setPage(1); }}
            className="h-8 px-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono cursor-pointer"
          >
            <option value="">Target Company</option>
            <option value="Amazon">Amazon</option>
            <option value="Google">Google</option>
            <option value="Microsoft">Microsoft</option>
            <option value="TCS">TCS</option>
          </select>

          <select
            value={status}
            onChange={(e) => { setStatus(e.target.value); setPage(1); }}
            className="h-8 px-2.5 bg-black/40 border border-white/10 rounded-lg text-white font-mono cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="banned">Banned Only</option>
          </select>

          {(search || college || batch || company || status) && (
            <button
              onClick={() => { setSearch(''); setCollege(''); setBatch(''); setCompany(''); setStatus(''); setPage(1); }}
              className="text-[11px] text-amber-400 hover:underline cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Main Student Directory Table */}
      <div className="bg-[#11161d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-6 space-y-3">
            <Skeleton className="h-12 rounded-xl" count={6} />
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-slate-400">
            Failed to load student directory.
          </div>
        ) : students.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400 font-mono">
            No registered students match active search criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-[#161d27] text-[10px] uppercase font-bold text-slate-400 tracking-wider font-mono">
                  <th className="py-3.5 px-4">Student Name &amp; Email</th>
                  <th className="py-3.5 px-4">College &amp; Batch</th>
                  <th className="py-3.5 px-4">Target Company</th>
                  <th className="py-3.5 px-4 text-center">Streak</th>
                  <th className="py-3.5 px-4 text-right">XP</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300">
                {students.map((student) => (
                  <tr key={student._id} className="hover:bg-white/[0.02] transition-colors">
                    {/* Name & Email */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={`https://api.dicebear.com/7.x/bottts/svg?seed=${student.name}`}
                          alt={student.name}
                          className="w-8 h-8 rounded-full border border-white/10 object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-white block truncate">{student.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono block truncate">{student.email}</span>
                        </div>
                      </div>
                    </td>

                    {/* College & Batch */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="text-slate-300 block truncate max-w-[160px]">
                        {student.college || 'General Institute'}
                      </span>
                      <span className="text-[10px] text-slate-500">Batch {student.batch || '2026'}</span>
                    </td>

                    {/* Target Company */}
                    <td className="py-3.5 px-4 font-mono">
                      <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold">
                        {student.targetCompany || 'Amazon'}
                      </span>
                    </td>

                    {/* Streak */}
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-orange-400">
                      {student.streak || 0}d
                    </td>

                    {/* Total XP */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                      {(student.xp || 0).toLocaleString()} XP
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {student.isBanned ? (
                        <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[10px] font-bold">
                          Banned
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                          Active
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right font-mono">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View Full Profile */}
                        <button
                          onClick={() => setSelectedStudentId(student._id)}
                          title="View Complete Profile & Progress"
                          className="p-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Reset Password */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Reset password for ${student.name}?`)) {
                              resetPasswordMutation.mutate(student._id);
                            }
                          }}
                          title="Reset Password to Default"
                          className="p-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
                        >
                          <KeyRound className="w-3.5 h-3.5" />
                        </button>

                        {/* Grant Badge */}
                        <button
                          onClick={() => {
                            const badge = window.prompt('Enter badge title to grant:', 'Star Student');
                            if (badge) grantBadgeMutation.mutate({ userId: student._id, badge });
                          }}
                          title="Grant Badge & Award 100 XP"
                          className="p-1.5 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 transition-colors cursor-pointer"
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>

                        {/* Toggle Ban */}
                        <button
                          onClick={() => banMutation.mutate(student._id)}
                          title={student.isBanned ? 'Unban Account' : 'Ban Account'}
                          className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                            student.isBanned
                              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/30'
                              : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/30'
                          }`}
                        >
                          <Lock className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {data && data.totalPages > 1 && (
          <div className="p-4 border-t border-white/10 bg-[#161d27] flex items-center justify-between font-mono text-xs text-slate-400">
            <span>
              Page {data.page} of {data.totalPages} ({data.total} registered students)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
                className="px-3 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 cursor-pointer transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Student Detailed Profile Modal */}
      <StudentProfileModal
        userId={selectedStudentId}
        onClose={() => setSelectedStudentId(null)}
      />

    </div>
  );
};

export default UserManager;
