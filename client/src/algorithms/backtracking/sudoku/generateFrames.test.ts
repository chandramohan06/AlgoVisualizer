/**
 * Sudoku Test
 * Run: npx tsx src/algorithms/backtracking/sudoku/generateFrames.test.ts
 */
import { generateSudokuFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateSudokuFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Sudoku backtracking steps walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('solved'), 'Finds solution');
    },
  },
];

function runSudokuTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateSudokuFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Sudoku');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runSudokuTests();
export { runSudokuTests };
