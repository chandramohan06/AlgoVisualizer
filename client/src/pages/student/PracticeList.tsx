import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import practiceService, { IPracticeQuestionItem } from '../../services/practiceService';
import { useUserProgress } from '../../hooks/useUserProgress';
import {
  Search,
  Bookmark,
  CheckCircle2,
  Circle,
  Building2,
  ChevronRight,
  Flame,
  Layers,
  BookOpen,
  X,
  MapPin,
  Filter,
  Check,
  TrendingUp,
} from 'lucide-react';

const ALL_COMPANIES = [
  'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Accenture', 'Capgemini', 'Deloitte', 'IBM',
  'Oracle', 'Amazon', 'Microsoft', 'Google', 'Adobe', 'Flipkart', 'Paytm', 'Goldman Sachs',
  'JP Morgan', 'PhonePe', 'Uber', 'Swiggy', 'Zomato', 'Nvidia', 'Qualcomm', 'Samsung',
  'Intel', 'VMware', 'Salesforce', 'Atlassian', 'LinkedIn', 'Apple', 'Meta', 'Netflix'
];

const ALL_TOPICS = [
  'Arrays', 'Strings', 'HashMap', 'HashSet', 'Sorting', 'Searching',
  'Two Pointers', 'Sliding Window', 'Recursion', 'Linked List', 'Stack',
  'Queue', 'Deque', 'Heap', 'Binary Search', 'Tree', 'BST', 'Graph',
  'Greedy', 'Backtracking', 'Dynamic Programming', 'Bit Manipulation',
  'Math', 'Matrix', 'Prefix Sum', 'Intervals'
];

