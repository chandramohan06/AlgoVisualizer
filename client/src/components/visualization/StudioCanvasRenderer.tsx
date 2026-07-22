import React from 'react';
import { motion } from 'framer-motion';
import { IVisualizationStep } from './visualizationStudioRegistry';
import { ArrowRight, CornerDownRight, Sparkles } from 'lucide-react';

interface StudioCanvasRendererProps {
  currentStep: IVisualizationStep;
}

export const StudioCanvasRenderer: React.FC<StudioCanvasRendererProps> = ({ currentStep }) => {
  // ── 1. ARRAY & BARS CANVAS ──────────────────────────────────────────────
  if (currentStep.arrayData && currentStep.arrayData.length > 0) {
    const arr = currentStep.arrayData;
    const maxVal = Math.max(...arr, 100);

    return (
      <div className="flex items-end justify-center gap-3 md:gap-4 h-64 w-full px-4 relative">
        {arr.map((val, idx) => {
          const heightPct = Math.max((val / maxVal) * 100, 15);
          const isActive = currentStep.activeIndices?.includes(idx);
          const isCompared = currentStep.comparedIndices?.includes(idx);
          const isSwapped = currentStep.swappedIndices?.includes(idx);
          const isSorted = currentStep.sortedIndices?.includes(idx);

          let barStyle = 'from-slate-700 to-slate-800 text-slate-300 border-white/10 shadow-md';
          if (isSorted) barStyle = 'from-emerald-600 to-teal-700 text-white border-emerald-400 shadow-xl shadow-emerald-500/20';
          else if (isSwapped) barStyle = 'from-rose-600 to-pink-700 text-white border-rose-400 shadow-xl shadow-rose-500/30 scale-105';
          else if (isCompared) barStyle = 'from-amber-500 to-orange-600 text-white border-amber-400 shadow-xl shadow-amber-500/30 scale-105';
          else if (isActive) barStyle = 'from-indigo-500 to-blue-600 text-white border-indigo-400 shadow-xl shadow-indigo-500/30 scale-105';

          return (
            <motion.div
              key={idx}
              layout
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="flex flex-col items-center gap-2 flex-1 max-w-[60px]"
            >
              {/* Pointer Badges */}
              <div className="h-6 flex flex-col items-center justify-end font-mono text-[10px] font-bold text-amber-300">
                {Object.entries(currentStep.pointerMap || {}).map(([key, pVal]) => (
                  pVal === idx ? (
                    <span key={key} className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-500/40 text-[9px] uppercase tracking-wider animate-bounce">
                      {key}
                    </span>
                  ) : null
                ))}
              </div>

              {/* 3D Animated Bar Column */}
              <div
                className={`w-full rounded-2xl bg-gradient-to-t border transition-all duration-300 flex flex-col justify-between items-center py-2 ${barStyle}`}
                style={{ height: `${heightPct}%` }}
              >
                <span className="font-mono text-xs font-black">{val}</span>
              </div>

              {/* Index Label */}
              <span className="text-[10px] font-mono text-slate-500 font-bold">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ── 2. STRING CHARACTERS CANVAS ──────────────────────────────────────────
  if (currentStep.stringData) {
    const chars = currentStep.stringData.split('');
    return (
      <div className="flex items-center justify-center gap-3 h-64 w-full px-4 font-mono">
        {chars.map((char, idx) => {
          const isCompared = currentStep.comparedIndices?.includes(idx);
          const isSorted = currentStep.sortedIndices?.includes(idx);

          return (
            <motion.div
              key={idx}
              layout
              className={`w-14 h-16 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                isSorted
                  ? 'bg-emerald-600/30 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : isCompared
                  ? 'bg-amber-500/30 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/30 scale-110'
                  : 'bg-slate-800/80 border-white/10 text-white'
              }`}
            >
              {/* Pointer Badges */}
              <div className="text-[9px] text-indigo-400 font-bold uppercase">
                {Object.entries(currentStep.pointerMap || {}).map(([k, v]) => (v === idx ? k : null))}
              </div>
              <span className="text-lg font-black">{char}</span>
              <span className="text-[9px] text-slate-500 font-bold">[{idx}]</span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // ── 3. LINKED LIST POINTER CANVAS ─────────────────────────────────────────
  if (currentStep.linkedListData) {
    return (
      <div className="flex items-center justify-center gap-2 h-64 w-full px-4 overflow-x-auto custom-scrollbar">
        {currentStep.linkedListData.map((node, idx) => (
          <React.Fragment key={node.id}>
            <motion.div
              layout
              className={`p-4 rounded-2xl border flex flex-col items-center gap-1.5 min-w-[90px] ${
                node.state === 'sorted'
                  ? 'bg-emerald-600/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/20'
                  : node.state === 'active'
                  ? 'bg-indigo-600/30 border-indigo-400 text-indigo-300 shadow-lg shadow-indigo-500/30 scale-105'
                  : 'bg-slate-800/80 border-white/10 text-white'
              }`}
            >
              <div className="flex items-center gap-1">
                {node.isHead && <span className="text-[9px] px-1 bg-amber-500/20 text-amber-300 font-bold rounded font-mono">HEAD</span>}
                {node.isTail && <span className="text-[9px] px-1 bg-purple-500/20 text-purple-300 font-bold rounded font-mono">TAIL</span>}
              </div>
              <span className="font-mono text-base font-black">{node.val}</span>
              <span className="text-[9px] font-mono text-slate-500 font-bold">Node #{idx + 1}</span>
            </motion.div>

            {idx < currentStep.linkedListData!.length - 1 && (
              <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0 animate-pulse" />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  }

  // ── 4. STACK LIFO CANVAS ──────────────────────────────────────────────────
  if (currentStep.stackData) {
    return (
      <div className="flex flex-col items-center justify-end h-64 w-full p-4">
        <div className="w-48 border-2 border-t-0 border-white/20 rounded-b-2xl p-3 flex flex-col-reverse gap-2 bg-[#090a0f]/60 min-h-[160px]">
          {currentStep.stackData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-2.5 rounded-xl border text-center font-mono font-bold text-xs flex items-center justify-between ${
                item.isTop ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg shadow-amber-500/20' : 'bg-slate-800 border-white/10 text-slate-200'
              }`}
            >
              <span>{item.val}</span>
              {item.isTop && <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-extrabold">TOP</span>}
            </motion.div>
          ))}
          {currentStep.stackData.length === 0 && (
            <div className="text-center text-xs font-mono text-slate-500 my-auto">Stack is Empty</div>
          )}
        </div>
      </div>
    );
  }

  // ── 5. QUEUE FIFO CANVAS ──────────────────────────────────────────────────
  if (currentStep.queueData) {
    return (
      <div className="flex items-center justify-center h-64 w-full p-4">
        <div className="border-2 border-x-0 border-white/20 rounded-xl p-3 flex items-center gap-3 bg-[#090a0f]/60 min-w-[320px] min-h-[70px]">
          {currentStep.queueData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`px-4 py-2.5 rounded-xl border text-center font-mono font-bold text-xs flex flex-col items-center gap-1 ${
                item.isFront ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-white/10 text-slate-200'
              }`}
            >
              <span>{item.val}</span>
              {item.isFront && <span className="text-[8px] px-1 bg-emerald-500 text-black font-bold rounded">FRONT</span>}
              {item.isRear && <span className="text-[8px] px-1 bg-indigo-500 text-white font-bold rounded">REAR</span>}
            </motion.div>
          ))}
          {currentStep.queueData.length === 0 && (
            <div className="text-center text-xs font-mono text-slate-500 mx-auto">Queue is Empty</div>
          )}
        </div>
      </div>
    );
  }

  // ── 6. RECURSION CALL STACK CANVAS ────────────────────────────────────────
  if (currentStep.callStackData) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full p-4">
        <div className="w-64 space-y-2 font-mono">
          <div className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider text-center">Active Recursive Call Frames</div>
          {currentStep.callStackData.map((frame) => (
            <motion.div
              key={frame.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#12141c] p-3 rounded-xl border border-indigo-500/30 flex items-center justify-between text-xs text-slate-200 shadow-md"
            >
              <div className="flex items-center gap-2">
                <CornerDownRight className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-bold text-white">{frame.func}({frame.arg})</span>
              </div>
              <span className="text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">Line #{frame.line}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ── 7. DP 2D TABLE CANVAS ─────────────────────────────────────────────────
  if (currentStep.dpTableData) {
    const { headers, rows, activeCell } = currentStep.dpTableData;
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full p-4 overflow-auto custom-scrollbar">
        <table className="border-collapse font-mono text-xs text-center border border-white/10 rounded-xl overflow-hidden shadow-2xl">
          <thead>
            <tr className="bg-[#141724] text-indigo-300 border-b border-white/10">
              {headers.map((h, idx) => (
                <th key={idx} className="px-4 py-2 border-r border-white/10 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="border-b border-white/5">
                {row.map((val, cIdx) => {
                  const isActive = activeCell && activeCell[0] === rIdx && activeCell[1] === cIdx;
                  return (
                    <td
                      key={cIdx}
                      className={`px-4 py-2 border-r border-white/10 transition-colors ${
                        isActive
                          ? 'bg-amber-500/30 text-amber-300 font-black shadow-inner animate-pulse'
                          : 'bg-[#090a0f] text-slate-300'
                      }`}
                    >
                      {val}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // ── 8. HIERARCHICAL TREE SVG CANVAS ───────────────────────────────────────
  if (currentStep.treeData) {
    const { nodes, edges } = currentStep.treeData as any;

    // Calculate live tree statistics
    const nodeCount = nodes?.length || 0;
    const leafCount = nodes?.filter((n: any) => !nodes.some((other: any) => other.parentId === n.id)).length || 0;
    const maxDepth = nodes?.reduce((max: number, n: any) => Math.max(max, n.depth || 0), 0) || 0;

    return (
      <div className="relative w-full h-84 flex flex-col items-center justify-between bg-[#090a0f]/90 rounded-2xl border border-white/10 p-3 overflow-hidden shadow-2xl group">
        {/* Tree Statistics Bar Header */}
        <div className="w-full flex items-center justify-between px-3 py-1.5 bg-[#12141c]/80 border border-white/10 rounded-xl font-mono text-[10px] z-20">
          <div className="flex items-center gap-3">
            <span className="text-indigo-400 font-bold uppercase tracking-wider">Tree Stats:</span>
            <span className="text-slate-300">Nodes: <strong className="text-white">{nodeCount}</strong></span>
            <span className="text-slate-300">Leaves: <strong className="text-emerald-400">{leafCount}</strong></span>
            <span className="text-slate-300">Height: <strong className="text-amber-400">{maxDepth + 1}</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
              BST Monotonic Invariant Verified
            </span>
          </div>
        </div>

        {/* Interactive SVG Tree Workspace */}
        <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
          {/* SVG Parent-Child Curved Edges */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="edgeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            {edges?.map((edge: any) => (
              <motion.path
                key={edge.id}
                d={edge.pathD}
                fill="none"
                stroke={edge.state === 'active' ? '#f59e0b' : edge.state === 'visited' ? 'url(#edgeGlow)' : 'rgba(255,255,255,0.18)'}
                strokeWidth={edge.state === 'active' ? '3.5' : edge.state === 'visited' ? '2.5' : '2'}
                strokeDasharray={edge.state === 'active' ? '5 5' : undefined}
                filter={edge.state === 'active' ? 'url(#glow)' : undefined}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </svg>

          {/* Premium Tree Nodes Positioned Recursively */}
          <div className="relative w-full h-full z-10">
            {nodes?.map((node: any) => {
              const isActive = node.state === 'max' || node.state === 'active';
              const isVisited = node.state === 'visited';

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: node.x - 24, y: node.y - 24 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  whileHover={{ scale: 1.15, zIndex: 30 }}
                  className={`absolute w-12 h-12 rounded-2xl border-2 flex flex-col items-center justify-center font-mono text-xs font-black shadow-2xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-black border-amber-200 shadow-amber-400/60 scale-115 z-20 animate-bounce ring-4 ring-amber-400/30'
                      : isVisited
                      ? 'bg-gradient-to-br from-indigo-600/40 to-purple-700/40 border-indigo-400 text-indigo-100 shadow-indigo-500/40 backdrop-blur-md'
                      : 'bg-gradient-to-br from-[#12141c] to-[#090a0f] border-white/20 text-white hover:border-indigo-400 shadow-black/50'
                  }`}
                >
                  {node.label && (
                    <span className="absolute -top-3 px-1.5 py-0.2 text-[8px] font-extrabold bg-amber-400 text-black rounded-full uppercase shadow-md">
                      {node.label}
                    </span>
                  )}
                  <span className="text-sm font-black tracking-tight">{node.val}</span>
                  <span className="text-[7px] text-slate-400 font-mono font-normal tracking-tighter">{node.address}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── 9. GRAPH SVG CANVAS ────────────────────────────────────────────────────
  if (currentStep.graphData) {
    const { nodes, edges, stats } = currentStep.graphData as any;

    return (
      <div className="relative w-full h-84 flex flex-col items-center justify-between bg-[#090a0f]/90 rounded-2xl border border-white/10 p-3 overflow-hidden shadow-2xl group">
        {/* Graph Statistics Header Bar */}
        <div className="w-full flex items-center justify-between px-3 py-1.5 bg-[#12141c]/80 border border-white/10 rounded-xl font-mono text-[10px] z-20">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold uppercase tracking-wider">Graph Stats:</span>
            <span className="text-slate-300">Vertices: <strong className="text-white">{stats?.vertices || nodes?.length || 0}</strong></span>
            <span className="text-slate-300">Edges: <strong className="text-purple-400">{stats?.edges || edges?.length || 0}</strong></span>
            <span className="text-slate-300">Density: <strong className="text-amber-400">{stats?.density || '0%'}</strong></span>
            <span className="text-slate-300">Avg Deg: <strong className="text-emerald-400">{stats?.avgDegree || '0'}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold">
              {stats?.hasCycle ? 'Cycle Detected' : 'DAG / Acyclic'}
            </span>
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="graphPathGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="28" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#818cf8" />
              </marker>
            </defs>
            {edges?.map((edge: any) => (
              <g key={edge.id}>
                <motion.path
                  d={edge.pathD}
                  fill="none"
                  stroke={edge.state === 'path' ? 'url(#graphPathGlow)' : edge.state === 'active' ? '#f59e0b' : edge.state === 'visited' ? '#6366f1' : 'rgba(255,255,255,0.18)'}
                  strokeWidth={edge.state === 'path' ? '3.5' : edge.state === 'active' ? '3' : '2'}
                  strokeDasharray={edge.state === 'active' ? '5 5' : undefined}
                  markerEnd={edge.isDirected ? 'url(#arrow)' : undefined}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4 }}
                />
                {edge.weight !== undefined && (
                  <text
                    x={(edge.fromX + edge.toX) / 2}
                    y={(edge.fromY + edge.toY) / 2 - 6}
                    fill="#fbbf24"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    w={edge.weight}
                  </text>
                )}
              </g>
            ))}
          </svg>

          {/* Graph Nodes */}
          <div className="relative w-full h-full z-10">
            {nodes?.map((node: any) => {
              const isActive = node.state === 'active';
              const isVisited = node.state === 'visited';

              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1, x: node.x - 22, y: node.y - 22 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  whileHover={{ scale: 1.2, zIndex: 30 }}
                  className={`absolute w-11 h-11 rounded-full border-2 flex flex-col items-center justify-center font-mono text-xs font-black shadow-2xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-black border-amber-200 shadow-amber-400/60 scale-115 z-20 animate-bounce ring-4 ring-amber-400/30'
                      : isVisited
                      ? 'bg-gradient-to-br from-indigo-600/50 to-purple-700/50 border-indigo-400 text-indigo-100 shadow-indigo-500/40 backdrop-blur-md'
                      : 'bg-gradient-to-br from-[#12141c] to-[#090a0f] border-white/20 text-white hover:border-cyan-400 shadow-black/50'
                  }`}
                >
                  <span className="text-sm font-black tracking-tight">{node.label}</span>
                  {node.dist !== undefined && (
                    <span className="absolute -bottom-3 px-1.5 py-0.2 text-[7px] font-bold bg-purple-500 text-white rounded-full">
                      d:{node.dist}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Fallback Canvas
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 font-sans">
      <Sparkles className="w-10 h-10 text-indigo-400 animate-bounce" />
      <p className="text-sm font-bold text-white">Visualizing Algorithm Step Execution</p>
    </div>
  );
};
