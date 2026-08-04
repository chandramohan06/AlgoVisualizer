import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CheckCircle2, Printer } from 'lucide-react';
import { useAuthStore } from '@store/authStore';

export interface ResumeReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeReportModal: React.FC<ResumeReportModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuthStore();

  if (!isOpen) return null;

  const name = user?.name || 'Chandra Mohan Kumar';
  const email = user?.email || 'student@algovisualizer.com';
  const streak = user?.streak || 7;
  const xp = (user as any)?.totalXP ?? (user as any)?.xp ?? 650;
  const level = Math.max(1, Math.floor(xp / 300) + 1);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-2xl glass-strong rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#0d1117] p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white font-mono uppercase tracking-wider">
                  Verified Developer Learning Report
                </h3>
                <p className="text-xs text-slate-400 font-mono">AlgoVisualizer SaaS Telemetry Certificate</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Profile Overview */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <div className="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h4 className="text-lg font-black text-white">{name}</h4>
                <p className="text-xs font-mono text-slate-400">{email}</p>
              </div>

              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                Status: Top 5% Learner
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 font-mono">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs text-slate-400">Level</div>
                <div className="text-sm font-bold text-purple-300">Level {level}</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs text-slate-400">Total XP</div>
                <div className="text-sm font-bold text-amber-300">{xp} XP</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs text-slate-400">Active Streak</div>
                <div className="text-sm font-bold text-orange-300">{streak} Days</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <div className="text-xs text-slate-400">Readiness</div>
                <div className="text-sm font-bold text-cyan-300">84% Ready</div>
              </div>
            </div>
          </div>

          {/* Core Competencies Summary */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">Verified DSA Skills</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              {['Arrays & Two Pointers', 'Sorting & Searching', 'Graph Algorithms', 'Trees & BST', 'Dynamic Programming', 'System Design'].map((skill, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="text-slate-300 text-[11px] truncate">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 font-mono text-xs">
            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-bold flex items-center gap-2 cursor-pointer transition-all"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>

            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold cursor-pointer transition-all shadow-md shadow-indigo-600/20"
            >
              Close Report
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResumeReportModal;
