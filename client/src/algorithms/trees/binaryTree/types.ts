export interface TreeNode<T> {
  id: string;
  value: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
}

export type TraversalType = 'preorder' | 'inorder' | 'postorder' | 'levelorder';
