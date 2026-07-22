/**
 * Linear Search Frame Generator Tests
 *
 * Run: npx ts-node src/algorithms/searching/linearSearch/generateFrames.test.ts
 */
import { generateLinearSearchFrames } from './generateFrames.ts';

interface TestCase {
  name: string;
  input: number[];
  target: number;
  validate: (frames: ReturnType<typeof generateLinearSearchFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Empty array',
    input: [], target: 5,
    validate: (f) => {
      console.assert(f.length === 1, 'Empty → 1 frame');
      console.assert(f[0].data instanceof Array && (f[0].data as number[]).length === 0, 'Empty data');
    },
  },
  {
    name: 'Single element — found',
    input: [7], target: 7,
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Found at index 0');
    },
  },
  {
    name: 'Single element — not found',
    input: [3], target: 9,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found → -1');
    },
  },
  {
    name: 'Target at beginning',
    input: [1, 5, 3, 8, 2], target: 1,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Found at index 0');
    },
  },
  {
    name: 'Target at end',
    input: [4, 2, 7, 1, 9], target: 9,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 4, 'Found at index 4');
    },
  },
  {
    name: 'Target absent',
    input: [4, 2, 7, 1, 9], target: 99,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found → -1');
    },
  },
  {
    name: 'Duplicate values — returns first',
    input: [3, 7, 7, 7, 3], target: 7,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 1, 'First occurrence at index 1');
    },
  },
];

function runTests(): void {
  console.log('=== Linear Search Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, input, target, validate }) => {
    try {
      const frames = generateLinearSearchFrames(input, target);
      validate(frames);
      console.log(`✓ ${name}`);
      passed++;
    } catch (e) {
      console.error(`✗ ${name}: ${e}`);
      failed++;
    }
  });
  console.log(`\nPassed: ${passed}/${cases.length}`);
  if (failed > 0) process.exit(1);
}

const isDirect = process.argv[1]?.includes('generateFrames.test.ts');
if (isDirect) runTests();
export { runTests };
