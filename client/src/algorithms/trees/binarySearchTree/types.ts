export interface BSTNode<T> {
  id: string;
  value: T;
  left: BSTNode<T> | null;
  right: BSTNode<T> | null;
}
