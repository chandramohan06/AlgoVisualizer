/**
 * Trie Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/trees/trie/generateFrames.test.ts
 */
import { generateTrieFrames } from './generateFrames';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateTrieFrames>[0];
  initialValues: string[];
  operationValue?: string;
  validate: (frames: ReturnType<typeof generateTrieFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty trie',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 1, 'Empty trie has only root node');
    },
  },
  {
    name: 'Create trie with words',
    operation: 'create',
    initialValues: ['cat', 'dog', 'car'],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length > 1, 'Trie has multiple nodes');
    },
  },
  {
    name: 'Insert',
    operation: 'insert',
    initialValues: ['cat', 'dog'],
    operationValue: 'car',
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('inserted'), 'Word inserted');
    },
  },
  {
    name: 'Search - found',
    operation: 'search',
    initialValues: ['cat', 'dog'],
    operationValue: 'cat',
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('found'), 'Word found');
    },
  },
  {
    name: 'Search - not found',
    operation: 'search',
    initialValues: ['cat', 'dog'],
    operationValue: 'bird',
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Word not found');
    },
  },
  {
    name: 'StartsWith - exists',
    operation: 'startsWith',
    initialValues: ['cat', 'car'],
    operationValue: 'ca',
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for startsWith');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('exists'), 'Prefix exists');
    },
  },
  {
    name: 'StartsWith - not exists',
    operation: 'startsWith',
    initialValues: ['cat', 'dog'],
    operationValue: 'bi',
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for startsWith');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not exist'), 'Prefix does not exist');
    },
  },
  {
    name: 'Delete',
    operation: 'delete',
    initialValues: ['cat', 'dog', 'car'],
    operationValue: 'cat',
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('deleted'), 'Word deleted');
    },
  },
];

function runTests(): void {
  console.log('=== Trie Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, validate }) => {
    try {
      const frames = generateTrieFrames(operation, initialValues, operationValue);
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
