import type { BSTNode } from './types';

export class BinarySearchTree<T> {
  root: BSTNode<T> | null = null;
  private nodeIdCounter: number = 0;

  private createNode(value: T): BSTNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      left: null,
      right: null,
    };
  }

  insert(value: T): BSTNode<T> | null {
    this.root = this.insertRec(this.root, value);
    return this.root;
  }

  private insertRec(node: BSTNode<T> | null, value: T): BSTNode<T> {
    if (!node) return this.createNode(value);

    if (value < node.value) {
      node.left = this.insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertRec(node.right, value);
    }
    // Duplicates are ignored in BST

    return node;
  }

  search(value: T): BSTNode<T> | null {
    return this.searchRec(this.root, value);
  }

  private searchRec(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;
    if (value === node.value) return node;
    if (value < node.value) return this.searchRec(node.left, value);
    return this.searchRec(node.right, value);
  }

  findMin(): BSTNode<T> | null {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  findMax(): BSTNode<T> | null {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  delete(value: T): BSTNode<T> | null {
    this.root = this.deleteRec(this.root, value);
    return this.root;
  }

  private deleteRec(node: BSTNode<T> | null, value: T): BSTNode<T> | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteRec(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteRec(node.right, value);
    } else {
      // Node found
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: get inorder successor
      const successor = this.getMinValueNode(node.right);
      node.value = successor.value;
      node.id = successor.id;
      node.right = this.deleteRec(node.right, successor.value);
    }

    return node;
  }

  private getMinValueNode(node: BSTNode<T>): BSTNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  successor(value: T): BSTNode<T> | null {
    const node = this.search(value);
    if (!node) return null;

    // If right subtree exists, find minimum in right subtree
    if (node.right) {
      let current = node.right;
      while (current.left) {
        current = current.left;
      }
      return current;
    }

    // Otherwise, find the ancestor where node is in left subtree
    let successor: BSTNode<T> | null = null;
    let current = this.root;

    while (current) {
      if (value < current.value) {
        successor = current;
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        break;
      }
    }

    return successor;
  }

  predecessor(value: T): BSTNode<T> | null {
    const node = this.search(value);
    if (!node) return null;

    // If left subtree exists, find maximum in left subtree
    if (node.left) {
      let current = node.left;
      while (current.right) {
        current = current.right;
      }
      return current;
    }

    // Otherwise, find the ancestor where node is in right subtree
    let predecessor: BSTNode<T> | null = null;
    let current = this.root;

    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        predecessor = current;
        current = current.right;
      } else {
        break;
      }
    }

    return predecessor;
  }

  toNodesArray(): BSTNode<T>[] {
    const result: BSTNode<T>[] = [];
    this.collectNodes(this.root, result);
    return result;
  }

  private collectNodes(node: BSTNode<T> | null, result: BSTNode<T>[]): void {
    if (!node) return;
    result.push(node);
    this.collectNodes(node.left, result);
    this.collectNodes(node.right, result);
  }

  clear(): void {
    this.root = null;
    this.nodeIdCounter = 0;
  }
}
