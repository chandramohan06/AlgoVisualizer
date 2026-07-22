/**
 * Bellman-Ford Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/bellmanFord/generateFrames.test.ts
 */
import { generateBellmanFordFrames } from './generateFrames';
import { createWeightedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateBellmanFordFrames>[0];
  startNodeId: Parameters<typeof generateBellmanFordFrames>[1];
  validate: (frames: ReturnType<typeof generateBellmanFordFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Bellman-Ford on weighted graph',
    graph: createWeightedGraph(),
    startNodeId: '0',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete') || f[f.length - 1].description.includes('detected'), 'Bellman-Ford terminates');
    },
  },
];

function runBellmanFordTests(): void {
  const testCases = cases.map(({ name, graph, startNodeId, validate }) => ({
    name,
    validate: () => {
      const frames = generateBellmanFordFrames(graph, startNodeId);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Bellman-Ford');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runBellmanFordTests();
export { runBellmanFordTests };
