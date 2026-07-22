/**
 * Radix Sort Implementation Code
 */

export const RADIX_SORT_JAVA_CODE = `void radixSort(int[] arr) {
  int n = arr.length;
  int max = Arrays.stream(arr).max().getAsInt();
  
  for (int exp = 1; max / exp > 0; exp *= 10) {
    countingSort(arr, n, exp);
  }
}

void countingSort(int[] arr, int n, int exp) {
  int[] output = new int[n];
  int[] count = new int[10];
  
  for (int i = 0; i < n; i++) {
    int digit = (arr[i] / exp) % 10;
    count[digit]++;
  }
  
  for (int i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (int i = n - 1; i >= 0; i--) {
    int digit = (arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  for (int i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`;

export const RADIX_SORT_CPP_CODE = `void radixSort(vector<int>& arr) {
  int n = arr.size();
  int max = *max_element(arr.begin(), arr.end());
  
  for (int exp = 1; max / exp > 0; exp *= 10) {
    countingSort(arr, n, exp);
  }
}

void countingSort(vector<int>& arr, int n, int exp) {
  vector<int> output(n);
  vector<int> count(10, 0);
  
  for (int i = 0; i < n; i++) {
    int digit = (arr[i] / exp) % 10;
    count[digit]++;
  }
  
  for (int i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }
  
  for (int i = n - 1; i >= 0; i--) {
    int digit = (arr[i] / exp) % 10;
    output[count[digit] - 1] = arr[i];
    count[digit]--;
  }
  
  for (int i = 0; i < n; i++) {
    arr[i] = output[i];
  }
}`;

export const RADIX_SORT_PSEUDO_CODE = `PROCEDURE radixSort(array):
  n ← length(array)
  max ← maximum value in array
  
  FOR exp FROM 1 WHILE max/exp > 0:
    countingSort(array, n, exp)
    exp ← exp * 10
  END FOR
END PROCEDURE

PROCEDURE countingSort(array, n, exp):
  CREATE output array of size n
  CREATE count array of size 10, initialized to 0
  
  FOR i FROM 0 TO n-1:
    digit ← (array[i] / exp) MOD 10
    count[digit] ← count[digit] + 1
  END FOR
  
  FOR i FROM 1 TO 9:
    count[i] ← count[i] + count[i-1]
  END FOR
  
  FOR i FROM n-1 DOWN TO 0:
    digit ← (array[i] / exp) MOD 10
    output[count[digit] - 1] ← array[i]
    count[digit] ← count[digit] - 1
  END FOR
  
  FOR i FROM 0 TO n-1:
    array[i] ← output[i]
  END FOR
END PROCEDURE`;

export const RADIX_SORT_METADATA = {
  title: 'Radix Sort',
  category: 'Sorting',
  difficulty: 'medium' as const,
  timeComplexity: 'O(nk)',
  spaceComplexity: 'O(n + k)',
  description: 'Radix Sort is a non-comparison-based sorting algorithm that sorts numbers by processing individual digits. It processes digits from least significant to most significant, using counting sort as a subroutine for each digit position.',
};
