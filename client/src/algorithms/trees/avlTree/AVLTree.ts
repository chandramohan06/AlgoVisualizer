import type { AVLNode, RotationType } from './types';

export class AVLTree<T> {
  root: AVLNode<T> | null = null;
  private nodeIdCounter: number = 0;
  public lastRotation: RotationType | null = null;

  private createNode(value: T): AVLNode<T> {
    return {
      id: String(this.nodeIdCounter++),
      value,
      left: null,
      right: null,
      height: 1,
    };
  }

  private getHeight(node: AVLNode<T> | null): number {
    return node ? node.height : 0;
  }

  private getBalance(node: AVLNode<T> | null): number {
    return node ? this.getHeight(node.left) - this.getHeight(node.right) : 0;
  }

  private updateHeight(node: AVLNode<T>): void {
    node.height = 1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
  }

  private rotateRight(y: AVLNode<T>): AVLNode<T> {
    this.lastRotation = 'LL';
    const x = y.left!;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    this.updateHeight(y);
    this.updateHeight(x);

    return x;
  }

  private rotateLeft(x: AVLNode<T>): AVLNode<T> {
    this.lastRotation = 'RR';
    const y = x.right!;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    this.updateHeight(x);
    this.updateHeight(y);

    return y;
  }

  insert(value: T): AVLNode<T> | null {
    this.lastRotation = null;
    this.root = this.insertRec(this.root, value);
    return this.root;
  }

  private insertRec(node: AVLNode<T> | null, value: T): AVLNode<T> {
    if (!node) return this.createNode(value);

    if (value < node.value) {
      node.left = this.insertRec(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertRec(node.right, value);
    } else {
      return node; // Duplicates not allowed
    }

    this.updateHeight(node);

    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && value < node.left!.value) {
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && value > node.right!.value) {
      return this.rotateLeft(node);
    }

    // Left Right Case
    if (balance > 1 && value > node.left!.value) {
      this.lastRotation = 'LR';
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Left Case
    if (balance < -1 && value < node.right!.value) {
      this.lastRotation = 'RL';
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  delete(value: T): AVLNode<T> | null {
    this.lastRotation = null;
    this.root = this.deleteRec(this.root, value);
    return this.root;
  }

  private deleteRec(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return node;

    if (value < node.value) {
      node.left = this.deleteRec(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteRec(node.right, value);
    } else {
      if (!node.left || !node.right) {
        const temp = node.left || node.right;
        if (!temp) {
          return null;
        } else {
          return temp;
        }
      } else {
        const temp = this.getMinValueNode(node.right);
        node.value = temp.value;
        node.id = temp.id;
        node.right = this.deleteRec(node.right, temp.value);
      }
    }

    if (!node) return node;

    this.updateHeight(node);

    const balance = this.getBalance(node);

    // Left Left Case
    if (balance > 1 && this.getBalance(node.left) >= 0) {
      return this.rotateRight(node);
    }

    // Left Right Case
    if (balance > 1 && this.getBalance(node.left) < 0) {
      this.lastRotation = 'LR';
      node.left = this.rotateLeft(node.left!);
      return this.rotateRight(node);
    }

    // Right Right Case
    if (balance < -1 && this.getBalance(node.right) <= 0) {
      return this.rotateLeft(node);
    }

    // Right Left Case
    if (balance < -1 && this.getBalance(node.right) > 0) {
      this.lastRotation = 'RL';
      node.right = this.rotateRight(node.right!);
      return this.rotateLeft(node);
    }

    return node;
  }

  private getMinValueNode(node: AVLNode<T>): AVLNode<T> {
    let current = node;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  search(value: T): AVLNode<T> | null {
    return this.searchRec(this.root, value);
  }

  private searchRec(node: AVLNode<T> | null, value: T): AVLNode<T> | null {
    if (!node) return null;
    if (value === node.value) return node;
    if (value < node.value) return this.searchRec(node.left, value);
    return this.searchRec(node.right, value);
  }

  toNodesArray(): AVLNode<T>[] {
    const result: AVLNode<T>[] = [];
    this.collectNodes(this.root, result);
    return result;
  }

  private collectNodes(node: AVLNode<T> | null, result: AVLNode<T>[]): void {
    if (!node) return;
    result.push(node);
    this.collectNodes(node.left, result);
    this.collectNodes(node.right, result);
  }

  clear(): void {
    this.root = null;
    this.nodeIdCounter = 0;
    this.lastRotation = null;
  }
}
