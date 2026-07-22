export interface HeapNode<T> {
  id: string;
  value: T;
  index: number;
}

export type HeapType = 'min' | 'max';
