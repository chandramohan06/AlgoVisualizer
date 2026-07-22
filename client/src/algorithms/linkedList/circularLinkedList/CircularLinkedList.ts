import type { CircularListNode } from './types';

export class CircularLinkedList<T> {
  head: CircularListNode<T> | null = null;
  tail: CircularListNode<T> | null = null;
  size: number = 0;
  private nodeIdCounter: number = 0;

  private createNode(value: T): CircularListNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      next: null,
    };
  }

  insert(value: T): CircularListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtHead(value: T): CircularListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.head = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtTail(value: T): CircularListNode<T> {
    return this.insert(value);
  }

  deleteHead(): CircularListNode<T> | null {
    if (!this.head) return null;
    
    const deletedNode = this.head;
    
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail!.next = this.head;
    }
    
    this.size--;
    return deletedNode;
  }

  deleteTail(): CircularListNode<T> | null {
    if (!this.tail) return null;
    
    if (this.head === this.tail) {
      const deletedNode = this.head;
      this.head = null;
      this.tail = null;
      this.size--;
      return deletedNode;
    }
    
    let current = this.head;
    while (current && current.next !== this.tail) {
      current = current.next;
    }
    
    if (!current) return null;
    
    const deletedNode = this.tail;
    this.tail = current;
    this.tail.next = this.head;
    this.size--;
    return deletedNode;
  }

  delete(value: T): boolean {
    if (!this.head) return false;
    
    let current = this.head;
    let prev: CircularListNode<T> | null = null;
    
    do {
      if (current.value === value) {
        if (current === this.head) {
          return this.deleteHead() !== null;
        }
        
        if (current === this.tail) {
          return this.deleteTail() !== null;
        }
        
        if (prev) {
          prev.next = current.next;
          this.size--;
          return true;
        }
      }
      
      prev = current;
      current = current.next!;
    } while (current !== this.head);
    
    return false;
  }

  search(value: T): number {
    if (!this.head) return -1;
    
    let current = this.head;
    let index = 0;
    
    do {
      if (current.value === value) {
        return index;
      }
      current = current.next!;
      index++;
    } while (current !== this.head);
    
    return -1;
  }

  traverse(count?: number): T[] {
    if (!this.head) return [];
    
    const result: T[] = [];
    let current = this.head;
    const maxCount = count || this.size;
    
    for (let i = 0; i < maxCount && current; i++) {
      result.push(current.value);
      current = current.next!;
    }
    
    return result;
  }

  toArray(): T[] {
    return this.traverse();
  }

  toNodesArray(): CircularListNode<T>[] {
    const result: CircularListNode<T>[] = [];
    let current = this.head;
    
    if (!current) return result;
    
    do {
      result.push(current);
      current = current.next!;
    } while (current !== this.head);
    
    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.nodeIdCounter = 0;
  }
}
