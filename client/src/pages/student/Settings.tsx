import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '@services/userService';
import { useUIStore } from '@store/uiStore';
import { ProfileAvatarCropModal } from '@components/profile/ProfileAvatarCropModal';
import { getInitials } from '@utils/index';
import {
  User, Shield, Palette, BookOpen, Bell, Lock, Link as LinkIcon,
  Check, Save, Download, Trash2, KeyRound, AlertTriangle, Camera
} from 'lucide-react';
import { Skeleton } from '@components/common/Skeleton';

export const StudentSettings: React.FC = () => {
  const queryClient = useQueryClient();
  const { setTheme } = useUIStore();

  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'appearance' | 'learning' | 'notifications' | 'privacy' | 'connected'>('profile');
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' }>({ text: '', type: 'success' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

  // Form states
  const [profileData, setProfileData] = useState({
    name: '',
    phone: '',
    college: '',
    batch: '2026',
    country: 'India',
    targetCompany: 'Amazon',
    bio: '',
    avatar: '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [learningData, setLearningData] = useState({
    preferredLanguage: 'Java' as any,
    preferredDifficulty: 'Medium' as any,
    dailyGoalQuestions: 3,
    studyReminder: true,
    visualizationSpeed: 1,
    autoPlayAnimation: true,
  });

  const [notificationsData, setNotificationsData] = useState({
    emailNotifications: true,
    quizReminder: true,
    dailyGoalReminder: true,
    contestReminder: true,
    leaderboardUpdates: true,
    achievementNotifications: true,
  });

  const [privacyData, setPrivacyData] = useState({
    publicProfile: true,
    showRank: true,
    showCollege: true,
    showAchievements: true,
    hideActivity: false,
  });

  const [appearanceData, setAppearanceData] = useState({
    theme: 'dark' as any,
    accentColor: 'indigo' as any,
    fontSize: 'medium' as any,
    animationSpeed: 1,
    compactMode: false,
  });

  // Fetch student settings
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ['userProfileSettings'],
    queryFn: () => userService.getProfile(),
  });

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        college: userProfile.college || 'General Institute',
        batch: userProfile.batch || '2026',
        country: userProfile.country || 'India',
        targetCompany: userProfile.targetCompany || 'Amazon',
        bio: userProfile.bio || '',
        avatar: userProfile.avatar || '',
      });
      if (userProfile.learningPreferences) setLearningData(userProfile.learningPreferences as any);
      if (userProfile.notificationSettings) setNotificationsData(userProfile.notificationSettings as any);
      if (userProfile.privacySettings) setPrivacyData(userProfile.privacySettings as any);
      if (userProfile.appearanceSettings) setAppearanceData(userProfile.appearanceSettings as any);
    }
  }, [userProfile]);

  const updateSettingsMutation = useMutation({
    mutationFn: (payload: any) => userService.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userProfileSettings'] });
      setMsg({ text: 'Settings saved successfully!', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
    },
    onError: (err: any) => {
      setMsg({ text: err.response?.data?.message || 'Failed to save settings', type: 'error' });
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: () => userService.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword }),
    onSuccess: (res) => {
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setMsg({ text: res.message, type: 'success' });
      setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
    },
    onError: (err: any) => {
      setMsg({ text: err.response?.data?.message || 'Password change failed', type: 'error' });
    },
  });

  const handleDownloadData = async () => {
    try {
      const blob = await userService.exportUserData();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'my_algovisualizer_data.json');
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      setMsg({ text: 'Data download initiated successfully!', type: 'success' });
      setTimeout(() => setMsg({ text: '', type: 'success' }), 3000);
    } catch {
      setMsg({ text: 'Failed to download data.', type: 'error' });
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteAccount(deletePassword);
      window.location.href = '/login';
    } catch (err: any) {
      setMsg({ text: err.response?.data?.message || 'Account deletion failed.', type: 'error' });
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 font-sans">
        <Skeleton className="h-16 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  const tabs = [
    { id: 'profile',       label: 'Profile',              icon: User },
    { id: 'security',      label: 'Security & 2FA',       icon: Shield },
    { id: 'appearance',    label: 'Appearance',           icon: Palette },
    { id: 'learning',      label: 'Learning Preferences', icon: BookOpen },
    { id: 'notifications', label: 'Notifications',        icon: Bell },
    { id: 'privacy',       label: 'Privacy & Data',       icon: Lock },
    { id: 'connected',     label: 'Connected Accounts',   icon: LinkIcon },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6 font-sans text-slate-200">
      
      {/* Header Banner */}
      <div className="bg-[#11161d] border border-white/10 p-6 rounded-2xl shadow-xl flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Account &amp; Workspace Settings</h1>
          <p className="text-xs text-slate-400 mt-1 font-mono">
            Manage your personal profile, security preferences, appearance, learning goals, and privacy.
          </p>
        </div>
      </div>

      {msg.text && (
        <div className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-2 ${
          msg.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
        }`}>
          <Check className="w-4 h-4" /> {msg.text}
        </div>
      )}

      {/* Main Settings Grid: Left Sidebar + Right Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-4 bg-[#11161d] border border-white/10 rounded-2xl p-3 space-y-1 shadow-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Form Container */}
        <div className="lg:col-span-8 bg-[#11161d] border border-white/10 rounded-2xl p-6 shadow-xl space-y-6">

          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4.5 h-4.5 text-indigo-400" /> Personal Profile Settings
                </h2>
                <p className="text-xs text-slate-400 font-mono">Public profile details displayed across the platform and leaderboard.</p>
              </div>

              {/* Avatar Photo Preview & Crop Upload Trigger */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-black/30 border border-white/5">
                <div
                  onClick={() => setIsAvatarModalOpen(true)}
                  className="relative group cursor-pointer"
                  title="Click to edit profile picture"
                >
                  {profileData.avatar ? (
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="w-20 h-20 rounded-full border-2 border-indigo-500/80 object-cover shadow-lg group-hover:opacity-80 transition-opacity"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-2 border-indigo-500/80 bg-indigo-600/30 text-indigo-200 text-2xl font-black flex items-center justify-center shadow-lg group-hover:opacity-80 transition-opacity">
                      {getInitials(profileData.name || 'User')}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>

                <div className="space-y-1.5 font-mono flex-1">
                  <span className="text-xs font-bold text-white block">Profile Picture</span>
                  <p className="text-[11px] text-slate-400">
                    Supports JPG, PNG, WEBP files up to 5 MB. Features circular crop, zoom, and rotation controls.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsAvatarModalOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{profileData.avatar ? 'Change Photo' : 'Upload Photo'}</span>
                    </button>
                    {profileData.avatar && (
                      <button
                        type="button"
                        onClick={() => setIsAvatarModalOpen(true)}
                        className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 border border-white/10 text-slate-400 hover:text-rose-300 text-xs font-bold transition-all cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Profile Avatar Crop & Upload Modal */}
              <ProfileAvatarCropModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                currentAvatar={profileData.avatar}
                userName={profileData.name}
                onAvatarUpdated={(newAvatar) => {
                  setProfileData((prev) => ({ ...prev, avatar: newAvatar || '' }));
                  queryClient.invalidateQueries({ queryKey: ['userProfileSettings'] });
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Full Name:</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Email Address (Read Only):</label>
                  <input
                    type="email"
                    disabled
                    value={userProfile?.email || ''}
                    className="w-full h-9 px-3 bg-black/20 border border-white/5 rounded-xl text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Phone Number:</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    placeholder="+91 9876543210"
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">College / Institute:</label>
                  <input
                    type="text"
                    value={profileData.college}
                    onChange={(e) => setProfileData({ ...profileData, college: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Graduation Batch:</label>
                  <select
                    value={profileData.batch}
                    onChange={(e) => setProfileData({ ...profileData, batch: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="2025">Batch 2025</option>
                    <option value="2026">Batch 2026</option>
                    <option value="2027">Batch 2027</option>
                    <option value="2028">Batch 2028</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Target Company:</label>
                  <select
                    value={profileData.targetCompany}
                    onChange={(e) => setProfileData({ ...profileData, targetCompany: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Google">Google</option>
                    <option value="Microsoft">Microsoft</option>
                    <option value="Meta">Meta</option>
                    <option value="TCS">TCS</option>
                    <option value="Accenture">Accenture</option>
                  </select>
                </div>
              </div>

              <div className="font-mono text-xs">
                <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Bio / Headline:</label>
                <textarea
                  rows={3}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="CS Student passionate about algorithms, trees, and system architecture..."
                  className="w-full p-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <button
                onClick={() => updateSettingsMutation.mutate(profileData)}
                disabled={updateSettingsMutation.isPending}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
            </div>
          )}

          {/* TAB 2: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Shield className="w-4.5 h-4.5 text-indigo-400" /> Security &amp; Password Management
                </h2>
                <p className="text-xs text-slate-400 font-mono">Update your password, manage active sessions, and review 2FA status.</p>
              </div>

              <div className="space-y-4 max-w-md font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Current Password:</label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">New Password (min 8 chars):</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Confirm New Password:</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <button
                  onClick={() => {
                    if (passwordData.newPassword !== passwordData.confirmPassword) {
                      setMsg({ text: 'Passwords do not match', type: 'error' });
                      return;
                    }
                    changePasswordMutation.mutate();
                  }}
                  disabled={changePasswordMutation.isPending}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
                >
                  <KeyRound className="w-4 h-4" /> Update Password
                </button>
              </div>

              {/* 2FA & Active Sessions Card */}
              <div className="pt-4 border-t border-white/5 space-y-3 font-mono text-xs">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-white block">Two-Factor Authentication (2FA)</span>
                    <span className="text-[10px] text-slate-400">Add an extra layer of security to your account using TOTP apps.</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[10px] font-bold uppercase">
                    Future Ready
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: APPEARANCE */}
          {activeTab === 'appearance' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Palette className="w-4.5 h-4.5 text-indigo-400" /> Theme &amp; Visual Appearance
                </h2>
                <p className="text-xs text-slate-400 font-mono">Customize the workspace color scheme, typography size, and animation speed.</p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Theme Mode:</label>
                  <div className="flex gap-3">
                    {(['dark', 'light', 'system'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          setAppearanceData({ ...appearanceData, theme: t });
                          setTheme(t as any);
                        }}
                        className={`px-4 py-2 rounded-xl border font-bold uppercase transition-all cursor-pointer ${
                          appearanceData.theme === t
                            ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                            : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-2">Accent Color:</label>
                  <div className="flex gap-3">
                    {(['indigo', 'emerald', 'amber', 'cyan', 'rose'] as const).map((color) => (
                      <button
                        key={color}
                        onClick={() => setAppearanceData({ ...appearanceData, accentColor: color })}
                        className={`px-3 py-1.5 rounded-lg border font-bold uppercase text-[10px] transition-all cursor-pointer ${
                          appearanceData.accentColor === color
                            ? 'bg-white/10 text-white border-white'
                            : 'bg-black/40 text-slate-400 border-white/10'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => updateSettingsMutation.mutate({ appearanceSettings: appearanceData })}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
                  >
                    <Save className="w-4 h-4" /> Save Appearance Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: LEARNING PREFERENCES */}
          {activeTab === 'learning' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-4.5 h-4.5 text-indigo-400" /> Learning Preferences
                </h2>
                <p className="text-xs text-slate-400 font-mono">Configure default code languages, difficulty targets, and animation speed.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Preferred Code Language:</label>
                  <select
                    value={learningData.preferredLanguage}
                    onChange={(e) => setLearningData({ ...learningData, preferredLanguage: e.target.value as any })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                    <option value="Python">Python</option>
                    <option value="Pseudo">Pseudocode</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Preferred Target Difficulty:</label>
                  <select
                    value={learningData.preferredDifficulty}
                    onChange={(e) => setLearningData({ ...learningData, preferredDifficulty: e.target.value as any })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Daily Questions Goal:</label>
                  <select
                    value={learningData.dailyGoalQuestions}
                    onChange={(e) => setLearningData({ ...learningData, dailyGoalQuestions: Number(e.target.value) })}
                    className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value={1}>1 Question / Day</option>
                    <option value={3}>3 Questions / Day</option>
                    <option value={5}>5 Questions / Day</option>
                    <option value={10}>10 Questions / Day</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Visualization Animation Speed:</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.25"
                    value={learningData.visualizationSpeed}
                    onChange={(e) => setLearningData({ ...learningData, visualizationSpeed: Number(e.target.value) })}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                  <span className="text-[10px] text-indigo-300 font-bold">{learningData.visualizationSpeed}x Speed</span>
                </div>
              </div>

              <button
                onClick={() => updateSettingsMutation.mutate({ learningPreferences: learningData })}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs font-mono uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
              >
                <Save className="w-4 h-4" /> Save Learning Preferences
              </button>
            </div>
          )}

          {/* TAB 5: NOTIFICATIONS */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2 font-sans">
                  <Bell className="w-4.5 h-4.5 text-indigo-400" /> Email &amp; App Notifications
                </h2>
                <p className="text-xs text-slate-400">Manage reminder alerts, leaderboard updates, and achievement notifications.</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'emailNotifications',       label: 'General Email Notifications', desc: 'Receive important platform announcements and updates.' },
                  { key: 'quizReminder',             label: 'Quiz Study Reminders',       desc: 'Get notified when new quizzes matching your weak topics are ready.' },
                  { key: 'dailyGoalReminder',        label: 'Daily Practice Goal Alert', desc: 'Alerts if you haven’t met your daily practice target.' },
                  { key: 'contestReminder',          label: 'Contest & Challenge Alerts',desc: 'Reminders for upcoming coding challenges.' },
                  { key: 'leaderboardUpdates',       label: 'Leaderboard Rank Updates',   desc: 'Get notified when your rank changes on the global board.' },
                  { key: 'achievementNotifications', label: 'Achievement Unlocks',       desc: 'Instant alert when earning new badges and XP.' },
                ].map((item) => (
                  <div key={item.key} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={(notificationsData as any)[item.key]}
                      onChange={(e) => setNotificationsData({ ...notificationsData, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => updateSettingsMutation.mutate({ notificationSettings: notificationsData })}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-lg"
              >
                <Save className="w-4 h-4" /> Save Notification Settings
              </button>
            </div>
          )}

          {/* TAB 6: PRIVACY & DATA */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2 font-sans">
                  <Lock className="w-4.5 h-4.5 text-indigo-400" /> Privacy &amp; Data Controls
                </h2>
                <p className="text-xs text-slate-400">Control public visibility, download your data archive, or request account deletion.</p>
              </div>

              <div className="space-y-3">
                {[
                  { key: 'publicProfile',    label: 'Public Profile Visibility', desc: 'Allow other students to view your public learning profile.' },
                  { key: 'showRank',         label: 'Display Global Rank',        desc: 'Show your rank position on profile and leaderboard.' },
                  { key: 'showCollege',      label: 'Display College & Batch',    desc: 'Display your college name on ranking rows.' },
                  { key: 'showAchievements', label: 'Display Achievements',     desc: 'Show earned badges on your public card.' },
                ].map((item) => (
                  <div key={item.key} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">{item.label}</span>
                      <span className="text-[10px] text-slate-400">{item.desc}</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={(privacyData as any)[item.key]}
                      onChange={(e) => setPrivacyData({ ...privacyData, [item.key]: e.target.checked })}
                      className="w-4 h-4 accent-indigo-500 cursor-pointer rounded"
                    />
                  </div>
                ))}
              </div>

              {/* Download My Data Section */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3">
                <div>
                  <span className="font-bold text-white block">Download Your Personal Data Archive</span>
                  <span className="text-[10px] text-slate-400">Export a complete JSON backup of your profile, quiz attempts, notes, and progress.</span>
                </div>
                <button
                  onClick={handleDownloadData}
                  className="px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" /> Download Data Archive (.JSON)
                </button>
              </div>

              {/* Danger Zone: Delete Account */}
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-3">
                <div>
                  <span className="font-bold text-rose-300 block">Danger Zone: Delete Account</span>
                  <span className="text-[10px] text-slate-400">Permanently remove your account, quiz history, XP, and learning progress.</span>
                </div>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" /> Delete My Account
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: CONNECTED ACCOUNTS */}
          {activeTab === 'connected' && (
            <div className="space-y-6 font-mono text-xs">
              <div className="border-b border-white/5 pb-3">
                <h2 className="text-base font-bold text-white flex items-center gap-2 font-sans">
                  <LinkIcon className="w-4.5 h-4.5 text-indigo-400" /> Connected Third-Party Accounts
                </h2>
                <p className="text-xs text-slate-400">Link your developer profiles for portfolio verification and single sign-on.</p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-white">GH</div>
                    <div>
                      <span className="font-bold text-white block">GitHub Profile</span>
                      <span className="text-[10px] text-slate-400">{profileData.name ? `@${profileData.name.toLowerCase().replace(/\s+/g, '')}` : 'Not linked'}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold uppercase">
                    Connected
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">in</div>
                    <div>
                      <span className="font-bold text-white block">LinkedIn Profile</span>
                      <span className="text-[10px] text-slate-400">Connect to display badges on LinkedIn.</span>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-bold uppercase cursor-pointer">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Delete Account Password Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#11161d] border border-rose-500/40 rounded-2xl p-6 w-full max-w-md space-y-4 font-mono text-xs">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
              <AlertTriangle className="w-5 h-5" /> Confirm Account Deletion
            </div>
            <p className="text-slate-300 leading-relaxed">
              This action is permanent and cannot be undone. Please enter your password to confirm deletion.
            </p>
            <input
              type="password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              placeholder="Enter password to confirm"
              className="w-full h-9 px-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentSettings;
