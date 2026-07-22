/**
 * Merge Sort Implementation Code
 */

export const MERGE_SORT_JAVA_CODE = `void mergeSort(int[] arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(int[] arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  int[] L = new int[n1];
  int[] R = new int[n2];
  
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}`;

export const MERGE_SORT_CPP_CODE = `void mergeSort(vector<int>& arr, int l, int r) {
  if (l < r) {
    int m = l + (r - l) / 2;
    mergeSort(arr, l, m);
    mergeSort(arr, m + 1, r);
    merge(arr, l, m, r);
  }
}

void merge(vector<int>& arr, int l, int m, int r) {
  int n1 = m - l + 1;
  int n2 = r - m;
  vector<int> L(n1), R(n2);
  
  for (int i = 0; i < n1; i++) L[i] = arr[l + i];
  for (int j = 0; j < n2; j++) R[j] = arr[m + 1 + j];
  
  int i = 0, j = 0, k = l;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) arr[k++] = L[i++];
    else arr[k++] = R[j++];
  }
  while (i < n1) arr[k++] = L[i++];
  while (j < n2) arr[k++] = R[j++];
}`;

export const MERGE_SORT_PSEUDO_CODE = `PROCEDURE mergeSort(array, left, right):
  IF left < right THEN
    mid ← left + (right - left) / 2
    mergeSort(array, left, mid)
    mergeSort(array, mid + 1, right)
    merge(array, left, mid, right)
  END IF
END PROCEDURE

PROCEDURE merge(array, left, mid, right):
  n1 ← mid - left + 1
  n2 ← right - mid
  CREATE arrays L[0..n1-1] and R[0..n2-1]
  
  FOR i FROM 0 TO n1-1:
    L[i] ← array[left + i]
  FOR j FROM 0 TO n2-1:
    R[j] ← array[mid + 1 + j]
  
  i ← 0, j ← 0, k ← left
  WHILE i < n1 AND j < n2:
    IF L[i] ≤ R[j] THEN
      array[k] ← L[i]
      i ← i + 1
    ELSE
      array[k] ← R[j]
      j ← j + 1
    END IF
    k ← k + 1
  END WHILE
  
  WHILE i < n1:
    array[k] ← L[i]
    i ← i + 1
    k ← k + 1
  END WHILE
  
  WHILE j < n2:
    array[k] ← R[j]
    j ← j + 1
    k ← k + 1
  END WHILE
END PROCEDURE`;

export const MERGE_SORT_METADATA = {
  title: 'Merge Sort',
  category: 'Sorting',
  difficulty: 'medium' as const,
  timeComplexity: 'O(n log n)',
  spaceComplexity: 'O(n)',
  description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, recursively sorts them, and then merges the sorted halves. It is stable and guarantees O(n log n) time complexity.',
};
