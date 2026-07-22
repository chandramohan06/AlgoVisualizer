import React from 'react';
import { type VisualizationFrame } from '@store/visualizationStore';
import { resolveRendererType } from './renderers/RendererRegistry';

// Category Renderers
import ArrayRenderer from './renderers/ArrayRenderer';
import LinkedListRenderer from './renderers/LinkedListRenderer';
import StackRenderer from './renderers/StackRenderer';
import QueueRenderer from './renderers/QueueRenderer';
import TreeRenderer from './renderers/TreeRenderer';
import HeapRenderer from './renderers/HeapRenderer';
import GraphRenderer from './renderers/GraphRenderer';
import RecursionRenderer from './renderers/RecursionRenderer';
import BacktrackingRenderer from './renderers/BacktrackingRenderer';
import GreedyRenderer from './renderers/GreedyRenderer';
import DynamicProgrammingRenderer from './renderers/DynamicProgrammingRenderer';

interface RendererProps {
  frame: VisualizationFrame | null;
  type?: string;
  category?: string;
}

export const VisualizationRenderer: React.FC<RendererProps> = ({ frame, type, category }) => {
  if (!frame) {
    return (
      <div className="h-64 flex items-center justify-center text-sm text-slate-500 border border-white/5 bg-[#0F172A] rounded-2xl">
        No active frame. Select an algorithm or apply input to begin.
      </div>
    );
  }

  const resolvedType = resolveRendererType(category, type);

  switch (resolvedType) {
    case 'array':
    case 'bars':
      return <ArrayRenderer frame={frame} />;
    case 'linked-list':
      return <LinkedListRenderer frame={frame} />;
    case 'stack':
      return <StackRenderer frame={frame} />;
    case 'queue':
      return <QueueRenderer frame={frame} />;
    case 'tree':
      return <TreeRenderer frame={frame} />;
    case 'heap':
      return <HeapRenderer frame={frame} />;
    case 'graph':
      return <GraphRenderer frame={frame} />;
    case 'recursion':
      return <RecursionRenderer frame={frame} />;
    case 'backtracking':
      return <BacktrackingRenderer frame={frame} />;
    case 'greedy':
      return <GreedyRenderer frame={frame} />;
    case 'dynamic-programming':
      return <DynamicProgrammingRenderer frame={frame} />;
    default:
      return <ArrayRenderer frame={frame} />;
  }
};

export default VisualizationRenderer;
