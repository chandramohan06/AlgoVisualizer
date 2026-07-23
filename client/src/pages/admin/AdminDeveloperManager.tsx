import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Code2, Calendar, Zap, BookOpen,
  Camera, Save, Trash2, Plus, ArrowLeft, ShieldCheck, Check, AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import developerProfileService, {
  IDeveloperProfileData, ISkill, ITimelineItem
} from '@services/developerProfileService';
import { Skeleton } from '@components/common/Skeleton';

export const AdminDeveloperManager: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'personal' | 'about' | 'skills' | 'timeline' | 'metrics'>('personal');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch profile from backend
  const { data: profile, isLoading } = useQuery<IDeveloperProfileData>({
    queryKey: ['developer-profile'],
    queryFn: developerProfileService.getProfile,
  });

  // Local form state
  const [formData, setFormData] = useState<Partial<IDeveloperProfileData>>({});

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: developerProfileService.updateProfile,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setSuccessMsg('Founder profile updated successfully in MongoDB!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Failed to update profile.');
      setTimeout(() => setErrorMsg(''), 3000);
    },
  });

  const photoMutation = useMutation({
    mutationFn: developerProfileService.uploadPhoto,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setSuccessMsg('Profile photo updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
  });

  const resumeMutation = useMutation({
    mutationFn: developerProfileService.uploadResume,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setSuccessMsg('Resume link updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3000);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        photoMutation.mutate(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Skill management helpers
  const handleAddSkill = () => {
    const newSkill: ISkill = { name: 'New Tech Skill', category: 'Frontend', level: 80, tag: 'Proficient' };
    setFormData((prev) => ({ ...prev, skills: [...(prev.skills || []), newSkill] }));
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({ ...prev, skills: (prev.skills || []).filter((_, i) => i !== index) }));
  };

  const handleSkillChange = (index: number, field: keyof ISkill, value: any) => {
    setFormData((prev) => {
      const updated = [...(prev.skills || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, skills: updated };
    });
  };

  // Timeline helpers
  const handleAddTimeline = () => {
    const newItem: ITimelineItem = { year: new Date().getFullYear().toString(), title: 'New Career Milestone', description: 'Milestone details...', badge: 'Update' };
    setFormData((prev) => ({ ...prev, timeline: [...(prev.timeline || []), newItem] }));
  };

  const handleRemoveTimeline = (index: number) => {
    setFormData((prev) => ({ ...prev, timeline: (prev.timeline || []).filter((_, i) => i !== index) }));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        <Skeleton className="h-64 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans text-slate-200">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-premium rounded-3xl p-6 md:p-8">
        <div>
          <button
            onClick={() => navigate('/developer')}
            className="btn-ghost text-xs mb-3 inline-flex items-center gap-1 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> View Public Page
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Founder Profile Management</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dynamic Admin Control Panel — Edit all profile attributes, skills, metrics, and photo stored in MongoDB.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="btn-primary cursor-pointer self-start sm:self-auto text-xs"
        >
          <Save className="w-4 h-4" /> {updateMutation.isPending ? 'Saving to Database...' : 'Save All Changes'}
        </button>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono">
            <Check className="w-4 h-4" /> {successMsg}
          </motion.div>
        )}
        {errorMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Management Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5 font-mono text-xs">
        {[
          { id: 'personal', label: '1. Personal & Social', icon: User },
          { id: 'about', label: '2. Biography & Vision', icon: BookOpen },
          { id: 'skills', label: '3. Skills Matrix', icon: Code2 },
          { id: 'timeline', label: '4. Timeline', icon: Calendar },
          { id: 'metrics', label: '5. Metrics & Links', icon: Zap },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* ── TAB 1: PERSONAL & SOCIAL ── */}
        {activeTab === 'personal' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Founder Personal Details &amp; Media
            </h2>

            {/* Photo & Resume Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 rounded-2xl bg-black/30 border border-white/5">
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 bg-slate-900 shrink-0">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-500">No Photo</div>
                  )}
                </div>
                <div>
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="btn-ghost text-xs cursor-pointer">
                    <Camera className="w-4 h-4" /> Change Avatar
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <p className="text-[10px] text-slate-500 mt-1">Uploaded image saved directly in MongoDB.</p>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Resume PDF Link</label>
                <input
                  type="url"
                  name="resumeUrl"
                  value={formData.resumeUrl || ''}
                  onChange={handleChange}
                  onBlur={(e) => e.target.value && resumeMutation.mutate(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="input-premium text-xs"
                />
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Headline</label>
                <input type="text" name="headline" value={formData.headline || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Designation</label>
                <input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} className="input-premium" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Location</label>
                <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Country</label>
                <input type="text" name="country" value={formData.country || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Availability Status</label>
                <input type="text" name="availabilityStatus" value={formData.availabilityStatus || ''} onChange={handleChange} className="input-premium" />
              </div>
            </div>

            {/* Social URLs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4 border-t border-white/5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Email Address</label>
                <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">GitHub Profile URL</label>
                <input type="url" name="githubUrl" value={formData.githubUrl || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">LinkedIn Profile URL</label>
                <input type="url" name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleChange} className="input-premium" />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: BIOGRAPHY & VISION ── */}
        {activeTab === 'about' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Biography, Mission &amp; Purpose
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">About Me (Short Summary)</label>
              <textarea name="aboutMe" rows={3} value={formData.aboutMe || ''} onChange={handleChange} className="input-premium resize-none" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Full Biography</label>
              <textarea name="biography" rows={4} value={formData.biography || ''} onChange={handleChange} className="input-premium resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Mission Statement</label>
                <textarea name="mission" rows={3} value={formData.mission || ''} onChange={handleChange} className="input-premium resize-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Vision Statement</label>
                <textarea name="vision" rows={3} value={formData.vision || ''} onChange={handleChange} className="input-premium resize-none" />
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 3: SKILLS MATRIX ── */}
        {activeTab === 'skills' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" /> Technical Skills Matrix ({formData.skills?.length || 0})
              </h2>
              <button type="button" onClick={handleAddSkill} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add New Skill
              </button>
            </div>

            <div className="space-y-3">
              {formData.skills?.map((skill, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl bg-black/30 border border-white/5 items-center">
                  <div className="sm:col-span-4">
                    <input type="text" value={skill.name} onChange={(e) => handleSkillChange(index, 'name', e.target.value)} placeholder="Skill Name" className="input-premium text-xs" />
                  </div>
                  <div className="sm:col-span-3">
                    <select value={skill.category} onChange={(e) => handleSkillChange(index, 'category', e.target.value)} className="input-premium text-xs cursor-pointer">
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Programming">Programming</option>
                      <option value="Database">Database</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>
                  <div className="sm:col-span-3 flex items-center gap-2">
                    <input type="number" min="0" max="100" value={skill.level} onChange={(e) => handleSkillChange(index, 'level', Number(e.target.value))} className="input-premium text-xs font-mono" />
                    <span className="text-xs text-slate-500 font-mono">%</span>
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button type="button" onClick={() => handleRemoveSkill(index)} className="btn-icon hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 4: TIMELINE ── */}
        {activeTab === 'timeline' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" /> Career Journey Timeline ({formData.timeline?.length || 0})
              </h2>
              <button type="button" onClick={handleAddTimeline} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Timeline Milestone
              </button>
            </div>

            <div className="space-y-4">
              {formData.timeline?.map((item, index) => (
                <div key={index} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-indigo-400 font-mono">Milestone #{index + 1}</span>
                    <button type="button" onClick={() => handleRemoveTimeline(index)} className="btn-icon hover:text-rose-400 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input type="text" value={item.year} onChange={(e) => {
                      const updated = [...(formData.timeline || [])];
                      updated[index].year = e.target.value;
                      setFormData({ ...formData, timeline: updated });
                    }} placeholder="Year (e.g. 2024)" className="input-premium text-xs font-mono" />
                    <input type="text" value={item.title} onChange={(e) => {
                      const updated = [...(formData.timeline || [])];
                      updated[index].title = e.target.value;
                      setFormData({ ...formData, timeline: updated });
                    }} placeholder="Title" className="input-premium text-xs" />
                    <input type="text" value={item.badge || ''} onChange={(e) => {
                      const updated = [...(formData.timeline || [])];
                      updated[index].badge = e.target.value;
                      setFormData({ ...formData, timeline: updated });
                    }} placeholder="Badge (e.g. Product)" className="input-premium text-xs" />
                  </div>
                  <textarea value={item.description} onChange={(e) => {
                    const updated = [...(formData.timeline || [])];
                    updated[index].description = e.target.value;
                    setFormData({ ...formData, timeline: updated });
                  }} rows={2} placeholder="Description..." className="input-premium text-xs resize-none" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TAB 5: METRICS ── */}
        {activeTab === 'metrics' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" /> Platform Highlights &amp; Metrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {formData.projectMetrics?.map((m, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                  <input type="text" value={m.label} onChange={(e) => {
                    const updated = [...(formData.projectMetrics || [])];
                    updated[idx].label = e.target.value;
                    setFormData({ ...formData, projectMetrics: updated });
                  }} className="input-premium text-xs font-bold" />
                  <input type="text" value={m.value} onChange={(e) => {
                    const updated = [...(formData.projectMetrics || [])];
                    updated[idx].value = e.target.value;
                    setFormData({ ...formData, projectMetrics: updated });
                  }} className="input-premium text-xs font-mono font-bold" />
                  <input type="text" value={m.sub || ''} onChange={(e) => {
                    const updated = [...(formData.projectMetrics || [])];
                    updated[idx].sub = e.target.value;
                    setFormData({ ...formData, projectMetrics: updated });
                  }} className="input-premium text-xs text-slate-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Save button at bottom */}
        <div className="flex justify-end pt-4">
          <button type="submit" disabled={updateMutation.isPending} className="btn-primary text-xs cursor-pointer">
            <Save className="w-4 h-4" /> {updateMutation.isPending ? 'Saving Changes...' : 'Save All Changes to MongoDB'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDeveloperManager;
