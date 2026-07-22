/**
 * BFS Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/bfs/generateFrames.test.ts
 */
import { generateBFSFrames } from './generateFrames';
import { createSimpleGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateBFSFrames>[0];
  startNodeId: Parameters<typeof generateBFSFrames>[1];
  validate: (frames: ReturnType<typeof generateBFSFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'BFS on simple graph',
    graph: createSimpleGraph(),
    startNodeId: '0',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 3, 'Graph has 3 nodes');
    },
  },
  {
    name: 'BFS on directed graph',
    graph: {
      vertices: [
        { id: '0', value: 0 },
        { id: '1', value: 1 },
        { id: '2', value: 2 },
      ],
      edges: [
        { id: 'e0', source: '0', target: '1', directed: true },
        { id: 'e1', source: '1', target: '2', directed: true },
      ],
      directed: true,
    },
    startNodeId: '0',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'BFS completes');
    },
  },
];

function runBFSTests(): void {
  const testCases = cases.map(({ name, graph, startNodeId, validate }) => ({
    name,
    validate: () => {
      const frames = generateBFSFrames(graph, startNodeId);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'BFS');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runBFSTests();
export { runBFSTests };
