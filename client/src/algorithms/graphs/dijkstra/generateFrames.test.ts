/**
 * Dijkstra Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/dijkstra/generateFrames.test.ts
 */
import { generateDijkstraFrames } from './generateFrames';
import { createWeightedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateDijkstraFrames>[0];
  startNodeId: Parameters<typeof generateDijkstraFrames>[1];
  validate: (frames: ReturnType<typeof generateDijkstraFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Dijkstra on weighted graph',
    graph: createWeightedGraph(),
    startNodeId: '0',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Dijkstra completes');
    },
  },
];

function runDijkstraTests(): void {
  const testCases = cases.map(({ name, graph, startNodeId, validate }) => ({
    name,
    validate: () => {
      const frames = generateDijkstraFrames(graph, startNodeId);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Dijkstra');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runDijkstraTests();
export { runDijkstraTests };
