export class DisjointSet {
  private parent: Map<string, string>;
  private rank: Map<string, number>;

  constructor() {
    this.parent = new Map();
    this.rank = new Map();
  }

  makeSet(x: string): void {
    this.parent.set(x, x);
    this.rank.set(x, 0);
  }

  find(x: string): string {
    if (this.parent.get(x) !== x) {
      this.parent.set(x, this.find(this.parent.get(x)!)); // Path compression
    }
    return this.parent.get(x)!;
  }

  union(x: string, y: string): void {
    const xRoot = this.find(x);
    const yRoot = this.find(y);

    if (xRoot === yRoot) return;

    const xRank = this.rank.get(xRoot) || 0;
    const yRank = this.rank.get(yRoot) || 0;

    if (xRank < yRank) {
      this.parent.set(xRoot, yRoot);
    } else if (xRank > yRank) {
      this.parent.set(yRoot, xRoot);
    } else {
      this.parent.set(yRoot, xRoot);
      this.rank.set(xRoot, (this.rank.get(xRoot) || 0) + 1);
    }
  }

  getSets(): Map<string, string[]> {
    const sets = new Map<string, string[]>();
    
    this.parent.forEach((parent, node) => {
      const root = this.find(parent);
      if (!sets.has(root)) {
        sets.set(root, []);
      }
      sets.get(root)!.push(node);
    });

    return sets;
  }

  getParent(x: string): string | undefined {
    return this.parent.get(x);
  }

  getRank(x: string): number | undefined {
    return this.rank.get(x);
  }
}
