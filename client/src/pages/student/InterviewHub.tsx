import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  Search,
  ChevronRight,
  Zap,
  Briefcase,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface QuestionItem {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  companyTags: string[];
  frequency: 'High' | 'Very High' | 'Top Tagged';
  type: 'dsa' | 'system-design' | 'cs-fundamentals' | 'sql' | 'behavioral';
  solutionSlug?: string;
  questionText?: string;
}

const SAMPLE_INTERVIEW_QUESTIONS: QuestionItem[] = [
  {
    id: 'q-1',
    title: 'Two Sum & Pair Target Sum In Sorted Array',
    category: 'Array / Two Pointers',
    difficulty: 'Easy',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Adobe'],
    frequency: 'Top Tagged',
    type: 'dsa',
    solutionSlug: 'two-sum',
  },
  {
    id: 'q-2',
    title: 'Merge K Sorted Lists using Priority Queue',
    category: 'Heap / Priority Queue',
    difficulty: 'Hard',
    companyTags: ['Amazon', 'Google', 'Atlassian'],
    frequency: 'Very High',
    type: 'dsa',
    solutionSlug: 'merge-k-sorted-lists',
  },
  {
    id: 'q-3',
    title: 'Design URL Shortener (TinyURL) & Hash Collision',
    category: 'System Design',
    difficulty: 'Medium',
    companyTags: ['Microsoft', 'Cisco', 'Oracle', 'Flipkart'],
    frequency: 'High',
    type: 'system-design',
  },
  {
    id: 'q-4',
    title: 'Process vs Thread & Virtual Memory Paging in OS',
    category: 'Operating Systems',
    difficulty: 'Medium',
    companyTags: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture'],
    frequency: 'Top Tagged',
    type: 'cs-fundamentals',
  },
  {
    id: 'q-5',
    title: 'N-th Highest Salary using SQL Window Functions (DENSE_RANK)',
    category: 'Database / SQL',
    difficulty: 'Medium',
    companyTags: ['Amazon', 'Oracle', 'TCS'],
    frequency: 'Very High',
    type: 'sql',
  },
  {
    id: 'q-6',
    title: 'Tell me about a time you faced a tight deadline & technical trade-off',
    category: 'Behavioral / HR',
    difficulty: 'Easy',
    companyTags: ['Amazon', 'Google', 'Microsoft', 'Adobe'],
    frequency: 'Top Tagged',
    type: 'behavioral',
  },
  {
    id: 'q-7',
    title: 'Lowest Common Ancestor in Binary Tree & BST',
    category: 'Tree',
    difficulty: 'Medium',
    companyTags: ['Google', 'Microsoft', 'Amazon'],
    frequency: 'Very High',
    type: 'dsa',
    solutionSlug: 'lca-binary-tree',
  },
];

const COMPANIES = [
  'All Companies',
  'Amazon',
  'Google',
  'Microsoft',
  'Cisco',
  'Adobe',
  'Atlassian',
  'Oracle',
  'Flipkart',
  'TCS',
  'Infosys',
];

export const InterviewHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState<string>('All Companies');
  const [activeTab, setActiveTab] = useState<'all' | 'dsa' | 'system-design' | 'cs-fundamentals' | 'sql' | 'behavioral'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredQuestions = SAMPLE_INTERVIEW_QUESTIONS.filter((q) => {
    const matchCompany = selectedCompany === 'All Companies' || q.companyTags.includes(selectedCompany);
    const matchTab = activeTab === 'all' || q.type === activeTab;
    const matchSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCompany && matchTab && matchSearch;
  });

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8 font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── 1. INTERVIEW HUB HERO BANNER ── */}
      <div className="glass-card rounded-3xl p-6 md:p-8 relative overflow-hidden border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-indigo-950/20 to-[#0d1117]">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-20 blur-3xl bg-gradient-to-bl from-purple-500 via-indigo-500 to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold">
              <Building2 className="w-3.5 h-3.5 text-amber-400" /> Placement Mastery Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-purple-400" />
              Interview Preparation Hub
            </h1>
            <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
              Curated company-tagged questions, CS fundamentals, SQL queries, system design basics, and HR interview cheat sheets for top tech companies.
            </p>
          </div>

          <button
            onClick={() => navigate('/mock-interview')}
            className="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 cursor-pointer transition-all active:scale-95 shrink-0"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-current" /> Start Mock Interview
          </button>
        </div>
      </div>

      {/* ── 2. COMPANY SELECTION SLIDER ── */}
      <div className="space-y-2">
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-purple-400" /> Target Company Filter
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {COMPANIES.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedCompany === comp
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/5'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* ── 3. SEARCH & CATEGORY TAB BAR ── */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-white/10 pb-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions or topics..."
            className="w-full bg-[#0d1117] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto no-scrollbar">
          {[
            { key: 'all', label: 'All Questions' },
            { key: 'dsa', label: 'DSA Problems' },
            { key: 'system-design', label: 'System Design' },
            { key: 'cs-fundamentals', label: 'CS Fundamentals' },
            { key: 'sql', label: 'SQL / DBMS' },
            { key: 'behavioral', label: 'HR / Behavioral' },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === t.key
                  ? 'bg-white/15 text-white border border-white/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── 4. QUESTION LIST GRID ── */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center text-xs text-slate-500 font-mono">
            No interview questions found matching active filters.
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5 rounded-3xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  <span className="text-[10px] font-mono text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    {q.category}
                  </span>

                  <span className="text-[10px] font-mono text-slate-500 font-bold">
                    Frequency: {q.frequency}
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-white group-hover:text-purple-300 transition-colors">
                  {q.title}
                </h3>

                {/* Company Tag Badges */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {q.companyTags.map((comp, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[10px] font-mono"
                    >
                      🏢 {comp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => navigate('/notes')}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20 cursor-pointer transition-all"
                >
                  Study Guide <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default InterviewHub;
