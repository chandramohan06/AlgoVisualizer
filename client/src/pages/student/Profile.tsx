import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@store/authStore';
import { School, Code, Briefcase, Award, Flame, Save, Edit2, ShieldAlert } from 'lucide-react';
import api from '@services/api';
import { API_ENDPOINTS } from '@constants/api';

export const Profile: React.FC = () => {
  const { user, setUser } = useAuthStore();
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
      <div className="flex items-center justify-center min-h-[50vh] text-gray-400">
        Loading profile details...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Profile Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-white/5 p-6 flex flex-col md:flex-row items-center gap-6">
        <div className="relative group">
          <div className="w-24 h-24 rounded-full bg-indigo-600/20 border-2 border-indigo-500 flex items-center justify-center text-white text-3xl font-bold select-none overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <span className="inline-flex self-center px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-500/30 text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
              {user.role}
            </span>
          </div>
          <p className="text-sm text-gray-400 max-w-md">{user.bio || 'No bio written yet.'}</p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-gray-500">
            {user.college && (
              <span className="flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-gray-400" />
                {user.college}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              {user.streak || 0} Day Streak
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 transition-all flex items-center gap-2 self-start md:self-center"
        >
          <Edit2 className="w-3.5 h-3.5" />
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      {/* Profile Form / View */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4" />
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
              {successMsg}
            </div>
          )}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 space-y-4">
              <h2 className="text-base font-semibold text-white">Edit Profile Details</h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Tell us about yourself..."
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">College / University</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. Stanford University"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">GitHub Profile URL</label>
                  <input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-400 uppercase">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase">LeetCode Username</label>
                <input
                  type="text"
                  name="leetcode"
                  value={formData.leetcode}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#0e0e17] border border-white/5 text-sm text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="e.g. leetcode_user"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Saving Changes...' : 'Save Profile'}
              </button>
            </form>
          ) : (
            <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-6 space-y-6">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Credentials</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Email Address</span>
                    <span className="text-sm text-gray-300 font-medium">{user.email}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="text-[10px] text-gray-500 block uppercase font-bold">Verification Status</span>
                    <span className={`text-xs font-bold ${user.isEmailVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {user.isEmailVerified ? 'Verified Email' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Social Profiles</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="flex items-center gap-2 text-xs text-gray-300">
                      <Code className="w-4 h-4 text-gray-400" />
                      GitHub
                    </span>
                    {user.github ? (
                      <a href={user.github} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500">Not linked</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.01] border border-white/5">
                    <span className="flex items-center gap-2 text-xs text-gray-300">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      LinkedIn
                    </span>
                    {user.linkedin ? (
                      <a href={user.linkedin} target="_blank" rel="noreferrer" className="text-xs text-indigo-400 hover:underline">
                        View Profile
                      </a>
                    ) : (
                      <span className="text-xs text-gray-500">Not linked</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right side stats preview */}
        <div className="space-y-6">
          <div className="rounded-2xl bg-white/[0.02] border border-white/5 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-100 flex items-center gap-2">
              <Award className="w-4 h-4 text-indigo-400" />
              Achievements Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Streak Bonus</span>
                <span className="font-bold text-orange-400">{user.streak || 0} Days</span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>LeetCode Handle</span>
                <span className="font-bold text-gray-300">{user.leetcode || 'None'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
