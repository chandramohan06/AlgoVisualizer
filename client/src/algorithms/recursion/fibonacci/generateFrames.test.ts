/**
 * Fibonacci Test
 * Run: npx tsx src/algorithms/recursion/fibonacci/generateFrames.test.ts
 */
import { generateFibonacciFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateFibonacciFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Fibonacci recursion tree walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should include the solution fib(4) = 3
      console.assert(f[f.length - 1].description.includes('3'), 'Resolves to 3 for n=4');
    },
  },
];

function runFibonacciTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateFibonacciFrames(4);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Fibonacci');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFibonacciTests();
export { runFibonacciTests };
