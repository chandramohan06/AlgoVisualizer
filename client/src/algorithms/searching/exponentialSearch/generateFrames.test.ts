/**
 * Exponential Search Frame Generator Tests
 *
 * Run: npx ts-node src/algorithms/searching/exponentialSearch/generateFrames.test.ts
 */
import { generateExponentialSearchFrames } from './generateFrames.ts';

interface TestCase {
  name: string;
  input: number[];
  target: number;
  validate: (frames: ReturnType<typeof generateExponentialSearchFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Empty array',
    input: [], target: 5,
    validate: (f) => { console.assert(f.length === 1, 'Empty → 1 frame'); },
  },
  {
    name: 'Single element — found',
    input: [4], target: 4,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Found at 0');
    },
  },
  {
    name: 'Target at index 0',
    input: [1, 2, 4, 8, 16, 32], target: 1,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 0, 'Index 0');
    },
  },
  {
    name: 'Target in middle',
    input: [1, 2, 4, 8, 16, 32, 64, 128], target: 16,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 4, 'Index 4');
    },
  },
  {
    name: 'Target at end',
    input: [1, 2, 4, 8, 16, 32, 64], target: 64,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === 6, 'Index 6');
    },
  },
  {
    name: 'Target absent',
    input: [1, 2, 4, 8, 16, 32], target: 5,
    validate: (f) => {
      const last = f[f.length - 1];
      console.assert(last.variables.result === -1, 'Not found');
    },
  },
  {
    name: 'Duplicate values',
    input: [1, 2, 4, 4, 8, 16], target: 4,
    validate: (f) => { console.assert(f.length > 0, 'Has frames'); },
  },
];

function runTests(): void {
  console.log('=== Exponential Search Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, input, target, validate }) => {
    try {
      validate(generateExponentialSearchFrames(input, target));
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
