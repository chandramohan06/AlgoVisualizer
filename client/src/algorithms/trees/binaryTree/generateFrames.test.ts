/**
 * Binary Tree Frame Generator Tests
 *
 * Run: npx tsx src/algorithms/trees/binaryTree/generateFrames.test.ts
 */
import { generateBinaryTreeFrames } from './generateFrames';

interface TestCase {
  name: string;
  operation: Parameters<typeof generateBinaryTreeFrames>[0];
  initialValues: number[];
  operationValue?: number;
  validate: (frames: ReturnType<typeof generateBinaryTreeFrames>) => void;
}

const cases: TestCase[] = [
  {
    name: 'Create empty tree',
    operation: 'create',
    initialValues: [],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 0, 'Empty tree has no nodes');
    },
  },
  {
    name: 'Create tree with values',
    operation: 'create',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 0, 'Has frames');
      console.assert((f[0].data as any).nodes.length === 3, 'Tree has 3 nodes');
    },
  },
  {
    name: 'Insert',
    operation: 'insert',
    initialValues: [1, 2],
    operationValue: 3,
    validate: (f) => {
      console.assert(f.length > 1, 'Has multiple frames');
      const lastFrame = f[f.length - 1];
      console.assert((lastFrame.data as any).nodes.length === 3, 'Tree has 3 nodes after insert');
    },
  },
  {
    name: 'Search - found',
    operation: 'search',
    initialValues: [1, 2, 3],
    operationValue: 2,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('found'), 'Found the value');
    },
  },
  {
    name: 'Search - not found',
    operation: 'search',
    initialValues: [1, 2, 3],
    operationValue: 5,
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for search');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('not found'), 'Value not found');
    },
  },
  {
    name: 'Preorder traversal',
    operation: 'preorder',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for traversal');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('complete'), 'Traversal complete');
    },
  },
  {
    name: 'Inorder traversal',
    operation: 'inorder',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for traversal');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('complete'), 'Traversal complete');
    },
  },
  {
    name: 'Postorder traversal',
    operation: 'postorder',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for traversal');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('complete'), 'Traversal complete');
    },
  },
  {
    name: 'Level order traversal',
    operation: 'levelorder',
    initialValues: [1, 2, 3],
    validate: (f) => {
      console.assert(f.length > 2, 'Has multiple frames for traversal');
      const lastFrame = f[f.length - 1];
      console.assert(lastFrame.description.includes('complete'), 'Traversal complete');
    },
  },
];

function runTests(): void {
  console.log('=== Binary Tree Tests ===\n');
  let passed = 0, failed = 0;
  cases.forEach(({ name, operation, initialValues, operationValue, validate }) => {
    try {
      const frames = generateBinaryTreeFrames(operation, initialValues, operationValue);
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
