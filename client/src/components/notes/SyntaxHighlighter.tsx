import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

interface SyntaxHighlighterProps {
  javaCode?: string;
  cppCode?: string;
  pythonCode?: string;
  jsCode?: string;
  defaultLang?: 'java' | 'cpp' | 'python' | 'javascript';
}

export const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({
  javaCode,
  cppCode,
  pythonCode,
  jsCode,
  defaultLang = 'java',
}) => {
  const [activeLang, setActiveLang] = useState<'java' | 'cpp' | 'python' | 'javascript'>(defaultLang);
  const [copied, setCopied] = useState(false);

  const allLangs: Array<{ id: 'java' | 'cpp' | 'python' | 'javascript'; label: string; code?: string }> = [
    { id: 'java', label: 'Java', code: javaCode },
    { id: 'cpp', label: 'C++', code: cppCode },
    { id: 'python', label: 'Python', code: pythonCode },
    { id: 'javascript', label: 'JavaScript', code: jsCode },
  ];
  const availableLanguages = allLangs.filter((item) => item.code && item.code.trim().length > 0);

  const currentCode = availableLanguages.find((l) => l.id === activeLang)?.code || availableLanguages[0]?.code || '';

  const handleCopy = () => {
    if (!currentCode) return;
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = currentCode.split('\n');

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-xl my-4">
      {/* Top Header Bar with Language Selectors */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <Code2 className="w-4 h-4 text-indigo-400 mr-2 shrink-0" />
          {availableLanguages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setActiveLang(lang.id)}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded-lg transition-all cursor-pointer ${
                activeLang === lang.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 transition-all cursor-pointer shrink-0"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-slate-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Viewer with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed bg-[#0a0d14]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02]">
                <td className="w-10 select-none text-right pr-4 text-slate-600 text-[11px] align-top font-mono">
                  {idx + 1}
                </td>
                <td className="text-slate-200 whitespace-pre font-mono">
                  {highlightLine(line, activeLang)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Syntax Token Highlighting Helper
function highlightLine(line: string, lang: string): React.ReactNode {
  if (line.trim().startsWith('//') || line.trim().startsWith('#') || line.trim().startsWith('/*')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  const keywords =
    lang === 'python'
      ? ['def', 'class', 'import', 'from', 'return', 'if', 'else', 'elif', 'while', 'for', 'in', 'and', 'or', 'not', 'True', 'False', 'None']
      : ['public', 'private', 'protected', 'class', 'void', 'int', 'boolean', 'bool', 'char', 'double', 'float', 'return', 'if', 'else', 'while', 'for', 'static', 'const', 'new', 'struct', 'include', 'using', 'namespace', 'true', 'false', 'function', 'let', 'const', 'var'];

  const words = line.split(/(\s+|[(){}[\];,.<>:=+\-*/%&|^!])/);

  return (
    <>
      {words.map((token, i) => {
        if (keywords.includes(token.trim())) {
          return <span key={i} className="text-purple-400 font-bold">{token}</span>;
        }
        if (/^".*"$/.test(token) || /^'.*'$/.test(token)) {
          return <span key={i} className="text-emerald-400">{token}</span>;
        }
        if (/^\d+$/.test(token)) {
          return <span key={i} className="text-amber-400">{token}</span>;
        }
        if (/^[A-Z][a-zA-Z0-9_]*$/.test(token)) {
          return <span key={i} className="text-cyan-300">{token}</span>;
        }
        return <span key={i}>{token}</span>;
      })}
    </>
  );
}

export default SyntaxHighlighter;
