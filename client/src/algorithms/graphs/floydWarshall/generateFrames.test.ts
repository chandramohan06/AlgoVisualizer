/**
 * Floyd-Warshall Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/graphs/floydWarshall/generateFrames.test.ts
 */
import { generateFloydWarshallFrames } from './generateFrames';
import { createWeightedGraph, runTests } from '../shared';

interface TestCase {
  name: string;
  graph: Parameters<typeof generateFloydWarshallFrames>[0];
  validate: (frames: ReturnType<typeof generateFloydWarshallFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Floyd-Warshall on weighted graph',
    graph: createWeightedGraph(),
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Floyd-Warshall completes');
    },
  },
];

function runFloydWarshallTests(): void {
  const testCases = cases.map(({ name, graph, validate }) => ({
    name,
    validate: () => {
      const frames = generateFloydWarshallFrames(graph);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Floyd-Warshall');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFloydWarshallTests();
export { runFloydWarshallTests };
