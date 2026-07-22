import type { HeapNode, HeapType } from './types';

export class BinaryHeap<T> {
  heap: HeapNode<T>[] = [];
  private nodeIdCounter: number = 0;
  private type: HeapType;

  constructor(type: HeapType = 'min') {
    this.type = type;
  }

  private createNode(value: T): HeapNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      index: this.heap.length,
    };
  }

  private compare(a: T, b: T): number {
    if (this.type === 'min') {
      return a < b ? -1 : a > b ? 1 : 0;
    } else {
      return a > b ? -1 : a < b ? 1 : 0;
    }
  }

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    this.heap[i].index = i;
    this.heap[j].index = j;
  }

  insert(value: T): void {
    const newNode = this.createNode(value);
    this.heap.push(newNode);
    this.heapifyUp(this.heap.length - 1);
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.compare(this.heap[index].value, this.heap[parentIndex].value) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  extract(): T | null {
    if (this.heap.length === 0) return null;
    
    const root = this.heap[0];
    const last = this.heap.pop()!;
    
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.heap[0].index = 0;
      this.heapifyDown(0);
    }
    
    return root.value;
  }

  private heapifyDown(index: number): void {
    const size = this.heap.length;
    
    while (true) {
      const left = this.leftChild(index);
      const right = this.rightChild(index);
      let smallest = index;
      
      if (left < size && this.compare(this.heap[left].value, this.heap[smallest].value) < 0) {
        smallest = left;
      }
      
      if (right < size && this.compare(this.heap[right].value, this.heap[smallest].value) < 0) {
        smallest = right;
      }
      
      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  peek(): T | null {
    return this.heap.length > 0 ? this.heap[0].value : null;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }

  buildHeap(values: T[]): void {
    this.heap = [];
    this.nodeIdCounter = 0;
    
    values.forEach(value => {
      this.heap.push(this.createNode(value));
    });
    
    // Heapify from bottom up
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  toArray(): T[] {
    return this.heap.map(node => node.value);
  }

  clear(): void {
    this.heap = [];
    this.nodeIdCounter = 0;
  }
}
