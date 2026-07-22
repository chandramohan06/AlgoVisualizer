import React from 'react';
import { Search, Bookmark, CheckCircle2, Circle, Clock, Building2, Tag, ChevronRight, Zap } from 'lucide-react';
import { IPracticeQuestion } from '../../data/practice100EasyQuestions';

interface QuestionListPanelProps {
  questions: IPracticeQuestion[];
  selectedQuestionId: string | null;
  onSelectQuestion: (question: IPracticeQuestion) => void;
  onToggleBookmark: (e: React.MouseEvent, questionId: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedTopic: string;
  setSelectedTopic: (val: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (val: string) => void;
  selectedCompany: string;
  setSelectedCompany: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
}

const TOPICS_LIST = [
  'All', 'Arrays', 'Strings', 'Binary Search', 'Sorting', 'Linked List',
  'Stack', 'Queue', 'Tree', 'BST', 'Heap', 'HashMap',
  'Recursion', 'Two Pointer', 'Sliding Window'
];

const COMPANIES_LIST = [
  'All', 'Amazon', 'Google', 'Microsoft', 'Meta', 'Apple',
  'Uber', 'Adobe', 'Netflix', 'Flipkart', 'Bloomberg'
];

export const QuestionListPanel: React.FC<QuestionListPanelProps> = ({
  questions,
  selectedQuestionId,
  onSelectQuestion,
  onToggleBookmark,
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  selectedCompany,
  setSelectedCompany,
  selectedStatus,
  setSelectedStatus,
}) => {
  // Filter questions based on search & filters
  const filteredQuestions = questions.filter((q: IPracticeQuestion) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.companies.some((c: string) => c.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTopic = selectedTopic === 'All' || q.topic === selectedTopic || q.category === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    const matchesCompany = selectedCompany === 'All' || q.companies.includes(selectedCompany);

    let matchesStatus = true;
    if (selectedStatus === 'solved') matchesStatus = q.isSolved === true || q.status === 'Solved';
    else if (selectedStatus === 'attempted') matchesStatus = q.status === 'Attempted';
    else if (selectedStatus === 'bookmarked') matchesStatus = q.isBookmarked === true;

    return matchesSearch && matchesTopic && matchesDifficulty && matchesCompany && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] border-r border-white/10 text-slate-200 select-none overflow-hidden">
      {/* Header & Controls */}
      <div className="p-4 border-b border-white/10 space-y-3 bg-[#12141c]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400 animate-pulse" />
            <h2 className="text-base font-bold text-white tracking-wide">Practice Problems</h2>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {filteredQuestions.length} / {questions.length} Qs
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search title, tags, companies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#090a0f] border border-white/10 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-3 gap-2">
          {/* Topic Selector */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">Topic</label>
            <select
              value={selectedTopic}
              onChange={(e) => setSelectedTopic(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-md px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {TOPICS_LIST.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Selector */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-md px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Company Selector */}
          <div>
            <label className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block mb-1">Company</label>
            <select
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(e.target.value)}
              className="w-full bg-[#090a0f] border border-white/10 rounded-md px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              {COMPANIES_LIST.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-[#090a0f] p-1 rounded-lg border border-white/5 text-[11px]">
          {[
            { id: 'all', label: 'All' },
            { id: 'solved', label: 'Solved' },
            { id: 'attempted', label: 'Attempted' },
            { id: 'bookmarked', label: 'Bookmarked' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedStatus(tab.id)}
              className={`flex-1 py-1 rounded text-center font-medium transition-all ${
                selectedStatus === tab.id
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Question Cards Scroll Container */}
      <div className="flex-1 overflow-y-auto divide-y divide-white/5 custom-scrollbar">
        {filteredQuestions.length === 0 ? (
          <div className="p-8 text-center text-slate-500 text-xs">
            No practice problems match the selected filters.
          </div>
        ) : (
          filteredQuestions.map((q: IPracticeQuestion) => {
            const isSelected = selectedQuestionId === q.id || selectedQuestionId === String(q.number);
            const isSolved = q.isSolved || q.status === 'Solved';

            return (
              <div
                key={q.id}
                onClick={() => onSelectQuestion(q)}
                className={`p-3.5 cursor-pointer transition-all hover:bg-white/[0.03] group relative ${
                  isSelected ? 'bg-indigo-950/40 border-l-4 border-indigo-500' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xs font-mono font-bold text-slate-500 w-8 shrink-0">
                      #{q.number}
                    </span>
                    <h3 className={`text-xs font-semibold truncate transition-colors ${
                      isSelected ? 'text-indigo-400' : 'text-slate-200 group-hover:text-white'
                    }`}>
                      {q.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Difficulty Badge */}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      q.difficulty === 'Easy'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : q.difficulty === 'Medium'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {q.difficulty}
                    </span>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => onToggleBookmark(e, q.id)}
                      className={`p-1 rounded hover:bg-white/10 transition-colors ${
                        q.isBookmarked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'
                      }`}
                      title={q.isBookmarked ? 'Remove Bookmark' : 'Bookmark Question'}
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                </div>

                {/* Question Details Row */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    {/* Status Icon */}
                    <div className="flex items-center gap-1">
                      {isSolved ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Solved
                        </span>
                      ) : q.status === 'Attempted' ? (
                        <span className="flex items-center gap-1 text-amber-400 font-medium">
                          <Circle className="w-3.5 h-3.5 fill-amber-400/20" /> Attempted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-slate-500">
                          <Circle className="w-3.5 h-3.5" /> Todo
                        </span>
                      )}
                    </div>

                    {/* Acceptance % */}
                    <span className="font-mono text-slate-400">
                      Acc: <strong className="text-slate-300">{q.acceptanceRate}</strong>
                    </span>

                    {/* Estimated Time */}
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3 h-3" /> {q.estimatedTime}
                    </span>
                  </div>

                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                    isSelected ? 'text-indigo-400 translate-x-0.5' : 'text-slate-600 group-hover:text-slate-400'
                  }`} />
                </div>

                {/* Companies & Tags Badges */}
                <div className="mt-2 flex flex-wrap items-center gap-1">
                  {q.companies.slice(0, 3).map((comp: string) => (
                    <span key={comp} className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/5 flex items-center gap-0.5">
                      <Building2 className="w-2.5 h-2.5" /> {comp}
                    </span>
                  ))}
                  {q.tags.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/10 flex items-center gap-0.5">
                      <Tag className="w-2.5 h-2.5" /> {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
