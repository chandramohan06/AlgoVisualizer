import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { RotateCcw, Copy, Check, Sun, Moon, Type } from 'lucide-react';
import { IPracticeQuestion } from '../../data/practice100EasyQuestions';

interface MonacoCodeEditorProps {
  question: IPracticeQuestion;
  language: 'java' | 'cpp' | 'python';
  onLanguageChange: (lang: 'java' | 'cpp' | 'python') => void;
  code: string;
  onCodeChange: (code: string) => void;
  onRun?: () => void;
  onSubmit?: () => void;
  onReset: () => void;
  isRunning?: boolean;
  isSubmitting?: boolean;
  fontSize?: number;
  onFontSizeChange?: (size: number) => void;
  editorTheme?: 'vs-dark' | 'vs';
  onThemeChange?: (theme: 'vs-dark' | 'vs') => void;
}

export const MonacoCodeEditor: React.FC<MonacoCodeEditorProps> = ({
  question: _question,
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onReset,
  fontSize: propFontSize,
  onFontSizeChange,
  editorTheme: propEditorTheme,
  onThemeChange,
}) => {
  const [internalEditorTheme, setInternalEditorTheme] = useState<'vs-dark' | 'vs'>('vs-dark');
  const [internalFontSize, setInternalFontSize] = useState<number>(14);
  const [copied, setCopied] = useState<boolean>(false);

  const activeFontSize = propFontSize !== undefined ? propFontSize : internalFontSize;
  const activeEditorTheme = propEditorTheme !== undefined ? propEditorTheme : internalEditorTheme;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMonacoLang = (lang: string) => {
    if (lang === 'cpp') return 'cpp';
    if (lang === 'java') return 'java';
    return 'python';
  };

  const handleThemeToggle = () => {
    const nextTheme = activeEditorTheme === 'vs-dark' ? 'vs' : 'vs-dark';
    if (onThemeChange) onThemeChange(nextTheme);
    else setInternalEditorTheme(nextTheme);
  };

  const handleSizeChange = (val: number) => {
    if (onFontSizeChange) onFontSizeChange(val);
    else setInternalFontSize(val);
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0e12] select-none overflow-hidden">
      {/* Editor Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-[#12141c] border-b border-white/10 shrink-0">
        {/* Language Selector */}
        <div className="flex items-center gap-1.5">
          {[
            { id: 'java', label: 'Java' },
            { id: 'cpp', label: 'C++' },
            { id: 'python', label: 'Python' },
          ].map((langItem) => (
            <button
              key={langItem.id}
              onClick={() => onLanguageChange(langItem.id as any)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer ${
                language === langItem.id
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {langItem.label}
            </button>
          ))}
        </div>

        {/* Controls & Actions */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded px-2 py-0.5 text-xs text-slate-400">
            <Type className="w-3 h-3 text-slate-500" />
            <select
              value={activeFontSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-xs font-mono"
            >
              <option value={12} className="bg-[#12141c]">12px</option>
              <option value={14} className="bg-[#12141c]">14px</option>
              <option value={16} className="bg-[#12141c]">16px</option>
              <option value={18} className="bg-[#12141c]">18px</option>
            </select>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
          >
            {activeEditorTheme === 'vs-dark' ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* Reset Code */}
          <button
            onClick={onReset}
            className="px-2.5 py-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset to starter code"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="px-2.5 py-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Copy Code"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Monaco Editor Container */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={getMonacoLang(language)}
          theme={activeEditorTheme}
          value={code}
          onChange={(val) => onCodeChange(val || '')}
          options={{
            fontSize: activeFontSize,
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 12, bottom: 12 },
            fontFamily: 'Fira Code, JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            fontLigatures: true,
            formatOnType: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
          }}
        />
      </div>
    </div>
  );
};
