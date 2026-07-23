import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Code2, Sparkles, Globe, Mail, FileDown, Briefcase,
  GraduationCap, MapPin, Calendar, Award, CheckCircle2, Zap,
  ExternalLink, Camera, ShieldCheck, Cpu,
  Star, Terminal, BookOpen, Copy, Check
} from 'lucide-react';

interface SkillCategory {
  title: string;
  icon: React.ElementType;
  color: string;
  skills: Array<{ name: string; level: number; tag?: string }>;
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend Engineering',
    icon: Code2,
    color: 'text-indigo-400',
    skills: [
      { name: 'React 18 / Next.js', level: 95, tag: 'Expert' },
      { name: 'TypeScript', level: 92, tag: 'Advanced' },
      { name: 'Tailwind CSS', level: 95, tag: 'Expert' },
      { name: 'Framer Motion', level: 90, tag: 'Advanced' },
      { name: 'Monaco Code Editor', level: 85, tag: 'Proficient' },
    ],
  },
  {
    title: 'Backend & Systems',
    icon: Cpu,
    color: 'text-purple-400',
    skills: [
      { name: 'Node.js & Express', level: 92, tag: 'Advanced' },
      { name: 'MongoDB Atlas / Mongoose', level: 88, tag: 'Advanced' },
      { name: 'JWT & OAuth Auth', level: 95, tag: 'Expert' },
      { name: 'Docker & Containerization', level: 85, tag: 'Proficient' },
      { name: 'RESTful API Architecture', level: 94, tag: 'Expert' },
    ],
  },
  {
    title: 'Programming Languages',
    icon: Terminal,
    color: 'text-cyan-400',
    skills: [
      { name: 'Java (OOP & DSA)', level: 92, tag: 'Expert' },
      { name: 'C++ (STL & System)', level: 88, tag: 'Advanced' },
      { name: 'Python', level: 90, tag: 'Advanced' },
      { name: 'JavaScript (ES6+)', level: 95, tag: 'Expert' },
      { name: 'SQL & Database Design', level: 88, tag: 'Advanced' },
    ],
  },
];

const TIMELINE_EVENTS = [
  {
    year: '2021',
    title: 'Began Programming Journey',
    location: 'Lovely Professional University',
    desc: 'Started learning C++ and Java fundamentals. Mastered core Data Structures and Object-Oriented Programming principles.',
    badge: 'Foundation',
  },
  {
    year: '2022',
    title: 'Competitive Programming & DSA',
    location: 'LeetCode & GeeksforGeeks',
    desc: 'Solved over 400+ algorithmic problems across Arrays, Dynamic Programming, Graphs, and Trees. Achieved top 1% campus rank at LPU.',
    badge: 'Milestone',
  },
  {
    year: '2023',
    title: 'Full Stack Web Architecture',
    location: 'React, Node.js, MongoDB',
    desc: 'Deep dived into modern full-stack web engineering, REST API architecture, database optimization, and cloud deployments.',
    badge: 'Specialization',
  },
  {
    year: '2024',
    title: 'AlgoVisualizer Conception',
    location: 'Independent SaaS Project',
    desc: 'Conceptualized and built the interactive visual execution engine for sorting, searching, and graph algorithms.',
    badge: 'Product',
  },
  {
    year: '2025 - 2026',
    title: 'Enterprise Platform Scaling',
    location: 'AlgoVisualizer SaaS Production',
    desc: 'Scaled platform with 250 practice problems, real-time MongoDB user progress engine, sub-500ms registration APIs, and dark glassmorphic design system.',
    badge: 'Production',
  },
];

const HIGHLIGHT_STATS = [
  { label: 'Algorithms Visualized', value: '85+', sub: 'Interactive step-by-step', icon: Sparkles, color: 'text-indigo-400' },
  { label: 'Practice Problems', value: '250', sub: 'Easy & Medium DSA questions', icon: Code2, color: 'text-emerald-400' },
  { label: 'API Response Time', value: '< 500ms', sub: 'Non-blocking async backend', icon: Zap, color: 'text-amber-400' },
  { label: 'Tech Stack', value: 'React + Node', sub: 'MongoDB Atlas + Docker', icon: Cpu, color: 'text-purple-400' },
];

