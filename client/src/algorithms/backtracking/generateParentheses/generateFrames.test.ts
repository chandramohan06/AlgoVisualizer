/**
 * Generate Parentheses Test
 * Run: npx tsx src/algorithms/backtracking/generateParentheses/generateFrames.test.ts
 */
import { generateParenthesesFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateParenthesesFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Generate Parentheses combinations list walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // final frame description should find (()) and ()()
      const lastVars = f[f.length - 1].variables as any;
      console.assert(lastVars.totalSolutions.includes('(())') && lastVars.totalSolutions.includes('()()'), 'Includes correct combinations');
    },
  },
];

function runParenthesesTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateParenthesesFrames(2);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Generate Parentheses');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runParenthesesTests();
export { runParenthesesTests };
