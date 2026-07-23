import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@store/authStore';
import { useDashboardStats } from '@hooks/useDashboard';
import {
  School, Code, Award, Flame, Save, Edit2, ShieldAlert,
  CheckCircle2, Globe, ExternalLink, Sparkles
} from 'lucide-react';
import api from '@services/api';
import { API_ENDPOINTS } from '@constants/api';
import { getInitials } from '@utils/index';
import ContributionHeatmap from '@components/dashboard/ContributionHeatmap';
import SkillRadarChart from '@components/dashboard/SkillRadarChart';

export const Profile: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const { data: stats } = useDashboardStats();

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    college: '',
    github: '',
    linkedin: '',
    leetcode: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        college: user.college || '',
        github: user.github || '',
        linkedin: user.linkedin || '',
        leetcode: user.leetcode || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const { data } = await api.put(API_ENDPOINTS.USER_PROFILE, formData);
      setUser(data.data);
      setSuccessMsg('Profile updated successfully!');
      setIsEditing(false);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[50vh] text-slate-400 font-mono text-sm">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Banner Header Card ── */}
      <div className="glass-premium rounded-3xl p-6 md:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }} />

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
            {/* Avatar */}
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-2xl object-cover border-2 border-indigo-500/40 shadow-2xl shrink-0"
              />
            ) : (
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-2xl font-black text-white shrink-0 shadow-2xl"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', border: '2px solid rgba(99,102,241,0.4)' }}>
                {getInitials(user.name)}
              </div>
            )}

            {/* Name + Details */}
            <div className="space-y-2">
              <div className="flex items-center justify-center md:justify-start gap-3 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">{user.name}</h1>
                <span className="badge badge-indigo text-xs">Level {stats?.level ?? 1}</span>
                <span className="badge badge-emerald text-xs">Verified Student</span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                {user.email} &bull; Joined {new Date().getFullYear()}
              </p>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                {user.bio || 'Algorithm enthusiast mastering Data Structures, Dynamic Programming, and System Design.'}
              </p>

              {/* Badges / Links */}
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 flex-wrap text-xs">
                {user.college && (
                  <span className="flex items-center gap-1.5 text-slate-400 font-medium">
                    <School className="w-3.5 h-3.5 text-indigo-400" /> {user.college}
                  </span>
                )}
                {user.github && (
                  <a href={user.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                    <Globe className="w-3.5 h-3.5" /> GitHub <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                    <Globe className="w-3.5 h-3.5 text-blue-400" /> LinkedIn <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-ghost shrink-0 cursor-pointer"
          >
            <Edit2 className="w-4 h-4" />
            {isEditing ? 'Cancel Edit' : 'Edit Profile'}
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/5 relative z-10">
          {[
            { label: 'Total XP', value: `${stats?.totalXP ?? 0} XP`, icon: Sparkles, color: 'text-indigo-400' },
            { label: 'Learning Streak', value: `${stats?.streak ?? 0} Days`, icon: Flame, color: 'text-orange-400' },
            { label: 'Algorithms Done', value: `${stats?.completedCount ?? 0}/${stats?.totalAlgorithms ?? 85}`, icon: Code, color: 'text-emerald-400' },
            { label: 'Global Rank', value: stats?.rank ? `#${stats.rank}` : 'Top 5%', icon: Award, color: 'text-purple-400' },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-black/30 p-3.5 rounded-xl border border-white/5">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Icon className={`w-3.5 h-3.5 ${color}`} /> {label}
              </div>
              <div className="text-base font-black font-mono text-white mt-1">{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Alerts ── */}
      <AnimatePresence>
        {successMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" /> {successMsg}
          </motion.div>
        )}
        {errorMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 shrink-0" /> {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Edit Form or Deep Analytics ── */}
      {isEditing ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Edit2 className="w-5 h-5 text-indigo-400" /> Update Account Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">College / Institute</label>
                <input type="text" name="college" value={formData.college} onChange={handleChange} className="input-premium" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Bio &amp; Goals</label>
              <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} className="input-premium resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">GitHub Profile URL</label>
                <input type="url" name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/username" className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">LinkedIn Profile URL</label>
                <input type="url" name="linkedin" value={formData.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/username" className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">LeetCode Profile URL</label>
                <input type="url" name="leetcode" value={formData.leetcode} onChange={handleChange} placeholder="https://leetcode.com/username" className="input-premium" />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
              <button type="button" onClick={() => setIsEditing(false)} className="btn-ghost">Cancel</button>
              <button type="submit" disabled={isSubmitting} className="btn-primary cursor-pointer">
                <Save className="w-4 h-4" /> {isSubmitting ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </div>
          </form>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ContributionHeatmap />
          </div>
          <div>
            <SkillRadarChart />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
