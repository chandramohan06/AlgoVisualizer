/**
 * Fibonacci Tabulation Test
 * Run: npx tsx src/algorithms/dp/fibonacciTab/generateFrames.test.ts
 */
import { generateFibonacciTabFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateFibonacciTabFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Fibonacci Tabulation frames walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('5'), 'Resolves to 5 for n=5');
    },
  },
];

function runFibonacciTabTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateFibonacciTabFrames(5);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Fibonacci Tabulation');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFibonacciTabTests();
export { runFibonacciTabTests };
