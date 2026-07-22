export interface DoublyListNode<T> {
  id: string;
  value: T;
  next: DoublyListNode<T> | null;
  prev: DoublyListNode<T> | null;
}

export interface DoublyLinkedListData<T> {
  nodes: { id: string; value: T; x: number; y: number }[];
  edges: { from: string; to: string | null; isBackward?: boolean }[];
  isCircular?: boolean;
}
