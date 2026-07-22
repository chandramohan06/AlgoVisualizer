import type { ListNode } from './types';

export class SinglyLinkedList<T> {
  head: ListNode<T> | null = null;
  tail: ListNode<T> | null = null;
  size: number = 0;
  private nodeIdCounter: number = 0;

  private createNode(value: T): ListNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      next: null,
    };
  }

  insertAtHead(value: T): ListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtTail(value: T): ListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtIndex(value: T, index: number): ListNode<T> | null {
    if (index < 0 || index > this.size)return null;
    
    if (index === 0) return this.insertAtHead(value);
    if (index === this.size) return this.insertAtTail(value);
    
    const newNode = this.createNode(value);
    let current = this.head;
    
    for (let i = 0; i < index - 1 && current; i++) {
      current = current.next;
    }
    
    if (current) {
      newNode.next = current.next;
      current.next = newNode;
      this.size++;
      return newNode;
    }
    
    return null;
  }

  deleteHead(): ListNode<T> | null {
    if (!this.head) return null;
    
    const deletedNode = this.head;
    this.head = this.head.next;
    
    if (!this.head) {
      this.tail = null;
    }
    
    this.size--;
    return deletedNode;
  }

  deleteTail(): ListNode<T> | null {
    if (!this.tail) return null;
    
    if (this.head === this.tail) {
      const deletedNode = this.head;
      this.head = null;
      this.tail = null;
      this.size--;
      return deletedNode;
    }
    
    let current = this.head;
    while (current && current.next && current.next !== this.tail) {
      current = current.next;
    }
    
    if (!current) return null;
    
    const deletedNode = this.tail;
    this.tail = current;
    if (this.tail) {
      this.tail.next = null;
    }
    
    this.size--;
    return deletedNode;
  }

  deleteAtIndex(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.size) return null;
    
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();
    
    let current = this.head;
    for (let i = 0; i < index - 1 && current; i++) {
      current = current.next;
    }
    
    if (current && current.next) {
      const deletedNode = current.next;
      current.next = current.next.next;
      this.size--;
      return deletedNode;
    }
    
    return null;
  }

  search(value: T): number {
    let current = this.head;
    let index = 0;
    
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.next;
      index++;
    }
    
    return -1;
  }

  update(index: number, value: T): boolean {
    if (index < 0 || index >= this.size) return false;
    
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    
    if (current) {
      current.value = value;
      return true;
    }
    
    return false;
  }

  reverse(): void {
    let prev: ListNode<T> | null = null;
    let current = this.head;
    this.tail = this.head;
    
    while (current) {
      const next = current.next;
      current.next = prev;
      prev = current;
      current = next;
    }
    
    this.head = prev;
  }

  toArray(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  toNodesArray(): ListNode<T>[] {
    const result: ListNode<T>[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current);
      current = current.next;
    }
    
    return result;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
    this.nodeIdCounter = 0;
  }
}
