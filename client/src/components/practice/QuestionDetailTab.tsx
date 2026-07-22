import React, { useState } from 'react';
import { IPracticeQuestion } from '../../data/practice100EasyQuestions';
import { Building2, Tag, Lightbulb, Clock, FileText, ChevronDown, ChevronUp, Save, StickyNote } from 'lucide-react';

interface QuestionDetailTabProps {
  question: IPracticeQuestion;
  personalNote: string;
  onSaveNote: (note: string) => void;
}

export const QuestionDetailTab: React.FC<QuestionDetailTabProps> = ({
  question,
  personalNote,
  onSaveNote,
}) => {
  const [noteText, setNoteText] = useState<string>(personalNote);
  const [showNotes, setShowNotes] = useState<boolean>(false);
  const [expandedHints, setExpandedHints] = useState<Record<number, boolean>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const toggleHint = (idx: number) => {
    setExpandedHints((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleSaveNote = async () => {
    setIsSaving(true);
    await onSaveNote(noteText);
    setTimeout(() => setIsSaving(false), 500);
  };

  return (
    <div className="h-full overflow-y-auto p-6 space-y-6 text-slate-200 custom-scrollbar bg-[#090a0f]">
      {/* Title & Header */}
      <div className="space-y-3 pb-4 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-slate-500 font-mono">#{question.number}.</span>
            {question.title}
          </h1>

          <div className="flex items-center gap-2">
            {/* Difficulty Badge */}
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              question.difficulty === 'Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : question.difficulty === 'Medium'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
            }`}>
              {question.difficulty}
            </span>

            {/* Acceptance Badge */}
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10">
              Acc: {question.acceptanceRate}
            </span>

            {/* Time Badge */}
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-slate-300 border border-white/10 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {question.estimatedTime}
            </span>
          </div>
        </div>

        {/* Companies & Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {question.companies.map((comp: string) => (
            <span key={comp} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-300 border border-white/10 flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-indigo-400" /> {comp}
            </span>
          ))}
          {question.tags.map((tag: string) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 flex items-center gap-1.5">
              <Tag className="w-3 h-3 text-indigo-400" /> {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Statement */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-indigo-400" /> Problem Statement
        </h2>
        <div className="text-xs text-slate-300 leading-relaxed space-y-2 whitespace-pre-line bg-[#12141c] p-4 rounded-xl border border-white/5 font-sans">
          {question.problemStatement}
        </div>
      </div>

      {/* Examples */}
      <div className="space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Examples</h2>
        {question.examples.map((ex: any, idx: number) => (
          <div key={idx} className="bg-[#12141c] p-4 rounded-xl border border-white/5 space-y-2 text-xs font-mono">
            <div className="font-bold text-indigo-400">Example {idx + 1}:</div>
            <div>
              <span className="text-slate-400 font-semibold">Input: </span>
              <span className="text-white bg-[#090a0f] px-2 py-0.5 rounded border border-white/5">{ex.input}</span>
            </div>
            <div>
              <span className="text-slate-400 font-semibold">Output: </span>
              <span className="text-emerald-400 font-bold bg-[#090a0f] px-2 py-0.5 rounded border border-white/5">{ex.output}</span>
            </div>
            {ex.explanation && (
              <div className="text-slate-400 font-sans italic text-[11px] pt-1">
                Explanation: {ex.explanation}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Constraints */}
      <div className="space-y-3">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">Constraints</h2>
        <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 font-mono bg-[#12141c] p-4 rounded-xl border border-white/5">
          {question.constraints.map((c: string, idx: number) => (
            <li key={idx}>{c}</li>
          ))}
        </ul>
      </div>

      {/* Hints Accordion */}
      {question.hints && question.hints.length > 0 && (
        <div className="space-y-3 pt-2">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" /> Hints
          </h2>
          <div className="space-y-2">
            {question.hints.map((hint: string, idx: number) => (
              <div key={idx} className="bg-[#12141c] rounded-xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => toggleHint(idx)}
                  className="w-full px-4 py-2.5 text-left text-xs font-semibold text-amber-300 flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <span>Hint {idx + 1}</span>
                  {expandedHints[idx] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                {expandedHints[idx] && (
                  <div className="px-4 pb-3 text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2 bg-[#090a0f]/50">
                    {hint}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Personal Notes Section */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <button
          onClick={() => setShowNotes(!showNotes)}
          className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-2"
        >
          <StickyNote className="w-4 h-4" /> {showNotes ? 'Hide Personal Notes' : 'Add / View Personal Notes'}
        </button>

        {showNotes && (
          <div className="bg-[#12141c] p-4 rounded-xl border border-white/5 space-y-3">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your solution approach, notes, or edge cases here..."
              rows={4}
              className="w-full bg-[#090a0f] border border-white/10 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono resize-y"
            />
            <div className="flex justify-end">
              <button
                onClick={handleSaveNote}
                disabled={isSaving}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                {isSaving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
