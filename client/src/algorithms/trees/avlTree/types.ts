export interface AVLNode<T> {
  id: string;
  value: T;
  left: AVLNode<T> | null;
  right: AVLNode<T> | null;
  height: number;
}

export type RotationType = 'LL' | 'RR' | 'LR' | 'RL';
