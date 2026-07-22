/**
 * Counting Sort Implementation Code
 */

export const COUNTING_SORT_JAVA_CODE = `void countingSort(int[] arr) {
  int n = arr.length;
  int max = Arrays.stream(arr).max().getAsInt();
  
  int[] count = new int[max + 1];
  for (int i = 0; i < n; i++) {
    count[arr[i]]++;
  }
  
  for (int i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  int[] output = new int[n];
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  for (int i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`;

export const COUNTING_SORT_CPP_CODE = `void countingSort(vector<int>& arr) {
  int n = arr.size();
  int max = *max_element(arr.begin(), arr.end());
  
  vector<int> count(max + 1, 0);
  for (int i = 0; i < n; i++) {
    count[arr[i]]++;
  }
  
  for (int i = 1; i <= max; i++) {
    count[i] += count[i - 1];
  }
  
  vector<int> output(n);
  for (int i = n - 1; i >= 0; i--) {
    output[count[arr[i]] - 1] = arr[i];
    count[arr[i]]--;
  }
  
  for (int i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`;

export const COUNTING_SORT_PSEUDO_CODE = `PROCEDURE countingSort(array):
  n ← length(array)
  max ← maximum value in array
  
  CREATE count array of size max + 1, initialized to 0
  
  FOR i FROM 0 TO n-1:
    count[array[i]] ← count[array[i]] + 1
  END FOR
  
  FOR i FROM 1 TO max:
    count[i] ← count[i] + count[i-1]
  END FOR
  
  CREATE output array of size n
  
  FOR i FROM n-1 DOWN TO 0:
    output[count[array[i]] - 1] ← array[i]
    count[array[i]] ← count[array[i]] - 1
  END FOR
  
  FOR i FROM 0 TO n-1:
    array[i] ← output[i]
  END FOR
END PROCEDURE`;

export const COUNTING_SORT_METADATA = {
  title: 'Counting Sort',
  category: 'Sorting',
  difficulty: 'easy' as const,
  timeComplexity: 'O(n + k)',
  spaceComplexity: 'O(n + k)',
  description: 'Counting Sort is a non-comparison-based sorting algorithm that works by counting the number of occurrences of each distinct element in the array. It is efficient when the range of input values is not significantly larger than the number of elements.',
};
