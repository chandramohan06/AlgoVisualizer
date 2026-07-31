import React, { useState, useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { RotateCcw, Copy, Check, Sun, Moon, Type, Maximize2, Minimize2, Play, Send, Code2, Download } from 'lucide-react';

interface MonacoCodeEditorProps {
  question?: any;
  language: 'java' | 'cpp';
  onLanguageChange: (lang: 'java' | 'cpp') => void;
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
  language,
  onLanguageChange,
  code,
  onCodeChange,
  onRun,
  onSubmit,
  onReset,
  isRunning = false,
  isSubmitting = false,
  fontSize: propFontSize,
  onFontSizeChange,
  editorTheme: propEditorTheme,
  onThemeChange,
}) => {
  const [internalEditorTheme, setInternalEditorTheme] = useState<'vs-dark' | 'vs'>('vs-dark');
  const [internalFontSize, setInternalFontSize] = useState<number>(14);
  const [copied, setCopied] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('on');
  const [minimap, setMinimap] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);

  const activeFontSize = propFontSize !== undefined ? propFontSize : internalFontSize;
  const activeEditorTheme = propEditorTheme !== undefined ? propEditorTheme : internalEditorTheme;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = language === 'cpp' ? 'cpp' : 'java';
    const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Solution.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
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

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Shortcut: Ctrl+Enter or Cmd+Enter to Run Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      if (onRun && !isRunning && !isSubmitting) {
        onRun();
      }
    });

    // Shortcut: Ctrl+Shift+Enter to Submit Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.Enter, () => {
      if (onSubmit && !isSubmitting && !isRunning) {
        onSubmit();
      }
    });

    // Shortcut: Ctrl+S to Format Code
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument')?.run();
    });
  };

  const handleFormatCode = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument')?.run();
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col h-full bg-[#0d0e12] select-none overflow-hidden font-sans">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 bg-[#12141c] border-b border-white/10 shrink-0">
        {/* Language Tabs: Java & C++ ONLY */}
        <div className="flex items-center gap-1.5">
          {[
            { id: 'java', label: 'Java 17', badge: 'JVM' },
            { id: 'cpp', label: 'C++ 20', badge: 'GCC' },
          ].map((langItem) => (
            <button
              key={langItem.id}
              onClick={() => onLanguageChange(langItem.id as 'java' | 'cpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                language === langItem.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{langItem.label}</span>
              <span className="text-[10px] opacity-70 px-1 py-0.2 bg-black/30 rounded">{langItem.badge}</span>
            </button>
          ))}
        </div>

        {/* Action Controls & Settings */}
        <div className="flex items-center gap-2">
          {/* Font Size Selector */}
          <div className="flex items-center gap-1 bg-[#090a0f] border border-white/10 rounded px-2 py-1 text-xs text-slate-400">
            <Type className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeFontSize}
              onChange={(e) => handleSizeChange(Number(e.target.value))}
              className="bg-transparent text-slate-300 focus:outline-none cursor-pointer text-xs font-mono"
            >
              <option value={12} className="bg-[#12141c]">12px</option>
              <option value={14} className="bg-[#12141c]">14px</option>
              <option value={16} className="bg-[#12141c]">16px</option>
              <option value={18} className="bg-[#12141c]">18px</option>
              <option value={20} className="bg-[#12141c]">20px</option>
            </select>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={handleThemeToggle}
            className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Toggle Light / Dark Monaco Theme"
          >
            {activeEditorTheme === 'vs-dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
          </button>

          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Format Code (Ctrl+S)"
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          </button>

          {/* Minimap Toggle */}
          <button
            onClick={() => setMinimap(!minimap)}
            className={`px-2 py-1 rounded text-xs font-medium font-mono transition-colors cursor-pointer ${
              minimap ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
            title="Toggle Minimap"
          >
            Map
          </button>

          {/* Word Wrap Toggle */}
          <button
            onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
            className={`px-2 py-1 rounded text-xs font-medium font-mono transition-colors cursor-pointer ${
              wordWrap === 'on' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
            title="Toggle Word Wrap"
          >
            Wrap
          </button>

          {/* Download Solution */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Download Code File"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          {/* Reset Code */}
          <button
            onClick={onReset}
            className="px-2.5 py-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Reset to starter template"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>

          {/* Copy Code */}
          <button
            onClick={handleCopyCode}
            className="px-2.5 py-1 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            {copied ? 'Copied' : 'Copy'}
          </button>

          {/* Fullscreen Mode */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Fullscreen IDE"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Monaco Code Editor */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={language === 'cpp' ? 'cpp' : 'java'}
          theme={activeEditorTheme}
          value={code}
          onChange={(val) => onCodeChange(val || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize: activeFontSize,
            lineNumbers: 'on',
            minimap: { enabled: minimap },
            wordWrap,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            padding: { top: 12, bottom: 12 },
            fontFamily: 'Fira Code, JetBrains Mono, Menlo, Monaco, Consolas, monospace',
            fontLigatures: true,
            formatOnType: true,
            quickSuggestions: true,
            suggestOnTriggerCharacters: true,
            bracketPairColorization: { enabled: true },
            autoClosingBrackets: 'always',
            autoClosingQuotes: 'always',
            folding: true,
            smoothScrolling: true,
            multiCursorModifier: 'ctrlCmd',
          }}
        />
      </div>

      {/* Action Footer Bar for Quick Run & Submit */}
      {(onRun || onSubmit) && (
        <div className="flex items-center justify-between px-4 py-2 bg-[#12141c] border-t border-white/10 shrink-0">
          <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
            <span><kbd className="px-1.5 py-0.5 bg-black/40 rounded border border-white/10 text-slate-300">Ctrl+Enter</kbd> Run</span>
            <span><kbd className="px-1.5 py-0.5 bg-black/40 rounded border border-white/10 text-slate-300">Ctrl+Shift+Enter</kbd> Submit</span>
          </div>

          <div className="flex items-center gap-2">
            {onRun && (
              <button
                onClick={onRun}
                disabled={isRunning || isSubmitting}
                className="px-4 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-50 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400" />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
            )}

            {onSubmit && (
              <button
                onClick={onSubmit}
                disabled={isRunning || isSubmitting}
                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/30 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                {isSubmitting ? 'Submitting...' : 'Submit Code'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
