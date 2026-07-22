/**
 * Binary Search Tree Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/trees/binarySearchTree/generateFrames.test.ts
 */
import { generateBSTFrames } from './generateFrames';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateBSTFrames>[0];
  initialValues: number[];
  operationValue?: number;
  validate: (frames: ReturnType<typeof generateBSTFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty BST',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 0, 'Empty BST has no nodes');
    },
  },
  {
    name: 'Create BST with values',
    operation: 'create',
    initialValues: [5, 3, 7, 2, 4],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 5, 'BST has 5 nodes');
    },
  },
  {
    name: 'Insert',
    operation: 'insert',
    initialValues: [5, 3, 7],
    operationValue: 4,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 4, 'BST has 4 nodes after insert');
    },
  },
  {
    name: 'Delete',
    operation: 'delete',
    initialValues: [5, 3, 7, 2, 4],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 4, 'BST has 4 nodes after delete');
    },
  },
  {
    name: 'Search - found',
    operation: 'search',
    initialValues: [5, 3, 7],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('found'), 'Found the value');
    },
  },
  {
    name: 'Search - not found',
    operation: 'search',
    initialValues: [5, 3, 7],
    operationValue: 10,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Value not found');
    },
  },
  {
    name: 'Find Min',
    operation: 'findMin',
    initialValues: [5, 3, 7, 2],
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('2'), 'Found minimum value 2');
    },
  },
  {
    name: 'Find Max',
    operation: 'findMax',
    initialValues: [5, 3, 7, 2],
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('7'), 'Found maximum value 7');
    },
  },
  {
    name: 'Successor',
    operation: 'successor',
    initialValues: [5, 3, 7, 2, 4],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('4'), 'Successor is 4');
    },
  },
  {
    name: 'Predecessor',
    operation: 'predecessor',
    initialValues: [5, 3, 7, 2, 4],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('2'), 'Predecessor is 2');
    },
  },
];

function runTests(): void {
  console.log('=== Binary Search Tree Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, validate }) => {
    try {
      const frames = generateBSTFrames(operation, initialValues, operationValue);
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
