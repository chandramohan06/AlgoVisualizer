/**
 * AVL Tree Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/trees/avlTree/generateFrames.test.ts
 */
import { generateAVLTreeFrames } from './generateFrames';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateAVLTreeFrames>[0];
  initialValues: number[];
  operationValue?: number;
  validate: (frames: ReturnType<typeof generateAVLTreeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty AVL tree',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 0, 'Empty AVL tree has no nodes');
    },
  },
  {
    name: 'Create AVL tree with values',
    operation: 'create',
    initialValues: [10, 20, 30],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 3, 'AVL tree has 3 nodes');
    },
  },
  {
    name: 'Insert with rotation',
    operation: 'insert',
    initialValues: [10, 20],
    operationValue: 30,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 3, 'AVL tree has 3 nodes after insert');
    },
  },
  {
    name: 'Delete',
    operation: 'delete',
    initialValues: [10, 20, 30],
    operationValue: 20,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 2, 'AVL tree has 2 nodes after delete');
    },
  },
  {
    name: 'Search - found',
    operation: 'search',
    initialValues: [10, 20, 30],
    operationValue: 20,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('found'), 'Found the value');
    },
  },
  {
    name: 'Search - not found',
    operation: 'search',
    initialValues: [10, 20, 30],
    operationValue: 50,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Value not found');
    },
  },
];

function runTests(): void {
  console.log('=== AVL Tree Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, validate }) => {
    try {
      const frames = generateAVLTreeFrames(operation, initialValues, operationValue);
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
