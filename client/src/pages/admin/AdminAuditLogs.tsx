import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { adminService } from '@services/adminService';
import { ShieldAlert, Clock, UserCheck } from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const AdminAuditLogs: React.FC = () => {
  const { data: logs, isLoading, error } = useQuery({
    queryKey: ['adminAuditLogs'],
    queryFn: () => adminService.getAuditLogs(100),
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 font-sans text-slate-200">
      
      {/* Header */}
      <div className="bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-amber-400" /> Administrative System Audit Trail
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Security audit log recording all administrative modifications, user status changes, and rule configuration updates.
          </p>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-[#11161d] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        {isLoading ? (
          <div className="p-6 space-y-3">
            <Skeleton className="h-12 rounded-xl" count={6} />
          </div>
        ) : error ? (
          <div className="p-12 text-center text-sm text-slate-400 font-mono">
            Failed to load audit logs.
          </div>
        ) : !logs || logs.length === 0 ? (
          <div className="p-12 text-center text-sm text-slate-400 font-mono">
            No audit log entries recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans">
              <thead>
                <tr className="border-b border-white/10 bg-[#161d27] text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Admin User</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Target Type</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-slate-300 font-mono">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {new Date(log.createdAt).toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-indigo-300">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5 text-indigo-400" />
                        {log.adminId?.name || 'Administrator'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {log.targetType || 'System'}
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {log.details || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminAuditLogs;
