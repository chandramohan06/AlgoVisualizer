import React, { useState, useEffect } from 'react';
import { getCategoryOperations } from '../../../algorithms/metadata/categoryOperations';
import { Play, Settings2, Sparkles } from 'lucide-react';

interface OperationsContextPanelProps {
  categorySlug: string;
  onExecuteOperation: (opId: string, inputParams: Record<string, any>) => void;
}

export const OperationsContextPanel: React.FC<OperationsContextPanelProps> = ({
  categorySlug,
  onExecuteOperation,
}) => {
  const operations = getCategoryOperations(categorySlug);
  const [selectedOpId, setSelectedOpId] = useState<string>(operations[0]?.id || 'traverse');
  const [inputValues, setInputValues] = useState<Record<string, any>>({});

  const activeOp = operations.find((o) => o.id === selectedOpId) || operations[0];

  // Reset input values when active operation changes
  useEffect(() => {
    if (activeOp && activeOp.inputs) {
      const initial: Record<string, any> = {};
      activeOp.inputs.forEach((param) => {
        initial[param.name] = param.defaultValue !== undefined ? param.defaultValue : '';
      });
      setInputValues(initial);
    }
  }, [selectedOpId, categorySlug]);

  const handleInputChange = (paramName: string, value: any) => {
    setInputValues((prev: Record<string, any>) => ({
      ...prev,
      [paramName]: value,
    }));
  };

  const handleRunOperation = () => {
    if (!activeOp) return;
    onExecuteOperation(activeOp.id, inputValues);
  };

  return (
    <div className="w-full bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 shadow-2xl space-y-4">
      {/* Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
            Interactive Operations Panel &bull; {categorySlug.toUpperCase()}
          </span>
        </div>
        {activeOp && (
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-amber-300 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-lg">
              ⏱ {activeOp.timeComplexity}
            </span>
            <span className="text-emerald-300 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-lg">
              💾 {activeOp.spaceComplexity}
            </span>
          </div>
        )}
      </div>

      {/* Operation Selection Chips */}
      <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-none select-none">
        {operations.map((op) => (
          <button
            key={op.id}
            onClick={() => setSelectedOpId(op.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedOpId === op.id
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-white/[0.03] border border-white/5 text-slate-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-indigo-300" />
            <span>{op.label}</span>
          </button>
        ))}
      </div>

      {/* Operation Active Description & Intelligent Input Toolbar */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex-1 min-w-[240px]">
          <p className="text-xs text-slate-300 font-medium leading-relaxed">
            {activeOp?.description || 'Select an operation to execute dynamically.'}
          </p>
        </div>

        {/* Dynamic Inputs Form */}
        <div className="flex items-center gap-3 flex-wrap">
          {activeOp?.inputs.map((param) => (
            <div key={param.name} className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">{param.label}:</span>
              <input
                type={param.type === 'number' ? 'number' : 'text'}
                value={inputValues[param.name] ?? ''}
                onChange={(e) => handleInputChange(param.name, e.target.value)}
                placeholder={param.placeholder || param.label}
                className="w-24 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>
          ))}

          <button
            onClick={handleRunOperation}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Execute Operation
          </button>
        </div>
      </div>
    </div>
  );
};

export default OperationsContextPanel;
