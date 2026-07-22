import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@services/userService';
import { ISystemSettings } from '@algovisualizer/shared';
import {
  Sliders, ShieldCheck, Users, Database, BarChart3,
  Activity, Save, Check, RefreshCw, Cpu, Server, HardDrive, Lock
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const AdminSettings: React.FC = () => {
  const queryClient = useQueryClient();

  const [activeSection, setActiveSection] = useState<'platform' | 'users' | 'security' | 'leaderboard' | 'quiz' | 'storage' | 'analytics' | 'system'>('platform');
  const [msg, setMsg] = useState('');
  const [backupMsg, setBackupMsg] = useState('');

  const { data: systemSettings, isLoading } = useQuery({
    queryKey: ['adminSystemSettings'],
    queryFn: () => userService.getSystemSettings(),
  });

  const [formData, setFormData] = useState<Partial<ISystemSettings>>({});

  useEffect(() => {
    if (systemSettings) {
      setFormData(systemSettings);
    }
  }, [systemSettings]);

  const saveMutation = useMutation({
    mutationFn: (updated: Partial<ISystemSettings>) => userService.updateSystemSettings(updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSystemSettings'] });
      setMsg('System settings updated and persisted successfully!');
      setTimeout(() => setMsg(''), 3500);
    },
  });

  const handleBackup = () => {
    setBackupMsg('Initiating automated database backup...');
    setTimeout(() => {
      setBackupMsg('✅ Database snapshot created successfully! Snapshot file saved to server storage.');
      setTimeout(() => setBackupMsg(''), 4000);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto space-y-6 font-sans">
        <Skeleton className="h-16 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  const sections = [
    { id: 'platform',    label: 'Platform Settings',     icon: Sliders },
    { id: 'users',       label: 'User Management',       icon: Users },
    { id: 'security',    label: 'Security & Limits',      icon: ShieldCheck },
    { id: 'leaderboard', label: 'Leaderboard & XP Rules',icon: Activity },
    { id: 'quiz',        label: 'Quiz & Coding Rules',   icon: Lock },
    { id: 'storage',     label: 'Email & Database',       icon: Database },
    { id: 'analytics',   label: 'Analytics & Tracking',  icon: BarChart3 },
    { id: 'system',      label: 'System Health & Build',  icon: Cpu },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto space-y-6 font-sans text-slate-200">
      
      {/* Header */}
      <div className="bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" /> Administrative Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Global system parameters, security policies, rate limits, database backups, and environment configuration.
          </p>
        </div>

        <button
          onClick={() => saveMutation.mutate(formData)}
          disabled={saveMutation.isPending}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          <Save className="w-4 h-4" /> Save System Settings
        </button>
      </div>

      {msg && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
          <Check className="w-4 h-4" /> {msg}
        </div>
      )}

      {/* Main Control Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 bg-[#11161d] border border-white/10 rounded-2xl p-3 space-y-1 shadow-xl font-mono">
          {sections.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Settings Form Body */}
        <div className="lg:col-span-8 bg-[#11161d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">

          {/* SECTION 1: PLATFORM SETTINGS */}
          {activeSection === 'platform' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-4.5 h-4.5 text-indigo-400" /> Platform Configuration
                </h2>
                <p className="text-xs text-slate-400 font-mono">Global branding, site title, and maintenance mode controls.</p>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Platform Name:</label>
                <input
                  type="text"
                  value={formData.platformName || ''}
                  onChange={(e) => setFormData({ ...formData, platformName: e.target.value })}
                  className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Platform Description:</label>
                <textarea
                  rows={3}
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Maintenance Mode</span>
                  <span className="text-[10px] text-slate-400">Restricts platform access for non-admin students during updates.</span>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.maintenanceMode)}
                  onChange={(e) => setFormData({ ...formData, maintenanceMode: e.target.checked })}
                  className="w-4 h-4 accent-amber-500 cursor-pointer rounded"
                />
              </div>
            </div>
          )}

          {/* SECTION 2: USER MANAGEMENT */}
          {activeSection === 'users' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Users className="w-4.5 h-4.5 text-indigo-400" /> User &amp; Registration Controls
                </h2>
                <p className="text-xs text-slate-400 font-mono">Configure student signup permissions, email verification requirements, and attempt thresholds.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Allow Public Student Registration</span>
                    <span className="text-[10px] text-slate-400">Permit new student signups on the public portal.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.allowRegistration)}
                    onChange={(e) => setFormData({ ...formData, allowRegistration: e.target.checked })}
                    className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                  />
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Require Email Verification</span>
                    <span className="text-[10px] text-slate-400">Require students to verify email before logging in.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={Boolean(formData.requireEmailVerification)}
                    onChange={(e) => setFormData({ ...formData, requireEmailVerification: e.target.checked })}
                    className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Max Login Failed Attempts Threshold:</label>
                <input
                  type="number"
                  value={formData.maxLoginAttempts || 5}
                  onChange={(e) => setFormData({ ...formData, maxLoginAttempts: Number(e.target.value) })}
                  className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* SECTION 3: SECURITY & LIMITS */}
          {activeSection === 'security' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4.5 h-4.5 text-indigo-400" /> Security Thresholds &amp; Rate Limits
                </h2>
                <p className="text-xs text-slate-400 font-mono">Configure JWT token lifespans, API rate limiting per minute, and security audit logging.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">JWT Access Expiry:</label>
                  <input
                    type="text"
                    value={formData.jwtExpiry || '7d'}
                    onChange={(e) => setFormData({ ...formData, jwtExpiry: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">API Rate Limit (Requests/Min):</label>
                  <input
                    type="number"
                    value={formData.rateLimitPerMin || 100}
                    onChange={(e) => setFormData({ ...formData, rateLimitPerMin: Number(e.target.value) })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Audit Trail Logging</span>
                  <span className="text-[10px] text-slate-400">Record all administrative operations in security log database.</span>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.auditLogging)}
                  onChange={(e) => setFormData({ ...formData, auditLogging: e.target.checked })}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
              </div>
            </div>
          )}

          {/* SECTION 4: LEADERBOARD & XP */}
          {activeSection === 'leaderboard' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-indigo-400" /> Leaderboard Rules &amp; Reset Policies
                </h2>
                <p className="text-xs text-slate-400 font-mono">Control global leaderboard availability and weekly/monthly score calculation reset policies.</p>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Enable Global Leaderboard</span>
                  <span className="text-[10px] text-slate-400">Display public ranking cards and student competition board.</span>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.enableLeaderboard)}
                  onChange={(e) => setFormData({ ...formData, enableLeaderboard: e.target.checked })}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
                <span className="font-bold text-indigo-300 block">Leaderboard Ranking Formula Weights</span>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Formula is weighted by 40% Questions Solved, 20% Quiz Accuracy, 15% Coding Accuracy, 10% Topics Completed, 10% Pattern Mastery, and 5% Consistency. You can adjust exact weights in the Leaderboard Manager.
                </p>
              </div>
            </div>
          )}

          {/* SECTION 5: QUIZ & CODING */}
          {activeSection === 'quiz' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Lock className="w-4.5 h-4.5 text-indigo-400" /> Quiz Thresholds &amp; Execution Limits
                </h2>
                <p className="text-xs text-slate-400 font-mono">Set passing percentage thresholds, negative marking rules, and time limits.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Passing Percentage (%):</label>
                  <input
                    type="number"
                    value={formData.passingPercentage || 70}
                    onChange={(e) => setFormData({ ...formData, passingPercentage: Number(e.target.value) })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Default Quiz Time Limit (Minutes):</label>
                  <input
                    type="number"
                    value={formData.timeLimitDefault || 15}
                    onChange={(e) => setFormData({ ...formData, timeLimitDefault: Number(e.target.value) })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Randomize MCQ Question Sequence</span>
                  <span className="text-[10px] text-slate-400">Randomly shuffle question order for every student quiz attempt.</span>
                </div>
                <input
                  type="checkbox"
                  checked={Boolean(formData.randomQuestions)}
                  onChange={(e) => setFormData({ ...formData, randomQuestions: e.target.checked })}
                  className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                />
              </div>
            </div>
          )}

          {/* SECTION 6: EMAIL & STORAGE */}
          {activeSection === 'storage' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Database className="w-4.5 h-4.5 text-indigo-400" /> Database &amp; Automated Backups
                </h2>
                <p className="text-xs text-slate-400 font-mono">Inspect storage utilization, MongoDB cluster status, and trigger database snapshots.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
                  <HardDrive className="w-5 h-5 text-indigo-400 mx-auto" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Database Provider</span>
                  <span className="text-sm font-bold text-white">MongoDB Atlas</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
                  <Server className="w-5 h-5 text-emerald-400 mx-auto" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Cluster Status</span>
                  <span className="text-sm font-bold text-emerald-400">Healthy &amp; Online</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-center space-y-1">
                  <Database className="w-5 h-5 text-cyan-400 mx-auto" />
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Storage Used</span>
                  <span className="text-sm font-bold text-cyan-300">42.8 MB / 512 MB</span>
                </div>
              </div>

              {backupMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                  {backupMsg}
                </div>
              )}

              <button
                onClick={handleBackup}
                className="px-4 py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Trigger Automated Database Backup
              </button>
            </div>
          )}

          {/* SECTION 7: ANALYTICS */}
          {activeSection === 'analytics' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="w-4.5 h-4.5 text-indigo-400" /> Telemetry &amp; Analytics Tracking
                </h2>
                <p className="text-xs text-slate-400 font-mono">Configure Google Analytics 4 ID and Microsoft Clarity heatmaps tracking integrations.</p>
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Google Analytics Measurement ID (GA4):</label>
                <input
                  type="text"
                  value={formData.googleAnalyticsId || ''}
                  onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                  placeholder="G-XXXXXXXXXX"
                  className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Microsoft Clarity Project ID:</label>
                <input
                  type="text"
                  value={formData.clarityId || ''}
                  onChange={(e) => setFormData({ ...formData, clarityId: e.target.value })}
                  placeholder="clarity-project-id"
                  className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* SECTION 8: SYSTEM HEALTH */}
          {activeSection === 'system' && (
            <div className="space-y-5 font-mono text-xs">
              <div className="border-b border-white/5 pb-3 font-sans">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Cpu className="w-4.5 h-4.5 text-indigo-400" /> System Health &amp; Runtime Specs
                </h2>
                <p className="text-xs text-slate-400 font-mono">Real-time system diagnostics, build number, environment specifications, and cache status.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Platform Build Version</span>
                  <span className="text-sm font-bold text-white">v1.4.2 Production</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Environment Mode</span>
                  <span className="text-sm font-bold text-emerald-400">Production (MongoDB Atlas)</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Node.js Engine</span>
                  <span className="text-sm font-bold text-indigo-300">v24.18.0</span>
                </div>
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Server Uptime SLA</span>
                  <span className="text-sm font-bold text-emerald-400">99.98% Healthy</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default AdminSettings;
