import React, { useState } from 'react';
import { Terminal, Copy, Check, Download } from 'lucide-react';
import { cn } from '@utils/index';

interface CodeViewerProps {
  javaCode: string;
  cppCode: string;
  pythonCode?: string;
  pseudoCode: string;
  highlightedLine: number; // 1-indexed
}

export const CodeViewerPanel: React.FC<CodeViewerProps> = ({
  javaCode,
  cppCode,
  pythonCode,
  pseudoCode,
  highlightedLine,
}) => {
  const [activeTab, setActiveTab] = useState<'java' | 'cpp' | 'python' | 'pseudo'>('java');
  const [copied, setCopied] = useState(false);

  const getCodeString = () => {
    switch (activeTab) {
      case 'java':
        return javaCode || '// Java implementation loading...';
      case 'cpp':
        return cppCode || '// C++ implementation loading...';
      case 'python':
        return pythonCode || '# Python implementation loading...';
      case 'pseudo':
        return pseudoCode || '# Pseudocode loading...';
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCodeString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === 'cpp' ? 'cpp' : activeTab === 'java' ? 'java' : activeTab === 'python' ? 'py' : 'txt';
    const blob = new Blob([getCodeString()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `solution.${ext}`;
    link.click();
  };

  const lines = getCodeString().split('\n');

  return (
    <div className="w-full bg-[#111827]/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col h-full shadow-xl">
      {/* Gutter header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.01] border-b border-white/5 shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Implementation Code</span>
        </div>
        
        <div className="flex items-center gap-1.5">
          {/* Language Tabs */}
          {(['java', 'cpp', 'python', 'pseudo'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-2.5 py-1 rounded-lg text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer',
                activeTab === tab
                  ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                  : 'text-slate-500 hover:text-slate-300 border border-transparent'
              )}
            >
              {tab === 'cpp' ? 'C++' : tab === 'python' ? 'Python' : tab}
            </button>
          ))}
          <div className="w-px h-4 bg-white/5 mx-1" />
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          {/* Download button */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            title="Download Code"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-black/40">
        <div className="min-w-full inline-block">
          {lines.map((line, i) => {
            const lineNum = i + 1;
            const isHighlighted = lineNum === highlightedLine;

            return (
              <div
                key={i}
                className={cn(
                  'flex items-center px-4 -mx-4 transition-colors duration-200',
                  isHighlighted && 'code-line-active text-white font-semibold'
                )}
              >
                {/* Line Gutter */}
                <span className={cn(
                  'w-8 text-right select-none pr-4 shrink-0 font-mono',
                  isHighlighted ? 'text-blue-400 font-bold' : 'text-slate-600'
                )}>
                  {lineNum}
                </span>
                {/* Code statement */}
                <span className="whitespace-pre">{line}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CodeViewerPanel;
