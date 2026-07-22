import type { Graph } from './types';

export interface TestCase {
  name: string;
  validate: (result: any) => void;
}

export function runTests(testCases: TestCase[], suiteName: string): void {
  console.log(`=== ${suiteName} Tests ===\n`);
  let passed = 0, failed = 0;
  
  testCases.forEach(({ name, validate }) => {
    try {
      validate(name);
      console.log(`✓ ${name}`);
      passed++;
    } catch (e) {
      console.error(`✗ ${name}: ${e}`);
      failed++;
    }
  });
  
  console.log(`\nPassed: ${passed}/${testCases.length}`);
  if (failed > 0 && typeof process !== 'undefined') {
    process.exit(1);
  }
}

export function createSimpleGraph(): Graph {
  return {
    vertices: [
      { id: '0', value: 0 },
      { id: '1', value: 1 },
      { id: '2', value: 2 },
    ],
    edges: [
      { id: 'e0', source: '0', target: '1', directed: false },
      { id: 'e1', source: '0', target: '2', directed: false },
    ],
    directed: false,
  };
}

export function createDirectedGraph(): Graph {
  return {
    vertices: [
      { id: '0', value: 0 },
      { id: '1', value: 1 },
      { id: '2', value: 2 },
    ],
    edges: [
      { id: 'e0', source: '0', target: '1', directed: true },
      { id: 'e1', source: '1', target: '2', directed: true },
    ],
    directed: true,
  };
}

export function createWeightedGraph(): Graph {
  return {
    vertices: [
      { id: '0', value: 0 },
      { id: '1', value: 1 },
      { id: '2', value: 2 },
    ],
    edges: [
      { id: 'e0', source: '0', target: '1', weight: 4, directed: false },
      { id: 'e1', source: '0', target: '2', weight: 2, directed: false },
      { id: 'e2', source: '1', target: '2', weight: 1, directed: false },
    ],
    directed: false,
  };
}
