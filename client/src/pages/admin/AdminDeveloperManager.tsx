import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Code2, Calendar, Zap, BookOpen,
  Camera, Save, Trash2, Plus, ArrowLeft, ShieldCheck, Check, AlertCircle,
  GraduationCap, Trophy, Globe, FileText, FileUp, FileDown, MoveUp, MoveDown, Briefcase, Award, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import developerProfileService, {
  IDeveloperProfileData, ISkill, IEducation, ITimelineItem, IAchievement, ICodingProfile, IProjectMetric,
  IProject, ICertification, ITraining
} from '@services/developerProfileService';
import { Skeleton } from '@components/common/Skeleton';

type TabType = 'personal' | 'resume' | 'about' | 'education' | 'skills' | 'projects' | 'certifications' | 'trainings' | 'timeline' | 'achievements' | 'coding' | 'metrics';

export const AdminDeveloperManager: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const photoInputRef = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch founder profile from backend
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
      setTimeout(() => setSuccessMsg(''), 3500);
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Failed to update founder profile.');
      setTimeout(() => setErrorMsg(''), 3500);
    },
  });

  const photoMutation = useMutation({
    mutationFn: developerProfileService.uploadPhoto,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setFormData((prev) => ({ ...prev, avatarUrl: data.avatarUrl }));
      setSuccessMsg('Profile photo updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Failed to upload photo.');
      setTimeout(() => setErrorMsg(''), 3500);
    },
  });

  const deletePhotoMutation = useMutation({
    mutationFn: developerProfileService.deletePhoto,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setFormData((prev) => ({ ...prev, avatarUrl: '' }));
      setSuccessMsg('Profile photo deleted.');
      setTimeout(() => setSuccessMsg(''), 3500);
    },
  });

  const resumeMutation = useMutation({
    mutationFn: developerProfileService.uploadResume,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setFormData((prev) => ({ ...prev, resumeUrl: data.resumeUrl }));
      setSuccessMsg('Resume updated successfully!');
      setTimeout(() => setSuccessMsg(''), 3500);
    },
    onError: (err: any) => {
      setErrorMsg(err.response?.data?.message || 'Failed to upload resume PDF.');
      setTimeout(() => setErrorMsg(''), 3500);
    },
  });

  const deleteResumeMutation = useMutation({
    mutationFn: developerProfileService.deleteResume,
    onSuccess: (data) => {
      queryClient.setQueryData(['developer-profile'], data);
      setFormData((prev) => ({ ...prev, resumeUrl: '' }));
      setSuccessMsg('Resume document deleted.');
      setTimeout(() => setSuccessMsg(''), 3500);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateMutation.mutate(formData);
  };

  // Photo upload handler
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      photoMutation.mutate(file);
    }
  };

  // Resume upload handler
  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      resumeMutation.mutate(file);
    }
  };

  // Helper reorder array
  const moveItem = <T,>(arr: T[], from: number, to: number): T[] => {
    const updated = [...arr];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    return updated;
  };

  // Education CRUD
  const handleAddEducation = () => {
    const newEdu: IEducation = {
      institute: 'Institute Name',
      degree: 'B.Tech',
      branch: 'Computer Science',
      university: 'University Name',
      startYear: '2021',
      endYear: '2025',
      cgpa: '8.5',
      currentSemester: 'Final Year',
    };
    setFormData((prev) => ({ ...prev, education: [...(prev.education || []), newEdu] }));
  };
  const handleRemoveEducation = (index: number) => {
    setFormData((prev) => ({ ...prev, education: (prev.education || []).filter((_, i) => i !== index) }));
  };
  const handleEducationChange = (index: number, field: keyof IEducation, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.education || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, education: updated };
    });
  };

  // Skill CRUD
  const handleAddSkill = () => {
    const newSkill: ISkill = { name: 'New Skill', category: 'Frontend', level: 85, tag: 'Advanced', icon: 'Code2' };
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

  // Projects CRUD
  const handleAddProject = () => {
    const newProj: IProject = { title: 'New Project', description: 'Overview of project...', techStack: 'React, Node.js', githubLink: '', liveDemo: '', startDate: '2024', endDate: 'Present' };
    setFormData((prev) => ({ ...prev, projects: [...(prev.projects || []), newProj] }));
  };
  const handleRemoveProject = (index: number) => {
    setFormData((prev) => ({ ...prev, projects: (prev.projects || []).filter((_, i) => i !== index) }));
  };
  const handleProjectChange = (index: number, field: keyof IProject, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.projects || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });
  };

  // Certifications CRUD
  const handleAddCert = () => {
    const newCert: ICertification = { title: 'New Certification', organization: 'Issuer', date: '2024', certificateLink: '' };
    setFormData((prev) => ({ ...prev, certifications: [...(prev.certifications || []), newCert] }));
  };
  const handleRemoveCert = (index: number) => {
    setFormData((prev) => ({ ...prev, certifications: (prev.certifications || []).filter((_, i) => i !== index) }));
  };
  const handleCertChange = (index: number, field: keyof ICertification, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.certifications || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  // Training CRUD
  const handleAddTraining = () => {
    const newTr: ITraining = { title: 'New Training Program', organization: 'Training Provider', duration: '2024', description: 'Training details...' };
    setFormData((prev) => ({ ...prev, trainings: [...(prev.trainings || []), newTr] }));
  };
  const handleRemoveTraining = (index: number) => {
    setFormData((prev) => ({ ...prev, trainings: (prev.trainings || []).filter((_, i) => i !== index) }));
  };
  const handleTrainingChange = (index: number, field: keyof ITraining, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.trainings || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, trainings: updated };
    });
  };

  // Timeline CRUD
  const handleAddTimeline = () => {
    const newItem: ITimelineItem = { year: new Date().getFullYear().toString(), title: 'New Career Milestone', subtitle: 'Organization', description: 'Description of milestone...', badge: 'Milestone', category: 'Career' };
    setFormData((prev) => ({ ...prev, timeline: [...(prev.timeline || []), newItem] }));
  };
  const handleRemoveTimeline = (index: number) => {
    setFormData((prev) => ({ ...prev, timeline: (prev.timeline || []).filter((_, i) => i !== index) }));
  };
  const handleTimelineChange = (index: number, field: keyof ITimelineItem, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.timeline || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, timeline: updated };
    });
  };

  // Achievements CRUD
  const handleAddAchievement = () => {
    const newAch: IAchievement = { title: 'New Achievement', description: 'Details of recognition...', organization: 'Issuer', date: '2024', certificateLink: '' };
    setFormData((prev) => ({ ...prev, achievements: [...(prev.achievements || []), newAch] }));
  };
  const handleRemoveAchievement = (index: number) => {
    setFormData((prev) => ({ ...prev, achievements: (prev.achievements || []).filter((_, i) => i !== index) }));
  };
  const handleAchievementChange = (index: number, field: keyof IAchievement, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.achievements || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, achievements: updated };
    });
  };

  // Coding Profiles CRUD
  const handleAddCodingProfile = () => {
    const newProfile: ICodingProfile = { platform: 'LeetCode', username: 'username', profileUrl: 'https://leetcode.com', solvedCount: '400+', rating: 'Top 10%', description: 'DSA & Algorithms' };
    setFormData((prev) => ({ ...prev, codingProfiles: [...(prev.codingProfiles || []), newProfile] }));
  };
  const handleRemoveCodingProfile = (index: number) => {
    setFormData((prev) => ({ ...prev, codingProfiles: (prev.codingProfiles || []).filter((_, i) => i !== index) }));
  };
  const handleCodingProfileChange = (index: number, field: keyof ICodingProfile, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.codingProfiles || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, codingProfiles: updated };
    });
  };

  // Project Metrics CRUD
  const handleAddMetric = () => {
    const newMetric: IProjectMetric = { label: 'Custom Metric', value: '100+', sub: 'Sublabel', color: 'text-indigo-400' };
    setFormData((prev) => ({ ...prev, projectMetrics: [...(prev.projectMetrics || []), newMetric] }));
  };
  const handleRemoveMetric = (index: number) => {
    setFormData((prev) => ({ ...prev, projectMetrics: (prev.projectMetrics || []).filter((_, i) => i !== index) }));
  };
  const handleMetricChange = (index: number, field: keyof IProjectMetric, value: string) => {
    setFormData((prev) => {
      const updated = [...(prev.projectMetrics || [])];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projectMetrics: updated };
    });
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
            <ArrowLeft className="w-4 h-4" /> View Public Founder Profile
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-amber-400" />
            <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">Founder Profile Manager</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Enterprise CMS Panel &bull; Live MongoDB Data Persistence &bull; Strict RBAC Protection
          </p>
        </div>

        <button
          onClick={() => handleSave()}
          disabled={updateMutation.isPending}
          className="btn-primary cursor-pointer self-start sm:self-auto text-xs"
        >
          <Save className="w-4 h-4" /> {updateMutation.isPending ? 'Persisting to MongoDB...' : 'Save All Changes'}
        </button>
      </div>

      {/* Notifications */}
      <AnimatePresence>
        {successMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 font-mono shadow-lg">
            <Check className="w-4 h-4" /> {successMsg}
          </motion.div>
        )}
        {errorMsg && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2 font-mono shadow-lg">
            <AlertCircle className="w-4 h-4" /> {errorMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* CMS Tabs Navigation Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5 font-mono text-xs scrollbar-thin">
        {[
          { id: 'personal', label: '1. Personal & Links', icon: User },
          { id: 'photo_resume', label: '2. Photo & Resume', icon: Camera, tabId: 'resume' },
          { id: 'about', label: '3. About & Vision', icon: BookOpen },
          { id: 'education', label: '4. Education', icon: GraduationCap },
          { id: 'skills', label: '5. Skills', icon: Code2 },
          { id: 'projects', label: '6. Projects', icon: Briefcase },
          { id: 'certifications', label: '7. Certifications', icon: Award },
          { id: 'trainings', label: '8. Training', icon: Sparkles },
          { id: 'timeline', label: '9. Timeline', icon: Calendar },
          { id: 'achievements', label: '10. Achievements', icon: Trophy },
          { id: 'coding', label: '11. Coding Profiles', icon: Globe },
          { id: 'metrics', label: '12. Project Metrics', icon: Zap },
        ].map((tab) => {
          const tabKey = (tab.tabId || tab.id) as TabType;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tabKey)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
                activeTab === tabKey
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-black/30 border border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main CMS Form */}
      <form onSubmit={handleSave} className="space-y-6">

        {/* ── SECTION 1: PERSONAL INFORMATION & LINKS ── */}
        {activeTab === 'personal' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-indigo-400" /> Personal Identity &amp; Contact Attributes
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Full Name</label>
                <input type="text" name="fullName" value={formData.fullName || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Short Name</label>
                <input type="text" name="shortName" value={formData.shortName || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Headline</label>
                <input type="text" name="headline" value={formData.headline || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Designation</label>
                <input type="text" name="designation" value={formData.designation || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Current Role</label>
                <input type="text" name="currentRole" value={formData.currentRole || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Availability Status</label>
                <input type="text" name="availabilityStatus" value={formData.availabilityStatus || ''} onChange={handleChange} className="input-premium text-emerald-400" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Location</label>
                <input type="text" name="location" value={formData.location || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Country</label>
                <input type="text" name="country" value={formData.country || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Email Address</label>
                <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Phone Number</label>
                <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">WhatsApp Number</label>
                <input type="text" name="whatsapp" value={formData.whatsapp || ''} onChange={handleChange} className="input-premium" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Personal Quote</label>
                <input type="text" name="personalQuote" value={formData.personalQuote || ''} onChange={handleChange} className="input-premium" />
              </div>
            </div>

            {/* Social Links Sub-section */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-indigo-400 uppercase font-mono">Social &amp; Web Portfolios</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">GitHub URL</label>
                  <input type="url" name="githubUrl" value={formData.githubUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">LinkedIn URL</label>
                  <input type="url" name="linkedinUrl" value={formData.linkedinUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Portfolio Site</label>
                  <input type="url" name="portfolio" value={formData.portfolio || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Website / SaaS</label>
                  <input type="url" name="website" value={formData.website || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Twitter / X</label>
                  <input type="url" name="twitterUrl" value={formData.twitterUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">YouTube Channel</label>
                  <input type="url" name="youtubeUrl" value={formData.youtubeUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Medium URL</label>
                  <input type="url" name="mediumUrl" value={formData.mediumUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Hashnode URL</label>
                  <input type="url" name="hashnodeUrl" value={formData.hashnodeUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Dev.to URL</label>
                  <input type="url" name="devtoUrl" value={formData.devtoUrl || ''} onChange={handleChange} className="input-premium text-xs" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 2: PHOTO & RESUME MANAGER ── */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            {/* Profile Photo Control */}
            <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-indigo-400" /> Founder Profile Photo Management
              </h2>

              <div className="flex flex-col sm:flex-row items-center gap-6 p-6 rounded-2xl bg-black/40 border border-white/5">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500 bg-slate-950 shrink-0 shadow-2xl">
                  {formData.avatarUrl ? (
                    <img src={formData.avatarUrl} alt="Founder Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 font-mono">No Image</div>
                  )}
                </div>

                <div className="space-y-3 text-center sm:text-left">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      disabled={photoMutation.isPending}
                      className="btn-primary text-xs cursor-pointer"
                    >
                      <Camera className="w-4 h-4" /> {photoMutation.isPending ? 'Uploading...' : 'Upload Image File'}
                    </button>
                    <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />

                    {formData.avatarUrl && (
                      <button
                        type="button"
                        onClick={() => deletePhotoMutation.mutate()}
                        disabled={deletePhotoMutation.isPending}
                        className="btn-ghost text-xs text-rose-400 border-rose-500/20 hover:bg-rose-500/10 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Delete Photo
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Direct binary file upload supported (JPEG, PNG, WebP). Persisted securely in MongoDB without localStorage.
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Or Direct Photo Image URL</label>
                <input type="url" name="avatarUrl" value={formData.avatarUrl || ''} onChange={handleChange} placeholder="https://..." className="input-premium text-xs" />
              </div>
            </div>

            {/* Resume Document Control */}
            <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> Founder Resume Document (PDF)
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-black/40 border border-white/5">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-indigo-400 font-mono uppercase block">Active Resume Document</span>
                  {formData.resumeUrl ? (
                    <p className="text-xs font-mono text-emerald-400 truncate max-w-md">
                      {formData.resumeUrl}
                    </p>
                  ) : (
                    <p className="text-xs text-slate-500 font-mono">No resume document uploaded.</p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => resumeInputRef.current?.click()}
                    disabled={resumeMutation.isPending}
                    className="btn-primary text-xs cursor-pointer"
                  >
                    <FileUp className="w-4 h-4" /> {resumeMutation.isPending ? 'Uploading PDF...' : 'Upload PDF File'}
                  </button>
                  <input ref={resumeInputRef} type="file" accept="application/pdf" onChange={handleResumeUpload} className="hidden" />

                  {formData.resumeUrl && (
                    <>
                      <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs">
                        <FileDown className="w-4 h-4" /> Preview
                      </a>
                      <button
                        type="button"
                        onClick={() => deleteResumeMutation.mutate()}
                        className="btn-ghost text-xs text-rose-400 border-rose-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" /> Delete PDF
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Or External PDF Resume Link</label>
                <input type="url" name="resumeUrl" value={formData.resumeUrl || ''} onChange={handleChange} placeholder="https://drive.google.com/..." className="input-premium text-xs" />
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 3: ABOUT, MISSION, VISION & PROJECT ── */}
        {activeTab === 'about' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" /> Biography, Mission, Vision &amp; Platform Architecture
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Short Bio (About Me)</label>
              <textarea name="aboutMe" rows={2} value={formData.aboutMe || ''} onChange={handleChange} className="input-premium text-xs" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Detailed Founder Biography</label>
              <textarea name="biography" rows={4} value={formData.biography || ''} onChange={handleChange} className="input-premium text-xs" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Mission Statement</label>
                <textarea name="mission" rows={3} value={formData.mission || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase font-mono">Platform Vision</label>
                <textarea name="vision" rows={3} value={formData.vision || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Why I Engineered AlgoVisualizer</label>
              <textarea name="whyIBuiltAlgoVisualizer" rows={3} value={formData.whyIBuiltAlgoVisualizer || ''} onChange={handleChange} className="input-premium text-xs" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">About Project Architecture</label>
              <textarea name="aboutProject" rows={3} value={formData.aboutProject || ''} onChange={handleChange} className="input-premium text-xs" />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase font-mono">Career Goal &amp; Horizon</label>
              <input type="text" name="careerGoal" value={formData.careerGoal || ''} onChange={handleChange} className="input-premium text-xs" />
            </div>
          </div>
        )}

        {/* ── SECTION 4: EDUCATION (DYNAMIC CRUD) ── */}
        {activeTab === 'education' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-indigo-400" /> Academic Qualifications (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddEducation} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Education
              </button>
            </div>

            <div className="space-y-4">
              {(formData.education || []).map((edu, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-4 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400"># Education Entry #{idx + 1}</span>
                    <div className="flex items-center gap-2">
                      {idx > 0 && (
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, education: moveItem(prev.education || [], idx, idx - 1) }))} className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400"><MoveUp className="w-3.5 h-3.5" /></button>
                      )}
                      {idx < (formData.education || []).length - 1 && (
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, education: moveItem(prev.education || [], idx, idx + 1) }))} className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400"><MoveDown className="w-3.5 h-3.5" /></button>
                      )}
                      <button type="button" onClick={() => handleRemoveEducation(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Institute</label>
                      <input type="text" value={edu.institute || ''} onChange={(e) => handleEducationChange(idx, 'institute', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">University</label>
                      <input type="text" value={edu.university || ''} onChange={(e) => handleEducationChange(idx, 'university', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Degree</label>
                      <input type="text" value={edu.degree || ''} onChange={(e) => handleEducationChange(idx, 'degree', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Branch</label>
                      <input type="text" value={edu.branch || ''} onChange={(e) => handleEducationChange(idx, 'branch', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Start Year</label>
                      <input type="text" value={edu.startYear || ''} onChange={(e) => handleEducationChange(idx, 'startYear', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">End Year</label>
                      <input type="text" value={edu.endYear || ''} onChange={(e) => handleEducationChange(idx, 'endYear', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">CGPA</label>
                      <input type="text" value={edu.cgpa || ''} onChange={(e) => handleEducationChange(idx, 'cgpa', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Current Semester / Status</label>
                      <input type="text" value={edu.currentSemester || ''} onChange={(e) => handleEducationChange(idx, 'currentSemester', e.target.value)} className="input-premium text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 5: SKILLS MATRIX (DYNAMIC CRUD) ── */}
        {activeTab === 'skills' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-indigo-400" /> Technical Skills Matrix (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddSkill} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Skill
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(formData.skills || []).map((skill, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-purple-400 font-bold">Skill #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveSkill(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Skill Name</label>
                      <input type="text" value={skill.name || ''} onChange={(e) => handleSkillChange(idx, 'name', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Category</label>
                      <select value={skill.category || 'Frontend'} onChange={(e) => handleSkillChange(idx, 'category', e.target.value)} className="input-premium text-xs bg-slate-900">
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Database">Database</option>
                        <option value="DevOps">DevOps</option>
                        <option value="Programming">Programming</option>
                        <option value="Architecture">Architecture</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Proficiency Level ({skill.level}%)</label>
                      <input type="range" min="1" max="100" value={skill.level || 80} onChange={(e) => handleSkillChange(idx, 'level', parseInt(e.target.value))} className="w-full accent-indigo-500 cursor-pointer" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Tag / Level</label>
                      <input type="text" value={skill.tag || ''} onChange={(e) => handleSkillChange(idx, 'tag', e.target.value)} placeholder="Expert / Advanced" className="input-premium text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 6: PROJECTS (DYNAMIC CRUD) ── */}
        {activeTab === 'projects' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-indigo-400" /> Featured Engineering Projects (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddProject} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Project Card
              </button>
            </div>

            <div className="space-y-4">
              {(formData.projects || []).map((proj, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-indigo-400">Project #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveProject(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Project Title</label>
                      <input type="text" value={proj.title || ''} onChange={(e) => handleProjectChange(idx, 'title', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Tech Stack (comma separated)</label>
                      <input type="text" value={proj.techStack || ''} onChange={(e) => handleProjectChange(idx, 'techStack', e.target.value)} className="input-premium text-xs font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Start Date</label>
                      <input type="text" value={proj.startDate || ''} onChange={(e) => handleProjectChange(idx, 'startDate', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">End Date</label>
                      <input type="text" value={proj.endDate || ''} onChange={(e) => handleProjectChange(idx, 'endDate', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">GitHub Repository URL</label>
                      <input type="url" value={proj.githubLink || ''} onChange={(e) => handleProjectChange(idx, 'githubLink', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Live Demo URL</label>
                      <input type="url" value={proj.liveDemo || ''} onChange={(e) => handleProjectChange(idx, 'liveDemo', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Description</label>
                      <textarea value={proj.description || ''} onChange={(e) => handleProjectChange(idx, 'description', e.target.value)} rows={2} className="input-premium text-xs resize-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 7: CERTIFICATIONS (DYNAMIC CRUD) ── */}
        {activeTab === 'certifications' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Certifications &amp; Credentials (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddCert} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Certification
              </button>
            </div>

            <div className="space-y-4">
              {(formData.certifications || []).map((cert, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">Certification #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveCert(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Title</label>
                      <input type="text" value={cert.title || ''} onChange={(e) => handleCertChange(idx, 'title', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Organization / Issuer</label>
                      <input type="text" value={cert.organization || ''} onChange={(e) => handleCertChange(idx, 'organization', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Completion Date / Year</label>
                      <input type="text" value={cert.date || ''} onChange={(e) => handleCertChange(idx, 'date', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Credential URL</label>
                      <input type="url" value={cert.certificateLink || ''} onChange={(e) => handleCertChange(idx, 'certificateLink', e.target.value)} className="input-premium text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 8: TRAINING (DYNAMIC CRUD) ── */}
        {activeTab === 'trainings' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> Specialized Training Programs (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddTraining} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Training Entry
              </button>
            </div>

            <div className="space-y-4">
              {(formData.trainings || []).map((tr, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400">Training #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveTraining(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Program Title</label>
                      <input type="text" value={tr.title || ''} onChange={(e) => handleTrainingChange(idx, 'title', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Organization / Institute</label>
                      <input type="text" value={tr.organization || ''} onChange={(e) => handleTrainingChange(idx, 'organization', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Duration / Period</label>
                      <input type="text" value={tr.duration || ''} onChange={(e) => handleTrainingChange(idx, 'duration', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Description / Key Learnings</label>
                      <textarea value={tr.description || ''} onChange={(e) => handleTrainingChange(idx, 'description', e.target.value)} rows={2} className="input-premium text-xs resize-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 6: TIMELINE (DYNAMIC CRUD) ── */}
        {activeTab === 'timeline' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-400" /> Engineering Journey Timeline (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddTimeline} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Timeline Item
              </button>
            </div>

            <div className="space-y-4">
              {(formData.timeline || []).map((event, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400">Milestone #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveTimeline(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Year / Period</label>
                      <input type="text" value={event.year || ''} onChange={(e) => handleTimelineChange(idx, 'year', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Title</label>
                      <input type="text" value={event.title || ''} onChange={(e) => handleTimelineChange(idx, 'title', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Subtitle / Org</label>
                      <input type="text" value={event.subtitle || ''} onChange={(e) => handleTimelineChange(idx, 'subtitle', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Description</label>
                      <input type="text" value={event.description || ''} onChange={(e) => handleTimelineChange(idx, 'description', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Badge Label</label>
                      <input type="text" value={event.badge || ''} onChange={(e) => handleTimelineChange(idx, 'badge', e.target.value)} className="input-premium text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 7: ACHIEVEMENTS (DYNAMIC CRUD) ── */}
        {activeTab === 'achievements' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" /> Honors &amp; Achievements (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddAchievement} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Achievement
              </button>
            </div>

            <div className="space-y-4">
              {(formData.achievements || []).map((ach, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-emerald-400">Achievement #{idx + 1}</span>
                    <button type="button" onClick={() => handleRemoveAchievement(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Title</label>
                      <input type="text" value={ach.title || ''} onChange={(e) => handleAchievementChange(idx, 'title', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Organization</label>
                      <input type="text" value={ach.organization || ''} onChange={(e) => handleAchievementChange(idx, 'organization', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Description</label>
                      <input type="text" value={ach.description || ''} onChange={(e) => handleAchievementChange(idx, 'description', e.target.value)} className="input-premium text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Certificate URL</label>
                      <input type="url" value={ach.certificateLink || ''} onChange={(e) => handleAchievementChange(idx, 'certificateLink', e.target.value)} className="input-premium text-xs" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── SECTION 8: CODING PROFILES (DYNAMIC CRUD) ── */}
        {activeTab === 'coding' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-400" /> Competitive Coding Profiles (Dynamic CRUD)
              </h2>
              <button type="button" onClick={handleAddCodingProfile} className="btn-primary text-xs cursor-pointer">
                <Plus className="w-4 h-4" /> Add Profile
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">LeetCode Handle</label>
                <input type="url" name="leetcodeUrl" value={formData.leetcodeUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">GeeksforGeeks Handle</label>
                <input type="url" name="gfgUrl" value={formData.gfgUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Coding Ninjas Handle</label>
                <input type="url" name="codingNinjasUrl" value={formData.codingNinjasUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">CodeChef Handle</label>
                <input type="url" name="codechefUrl" value={formData.codechefUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Codeforces Handle</label>
                <input type="url" name="codeforcesUrl" value={formData.codeforcesUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">HackerRank Handle</label>
                <input type="url" name="hackerrankUrl" value={formData.hackerrankUrl || ''} onChange={handleChange} className="input-premium text-xs" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <h3 className="text-sm font-bold text-purple-400 uppercase font-mono">Custom Platform Cards</h3>
              <div className="space-y-4">
                {(formData.codingProfiles || []).map((prof, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-400">Platform #{idx + 1}</span>
                      <button type="button" onClick={() => handleRemoveCodingProfile(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Platform</label>
                        <input type="text" value={prof.platform || ''} onChange={(e) => handleCodingProfileChange(idx, 'platform', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Username</label>
                        <input type="text" value={prof.username || ''} onChange={(e) => handleCodingProfileChange(idx, 'username', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Profile URL</label>
                        <input type="url" value={prof.profileUrl || ''} onChange={(e) => handleCodingProfileChange(idx, 'profileUrl', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Solved Count</label>
                        <input type="text" value={prof.solvedCount || ''} onChange={(e) => handleCodingProfileChange(idx, 'solvedCount', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Contest Rating / Tier</label>
                        <input type="text" value={prof.rating || ''} onChange={(e) => handleCodingProfileChange(idx, 'rating', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Description</label>
                        <input type="text" value={prof.description || ''} onChange={(e) => handleCodingProfileChange(idx, 'description', e.target.value)} className="input-premium text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── SECTION 9: PROJECT METRICS & HIGHLIGHTS ── */}
        {activeTab === 'metrics' && (
          <div className="glass-card rounded-3xl p-6 md:p-8 space-y-6 border border-white/5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-400" /> Platform Performance &amp; Engineering Metrics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Algorithms Visualized</label>
                <input type="text" name="algorithmsVisualized" value={formData.algorithmsVisualized || ''} onChange={handleChange} className="input-premium font-mono text-indigo-400" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Practice Problems</label>
                <input type="text" name="practiceProblems" value={formData.practiceProblems || ''} onChange={handleChange} className="input-premium font-mono text-emerald-400" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">API Performance</label>
                <input type="text" name="apiPerformance" value={formData.apiPerformance || ''} onChange={handleChange} className="input-premium font-mono text-amber-400" />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase font-mono">Platform Experience</label>
                <input type="text" name="experienceYears" value={formData.experienceYears || ''} onChange={handleChange} className="input-premium font-mono text-purple-400" />
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-indigo-400 uppercase font-mono">Custom Metric Cards</h3>
                <button type="button" onClick={handleAddMetric} className="btn-primary text-xs cursor-pointer">
                  <Plus className="w-4 h-4" /> Add Metric Card
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(formData.projectMetrics || []).map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-indigo-300">Card #{idx + 1}</span>
                      <button type="button" onClick={() => handleRemoveMetric(idx)} className="p-1 rounded bg-rose-500/10 hover:bg-rose-500/20 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Label</label>
                        <input type="text" value={metric.label || ''} onChange={(e) => handleMetricChange(idx, 'label', e.target.value)} className="input-premium text-xs" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Value</label>
                        <input type="text" value={metric.value || ''} onChange={(e) => handleMetricChange(idx, 'value', e.target.value)} className="input-premium text-xs font-mono" />
                      </div>
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase font-mono">Sublabel / Note</label>
                        <input type="text" value={metric.sub || ''} onChange={(e) => handleMetricChange(idx, 'sub', e.target.value)} className="input-premium text-xs" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom Save Bar */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={updateMutation.isPending}
            className="btn-primary cursor-pointer px-8 py-3 text-sm shadow-xl shadow-indigo-600/30"
          >
            <Save className="w-5 h-5" /> {updateMutation.isPending ? 'Saving Changes to MongoDB...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDeveloperManager;

