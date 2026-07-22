/**
 * Stack Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linear/stack/generateFrames.test.ts
 */
import { generateStackFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateStackFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Stack frame generation operations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 5, 'Stack capacity is 5');
      console.assert(f[f.length - 1].description.includes('Underflow'), 'Includes underflow test');
    },
  },
];

function runStackTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateStackFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Stack');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runStackTests();
export { runStackTests };