export const PracticeList: React.FC = () => {
  const navigate = useNavigate();
  const { progress } = useUserProgress();

  // Active Tab: 'explorer' | 'roadmap'
  const [activeTab, setActiveTab] = useState<'explorer' | 'roadmap'>('explorer');

  // Filters State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');

  // Dropdown UI toggles
  const [showCompanyMenu, setShowCompanyMenu] = useState<boolean>(false);
  const [showTopicMenu, setShowTopicMenu] = useState<boolean>(false);

  // Data & Roadmap State
  const [questions, setQuestions] = useState<IPracticeQuestionItem[]>([]);
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch Questions from API
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const params: Record<string, any> = {
      search: searchQuery,
      difficulty: selectedDifficulty !== 'All' ? selectedDifficulty : undefined,
      status: selectedStatus !== 'all' ? selectedStatus : undefined,
      sortBy: sortBy !== 'default' ? sortBy : undefined,
      limit: 250,
    };

    if (selectedCompanies.length > 0) {
      params.company = selectedCompanies.join(',');
    }
    if (selectedTopics.length > 0) {
      params.topic = selectedTopics.join(',');
    }

    practiceService.getQuestions(params)
      .then((data) => {
        if (isMounted) {
          setQuestions(data || []);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => { isMounted = false; };
  }, [searchQuery, selectedCompanies, selectedTopics, selectedDifficulty, selectedStatus, sortBy]);

  // Fetch Placement Roadmap Data
  useEffect(() => {
    practiceService.getPlacementRoadmap()
      .then((res) => setRoadmapData(res))
      .catch(() => {});
  }, [progress]);

  // Calculate difficulty solved counts
  const difficultyCounts = useMemo(() => {
    let easy = 0, medium = 0, hard = 0;
    questions.forEach((q) => {
      if (q.isSolved) {
        if (String(q.difficulty) === 'Easy') easy++;
        else if (String(q.difficulty) === 'Medium') medium++;
        else if (String(q.difficulty) === 'Hard') hard++;
      }
    });
    return { easy, medium, hard };
  }, [questions]);

  // Multi-select handlers
  const toggleCompany = (company: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(company) ? prev.filter((c) => c !== company) : [...prev, company]
    );
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCompanies([]);
    setSelectedTopics([]);
    setSelectedDifficulty('All');
    setSelectedStatus('all');
    setSortBy('default');
  };

  return (
    <div className="min-h-screen bg-[#0a0b0e] text-slate-100 p-4 md:p-8 font-sans">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
                Placement Edition 2026
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1 font-mono">
                <Check className="w-3 h-3" /> Java & C++ Engine
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-200 bg-clip-text text-transparent">
              Practice Coding Engine
            </h1>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Master 200+ Placement-focused Data Structures & Algorithms questions with real execution metrics, Monaco IDE, and company problem tags.
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="relative z-10 flex flex-wrap items-center gap-3 bg-black/40 border border-white/10 p-3 rounded-xl backdrop-blur-md">
            <div className="px-3 py-2 text-center border-r border-white/10">
              <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-lg font-mono">
                <Flame className="w-4 h-4 fill-amber-400" />
                {progress?.overallStats?.currentStreak || 0}
              </div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Day Streak</div>
            </div>

            <div className="px-3 py-2 text-center border-r border-white/10">
              <div className="text-emerald-400 font-bold text-lg font-mono">
                {progress?.overallStats?.solvedCount || 0}
              </div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Solved</div>
            </div>

            <div className="px-3 py-2 text-center border-r border-white/10">
              <div className="text-indigo-400 font-bold text-lg font-mono">
                {progress?.overallStats?.acceptanceRate || '0%'}
              </div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Accuracy</div>
            </div>

            <div className="px-3 py-2 text-center">
              <div className="flex items-center gap-1 text-xs text-slate-300 font-mono font-semibold">
                <span className="text-emerald-400">{difficultyCounts.easy}E</span> /
                <span className="text-amber-400"> {difficultyCounts.medium}M</span> /
                <span className="text-rose-400"> {difficultyCounts.hard}H</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Breakdown</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('explorer')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'explorer'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Layers className="w-4 h-4" />
            Problem Explorer ({questions.length})
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === 'roadmap'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Placement Roadmap
          </button>
        </div>

        {/* TAB 1: PROBLEM EXPLORER */}
        {activeTab === 'explorer' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-[#11131a] border border-white/10 rounded-2xl p-4 shadow-lg space-y-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                {/* Search Box */}
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search problems by title, topic, company..."
                    className="w-full pl-10 pr-4 py-2.5 bg-[#090a0f] border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Filter Controls Row */}
                <div className="flex flex-wrap items-center gap-2">
                  {/* Company Multi-Select Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => { setShowCompanyMenu(!showCompanyMenu); setShowTopicMenu(false); }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                        selectedCompanies.length > 0
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                          : 'bg-[#090a0f] text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5 text-indigo-400" />
                      Company ({selectedCompanies.length === 0 ? 'All' : selectedCompanies.length})
                    </button>

                    {showCompanyMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-[#141722] border border-white/15 rounded-xl shadow-2xl p-3 z-50 max-h-72 overflow-y-auto space-y-1 font-sans">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 px-1">
                          <span>Target Companies</span>
                          {selectedCompanies.length > 0 && (
                            <button onClick={() => setSelectedCompanies([])} className="text-indigo-400 hover:underline">
                              Clear
                            </button>
                          )}
                        </div>
                        {ALL_COMPANIES.map((c) => {
                          const isSel = selectedCompanies.includes(c);
                          return (
                            <div
                              key={c}
                              onClick={() => toggleCompany(c)}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                                isSel ? 'bg-indigo-600/30 text-indigo-200' : 'text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              <span>{c}</span>
                              {isSel && <Check className="w-3.5 h-3.5 text-indigo-400" />}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Topic Multi-Select Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => { setShowTopicMenu(!showTopicMenu); setShowCompanyMenu(false); }}
                      className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
                        selectedTopics.length > 0
                          ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                          : 'bg-[#090a0f] text-slate-300 border-white/10 hover:border-white/20'
                      }`}
                    >
                      <Filter className="w-3.5 h-3.5 text-emerald-400" />
                      Topic ({selectedTopics.length === 0 ? 'All' : selectedTopics.length})
                    </button>

                    {showTopicMenu && (
                      <div className="absolute right-0 mt-2 w-64 bg-[#141722] border border-white/15 rounded-xl shadow-2xl p-3 z-50 max-h-72 overflow-y-auto space-y-1 font-sans">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-2 px-1">
                          <span>DSA Topics</span>
                          {selectedTopics.length > 0 && (
                            <button onClick={() => setSelectedTopics([])} className="text-indigo-400 hover:underline">
                              Clear
                            </button>
                          )}
                        </div>
                        {ALL_TOPICS.map((t) => {
                          const isSel = selectedTopics.includes(t);
                          return (
                            <div
                              key={t}
                              onClick={() => toggleTopic(t)}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                                isSel ? 'bg-indigo-600/30 text-indigo-200' : 'text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              <span>{t}</span>
                              {isSel && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Difficulty Selector */}
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="All">Difficulty: All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>

                  {/* Status Selector */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="all">Status: All</option>
                    <option value="unsolved">Unsolved</option>
                    <option value="solved">Solved</option>
                    <option value="attempted">Attempted</option>
                    <option value="bookmarked">Bookmarked</option>
                    <option value="revision">Revision</option>
                  </select>

                  {/* Sort Selector */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-[#090a0f] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="default">Sort: Default</option>
                    <option value="acceptance">Acceptance %</option>
                    <option value="frequency">Frequency</option>
                    <option value="newest">Newest</option>
                  </select>

                  {/* Reset Filters */}
                  {(selectedCompanies.length > 0 || selectedTopics.length > 0 || selectedDifficulty !== 'All' || selectedStatus !== 'all' || searchQuery) && (
                    <button
                      onClick={clearAllFilters}
                      className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all cursor-pointer"
                    >
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>

              {/* Active Filter Pills */}
              {(selectedCompanies.length > 0 || selectedTopics.length > 0) && (
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
                  <span className="text-[11px] font-semibold text-slate-500">Active Filters:</span>
                  {selectedCompanies.map((c) => (
                    <span key={c} className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-medium flex items-center gap-1">
                      {c}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => toggleCompany(c)} />
                    </span>
                  ))}
                  {selectedTopics.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[11px] font-medium flex items-center gap-1">
                      {t}
                      <X className="w-3 h-3 cursor-pointer hover:text-white" onClick={() => toggleTopic(t)} />
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Problem Table */}
            <div className="bg-[#11131a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300 border-collapse">
                  <thead>
                    <tr className="bg-[#090a0f] border-b border-white/10 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      <th className="py-3.5 px-4 w-12 text-center">Status</th>
                      <th className="py-3.5 px-4">Title</th>
                      <th className="py-3.5 px-4 w-32">Topic</th>
                      <th className="py-3.5 px-4 w-28 text-center">Difficulty</th>
                      <th className="py-3.5 px-4 w-44">Target Companies</th>
                      <th className="py-3.5 px-4 w-28 text-center">Acceptance</th>
                      <th className="py-3.5 px-4 w-24 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {isLoading ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                            <span className="text-xs font-mono">Loading Practice Questions...</span>
                          </div>
                        </td>
                      </tr>
                    ) : questions.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <BookOpen className="w-8 h-8 text-slate-600" />
                            <p className="text-sm font-semibold text-slate-300">No practice problems found matching your filters.</p>
                            <button
                              onClick={clearAllFilters}
                              className="mt-1 px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-500 transition-colors"
                            >
                              Clear Filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      questions.map((q, idx) => (
                        <tr
                          key={q._id || q.slug}
                          onClick={() => navigate(`/practice/question/${q.slug}`)}
                          className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                        >
                          {/* Status Icon */}
                          <td className="py-3.5 px-4 text-center">
                            {q.isSolved ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                            ) : q.status === 'Attempted' ? (
                              <Circle className="w-4 h-4 text-amber-400 mx-auto fill-amber-400/20" />
                            ) : (
                              <Circle className="w-4 h-4 text-slate-600 mx-auto" />
                            )}
                          </td>

                          {/* Problem Title & Slug */}
                          <td className="py-3.5 px-4 font-medium text-white group-hover:text-indigo-400 transition-colors">
                            <div className="flex items-center gap-2">
                              <span>{idx + 1}.</span>
                              <span className="font-semibold">{q.title}</span>
                              {q.isBookmarked && (
                                <Bookmark className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                              )}
                            </div>
                          </td>

                          {/* Topic Pill */}
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
                              {q.topic || q.category || 'Arrays'}
                            </span>
                          </td>

                          {/* Difficulty Badge */}
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono inline-block ${
                                String(q.difficulty) === 'Easy'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  : String(q.difficulty) === 'Medium'
                                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {q.difficulty}
                            </span>
                          </td>

                          {/* Target Companies */}
                          <td className="py-3.5 px-4">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {(q.companies || []).slice(0, 3).map((comp) => (
                                <span key={comp} className="px-1.5 py-0.5 bg-indigo-500/10 text-indigo-300 text-[10px] rounded border border-indigo-500/20">
                                  {comp}
                                </span>
                              ))}
                              {(q.companies || []).length > 3 && (
                                <span className="text-[10px] text-slate-500 self-center">
                                  +{q.companies.length - 3}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Acceptance Rate */}
                          <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-400">
                            {q.acceptanceRate || '58.4%'}
                          </td>

                          {/* Action Button */}
                          <td className="py-3.5 px-4 text-right">
                            <button className="px-3 py-1.5 rounded-lg bg-indigo-600/20 text-indigo-300 hover:bg-indigo-600 hover:text-white text-xs font-semibold transition-all flex items-center gap-1 ml-auto">
                              Solve <ChevronRight className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PLACEMENT ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="space-y-6">
            <div className="bg-[#11131a] border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-indigo-400" />
                    Automated Placement Practice Roadmap
                  </h2>
                  <p className="text-slate-400 text-xs mt-1">
                    Structured topic progression designed for campus & off-campus coding rounds at top tech companies.
                  </p>
                </div>

                {roadmapData && (
                  <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 rounded-xl">
                    <span className="text-xs font-semibold text-slate-400">Overall Completion:</span>
                    <span className="text-lg font-bold font-mono text-emerald-400">{roadmapData.overallPercentage || 0}%</span>
                  </div>
                )}
              </div>

              {/* Roadmap Steps List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roadmapData?.steps?.map((step: any, idx: number) => (
                  <div
                    key={step.id}
                    className="bg-[#090a0f] border border-white/10 rounded-xl p-4 hover:border-indigo-500/50 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold font-mono text-indigo-400">Step {idx + 1}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          step.percentage === 100 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-400'
                        }`}>
                          {step.percentage}% Completed
                        </span>
                      </div>

                      <h3 className="font-bold text-white text-base mb-1">{step.name}</h3>
                      <p className="text-slate-400 text-xs mb-3">
                        {step.solved} / {step.total} questions solved
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500 rounded-full"
                        style={{ width: `${step.percentage}%` }}
                      />
                    </div>
                  </div>
                )) || (
                  <div className="col-span-full py-8 text-center text-slate-500 text-xs font-mono">
                    Loading Placement Roadmap...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeList;
