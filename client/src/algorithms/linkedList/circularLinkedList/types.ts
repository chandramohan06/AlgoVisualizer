export interface CircularListNode<T> {
  id: string;
  value: T;
  next: CircularListNode<T> | null;
}

export interface CircularLinkedListData<T> {
  nodes: { id: string; value: T; x: number; y: number }[];
  edges: { from: string; to: string | null; isBackward?: boolean }[];
  isCircular: boolean;
}
