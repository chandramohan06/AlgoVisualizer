import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Code2, Sparkles, Globe, Mail, FileDown, Briefcase,
  GraduationCap, MapPin, ShieldCheck, Cpu,
  Star, BookOpen, Copy, Check, Edit3, ExternalLink, Zap,
  Phone, MessageSquare, Award, Layers, Terminal, Server,
  Database, Palette, Box, Activity, Trophy
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
    queryFn: developerProfileService.getPublicProfile,
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
        Failed to load founder profile from database.
      </div>
    );
  }

  const {
    fullName, headline, designation, currentRole, location, country, email, phone, whatsapp,
    linkedinUrl, githubUrl, website, portfolio, resumeUrl, availabilityStatus, personalQuote,
    aboutMe, biography, mission, vision, aboutProject, whyIBuiltAlgoVisualizer, careerGoal,
    education, skills, projects, certifications, trainings, projectMetrics, timeline, achievements, codingProfiles,
    twitterUrl, instagramUrl, youtubeUrl, mediumUrl, devtoUrl, hashnodeUrl,
    leetcodeUrl, gfgUrl, codingNinjasUrl, codechefUrl, codeforcesUrl, hackerrankUrl,
    algorithmsVisualized, practiceProblems, projectsCount, usersCount, experienceYears,
    githubStars, downloadsCount, apiPerformance
  } = profile;

  // Icon selector helper
  const getCategoryIcon = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'frontend': return Palette;
      case 'backend': return Server;
      case 'database': return Database;
      case 'devops': return Box;
      case 'programming': return Terminal;
      default: return Code2;
    }
  };

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
            <span>Administrator Privileges Active: Access Founder CMS to edit MongoDB records.</span>
          </div>
          <button
            onClick={() => navigate('/admin/developer-manager')}
            className="btn-primary text-xs shrink-0 cursor-pointer"
          >
            <Edit3 className="w-4 h-4" /> Founder Profile Manager
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
          
          {/* Founder Avatar & Availability */}
          <div className="flex flex-col items-center shrink-0 space-y-3">
            <div className="relative group">
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-75 blur-sm" />
              
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-950 flex items-center justify-center shadow-2xl">
                {profile.avatarUrl ? (
                  <img src={profile.avatarUrl} alt={fullName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 flex items-center justify-center text-3xl font-black text-white tracking-widest">
                    {fullName ? fullName.split(' ').map((n) => n[0]).join('').slice(0, 2) : 'FOUNDER'}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs mb-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" /> {currentRole || designation || 'Founder & Lead Architect'}
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
                  <GraduationCap className="w-4 h-4 text-indigo-400" /> {education[0].degree} ({education[0].branch})
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

            {personalQuote && (
              <blockquote className="text-xs text-indigo-300 italic border-l-2 border-indigo-500/40 pl-3 py-1 bg-indigo-500/5 rounded-r-lg font-serif">
                "{personalQuote}"
              </blockquote>
            )}

            {/* Action & Social Links */}
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
              {portfolio && (
                <a href={portfolio} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-emerald-400 border-emerald-500/20">
                  <Globe className="w-4 h-4 text-emerald-400" /> Portfolio <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="btn-ghost text-xs">
                  <Mail className="w-4 h-4 text-indigo-400" /> Email
                </a>
              )}
              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="Founder_Resume.pdf"
                  className="btn-primary text-xs cursor-pointer"
                >
                  <FileDown className="w-4 h-4" /> Download Resume
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2: ABOUT, MISSION, VISION & PROJECT
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4" /> Founder Story &amp; Platform Architecture
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Why I Engineered AlgoVisualizer
          </h2>
          
          <div className="text-xs md:text-sm text-slate-300 space-y-3 leading-relaxed font-normal">
            <p>{biography}</p>
            {whyIBuiltAlgoVisualizer && <p className="text-slate-200">{whyIBuiltAlgoVisualizer}</p>}
            {aboutProject && (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs">
                <strong className="block text-indigo-400 font-mono mb-1">About Project Architecture:</strong>
                {aboutProject}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            {mission && (
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs font-bold text-indigo-400 uppercase font-mono block">🎯 Mission Statement</span>
                <p className="text-xs text-slate-300">{mission}</p>
              </div>
            )}
            {vision && (
              <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
                <span className="text-xs font-bold text-purple-400 uppercase font-mono block">🚀 Platform Vision</span>
                <p className="text-xs text-slate-300">{vision}</p>
              </div>
            )}
          </div>

          {careerGoal && (
            <div className="bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20 text-xs text-emerald-300 font-mono">
              <span className="font-bold uppercase block mb-1">🏁 Career Horizon</span>
              {careerGoal}
            </div>
          )}
        </div>

        {/* Contact Info Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
              <Zap className="w-4 h-4" /> Founder Contact Card
            </div>
            <h3 className="text-lg font-bold text-white">Direct Channels</h3>
            
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-200 font-semibold">{location}, {country}</span>
              </div>
              {phone && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-500 flex items-center gap-1"><Phone className="w-3 h-3 text-emerald-400" /> Phone:</span>
                  <span className="text-slate-200 font-semibold">{phone}</span>
                </div>
              )}
              {whatsapp && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-500 flex items-center gap-1"><MessageSquare className="w-3 h-3 text-emerald-400" /> WhatsApp:</span>
                  <span className="text-emerald-400 font-semibold">{whatsapp}</span>
                </div>
              )}
              {education && education[0] && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                  <span className="text-slate-500">Degree:</span>
                  <span className="text-slate-200 font-semibold">{education[0].degree} {education[0].branch}</span>
                </div>
              )}
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Availability:</span>
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
          SECTION 3: EDUCATION & ACADEMICS
          ══════════════════════════════════════════ */}
      {education && education.length > 0 && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo font-mono text-xs">
            <GraduationCap className="w-3.5 h-3.5" /> Academic Qualifications
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Education &amp; Background
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-6 space-y-3 relative overflow-hidden border border-white/5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                      {edu.startYear} - {edu.endYear || 'Present'}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2">{edu.degree} in {edu.branch}</h3>
                    <p className="text-xs text-slate-300 font-semibold">{edu.institute}</p>
                    {edu.university && edu.university !== edu.institute && (
                      <p className="text-[11px] text-slate-400">{edu.university}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-3 border-t border-white/5 text-slate-300">
                  {edu.cgpa && (
                    <span className="flex items-center gap-1 text-emerald-400 font-bold">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                  {edu.currentSemester && (
                    <span className="text-slate-400">
                      Status: {edu.currentSemester}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 4: TECH STACK MATRIX
          ══════════════════════════════════════════ */}
      {skills && skills.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-purple mb-2 font-mono text-xs">
                <Cpu className="w-3.5 h-3.5" /> Technical Skills &amp; Stack
              </div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">
                Tech Stack Proficiency Matrix
              </h2>
            </div>
            <span className="hidden sm:block text-xs text-slate-500 font-mono">Dynamic Database Records</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from(new Set(skills.map((s) => s.category))).map((catName) => {
              const categorySkills = skills.filter((s) => s.category === catName);
              const CatIcon = getCategoryIcon(catName);
              return (
                <div key={catName} className="glass-card rounded-3xl p-6 space-y-5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                      <CatIcon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">{catName}</h3>
                  </div>

                  <div className="space-y-4">
                    {categorySkills.map((skill) => (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                            {skill.name}
                            {skill.tag && <span className="badge badge-indigo text-[9px] py-0 px-1.5">{skill.tag}</span>}
                          </span>
                          <span className="font-mono text-[10px] text-indigo-300 font-bold">{skill.level}%</span>
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
          FEATURED PROJECTS SHOWCASE
          ══════════════════════════════════════════ */}
      {projects && projects.length > 0 && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo font-mono text-xs">
            <Briefcase className="w-3.5 h-3.5" /> Featured Engineering Projects
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Portfolio &amp; Architecture Showcase
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="glass-card rounded-3xl p-6 space-y-4 border border-white/5 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-md border border-indigo-500/20">
                      {proj.startDate} {proj.endDate ? `- ${proj.endDate}` : ''}
                    </span>
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-white">{proj.title}</h3>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-white/5">
                  {proj.techStack && (
                    <div className="flex flex-wrap gap-1.5">
                      {proj.techStack.split(',').map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono text-slate-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noreferrer" className="btn-ghost text-[11px] py-1.5 px-3">
                        <Globe className="w-3.5 h-3.5" /> Source Code
                      </a>
                    )}
                    {proj.liveDemo && (
                      <a href={proj.liveDemo} target="_blank" rel="noreferrer" className="btn-primary text-[11px] py-1.5 px-3">
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          CERTIFICATIONS & PROFESSIONAL TRAINING
          ══════════════════════════════════════════ */}
      {((certifications && certifications.length > 0) || (trainings && trainings.length > 0)) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications && certifications.length > 0 && (
            <div className="glass-card rounded-3xl p-6 space-y-4 border border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald font-mono text-xs">
                <Award className="w-3.5 h-3.5" /> Certifications
              </div>
              <h3 className="text-xl font-bold text-white">Verified Credentials</h3>

              <div className="space-y-3">
                {certifications.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{cert.title}</h4>
                      {cert.date && <span className="text-[10px] font-mono text-slate-400">{cert.date}</span>}
                    </div>
                    {cert.organization && <p className="text-xs text-indigo-400 font-mono">{cert.organization}</p>}
                    {cert.certificateLink && (
                      <a href={cert.certificateLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:underline pt-1">
                        View Certificate <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {trainings && trainings.length > 0 && (
            <div className="glass-card rounded-3xl p-6 space-y-4 border border-white/5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-purple font-mono text-xs">
                <Sparkles className="w-3.5 h-3.5" /> Specialized Training
              </div>
              <h3 className="text-xl font-bold text-white">Professional Training</h3>

              <div className="space-y-3">
                {trainings.map((tr, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-black/30 border border-white/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-white">{tr.title}</h4>
                      {tr.duration && <span className="text-[10px] font-mono text-purple-400 font-bold">{tr.duration}</span>}
                    </div>
                    {tr.organization && <p className="text-xs text-indigo-300 font-mono">{tr.organization}</p>}
                    {tr.description && <p className="text-xs text-slate-300 pt-1">{tr.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 5: PROJECT METRICS & LIVE STATS
          ══════════════════════════════════════════ */}
      <div className="glass-premium rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald mb-2 font-mono text-xs">
              <Activity className="w-3.5 h-3.5" /> Flagship Platform Performance
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

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-4">
          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Algorithms Visualized
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-indigo-400">
              {algorithmsVisualized || '85+'}
            </div>
            <div className="text-[11px] text-slate-500">Interactive step-by-step</div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Practice Problems
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-emerald-400">
              {practiceProblems || '250+'}
            </div>
            <div className="text-[11px] text-slate-500">LeetCode-style problems</div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              API Response Time
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-amber-400">
              {apiPerformance || '< 50ms'}
            </div>
            <div className="text-[11px] text-slate-500">Async Node.js Backend</div>
          </div>

          <div className="glass-card rounded-2xl p-5 space-y-2">
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
              Platform Experience
            </div>
            <div className="text-2xl md:text-3xl font-black font-mono text-purple-400">
              {experienceYears || '3+ Years'}
            </div>
            <div className="text-[11px] text-slate-500">Full-Stack SaaS Architecture</div>
          </div>
        </div>

        {/* Additional Stats Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {projectsCount && (
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Completed Projects</div>
              <div className="text-xl font-bold font-mono text-indigo-400">{projectsCount}</div>
            </div>
          )}
          {usersCount && (
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Active Platform Users</div>
              <div className="text-xl font-bold font-mono text-emerald-400">{usersCount}</div>
            </div>
          )}
          {githubStars && (
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">GitHub Stars</div>
              <div className="text-xl font-bold font-mono text-amber-400">{githubStars}</div>
            </div>
          )}
          {downloadsCount && (
            <div className="glass-card rounded-2xl p-4 space-y-1">
              <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">Resource Downloads</div>
              <div className="text-xl font-bold font-mono text-rose-400">{downloadsCount}</div>
            </div>
          )}
        </div>

        {projectMetrics && projectMetrics.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {projectMetrics.map((s) => (
              <div key={s.label} className="glass-card rounded-2xl p-4 space-y-1">
                <div className="text-[10px] font-semibold text-slate-400 uppercase font-mono">{s.label}</div>
                <div className={`text-xl font-bold font-mono ${s.color || 'text-indigo-400'}`}>{s.value}</div>
                {s.sub && <div className="text-[10px] text-slate-500">{s.sub}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ══════════════════════════════════════════
          SECTION 6: DEVELOPER JOURNEY TIMELINE
          ══════════════════════════════════════════ */}
      {timeline && timeline.length > 0 && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber font-mono text-xs">
            <Layers className="w-3.5 h-3.5" /> Experience &amp; Milestones
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
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="relative group"
              >
                <div className="absolute -left-[31px] top-1 w-5 h-5 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>

                <div className="glass-card rounded-2xl p-5 space-y-2 border border-white/5">
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
          SECTION 7: ACHIEVEMENTS & CERTIFICATIONS
          ══════════════════════════════════════════ */}
      {achievements && achievements.length > 0 && (
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-emerald font-mono text-xs">
            <Trophy className="w-3.5 h-3.5" /> Honor &amp; Recognition
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Key Achievements &amp; Certificates
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((ach, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-6 space-y-3 border border-white/5 relative">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{ach.title}</h3>
                    {ach.organization && (
                      <p className="text-xs text-indigo-400 font-mono font-semibold">{ach.organization} {ach.date ? `(${ach.date})` : ''}</p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <p className="text-xs text-slate-300">{ach.description}</p>

                {ach.certificateLink && (
                  <a href={ach.certificateLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-mono pt-2">
                    View Credential <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 8: CODING PROFILES
          ══════════════════════════════════════════ */}
      {(codingProfiles?.length > 0 || leetcodeUrl || gfgUrl || codingNinjasUrl || codechefUrl || codeforcesUrl || hackerrankUrl) && (
        <div className="space-y-6">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Coding Profiles &amp; Competitive Platforms
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {codingProfiles && codingProfiles.map((prof) => (
              <a
                key={prof.platform}
                href={prof.profileUrl}
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
                  <h3 className="text-sm font-bold text-white">{prof.platform}</h3>
                  <div className="text-base font-black font-mono text-indigo-300 mt-1">{prof.solvedCount}</div>
                  {prof.rating && <div className="text-xs font-mono text-emerald-400 mt-0.5">{prof.rating}</div>}
                  {prof.description && <p className="text-xs text-slate-400 mt-1">{prof.description}</p>}
                </div>
              </a>
            ))}

            {/* Direct Platform Quick Badges */}
            {leetcodeUrl && !codingProfiles?.some(p => p.platform.toLowerCase().includes('leetcode')) && (
              <a href={leetcodeUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-amber-500/30 transition-all">
                <h3 className="text-sm font-bold text-amber-400">LeetCode</h3>
                <p className="text-xs text-slate-400 mt-1">View LeetCode Submissions</p>
              </a>
            )}
            {gfgUrl && !codingProfiles?.some(p => p.platform.toLowerCase().includes('geeks')) && (
              <a href={gfgUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-emerald-500/30 transition-all">
                <h3 className="text-sm font-bold text-emerald-400">GeeksforGeeks</h3>
                <p className="text-xs text-slate-400 mt-1">View GFG Ranking</p>
              </a>
            )}
            {codingNinjasUrl && !codingProfiles?.some(p => p.platform.toLowerCase().includes('ninjas')) && (
              <a href={codingNinjasUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-orange-500/30 transition-all">
                <h3 className="text-sm font-bold text-orange-400">Coding Ninjas</h3>
                <p className="text-xs text-slate-400 mt-1">View Profile</p>
              </a>
            )}
            {codechefUrl && (
              <a href={codechefUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-amber-600/30 transition-all">
                <h3 className="text-sm font-bold text-amber-500">CodeChef</h3>
                <p className="text-xs text-slate-400 mt-1">View Rating &amp; Badges</p>
              </a>
            )}
            {codeforcesUrl && (
              <a href={codeforcesUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-blue-500/30 transition-all">
                <h3 className="text-sm font-bold text-blue-400">Codeforces</h3>
                <p className="text-xs text-slate-400 mt-1">View Contest Rating</p>
              </a>
            )}
            {hackerrankUrl && (
              <a href={hackerrankUrl} target="_blank" rel="noreferrer" className="glass-card rounded-2xl p-5 border border-white/5 hover:border-emerald-600/30 transition-all">
                <h3 className="text-sm font-bold text-emerald-400">HackerRank</h3>
                <p className="text-xs text-slate-400 mt-1">View Verified Skills</p>
              </a>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          SECTION 9: ALL SOCIAL HANDLES & FOOTER
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
              <Globe className="w-4 h-4 text-blue-400" /> LinkedIn
            </a>
          )}
          {twitterUrl && (
            <a href={twitterUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-sky-400 border-sky-500/20">
              Twitter / X
            </a>
          )}
          {instagramUrl && (
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-pink-400 border-pink-500/20">
              Instagram
            </a>
          )}
          {youtubeUrl && (
            <a href={youtubeUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-red-400 border-red-500/20">
              YouTube
            </a>
          )}
          {mediumUrl && (
            <a href={mediumUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-slate-300">
              Medium
            </a>
          )}
          {hashnodeUrl && (
            <a href={hashnodeUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-blue-400">
              Hashnode
            </a>
          )}
          {devtoUrl && (
            <a href={devtoUrl} target="_blank" rel="noreferrer" className="btn-ghost text-xs text-slate-200">
              Dev.to
            </a>
          )}
        </div>

        <p className="text-[11px] text-slate-500 font-mono pt-4 border-t border-white/5">
          &copy; {new Date().getFullYear()} {fullName} &bull; AlgoVisualizer Founder Profile Management System
        </p>
      </div>

    </motion.div>
  );
};

export default AboutDeveloper;

