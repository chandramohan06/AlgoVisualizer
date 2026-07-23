import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Sparkles, Globe, Mail, FileDown, Briefcase,
  GraduationCap, MapPin, Calendar, ShieldCheck, Cpu,
  Star, BookOpen, Copy, Check, Edit3, ExternalLink, Zap
} from 'lucide-react';
import { useAuthStore } from '@store/authStore';
import developerProfileService, { IDeveloperProfileData } from '@services/developerProfileService';
import { Skeleton } from '@components/common/Skeleton';

export const AboutDeveloper: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const isAdmin = user?.role === 'admin';
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Fetch dynamic founder profile from MongoDB backend
  const { data: profile, isLoading, error } = useQuery<IDeveloperProfileData>({
    queryKey: ['developer-profile'],
    queryFn: developerProfileService.getProfile,
    staleTime: 5 * 60 * 1000,
  });

  const handleCopyEmail = () => {
    if (profile?.email) {
      navigator.clipboard.writeText(profile.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        <Skeleton className="h-64 rounded-3xl" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-48 rounded-3xl" count={3} />
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 text-center text-slate-400 font-mono">
        Failed to load developer profile from backend.
      </div>
    );
  }

  const {
    fullName, headline, designation, location, country, email,
    linkedinUrl, githubUrl, website, resumeUrl, availabilityStatus,
    aboutMe, biography, mission, vision, education, skills,
    projectMetrics, timeline, codingProfiles
  } = profile;

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10 font-sans text-slate-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Admin Management Banner (Admin Role Only) ── */}
      {isAdmin && (
        <div className="bg-gradient-to-r from-amber-500/15 via-indigo-500/15 to-purple-500/15 border border-amber-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3 text-xs font-mono text-amber-300">
            <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
            <span>Administrator Access Active: You have permission to edit all Founder Profile fields in MongoDB.</span>
          </div>
          <button
            onClick={() => navigate('/admin/developer-manager')}
            className="btn-primary text-xs shrink-0 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" /> Manage Founder Profile
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 1: HERO FOUNDER CARD
          ══════════════════════════════════════════ */}
      <div className="glass-premium rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 relative z-10">
          
          {/* Avatar + Status (Read Only for Users) */}
          <div className="flex flex-col items-center shrink-0 space-y-3">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-75 blur-sm" />
              
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-950 flex items-center justify-center shadow-2xl">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 flex items-center justify-center text-3xl font-black text-white tracking-widest">
                    {fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
            </div>

            {/* Availability Status */}
            {availabilityStatus && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {availabilityStatus}
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5" /> {designation || 'Founder & Lead Architect'}
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {fullName}
              </h1>
              <p className="text-lg md:text-xl font-semibold gradient-text">
                {headline}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
              {education && education[0] && (
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> {education[0].degree} {education[0].branch}
                </span>
              )}
              {education && education[0] && (
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-purple-400" /> {education[0].institute}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" /> {location}, {country}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {aboutMe}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs">
                  <Globe className="w-4 h-4" /> GitHub <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-blue-400 border-blue-500/20">
                  <Globe className="w-4 h-4 text-blue-400" /> LinkedIn <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="btn-ghost text-xs">
                  <Mail className="w-4 h-4 text-indigo-400" /> Email Me
                </a>
              )}
              {resumeUrl && (
                <button
                  onClick={() => window.open(resumeUrl, '_blank')}
                  className="btn-primary text-xs cursor-pointer"
                >
                  <FileDown className="w-4 h-4" /> View Resume
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2: ABOUT ME & VISION
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4" /> Biography &amp; Purpose
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Why I Built AlgoVisualizer
          </h2>
          <div className="text-xs md:text-sm text-slate-300 space-y-3 leading-relaxed font-normal">
            <p>{biography}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            {mission && (
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono block">🎯 Mission</span>
                <p className="text-xs text-slate-300">{mission}</p>
              </div>
            )}
            {vision && (
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase font-mono block">🚀 Vision</span>
                <p className="text-xs text-slate-300">{vision}</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Contact & Location Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
              <Zap className="w-4 h-4" /> Direct Contact
            </div>
            <h3 className="text-lg font-bold text-white">Get in Touch</h3>
            
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-200 font-semibold">{location}, {country}</span>
              </div>
              {education && education[0] && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-500">Degree:</span>
                  <span className="text-slate-200 font-semibold">{education[0].degree} {education[0].branch}</span>
                </div>
              )}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold">{availabilityStatus}</span>
              </div>
            </div>
          </div>

          {email && (
            <button
              onClick={handleCopyEmail}
              className="w-full btn-ghost justify-center text-xs py-3 cursor-pointer"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3: TECH STACK MATRIX
          ══════════════════════════════════════════ */}
      {skills && skills.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-purple mb-2">
                <Cpu className="w-3.5 h-3.5" /> Technical Competencies
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Tech Stack &amp; Proficiency Matrix
              </h2>
            </div>
            <span className="hidden sm:block text-xs text-slate-500 font-mono">Dynamic MongoDB Data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from(new Set(skills.map((s) => s.category))).map((catName) => {
              const categorySkills = skills.filter((s) => s.category === catName);
              return (
                <div key={catName} className="glass-card rounded-3xl p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Code2 className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">{catName}</h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="font-mono text-[10px] text-slate-400">{skill.level}%</span>
                        </div>
                        <div className="progress-track">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 4: PROJECT METRICS
          ══════════════════════════════════════════ */}
      {projectMetrics && projectMetrics.length > 0 && (
        <div className="glass-premium rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald mb-2">
                <ShieldCheck className="w-3.5 h-3.5" /> Flagship Engineering Achievement
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                AlgoVisualizer SaaS Metrics
              </h2>
            </div>

            {website && (
              <a href={website} target="_blank" rel="noreferrer" className="btn-primary text-xs shrink-0 cursor-pointer">
                <Globe className="w-4 h-4" /> Live Platform <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {projectMetrics.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-5 space-y-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                  {s.label}
                </div>
                <div className={`text-2xl md:text-3xl font-black font-mono ${s.color || 'text-indigo-400'}`}>
                  {s.value}
                </div>
                <div className="text-[11px] text-slate-500">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 5: DEVELOPER JOURNEY TIMELINE
          ══════════════════════════════════════════ */}
      {timeline && timeline.length > 0 && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber">
            <Calendar className="w-3.5 h-3.5" /> Growth Path
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Engineering Journey Timeline
          </h2>

          <div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-8 ml-2">
            {timeline.map((event, idx) => (
              <motion.div
                key={event.year + idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="relative group"
              >
                <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>

                <div className="glass-card rounded-2xl p-5 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                        {event.year}
                      </span>
                      <h3 className="text-base font-bold text-white">{event.title}</h3>
                    </div>
                    {event.badge && <span className="badge badge-slate text-[10px] uppercase">{event.badge}</span>}
                  </div>

                  {event.subtitle && (
                    <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" /> {event.subtitle}
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 6: CODING PROFILES & ACHIEVEMENTS
          ══════════════════════════════════════════ */}
      {codingProfiles && codingProfiles.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Coding Profiles &amp; Accomplishments
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {codingProfiles.map((profile) => (
              <a
                key={profile.platform}
                href={profile.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="glass-card rounded-2xl p-5 flex flex-col justify-between border border-white/5 hover:border-indigo-500/30 hover:translate-y-[-2px] transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Star className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{profile.platform}</h3>
                  <div className="text-base font-black font-mono text-indigo-300 mt-1">{profile.solvedCount}</div>
                  <p className="text-xs text-slate-400 mt-1">{profile.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 7 & 8: FOOTER CONTACT CARD
          ══════════════════════════════════════════ */}
      <div className="glass-premium rounded-3xl p-6 md:p-10 text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-500/20">
          <Mail className="w-6 h-6" />
        </div>

        <div className="max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black text-white tracking-tight">Let's Build Something Exceptional</h2>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            Interested in hiring me for a Full Stack Software Engineer role, collaborating on developer tools, or discussing system architecture? Let's connect!
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {email && (
            <a href={`mailto:${email}`} className="btn-primary cursor-pointer text-xs">
              <Mail className="w-4 h-4" /> Send Email Inquiry
            </a>
          )}
          {linkedinUrl && (
            <a href={linkedinUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-blue-400 border-blue-500/20">
              <Globe className="w-4 h-4 text-blue-400" /> Connect on LinkedIn
            </a>
          )}
        </div>

        <p className="text-[11px] text-slate-500 font-mono pt-4 border-t border-white/5">
          &copy; {new Date().getFullYear()} {fullName} &bull; AlgoVisualizer SaaS Platform
        </p>
      </div>
    </motion.div>
  );
};

export default AboutDeveloper;
