import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MonacoCodeEditor } from '@components/practice/MonacoCodeEditor';
import { TestCaseConsolePanel, IExecutionResult } from '@components/practice/TestCaseConsolePanel';
import { SubmissionsHistoryTab, ISubmissionHistoryItem } from '@components/practice/SubmissionsHistoryTab';
import practiceService, { IPracticeQuestionDetails } from '../../services/practiceService';
import { useUserProgress } from '../../hooks/useUserProgress';
import {
  ArrowLeft,
  Bookmark,
  FileText,
  History,
  Lightbulb,
  Save,
  StickyNote,
  Loader2,
  Play,
  GripVertical,
  GripHorizontal,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';

export const ProblemIDE: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();

  const targetSlug = slug || id || 'two-sum';

  const { invalidateProgress, isProblemSolved, isProblemBookmarked } = useUserProgress();

  // Problem State
  const [problem, setProblem] = useState<IPracticeQuestionDetails | null>(null);
  const [isLoadingProblem, setIsLoadingProblem] = useState<boolean>(true);

  // Layout & Resizing Persistence States
  const [leftWidthPct, setLeftWidthPct] = useState<number>(() => {
    const saved = localStorage.getItem('ide_left_panel_width');
    return saved ? Math.min(Math.max(parseFloat(saved), 25), 75) : 45;
  });

  const [consoleHeightPx, setConsoleHeightPx] = useState<number>(() => {
    const saved = localStorage.getItem('ide_console_height');
    return saved ? Math.min(Math.max(parseInt(saved, 10), 120), 600) : 280;
  });

  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem('ide_font_size');
    return saved ? parseInt(saved, 10) : 14;
  });

  const [editorTheme, setEditorTheme] = useState<'vs-dark' | 'vs'>(() => {
    const saved = localStorage.getItem('ide_theme');
    return saved === 'vs' ? 'vs' : 'vs-dark';
  });

  const handleFontSizeChange = (size: number) => {
    setFontSize(size);
    localStorage.setItem('ide_font_size', String(size));
  };

  const handleThemeChange = (theme: 'vs-dark' | 'vs') => {
    setEditorTheme(theme);
    localStorage.setItem('ide_theme', theme);
  };

  const [isDraggingH, setIsDraggingH] = useState<boolean>(false);
  const [isDraggingV, setIsDraggingV] = useState<boolean>(false);

  // Editor & Language State (Restricted to Java & C++ ONLY)
  const [language, setLanguage] = useState<'java' | 'cpp'>('java');
  const [code, setCode] = useState<string>('');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isSolved, setIsSolved] = useState<boolean>(false);

  // Left Panel Tabs: 'description' | 'editorial' | 'submissions' | 'notes'
  const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'editorial' | 'submissions' | 'notes'>('description');

  // Bottom Console Panel State
  const [activeConsoleTab, setActiveConsoleTab] = useState<'testcases' | 'customInput' | 'console' | 'result' | 'executionDetails'>('testcases');
  const [customInput, setCustomInput] = useState<string>('');
  const [executionResult, setExecutionResult] = useState<IExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Submissions, Metrics & Notes
  const [submissions, setSubmissions] = useState<ISubmissionHistoryItem[]>([]);
  const [isLoadingSubmissions, setIsLoadingSubmissions] = useState<boolean>(false);
  const [personalNote, setPersonalNote] = useState<string>('');
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState<boolean>(false);
  const [expandedHints, setExpandedHints] = useState<Record<number, boolean>>({});

  // Container refs
  const workspaceRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Fetch Problem Details from Backend
  useEffect(() => {
    let isMounted = true;
    setIsLoadingProblem(true);

    practiceService.getQuestionBySlug(targetSlug)
      .then((data) => {
        if (!isMounted) return;
        setProblem(data);
        setIsBookmarked(data.isBookmarked || isProblemBookmarked(data.slug) || false);
        setIsSolved(data.isSolved || isProblemSolved(data.slug) || false);
        setPersonalNote(data.personalNote || '');

        // Set starter code for selected language
        const javaCode = data.codeSnippets?.java || (data as any).starterCodeJava || 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        return new int[]{};\n    }\n}';
        const cppCode = data.codeSnippets?.cpp || (data as any).starterCodeCpp || '#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        return {};\n    }\n};';

        setCode(language === 'cpp' ? cppCode : javaCode);
        if (data.examples && data.examples.length > 0) {
          setCustomInput(data.examples[0].input);
        }
        setIsLoadingProblem(false);
      })
      .catch(() => {
        if (isMounted) setIsLoadingProblem(false);
      });

    return () => { isMounted = false; };
  }, [targetSlug, isProblemSolved, isProblemBookmarked]);

  // Handle Language Switch
  const handleLanguageChange = (newLang: 'java' | 'cpp') => {
    setLanguage(newLang);
    if (!problem) return;

    const javaCode = problem.codeSnippets?.java || (problem as any).starterCodeJava || 'class Solution {\n    // Java solution\n}';
    const cppCode = problem.codeSnippets?.cpp || (problem as any).starterCodeCpp || 'class Solution {\npublic:\n    // C++ solution\n};';

    setCode(newLang === 'cpp' ? cppCode : javaCode);
  };

  // Reset Code
  const handleResetCode = () => {
    if (!problem) return;
    const javaCode = problem.codeSnippets?.java || (problem as any).starterCodeJava || '';
    const cppCode = problem.codeSnippets?.cpp || (problem as any).starterCodeCpp || '';
    setCode(language === 'cpp' ? cppCode : javaCode);
  };

  // Fetch Submissions
  const fetchSubmissions = async () => {
    setIsLoadingSubmissions(true);
    try {
      const history = await practiceService.getSubmissions(targetSlug);
      const mapped: ISubmissionHistoryItem[] = (history || []).map((sub: any) => ({
        id: sub._id,
        timestamp: new Date(sub.createdAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        verdict: sub.verdict,
        language: sub.language,
        runtimeMs: sub.runtimeMs || 0,
        memoryMb: sub.memoryMb || 0,
        passedCount: sub.passedCount || 0,
        totalCount: sub.totalCount || 0,
        code: sub.code,
      }));
      setSubmissions(mapped);
    } catch {
      setSubmissions([]);
    } finally {
      setIsLoadingSubmissions(false);
    }
  };

  useEffect(() => {
    if (activeLeftTab === 'submissions') {
      fetchSubmissions();
    }
  }, [activeLeftTab, targetSlug]);

  // Run Code Handler
  const handleRunCode = async () => {
    if (!problem || isRunning || isSubmitting) return;
    setIsRunning(true);
    setActiveConsoleTab('result');

    try {
      const res = await practiceService.runCode(problem.slug || problem._id, language, code, customInput);
      const isAccepted = res.verdict === 'Accepted';

      const executionData: IExecutionResult = {
        verdict: res.verdict || (isAccepted ? 'Accepted' : 'Wrong Answer'),
        passedCount: res.passedCount || (isAccepted ? (res.testResults?.length || 1) : 0),
        totalCount: res.totalCount || (res.testResults?.length || 1),
        runtimeMs: res.runtimeMs || 25,
        memoryMb: res.memoryMb || 14.2,
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        testResults: (res.testResults || []).map((tc: any, i: number) => ({
          testCaseIndex: i + 1,
          input: tc.input || customInput || 'sample input',
          expectedOutput: tc.expectedOutput || 'expected output',
          actualOutput: tc.actualOutput || tc.output || 'actual output',
          passed: tc.passed ?? true,
          runtimeMs: tc.runtimeMs,
          memoryMb: tc.memoryMb,
        })),
      };

      setExecutionResult(executionData);
    } catch (err: any) {
      setExecutionResult({
        verdict: 'Compile Error',
        passedCount: 0,
        totalCount: 1,
        runtimeMs: 0,
        memoryMb: 0,
        stderr: err.response?.data?.message || err.message || 'Compilation or execution failure.',
      });
    } finally {
      setIsRunning(false);
    }
  };

  // Submit Code Handler
  const handleSubmitCode = async () => {
    if (!problem || isRunning || isSubmitting) return;
    setIsSubmitting(true);
    setActiveConsoleTab('result');

    try {
      const res = await practiceService.submitCode(problem.slug || problem._id, language, code);
      const isAccepted = res.verdict === 'Accepted';

      const executionData: IExecutionResult = {
        verdict: res.verdict || (isAccepted ? 'Accepted' : 'Wrong Answer'),
        passedCount: res.passedCount || 0,
        totalCount: res.totalCount || 0,
        runtimeMs: res.runtimeMs || 30,
        memoryMb: res.memoryMb || 14.5,
        stdout: res.stdout || '',
        stderr: res.stderr || '',
        testResults: (res.testResults || []).map((tc: any, i: number) => ({
          testCaseIndex: i + 1,
          input: tc.input || '',
          expectedOutput: tc.expectedOutput || '',
          actualOutput: tc.actualOutput || tc.output || '',
          passed: tc.passed ?? true,
        })),
      };

      setExecutionResult(executionData);

      if (isAccepted) {
        setIsSolved(true);
        invalidateProgress();
      }
    } catch (err: any) {
      setExecutionResult({
        verdict: 'Compile Error',
        passedCount: 0,
        totalCount: 1,
        runtimeMs: 0,
        memoryMb: 0,
        stderr: err.response?.data?.message || err.message || 'Submission evaluation failure.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Toggle Bookmark
  const handleToggleBookmark = async () => {
    if (!problem) return;
    try {
      const res = await practiceService.toggleBookmark(problem._id || problem.slug);
      setIsBookmarked(res.isBookmarked);
      invalidateProgress();
    } catch {}
  };

  // Save Personal Note
  const handleSaveNote = async () => {
    if (!problem) return;
    setIsSavingNote(true);
    try {
      await practiceService.saveNote(problem._id || problem.slug, personalNote);
      setNoteSavedFeedback(true);
      setTimeout(() => setNoteSavedFeedback(false), 2000);
    } catch {} finally {
      setIsSavingNote(false);
    }
  };

  // Horizontal Splitter Drag Listener
  const handleMouseDownH = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingH(true);
  };

  // Vertical Splitter Drag Listener
  const handleMouseDownV = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDraggingV(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingH && workspaceRef.current) {
        const rect = workspaceRef.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        let newPct = (offsetX / rect.width) * 100;
        newPct = Math.min(Math.max(newPct, 25), 75);
        setLeftWidthPct(newPct);
        localStorage.setItem('ide_left_panel_width', String(newPct));
      }
      if (isDraggingV && rightPanelRef.current) {
        const rect = rightPanelRef.current.getBoundingClientRect();
        const offsetY = rect.bottom - e.clientY;
        let newPx = Math.min(Math.max(offsetY, 120), rect.height - 100);
        setConsoleHeightPx(newPx);
        localStorage.setItem('ide_console_height', String(newPx));
      }
    };

    const handleMouseUp = () => {
      setIsDraggingH(false);
      setIsDraggingV(false);
    };

    if (isDraggingH || isDraggingV) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingH, isDraggingV]);

  if (isLoadingProblem) {
    return (
      <div className="h-screen bg-[#0a0b0e] flex flex-col items-center justify-center text-slate-400 font-sans">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mb-3" />
        <span className="text-sm font-mono">Loading Practice IDE Environment...</span>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="h-screen bg-[#0a0b0e] flex flex-col items-center justify-center text-slate-400 font-sans">
        <p className="text-slate-300 font-semibold text-base mb-3">Problem formulation not found.</p>
        <button onClick={() => navigate('/practice')} className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold">
          Return to Practice Explorer
        </button>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#0a0b0e] text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      {/* Top Navbar */}
      <div className="h-12 bg-[#11131a] border-b border-white/10 px-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/practice')}
            className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Back to Practice Explorer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <span className="font-mono text-xs text-slate-500">#{problem.leetcodeNumber || '1'}</span>
          <h1 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
            {problem.title}
            {isSolved && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
          </h1>

          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
              String(problem.difficulty) === 'Easy'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : String(problem.difficulty) === 'Medium'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
            }`}
          >
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer border ${
              isBookmarked ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' : 'bg-white/5 text-slate-400 hover:text-white border-white/10'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark Problem'}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>

          {/* Run Code Header Action */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
            {isRunning ? 'Running...' : 'Run'}
          </button>

          {/* Submit Code Header Action */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>

      {/* Main Workspace Split Layout */}
      <div ref={workspaceRef} className="flex-1 min-h-0 flex relative overflow-hidden">
        {/* LEFT PANEL: Problem Description, Editorial, Submissions, Notes */}
        <div style={{ width: `${leftWidthPct}%` }} className="flex flex-col h-full bg-[#0d0e12] border-r border-white/10 shrink-0">
          {/* Left Panel Tabs */}
          <div className="flex items-center gap-1 px-3 py-1.5 bg-[#12141c] border-b border-white/10 text-xs font-semibold text-slate-400 shrink-0">
            <button
              onClick={() => setActiveLeftTab('description')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                activeLeftTab === 'description' ? 'bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40' : 'hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Description
            </button>

            <button
              onClick={() => setActiveLeftTab('editorial')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                activeLeftTab === 'editorial' ? 'bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40' : 'hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Editorial
            </button>

            <button
              onClick={() => setActiveLeftTab('submissions')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                activeLeftTab === 'submissions' ? 'bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40' : 'hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5" /> Submissions
            </button>

            <button
              onClick={() => setActiveLeftTab('notes')}
              className={`px-3 py-1 rounded-lg flex items-center gap-1.5 cursor-pointer transition-all ${
                activeLeftTab === 'notes' ? 'bg-indigo-600/30 text-indigo-300 font-bold border border-indigo-500/40' : 'hover:text-white'
              }`}
            >
              <StickyNote className="w-3.5 h-3.5 text-cyan-400" /> Notes
            </button>
          </div>

          {/* Left Content Body */}
          <div className="flex-1 min-h-0 overflow-y-auto p-5 space-y-6 text-sm leading-relaxed text-slate-300">
            {activeLeftTab === 'description' && (
              <div className="space-y-5">
                {/* Title Header */}
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{problem.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-400">
                      Topic: {problem.topic || problem.category || 'Arrays'}
                    </span>
                    {(problem.companies || []).map((comp) => (
                      <span key={comp} className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 text-xs border border-indigo-500/20">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Problem Statement */}
                <div className="prose prose-invert max-w-none text-slate-300 whitespace-pre-wrap">
                  {problem.overview || problem.description}
                </div>

                {/* Examples */}
                {problem.examples && problem.examples.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider text-slate-400">Examples</h3>
                    {problem.examples.map((ex, i) => (
                      <div key={i} className="bg-[#12141c] border border-white/10 rounded-xl p-3.5 space-y-2 font-mono text-xs">
                        <div className="font-bold text-slate-400">Example {i + 1}:</div>
                        <div><span className="text-indigo-400 font-bold">Input:</span> {ex.input}</div>
                        <div><span className="text-emerald-400 font-bold">Output:</span> {ex.output}</div>
                        {ex.explanation && (
                          <div className="text-slate-400 font-sans text-xs pt-1 border-t border-white/5">
                            <span className="font-semibold text-slate-300">Explanation:</span> {ex.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Constraints */}
                {problem.constraints && problem.constraints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Constraints</h3>
                    <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-300 bg-[#12141c] p-3 rounded-xl border border-white/10">
                      {problem.constraints.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hints */}
                {problem.hints && problem.hints.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-400" /> Hints
                    </h3>
                    <div className="space-y-2">
                      {problem.hints.map((hint, i) => {
                        const isExp = expandedHints[i];
                        return (
                          <div key={i} className="bg-[#12141c] border border-white/10 rounded-xl overflow-hidden text-xs">
                            <button
                              onClick={() => setExpandedHints((prev) => ({ ...prev, [i]: !prev[i] }))}
                              className="w-full px-3 py-2 text-left font-semibold text-slate-300 hover:bg-white/5 flex items-center justify-between cursor-pointer"
                            >
                              <span>Hint {i + 1}</span>
                              {isExp ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>
                            {isExp && (
                              <div className="px-3 py-2.5 bg-black/30 border-t border-white/5 text-slate-300 leading-relaxed font-sans">
                                {hint}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* EDITORIAL TAB */}
            {activeLeftTab === 'editorial' && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-base font-bold text-white">
                  <Sparkles className="w-5 h-5 text-amber-400" /> Official Editorial & Solution Approaches
                </div>

                <div className="bg-[#12141c] border border-white/10 rounded-xl p-4 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Time Complexity:</span>
                    <span className="text-emerald-400 font-bold">{problem.complexity?.time || 'O(N)'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Space Complexity:</span>
                    <span className="text-indigo-400 font-bold">{problem.complexity?.space || 'O(1)'}</span>
                  </div>
                </div>

                {problem.approaches && problem.approaches.length > 0 ? (
                  problem.approaches.map((app, i) => (
                    <div key={i} className="bg-[#12141c] border border-white/10 rounded-xl p-4 space-y-2">
                      <h4 className="font-bold text-indigo-300 text-sm">{app.name}</h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{app.explanation}</p>
                      <div className="flex items-center gap-4 text-xs font-mono text-slate-400 pt-2 border-t border-white/5">
                        <span>Time: <strong className="text-emerald-400">{app.timeComplexity}</strong></span>
                        <span>Space: <strong className="text-indigo-400">{app.spaceComplexity}</strong></span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">
                    Use Hash Map or Two Pointers technique to solve this problem efficiently in linear time.
                  </p>
                )}
              </div>
            )}

            {/* SUBMISSIONS TAB */}
            {activeLeftTab === 'submissions' && (
              <SubmissionsHistoryTab submissions={submissions} isLoading={isLoadingSubmissions} />
            )}

            {/* NOTES TAB */}
            {activeLeftTab === 'notes' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    <StickyNote className="w-4 h-4 text-cyan-400" /> Personal Notes & Key Takeaways
                  </h3>
                  <button
                    onClick={handleSaveNote}
                    disabled={isSavingNote}
                    className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSavingNote ? 'Saving...' : noteSavedFeedback ? 'Saved!' : 'Save Note'}
                  </button>
                </div>
                <textarea
                  value={personalNote}
                  onChange={(e) => setPersonalNote(e.target.value)}
                  placeholder="Write your notes, key takeaways, edge cases here..."
                  className="w-full h-64 bg-[#12141c] border border-white/10 rounded-xl p-3 text-xs text-slate-200 font-mono placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            )}
          </div>
        </div>

        {/* Horizontal Splitter */}
        <div
          onMouseDown={handleMouseDownH}
          className="w-1.5 bg-[#12141c] hover:bg-indigo-500/50 cursor-col-resize shrink-0 transition-colors flex items-center justify-center group"
        >
          <GripVertical className="w-3 h-3 text-slate-600 group-hover:text-indigo-300" />
        </div>

        {/* RIGHT PANEL: Monaco Code Editor + Bottom Console Panel */}
        <div ref={rightPanelRef} className="flex-1 min-w-0 flex flex-col h-full bg-[#0d0e12] overflow-hidden">
          {/* Top Code Editor */}
          <div className="flex-1 min-h-0 relative">
            <MonacoCodeEditor
              question={problem}
              language={language}
              onLanguageChange={handleLanguageChange}
              code={code}
              onCodeChange={setCode}
              onRun={handleRunCode}
              onSubmit={handleSubmitCode}
              onReset={handleResetCode}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              fontSize={fontSize}
              onFontSizeChange={handleFontSizeChange}
              editorTheme={editorTheme}
              onThemeChange={handleThemeChange}
            />
          </div>

          {/* Vertical Splitter */}
          <div
            onMouseDown={handleMouseDownV}
            className="h-1.5 bg-[#12141c] hover:bg-indigo-500/50 cursor-row-resize shrink-0 transition-colors flex items-center justify-center group"
          >
            <GripHorizontal className="w-3 h-3 text-slate-600 group-hover:text-indigo-300" />
          </div>

          {/* Bottom Console Panel */}
          <div style={{ height: `${consoleHeightPx}px` }} className="shrink-0 bg-[#0d0e12] border-t border-white/10 flex flex-col">
            <TestCaseConsolePanel
              testCases={problem.examples || []}
              customInput={customInput}
              onCustomInputChange={setCustomInput}
              executionResult={executionResult}
              activeTab={activeConsoleTab}
              onTabChange={setActiveConsoleTab}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemIDE;
