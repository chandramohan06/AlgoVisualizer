/**
 * LCS Test
 * Run: npx tsx src/algorithms/dp/lcs/generateFrames.test.ts
 */
import { generateLCSFrames } from './generateFrames';
import { runTests } from '../../graphs/shared';

interface TestCase {
  name: string;
  validate: (frames: ReturnType<typeof generateLCSFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'LCS 2D DP matrix transitions walkthrough',
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      // s1 = 'BAT', s2 = 'CAT' -> LCS length is 2 ('AT')
      console.assert(f[f.length - 1].description.includes('2'), 'LCS resolved to 2');
    },
  },
];

function runLCSTests(): void {
  const testCases = cases.map(({ name, validate }) => ({
    name,
    validate: () => {
      const frames = generateLCSFrames('BAT', 'CAT');
      validate(frames);
    },
  }));
  
  runTests(testCases, 'LCS');
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runLCSTests();
export { runLCSTests };
