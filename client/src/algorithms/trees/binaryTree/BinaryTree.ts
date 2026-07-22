import type { TreeNode } from './types';

export class BinaryTree<T> {
  root: TreeNode<T> | null = null;
  private nodeIdCounter: number = 0;

  private createNode(value: T): TreeNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      left: null,
      right: null,
    };
  }

  insert(value: T, position: 'left' | 'right' = 'left', parentId?: string): TreeNode<T> | null {
    const newNode = this.createNode(value);

    if (!this.root) {
      this.root = newNode;
      return newNode;
    }

    if (parentId) {
      const parent = this.findNode(this.root, parentId);
      if (parent) {
        if (position === 'left' && !parent.left) {
          parent.left = newNode;
          return newNode;
        } else if (position === 'right' && !parent.right) {
          parent.right = newNode;
          return newNode;
        }
      }
    }

    return null;
  }

  private findNode(node: TreeNode<T> | null, id: string): TreeNode<T> | null {
    if (!node) return null;
    if (node.id === id) return node;
    
    const leftResult = this.findNode(node.left, id);
    if (leftResult) return leftResult;
    
    return this.findNode(node.right, id);
  }

  search(value: T): TreeNode<T> | null {
    return this.searchNode(this.root, value);
  }

  private searchNode(node: TreeNode<T> | null, value: T): TreeNode<T> | null {
    if (!node) return null;
    if (node.value === value) return node;
    
    const leftResult = this.searchNode(node.left, value);
    if (leftResult) return leftResult;
    
    return this.searchNode(node.right, value);
  }

  preorderTraversal(): T[] {
    const result: T[] = [];
    this.preorder(this.root, result);
    return result;
  }

  private preorder(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    result.push(node.value);
    this.preorder(node.left, result);
    this.preorder(node.right, result);
  }

  inorderTraversal(): T[] {
    const result: T[] = [];
    this.inorder(this.root, result);
    return result;
  }

  private inorder(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    this.inorder(node.left, result);
    result.push(node.value);
    this.inorder(node.right, result);
  }

  postorderTraversal(): T[] {
    const result: T[] = [];
    this.postorder(this.root, result);
    return result;
  }

  private postorder(node: TreeNode<T> | null, result: T[]): void {
    if (!node) return;
    this.postorder(node.left, result);
    this.postorder(node.right, result);
    result.push(node.value);
  }

  levelorderTraversal(): T[] {
    if (!this.root) return [];
    
    const result: T[] = [];
    const queue: TreeNode<T>[] = [this.root];
    
    while (queue.length > 0) {
      const node = queue.shift()!;
      result.push(node.value);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    return result;
  }

  toNodesArray(): TreeNode<T>[] {
    const result: TreeNode<T>[] = [];
    this.collectNodes(this.root, result);
    return result;
  }

  private collectNodes(node: TreeNode<T> | null, result: TreeNode<T>[]): void {
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
