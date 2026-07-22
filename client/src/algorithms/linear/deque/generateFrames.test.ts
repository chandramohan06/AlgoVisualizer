/**
 * Deque Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/linear/deque/generateFrames.test.ts
 */
import { generateDequeFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateDequeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Deque frame generation operations walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 5, 'Deque capacity is 5');
      console.assert(f[f.length - 1].description.includes('Underflow'), 'Includes underflow test');
    },
  },
];

function runDequeTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateDequeFrames();
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Deque');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runDequeTests();
export { runDequeTests };
