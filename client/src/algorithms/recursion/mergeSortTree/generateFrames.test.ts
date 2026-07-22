/**
 * Merge Sort Tree Test
 * Run: npx tsx src/algorithms/recursion/mergeSortTree/generateFrames.test.ts
 */
import { generateMergeSortTreeFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateMergeSortTreeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Merge Sort tree split recursion walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert(f[f.length - 1].description.includes('2, 3, 5, 8'), 'Resolves to [2, 3, 5, 8]');
    },
  },
];

function runMergeSortTreeTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateMergeSortTreeFrames([5, 2, 8, 3]);
      validate(frames);
    },
  }));
  
  runTests(testCases, 'Merge Sort Tree');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runMergeSortTreeTests();
export { runMergeSortTreeTests };
