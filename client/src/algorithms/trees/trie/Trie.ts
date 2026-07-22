import type { TrieNode } from './types';

export class Trie {
  root: TrieNode;
  private nodeIdCounter: number = 0;

  constructor() {
    this.root = {
      id: String(this.nodeIdCounter++),
      char: '',
      children: new Map(),
      isEndOfWord: false,
    };
  }

  private createNode(char: string): TrieNode {
    return {
      id: String(this.nodeIdCounter++),
      char,
      children: new Map(),
      isEndOfWord: false,
    };
  }

  insert(word: string): void {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, this.createNode(char));
      }
      current = current.children.get(char)!;
    }
    
    current.isEndOfWord = true;
  }

  search(word: string): boolean {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    
    return current.isEndOfWord;
  }

  startsWith(prefix: string): boolean {
    let current = this.root;
    
    for (const char of prefix) {
      if (!current.children.has(char)) {
        return false;
      }
      current = current.children.get(char)!;
    }
    
    return true;
  }

  delete(word: string): boolean {
    return this.deleteRec(this.root, word, 0);
  }

  private deleteRec(node: TrieNode, word: string, index: number): boolean {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return node.children.size === 0;
    }

    const char = word[index];
    const child = node.children.get(char);
    
    if (!child) return false;
    
    const shouldDeleteChild = this.deleteRec(child, word, index + 1);
    
    if (shouldDeleteChild) {
      node.children.delete(char);
      return node.children.size === 0 && !node.isEndOfWord;
    }
    
    return false;
  }

  toNodesArray(): TrieNode[] {
    const result: TrieNode[] = [];
    this.collectNodes(this.root, result);
    return result;
  }

  private collectNodes(node: TrieNode, result: TrieNode[]): void {
    result.push(node);
    node.children.forEach(child => {
      this.collectNodes(child, result);
    });
  }

  clear(): void {
    this.root = {
      id: String(this.nodeIdCounter++),
      char: '',
      children: new Map(),
      isEndOfWord: false,
    };
    this.nodeIdCounter = 0;
  }
}
