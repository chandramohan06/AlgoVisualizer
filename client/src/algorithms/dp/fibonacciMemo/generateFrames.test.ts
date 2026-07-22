/**
 * Fibonacci Memoization Test
 * Run: npx tsx src/algorithms/dp/fibonacciMemo/generateFrames.test.ts
 */
import { generateFibonacciMemoFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateFibonacciMemoFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Fibonacci Memoization frames walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('complete'), 'Reaches end');
      const lastVars = f[f.length - 1].variables as any;
      console.assert(lastVars.memoTable[4] === 3, 'fib(4) memoized as 3');
    },
  },
];

function runFibonacciMemoTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateFibonacciMemoFrames(4);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Fibonacci Memoization');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFibonacciMemoTests();
export { runFibonacciMemoTests };
