import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { GraphRenderer as NodeGraphRenderer } from '../nodeEngine/GraphRenderer';

interface GraphRendererProps {
  frame: VisualizationFrame | null;
}

export const GraphRenderer: React.FC<GraphRendererProps> = ({ frame }) => {
  if (!frame) return null;

  const rawData = frame.data as any;
  const graphData = typeof rawData === 'object' && rawData !== null && 'nodes' in rawData
    ? rawData
    : {
        nodes: [
          { id: 'A', label: 'A', x: 150, y: 80 },
          { id: 'B', label: 'B', x: 300, y: 60 },
          { id: 'C', label: 'C', x: 200, y: 200 },
          { id: 'D', label: 'D', x: 450, y: 160 },
        ],
        edges: [
          { id: 'e1', source: 'A', target: 'B', weight: 4 },
          { id: 'e2', source: 'A', target: 'C', weight: 2 },
          { id: 'e3', source: 'B', target: 'D', weight: 5 },
          { id: 'e4', source: 'C', target: 'D', weight: 1 },
        ],
      };

  const highlights = (frame.highlights || []).map((h) => String(h));
  const pointers = Object.entries(frame.pointers || {}).reduce((acc, [key, val]) => {
    acc[key] = String(val);
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="w-full bg-[#0F172A] border border-white/5 rounded-2xl p-6 flex flex-col items-center gap-4 shadow-2xl">
      <div className="flex items-center justify-between w-full text-xs font-semibold text-slate-400">
        <span className="px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-bold uppercase tracking-wider">
          Network Graph Structure
        </span>
        <span className="font-mono text-slate-300 font-bold">
          Vertices: {graphData.nodes?.length || 0} | Edges: {graphData.edges?.length || 0}
        </span>
      </div>

      <NodeGraphRenderer
        data={graphData}
        highlights={highlights}
        pointers={pointers}
        layout={graphData.layout || 'free'}
      />
    </div>
  );
};

export default GraphRenderer;