export const AboutDeveloper: React.FC = () => {
  // Avatar local persistence state
  const [avatarUrl, setAvatarUrl] = useState<string | null>(() => {
    return localStorage.getItem('algo_developer_avatar') || null;
  });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setAvatarUrl(result);
        localStorage.setItem('algo_developer_avatar', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('chandramohan06@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-10 font-sans text-slate-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ══════════════════════════════════════════
          SECTION 1: HERO FOUNDER CARD
          ══════════════════════════════════════════ */}
      <div className="glass-premium rounded-3xl p-6 md:p-10 relative overflow-hidden shadow-2xl">
        {/* Background glow orbs */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none opacity-25 blur-3xl"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full pointer-events-none opacity-20 blur-3xl"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />

        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 relative z-10">
          
          {/* Avatar + Status */}
          <div className="flex flex-col items-center shrink-0 space-y-3">
            <div className="relative group">
              {/* Glowing outer ring */}
              <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
              
              {/* Circular Avatar */}
              <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-900 bg-slate-950 flex items-center justify-center shadow-2xl">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Chandramohan Kumar Singh" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-600 flex items-center justify-center text-3xl font-black text-white tracking-widest">
                    CS
                  </div>
                )}

                {/* Upload Button Overlay */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white text-xs font-semibold gap-1 cursor-pointer"
                  title="Upload profile photo"
                >
                  <Camera className="w-5 h-5" />
                  <span>Change Photo</span>
                </button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Availability Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-mono font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Opportunities
            </div>
          </div>

          {/* Core Info */}
          <div className="space-y-4 text-center lg:text-left max-w-2xl">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-indigo text-xs mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Founder &amp; Lead Architect
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                Chandramohan Kumar Singh
              </h1>
              <p className="text-lg md:text-xl font-semibold gradient-text">
                Full Stack Developer &amp; Computer Science Engineer
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-indigo-400" /> B.Tech CS Engineering
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-purple-400" /> Lovely Professional University
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" /> India
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              Passionate software engineer focused on building high-scalability web applications,
              interactive learning systems, and efficient algorithm visualizers. Founder &amp; sole architect of
              <strong className="text-indigo-300 font-semibold"> AlgoVisualizer</strong>.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                href="https://github.com/chandramohan06"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs"
              >
                <Globe className="w-4 h-4" /> GitHub
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="https://linkedin.com/in/chandramohan06"
                target="_blank"
                rel="noreferrer"
                className="btn-ghost text-xs text-blue-400 border-blue-500/20 hover:border-blue-500/40"
              >
                <Globe className="w-4 h-4 text-blue-400" /> LinkedIn
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="mailto:chandramohan06@gmail.com"
                className="btn-ghost text-xs"
              >
                <Mail className="w-4 h-4 text-indigo-400" /> Email Me
              </a>

              <button
                onClick={() => window.open('https://github.com/chandramohan06', '_blank')}
                className="btn-primary text-xs cursor-pointer"
              >
                <FileDown className="w-4 h-4" /> View Resume
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 2: ABOUT ME & VISION
          ══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biography (2 cols) */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider font-mono">
            <BookOpen className="w-4 h-4" /> Biography &amp; Purpose
          </div>
          <h2 className="text-xl md:text-2xl font-extrabold text-white">
            Why I Built AlgoVisualizer
          </h2>
          <div className="text-xs md:text-sm text-slate-300 space-y-3 leading-relaxed font-normal">
            <p>
              During my computer science studies at Lovely Professional University, I noticed that traditional text-heavy
              diagrams failed to capture how complex data structures operate under the hood. Algorithms like
              QuickSort, Dijkstra, and Dynamic Programming require <em>visual animation</em> to truly build intuition.
            </p>
            <p>
              I engineered <strong>AlgoVisualizer</strong> from scratch to bridge code execution with real-time visual
              intuition. It combines 85+ interactive algorithm visualizers, 250 curated LeetCode-style practice problems,
              and a MongoDB-backed user progress engine — all wrapped in a modern SaaS architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs font-bold text-indigo-400 uppercase font-mono block">🎯 Mission</span>
              <p className="text-xs text-slate-300">
                Democratize DSA education by providing every engineering student with interactive visual learning tools.
              </p>
            </div>
            <div className="bg-black/30 p-4 rounded-2xl border border-white/5 space-y-1">
              <span className="text-xs font-bold text-purple-400 uppercase font-mono block">🚀 Vision</span>
              <p className="text-xs text-slate-300">
                To build production-grade developer tools that empower software engineers to succeed in top tech interviews.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Contact & Location Card */}
        <div className="glass-card rounded-3xl p-6 md:p-8 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-wider font-mono">
              <Zap className="w-4 h-4" /> Direct Inquiry
            </div>
            <h3 className="text-lg font-bold text-white">Get in Touch</h3>
            
            <div className="space-y-3 text-xs text-slate-300 font-mono">
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Location:</span>
                <span className="text-slate-200 font-semibold">Punjab, India</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Degree:</span>
                <span className="text-slate-200 font-semibold">B.Tech CSE</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-black/30 border border-white/5">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-400 font-bold">Open for Hiring</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCopyEmail}
            className="w-full btn-ghost justify-center text-xs py-3 cursor-pointer"
          >
            {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copiedEmail ? 'Email Copied!' : 'Copy Email Address'}
          </button>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 3: TECH STACK MATRIX
          ══════════════════════════════════════════ */}
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
          <span className="hidden sm:block text-xs text-slate-500 font-mono">Production Tested</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title} className="glass-card rounded-3xl p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className={`w-5 h-5 ${cat.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white">{cat.title}</h3>
                </div>

                <div className="space-y-4">
                  {cat.skills.map((skill) => (
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

      {/* ══════════════════════════════════════════
          SECTION 4: ALGOVISUALIZER PROJECT HIGHLIGHTS
          ══════════════════════════════════════════ */}
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

          <a
            href="https://github.com/chandramohan06/AlgoVisualizer"
            target="_blank"
            rel="noreferrer"
            className="btn-primary text-xs shrink-0 cursor-pointer"
          >
            <Globe className="w-4 h-4" /> Source Repository
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHT_STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass-card rounded-2xl p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider font-mono">
                    {s.label}
                  </div>
                  <Icon className={`w-4 h-4 ${s.color}`} />
                </div>
                <div className={`text-2xl md:text-3xl font-black font-mono ${s.color}`}>
                  {s.value}
                </div>
                <div className="text-[11px] text-slate-500">{s.sub}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 5: DEVELOPER JOURNEY TIMELINE
          ══════════════════════════════════════════ */}
      <div className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-amber">
          <Calendar className="w-3.5 h-3.5" /> Growth Path
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Engineering Journey Timeline
        </h2>

        <div className="relative pl-6 border-l-2 border-indigo-500/30 space-y-8 ml-2">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Node dot */}
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
                  <span className="badge badge-slate text-[10px] uppercase">{event.badge}</span>
                </div>

                <div className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" /> {event.location}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          SECTION 6: CODING PROFILES & ACHIEVEMENTS
          ══════════════════════════════════════════ */}
      <div className="space-y-6">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          Coding Profiles &amp; Accomplishments
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: 'GitHub', stat: '1,200+ Commits', detail: 'Open source contributor', link: 'https://github.com/chandramohan06', icon: Globe, color: 'border-slate-500/30' },
            { name: 'LeetCode', stat: '400+ Solved', detail: 'Arrays, Tree, DP Specialist', link: 'https://leetcode.com', icon: Star, color: 'border-amber-500/30' },
            { name: 'GeeksforGeeks', stat: 'Top 1% Campus Rank', detail: 'LPU Engineering Leaderboard', link: 'https://geeksforgeeks.org', icon: Award, color: 'border-emerald-500/30' },
            { name: 'Coding Ninjas', stat: 'Master Tier', detail: 'Full Stack & Data Structures', link: 'https://codingninjas.com', icon: CheckCircle2, color: 'border-purple-500/30' },
          ].map((profile) => {
            const Icon = profile.icon;
            return (
              <a
                key={profile.name}
                href={profile.link}
                target="_blank"
                rel="noreferrer"
                className={`glass-card rounded-2xl p-5 flex flex-col justify-between border ${profile.color} hover:translate-y-[-2px] transition-all group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-sm font-bold text-white">{profile.name}</h3>
                  <div className="text-base font-black font-mono text-indigo-300 mt-1">{profile.stat}</div>
                  <p className="text-xs text-slate-400 mt-1">{profile.detail}</p>
                </div>
              </a>
            );
          })}
        </div>
      </div>

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
          <a
            href="mailto:chandramohan06@gmail.com"
            className="btn-primary cursor-pointer text-xs"
          >
            <Mail className="w-4 h-4" /> Send Email Inquiry
          </a>
          <a
            href="https://linkedin.com/in/chandramohan06"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost text-xs text-blue-400 border-blue-500/20"
          >
            <Globe className="w-4 h-4 text-blue-400" /> Connect on LinkedIn
          </a>
        </div>

        <p className="text-[11px] text-slate-500 font-mono pt-4 border-t border-white/5">
          &copy; {new Date().getFullYear()} Chandramohan Kumar Singh &bull; AlgoVisualizer SaaS Platform
        </p>
      </div>
    </motion.div>
  );
};

export default AboutDeveloper;
