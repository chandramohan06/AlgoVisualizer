export class PriorityQueue<T> {
  private items: Array<{ item: T; priority: number }> = [];

  enqueue(item: T, priority: number): void {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): T | null {
    if (this.isEmpty()) return null;
    return this.items.shift()!.item;
  }

  peek(): T | null {
    if (this.isEmpty()) return null;
    return this.items[0].item;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  toArray(): Array<{ item: T; priority: number }> {
    return [...this.items];
  }
}
