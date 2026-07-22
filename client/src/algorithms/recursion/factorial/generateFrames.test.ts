/**
 * Factorial Test
 * Run: npx tsx src/algorithms/recursion/factorial/generateFrames.test.ts
 */
import { generateFactorialFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateFactorialFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Factorial call stack frames walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // Last frame has description of resolved final value
      console.assert(f[f.length - 1].description.includes('120'), 'Resolves to 120 for n=5');
    },
  },
];

function runFactorialTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateFactorialFrames(5);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Factorial');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runFactorialTests();
export { runFactorialTests };
