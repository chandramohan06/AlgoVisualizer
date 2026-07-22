import type { DoublyListNode } from './types';

export class DoublyLinkedList<T> {
  head: DoublyListNode<T> | null = null;
  tail: DoublyListNode<T> | null = null;
  size: number = 0;
  private nodeIdCounter: number = 0;

  private createNode(value: T): DoublyListNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      next: null,
      prev: null,
    };
  }

  insertAtHead(value: T): DoublyListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtTail(value: T): DoublyListNode<T> {
    const newNode = this.createNode(value);
    
    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.size++;
    return newNode;
  }

  insertAtIndex(value: T, index: number): DoublyListNode<T> | null {
    if (index < 0 || index > this.size) return null;
    
    if (index === 0) return this.insertAtHead(value);
    if (index === this.size) return this.insertAtTail(value);
    
    const newNode = this.createNode(value);
    let current = this.head;
    
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    
    if (current && current.prev) {
      newNode.prev = current.prev;
      newNode.next = current;
      current.prev.next = newNode;
      current.prev = newNode;
      this.size++;
      return newNode;
    }
    
    return null;
  }

  deleteHead(): DoublyListNode<T> | null {
    if (!this.head) return null;
    
    const deletedNode = this.head;
    this.head = this.head.next;
    
    if (this.head) {
      this.head.prev = null;
    } else {
      this.tail = null;
    }
    
    this.size--;
    return deletedNode;
  }

  deleteTail(): DoublyListNode<T> | null {
    if (!this.tail) return null;
    
    const deletedNode = this.tail;
    this.tail = this.tail.prev;
    
    if (this.tail) {
      this.tail.next = null;
    } else {
      this.head = null;
    }
    
    this.size--;
    return deletedNode;
  }

  deleteAtIndex(index: number): DoublyListNode<T> | null {
    if (index < 0 || index >= this.size) return null;
    
    if (index === 0) return this.deleteHead();
    if (index === this.size - 1) return this.deleteTail();
    
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    
    if (current && current.prev && current.next) {
      current.prev.next = current.next;
      current.next.prev = current.prev;
      this.size--;
      return current;
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

  searchBackward(value: T): number {
    let current = this.tail;
    let index = this.size - 1;
    
    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.prev;
      index--;
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
    let current = this.head;
    let temp: DoublyListNode<T> | null = null;
    
    while (current) {
      temp = current.prev;
      current.prev = current.next;
      current.next = temp;
      current = current.prev;
    }
    
    if (temp) {
      this.tail = this.head;
      this.head = temp.prev;
    }
  }

  traverseForward(): T[] {
    const result: T[] = [];
    let current = this.head;
    
    while (current) {
      result.push(current.value);
      current = current.next;
    }
    
    return result;
  }

  traverseBackward(): T[] {
    const result: T[] = [];
    let current = this.tail;
    
    while (current) {
      result.push(current.value);
      current = current.prev;
    }
    
    return result;
  }

  toArray(): T[] {
    return this.traverseForward();
  }

  toNodesArray(): DoublyListNode<T>[] {
    const result: DoublyListNode<T>[] = [];
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
