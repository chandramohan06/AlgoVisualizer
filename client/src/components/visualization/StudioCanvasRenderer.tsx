import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IVisualizationStep } from './visualizationStudioRegistry';
import { ArrowRight, Sparkles, Database } from 'lucide-react';

interface StudioCanvasRendererProps {
  currentStep: IVisualizationStep;
}

export const StudioCanvasRenderer: React.FC<StudioCanvasRendererProps> = ({ currentStep }) => {
  // ── 1. DEDICATED RAM MEMORY & ARRAY RENDERER ──────────────────────────────
  if (currentStep.arrayData && currentStep.arrayData.length > 0) {
    const arr = currentStep.arrayData;
    const maxVal = Math.max(...arr, 100);

    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 relative">
        <div className="flex items-end justify-center gap-3 md:gap-4 h-72 w-full max-w-5xl px-4 relative">
          {arr.map((val, idx) => {
            const heightPct = Math.max((val / maxVal) * 100, 16);
            const isActive = currentStep.activeIndices?.includes(idx);
            const isCompared = currentStep.comparedIndices?.includes(idx);
            const isSwapped = currentStep.swappedIndices?.includes(idx);
            const isSorted = currentStep.sortedIndices?.includes(idx);

            let barStyle = 'from-slate-800 to-slate-900 text-slate-300 border-white/10 shadow-md';
            let ringGlow = 'none';

            if (isSorted) {
              barStyle = 'from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-xl shadow-emerald-500/20';
              ringGlow = '0 0 20px rgba(16,185,129,0.3)';
            } else if (isSwapped) {
              barStyle = 'from-rose-600 to-pink-700 text-white border-rose-400 shadow-2xl shadow-rose-500/40 scale-105';
              ringGlow = '0 0 25px rgba(244,63,94,0.4)';
            } else if (isCompared) {
              barStyle = 'from-amber-500 to-orange-600 text-white border-amber-400 shadow-2xl shadow-amber-500/40 scale-105';
              ringGlow = '0 0 25px rgba(245,158,11,0.4)';
            } else if (isActive) {
              barStyle = 'from-indigo-500 to-blue-600 text-white border-indigo-400 shadow-2xl shadow-indigo-500/40 scale-105';
              ringGlow = '0 0 25px rgba(99,102,241,0.4)';
            }

            // Simulated RAM memory address (e.g. 0x1000, 0x1004, 0x1008)
            const ramAddress = `0x${(0x1000 + idx * 4).toString(16).toUpperCase()}`;

            return (
              <motion.div
                key={idx}
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                className="flex flex-col items-center gap-2 flex-1 max-w-[64px] relative group"
              >
                {/* Dynamic Pointer Badges */}
                <div className="h-8 flex flex-col items-center justify-end font-mono text-[10px] font-bold text-amber-300">
                  {Object.entries(currentStep.pointerMap || {}).map(([key, pVal]) => (
                    pVal === idx ? (
                      <motion.span
                        key={key}
                        initial={{ scale: 0.8, y: -5 }}
                        animate={{ scale: 1, y: 0 }}
                        className="px-2 py-0.5 rounded-md bg-gradient-to-r from-amber-500 to-orange-500 text-black font-mono font-black text-[10px] uppercase shadow-lg shadow-amber-500/30 tracking-wider"
                      >
                        {key}
                      </motion.span>
                    ) : null
                  ))}
                </div>

                {/* 3D Visual Pillar */}
                <motion.div
                  className={`w-full rounded-2xl bg-gradient-to-t border transition-all duration-300 flex flex-col justify-between items-center py-3 ${barStyle}`}
                  style={{ height: `${heightPct}%`, boxShadow: ringGlow }}
                >
                  <span className="font-mono text-sm font-black tracking-tight">{val}</span>
                </motion.div>

                {/* RAM Address & Index Labels */}
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[9px] font-mono text-indigo-400/80 font-bold">{ramAddress}</span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                    [{idx}]
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── 2. DEDICATED STRING SUBSTRING & PATTERN MATCHING RENDERER ────────────
  if (currentStep.stringData) {
    const chars = currentStep.stringData.split('');
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" /> String Pattern &amp; Window Inspector
        </div>

        <div className="flex items-center justify-center gap-3 w-full max-w-4xl p-6 bg-[#090d16] border border-white/10 rounded-3xl shadow-2xl">
          {chars.map((char, idx) => {
            const isCompared = currentStep.comparedIndices?.includes(idx);
            const isSorted = currentStep.sortedIndices?.includes(idx);
            const isActive = currentStep.activeIndices?.includes(idx);

            return (
              <motion.div
                key={idx}
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`w-14 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-mono transition-all ${
                  isSorted
                    ? 'bg-emerald-950/40 border-emerald-400 text-emerald-300 shadow-xl shadow-emerald-500/20'
                    : isCompared
                    ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-2xl shadow-amber-500/30 scale-110'
                    : isActive
                    ? 'bg-indigo-600/40 border-indigo-400 text-white shadow-2xl shadow-indigo-500/30 scale-105'
                    : 'bg-[#0d1117] border-white/10 text-white'
                }`}
              >
                <div className="text-[9px] text-amber-400 font-bold uppercase">
                  {Object.entries(currentStep.pointerMap || {}).map(([k, v]) => (v === idx ? k : null))}
                </div>
                <span className="text-xl font-black">{char}</span>
                <span className="text-[9px] text-slate-500 font-bold">[{idx}]</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // ── 3. DEDICATED LINKED LIST RENDERER ─────────────────────────────────────
  if (currentStep.linkedListData) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="flex items-center justify-center gap-3 w-full max-w-5xl overflow-x-auto custom-scrollbar p-4">
          {currentStep.linkedListData.map((node, idx) => (
            <React.Fragment key={node.id}>
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`p-5 rounded-3xl border flex flex-col items-center gap-2 min-w-[110px] relative transition-all ${
                  node.state === 'sorted'
                    ? 'bg-emerald-950/40 border-emerald-400 text-emerald-300 shadow-xl shadow-emerald-500/20'
                    : node.state === 'active'
                    ? 'bg-indigo-950/50 border-indigo-400 text-indigo-300 shadow-2xl shadow-indigo-500/30 scale-105'
                    : 'bg-[#0d1117] border-white/10 text-white shadow-lg'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  {node.isHead && <span className="text-[9px] px-2 py-0.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-black rounded-full font-mono">HEAD</span>}
                  {node.isTail && <span className="text-[9px] px-2 py-0.5 bg-purple-500/20 border border-purple-500/40 text-purple-300 font-black rounded-full font-mono">TAIL</span>}
                </div>
                <span className="font-mono text-xl font-black">{node.val}</span>
                <span className="text-[10px] font-mono text-slate-500 font-bold">Node #{idx + 1}</span>
              </motion.div>

              {idx < currentStep.linkedListData!.length - 1 && (
                <div className="flex flex-col items-center gap-1">
                  <ArrowRight className="w-6 h-6 text-indigo-400 shrink-0 animate-pulse" />
                  <span className="text-[9px] font-mono text-slate-500 font-bold">next</span>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  // ── 4. DEDICATED STACK LIFO RENDERER ─────────────────────────────────────
  if (currentStep.stackData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="w-64 border-4 border-t-0 border-indigo-500/30 rounded-b-3xl p-4 flex flex-col-reverse gap-3 bg-[#0d1117]/80 min-h-[220px] shadow-2xl relative">
          <AnimatePresence>
            {currentStep.stackData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: -40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`p-3.5 rounded-2xl border text-center font-mono font-bold text-sm flex items-center justify-between shadow-lg ${
                  item.isTop
                    ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400 text-amber-300 shadow-amber-500/20'
                    : 'bg-slate-950 border-white/10 text-slate-200'
                }`}
              >
                <span className="font-black">{item.val}</span>
                {item.isTop && <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-500 text-black font-black font-mono">TOP</span>}
              </motion.div>
            ))}
          </AnimatePresence>
          {currentStep.stackData.length === 0 && (
            <div className="text-center text-xs font-mono text-slate-500 my-auto italic">Stack Empty (LIFO Memory)</div>
          )}
        </div>
      </div>
    );
  }

  // ── 5. DEDICATED QUEUE FIFO RENDERER ─────────────────────────────────────
  if (currentStep.queueData) {
    return (
      <div className="w-full h-full flex items-center justify-center p-6">
        <div className="border-4 border-x-0 border-indigo-500/30 rounded-2xl p-4 flex items-center gap-4 bg-[#0d1117]/80 min-w-[380px] min-h-[90px] shadow-2xl">
          <AnimatePresence>
            {currentStep.queueData.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className={`px-5 py-3 rounded-2xl border text-center font-mono font-bold text-sm flex flex-col items-center gap-1.5 shadow-lg ${
                  item.isFront
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-emerald-500/20'
                    : 'bg-slate-950 border-white/10 text-slate-200'
                }`}
              >
                <span className="font-black text-base">{item.val}</span>
                <div className="flex gap-1">
                  {item.isFront && <span className="text-[8px] px-1.5 bg-emerald-500 text-black font-black rounded">FRONT</span>}
                  {item.isRear && <span className="text-[8px] px-1.5 bg-indigo-500 text-white font-black rounded">REAR</span>}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {currentStep.queueData.length === 0 && (
            <div className="text-center text-xs font-mono text-slate-500 mx-auto italic">Queue Empty (FIFO Memory)</div>
          )}
        </div>
      </div>
    );
  }

  // ── 6. DEDICATED DP MATRIX TABLE RENDERER ─────────────────────────────────
  if (currentStep.dpTableData) {
    const { headers, rows, activeCell } = currentStep.dpTableData;
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 space-y-4">
        <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2">
          <Database className="w-4 h-4 text-cyan-400" /> DP Memoization Table Matrix
        </div>

        <div className="overflow-x-auto border border-white/10 rounded-2xl bg-[#090d16] p-4 shadow-2xl">
          <table className="border-collapse font-mono text-xs text-center">
            <thead>
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="p-2 border border-white/10 text-indigo-400 font-bold bg-white/5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  {row.map((cell, cIdx) => {
                    const isActive = activeCell && activeCell[0] === rIdx && activeCell[1] === cIdx;
                    return (
                      <td
                        key={cIdx}
                        className={`p-3 border border-white/10 font-bold transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/50 scale-110'
                            : 'text-slate-300 hover:bg-white/5'
                        }`}
                      >
                        {cell}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // ── 7. DEDICATED TREE RENDERER ───────────────────────────────────────────
  if (currentStep.treeData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {currentStep.treeData.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`w-16 h-16 rounded-full border-2 flex items-center justify-center font-mono font-black text-base shadow-xl ${
                node.state === 'active'
                  ? 'bg-indigo-600 border-indigo-300 text-white shadow-indigo-500/40 scale-110'
                  : node.state === 'visited'
                  ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-500/30'
                  : 'bg-[#0d1117] border-white/20 text-slate-200'
              }`}
            >
              {node.label}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ── 8. DEDICATED GRAPH RENDERER ──────────────────────────────────────────
  if (currentStep.graphData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6">
        <div className="flex flex-wrap justify-center gap-6 max-w-4xl">
          {currentStep.graphData.nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`w-16 h-16 rounded-3xl border-2 flex flex-col items-center justify-center font-mono font-black text-sm shadow-xl ${
                node.state === 'active'
                  ? 'bg-purple-600 border-purple-300 text-white shadow-purple-500/40 scale-110'
                  : node.state === 'path'
                  ? 'bg-amber-600 border-amber-300 text-white shadow-amber-500/30'
                  : node.state === 'visited'
                  ? 'bg-emerald-600 border-emerald-300 text-white shadow-emerald-500/20'
                  : 'bg-[#0d1117] border-white/20 text-slate-200'
              }`}
            >
              <span>{node.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback Step Description Stage
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="p-4 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
        <Sparkles className="w-8 h-8 text-amber-400 animate-pulse" />
      </div>
      <h3 className="text-lg font-black text-white font-mono">{currentStep.description}</h3>
    </div>
  );
};

export default StudioCanvasRenderer;
