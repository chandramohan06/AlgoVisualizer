/**
 * Universal Input Parser for AlgoVisualizer Interactive Input Bar
 */

export interface ParsedInputResult {
  type: 'array' | 'linkedlist' | 'tree' | 'heap' | 'graph';
  arrayData?: number[];
  linkedListData?: { nodes: { id: string; value: number }[]; edges: { from: string; to: string }[] };
  treeData?: { nodes: { id: string; value: number | string }[]; edges: { from: string; to: string }[] };
  graphData?: { nodes: { id: string; label: string }[]; edges: { source: string; target: string; weight?: number }[] };
  rawStr: string;
}

/**
 * Parse Array input strings: "1 2 3 4 5", "1,2,3,4", "[1,2,3]"
 */
export function parseArrayInput(raw: string): number[] {
  const cleaned = raw.replace(/[\[\]]/g, '').trim();
  const tokens = cleaned.split(/[\s,]+/).filter(Boolean);
  const nums = tokens.map((t) => parseInt(t, 10)).filter((n) => !isNaN(n));
  return nums.length > 0 ? nums : [5, 2, 8, 1, 9, 3, 7, 4];
}

/**
 * Parse Linked List input string: "1->2->3->4" or "1, 2, 3, 4"
 */
export function parseLinkedListInput(raw: string): number[] {
  const cleaned = raw.replace(/->/g, ',').replace(/[\[\]]/g, '').trim();
  return parseArrayInput(cleaned);
}

/**
 * Parse Tree input string: "1 2 3 null 5" or "1, 2, 3, null, 5"
 */
export function parseTreeInput(raw: string): (number | null)[] {
  const cleaned = raw.replace(/[\[\]]/g, '').trim();
  const tokens = cleaned.split(/[\s,]+/).filter(Boolean);
  return tokens.map((t) => (t.toLowerCase() === 'null' ? null : parseInt(t, 10))).filter((val) => val === null || !isNaN(val));
}

/**
 * Parse Graph input edges: "0 1\n1 2\n2 3" or "0 1 5, 1 2 3"
 */
export function parseGraphInput(raw: string): { source: string; target: string; weight?: number }[] {
  const lines = raw.split(/[\n,;]+/).map((l) => l.trim()).filter(Boolean);
  const edges: { source: string; target: string; weight?: number }[] = [];

  for (const line of lines) {
    const parts = line.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const u = parts[0];
      const v = parts[1];
      const w = parts[2] ? parseInt(parts[2], 10) : undefined;
      edges.push({ source: u, target: v, weight: isNaN(w as number) ? undefined : w });
    }
  }

  return edges.length > 0 ? edges : [{ source: 'A', target: 'B' }, { source: 'A', target: 'C' }, { source: 'B', target: 'D' }, { source: 'C', target: 'D' }];
}

/**
 * Random Generators
 */
export function generateRandomArray(size = 8, min = 5, max = 99): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

export function generateRandomTree(): (number | null)[] {
  return [10, 5, 15, 2, 7, 12, 20];
}

export function generateRandomGraph(): { source: string; target: string; weight?: number }[] {
  return [
    { source: '0', target: '1', weight: 4 },
    { source: '0', target: '2', weight: 2 },
    { source: '1', target: '2', weight: 1 },
    { source: '1', target: '3', weight: 5 },
    { source: '2', target: '3', weight: 8 },
    { source: '2', target: '4', weight: 10 },
    { source: '3', target: '4', weight: 2 },
  ];
}
