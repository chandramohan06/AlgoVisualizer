/**
 * Binary Search Frame Generator Tests
 *
 * Run: npx ts-node src/algorithms/searching/binarySearch/generateFrames.test.ts
 */
import { generateBinarySearchFrames } from './generateFrames.ts';

interface TestCase {
  name: string;
  input: number[];
  target: number;
  validate: (frames: ReturnType<typeof generateBinarySearchFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Empty array',
    input: [], target: 5,
    validate: (f) => { console.assert(f.length === 1, 'Empty → 1 frame'); },
  },
  {
    name: 'Single element — found',
    input: [7], target: 7,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Found at 0');
    },
  },
  {
    name: 'Single element — not found',
    input: [3], target: 9,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found');
    },
  },
  {
    name: 'Target at beginning',
    input: [1, 3, 5, 7, 9, 11], target: 1,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Index 0');
    },
  },
  {
    name: 'Target at end',
    input: [1, 3, 5, 7, 9, 11], target: 11,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 5, 'Index 5');
    },
  },
  {
    name: 'Target in middle',
    input: [1, 3, 5, 7, 9, 11, 14], target: 7,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 3, 'Index 3');
    },
  },
  {
    name: 'Target absent',
    input: [1, 3, 5, 7, 9], target: 4,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found');
    },
  },
];

function runTests(): void {
  console.log('=== Binary Search Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, input, target, validate }) => {
    try {
      validate(generateBinarySearchFrames(input, target));
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
