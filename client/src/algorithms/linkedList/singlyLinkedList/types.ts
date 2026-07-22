export interface ListNode<T> {
  id: string;
  value: T;
  next: ListNode<T> | null;
}

export interface LinkedListData<T> {
  nodes: { id: string; value: T; x: number; y: number }[];
  edges: { from: string; to: string | null; isBackward?: boolean }[];
  isCircular?: boolean;
}

export type LinkedListOperation = 
  | 'create'
  | 'insertHead'
  | 'insertTail'
  | 'insertIndex'
  | 'deleteHead'
  | 'deleteTail'
  | 'deleteIndex'
  | 'search'
  | 'update'
  | 'reverse';
