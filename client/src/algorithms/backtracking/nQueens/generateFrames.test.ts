/**
 * N Queens Test
 * Run: npx tsx src/algorithms/backtracking/nQueens/generateFrames.test.ts
 */
import { generateNQueensFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateNQueensFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'N Queens backtracking steps walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('Solution found'), 'Finds solution');
    },
  },
];

function runNQueensTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateNQueensFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'N Queens');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runNQueensTests();
export { runNQueensTests };
