import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Clock, Cpu, Terminal, Layers, FileText } from 'lucide-react';
import { IPracticeQuestion } from '../../data/practice100EasyQuestions';

export interface ITestResultItem {
  testCaseIndex: number;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  passed: boolean;
  runtimeMs?: number;
  memoryMb?: number;
}

export type VerdictType =
  | 'Accepted'
  | 'Wrong Answer'
  | 'Compile Error'
  | 'Runtime Error'
  | 'Time Limit Exceeded'
  | 'Memory Limit Exceeded'
  | 'Presentation Error';

export interface IExecutionResult {
  verdict: VerdictType;
  passedCount: number;
  totalCount: number;
  runtimeMs: number;
  memoryMb: number;
  language?: string;
  stdout?: string;
  stderr?: string;
  testResults?: ITestResultItem[];
  isSubmission?: boolean;
}

interface TestCaseConsolePanelProps {
  question: IPracticeQuestion;
  customInput: string;
  onCustomInputChange: (val: string) => void;
  executionResult: IExecutionResult | null;
  activeTab: 'testcases' | 'customInput' | 'console' | 'result' | 'executionDetails';
  setActiveTab: (tab: 'testcases' | 'customInput' | 'console' | 'result' | 'executionDetails') => void;
}

export const TestCaseConsolePanel: React.FC<TestCaseConsolePanelProps> = ({
  question,
  customInput,
  onCustomInputChange,
  executionResult,
  activeTab,
  setActiveTab,
}) => {
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState<number>(0);

  const getVerdictBadgeClass = (verdict: string) => {
    switch (verdict) {
      case 'Accepted':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';
      case 'Wrong Answer':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'Compile Error':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'Runtime Error':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Time Limit Exceeded':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40';
      case 'Memory Limit Exceeded':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/40';
      case 'Presentation Error':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/40';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] select-none text-slate-200 overflow-hidden font-sans">
      {/* Panel Tab Navigation */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-[#12141c] border-b border-white/10 shrink-0 text-xs">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => setActiveTab('testcases')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'testcases'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Example Test Cases
          </button>

          <button
            onClick={() => setActiveTab('customInput')}
            className={`px-3 py-1 rounded-md font-semibold transition-colors ${
              activeTab === 'customInput'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            Custom Input
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={`px-3 py-1 rounded-md font-semibold flex items-center gap-1.5 transition-colors ${
              activeTab === 'console'
                ? 'bg-indigo-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> Console / Output
          </button>

          {executionResult && (
            <>
              <button
                onClick={() => setActiveTab('result')}
                className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition-colors border ${getVerdictBadgeClass(executionResult.verdict)}`}
              >
                {executionResult.verdict === 'Accepted' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-3.5 h-3.5" />
                )}
                {executionResult.isSubmission ? 'Submission Verdict' : 'Run Output'} ({executionResult.verdict})
              </button>

              <button
                onClick={() => setActiveTab('executionDetails')}
                className={`px-3 py-1 rounded-md font-bold flex items-center gap-1.5 transition-colors ${
                  activeTab === 'executionDetails'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Execution Details
              </button>
            </>
          )}
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-4 overflow-y-auto custom-scrollbar font-mono text-xs">
        {/* TAB 1: Example Test Cases */}
        {activeTab === 'testcases' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {question.testCases.map((_: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => setSelectedTestCaseIdx(idx)}
                  className={`px-3 py-1 rounded-md border transition-all font-bold ${
                    selectedTestCaseIdx === idx
                      ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Case {idx + 1}
                </button>
              ))}
            </div>

            {question.testCases[selectedTestCaseIdx] && (
              <div className="space-y-3 bg-[#12141c] p-4 rounded-xl border border-white/5">
                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                    Input:
                  </label>
                  <pre className="bg-[#090a0f] p-3 rounded-lg border border-white/5 text-slate-200 overflow-x-auto whitespace-pre-wrap">
                    {question.testCases[selectedTestCaseIdx].input}
                  </pre>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 uppercase tracking-wider font-bold block mb-1">
                    Expected Output:
                  </label>
                  <pre className="bg-[#090a0f] p-3 rounded-lg border border-white/5 text-emerald-400 font-bold overflow-x-auto whitespace-pre-wrap">
                    {question.testCases[selectedTestCaseIdx].expectedOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Custom Input */}
        {activeTab === 'customInput' && (
          <div className="space-y-2 h-full flex flex-col font-sans">
            <label className="text-xs font-semibold text-slate-300">Enter custom testcase input string:</label>
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="e.g. nums = [2,7,11,15], target = 9"
              rows={5}
              className="flex-1 w-full bg-[#12141c] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 font-mono resize-none"
            />
          </div>
        )}

        {/* TAB 3: Console / Logs */}
        {activeTab === 'console' && (
          <div className="space-y-3 font-mono">
            <div className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-indigo-400" /> Standard Output / Execution Logs:
            </div>
            <pre className="bg-[#12141c] p-4 rounded-xl border border-white/10 text-slate-300 min-h-[140px] whitespace-pre-wrap">
              {executionResult?.stdout || executionResult?.stderr || 'No execution logs recorded yet. Click Run or Submit to test your code.'}
            </pre>
          </div>
        )}

        {/* TAB 4: Verdict Result */}
        {activeTab === 'result' && executionResult && (
          <div className="space-y-4 font-sans">
            <div className={`p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 ${getVerdictBadgeClass(executionResult.verdict)}`}>
              <div className="space-y-1">
                <div className="text-lg font-black tracking-wide flex items-center gap-2">
                  {executionResult.verdict === 'Accepted' ? (
                    <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-400" />
                  )}
                  {executionResult.verdict}
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  Passed Test Cases: <strong className="text-white font-mono">{executionResult.passedCount} / {executionResult.totalCount}</strong>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 bg-[#090a0f]/60 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>Runtime: <strong className="text-white">{executionResult.runtimeMs} ms</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#090a0f]/60 px-3 py-1.5 rounded-lg border border-white/10">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>Memory: <strong className="text-white">{executionResult.memoryMb} MB</strong></span>
                </div>
              </div>
            </div>

            {/* Test Results Breakdown */}
            {executionResult.testResults && executionResult.testResults.length > 0 && (
              <div className="space-y-3 font-mono">
                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider font-sans">Test Suite Details</div>
                <div className="space-y-2">
                  {executionResult.testResults.map((tr, idx) => (
                    <div key={idx} className="bg-[#12141c] p-3 rounded-xl border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300">Testcase {tr.testCaseIndex}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded border ${
                          tr.passed
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        }`}>
                          {tr.passed ? 'PASSED' : 'FAILED'}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500 font-semibold">Input: </span>
                          <span className="text-white bg-[#090a0f] px-2 py-0.5 rounded">{tr.input}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold">Expected: </span>
                          <span className="text-emerald-400 bg-[#090a0f] px-2 py-0.5 rounded">{tr.expectedOutput}</span>
                        </div>
                        <div>
                          <span className="text-slate-500 font-semibold">Actual Output: </span>
                          <span className={`px-2 py-0.5 rounded bg-[#090a0f] ${tr.passed ? 'text-emerald-400' : 'text-rose-400 font-bold'}`}>
                            {tr.actualOutput}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Execution Details */}
        {activeTab === 'executionDetails' && executionResult && (
          <div className="space-y-4 font-sans">
            <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
              <FileText className="w-4 h-4 text-indigo-400" /> Detailed Execution Metrics
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Runtime</div>
                <div className="text-base font-black text-blue-400 font-mono mt-1">{executionResult.runtimeMs} ms</div>
              </div>

              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Memory</div>
                <div className="text-base font-black text-purple-400 font-mono mt-1">{executionResult.memoryMb} MB</div>
              </div>

              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Language</div>
                <div className="text-base font-black text-indigo-400 uppercase font-mono mt-1">{executionResult.language || 'Python'}</div>
              </div>

              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Exec Time</div>
                <div className="text-base font-black text-slate-200 font-mono mt-1">{(executionResult.runtimeMs / 1000).toFixed(3)} s</div>
              </div>

              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Passed</div>
                <div className="text-base font-black text-emerald-400 font-mono mt-1">{executionResult.passedCount}</div>
              </div>

              <div className="bg-[#12141c] p-3 rounded-xl border border-white/10 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold">Failed</div>
                <div className="text-base font-black text-rose-400 font-mono mt-1">{executionResult.totalCount - executionResult.passedCount}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
