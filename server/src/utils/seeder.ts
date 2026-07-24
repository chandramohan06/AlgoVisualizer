import mongoose from 'mongoose';
import { Category } from '../models/Category.model';
import { Algorithm } from '../models/Algorithm.model';
import { QuizQuestion } from '../models/QuizQuestion.model';
import { PracticeProblem } from '../models/PracticeProblem.model';
import { User } from '../models/User.model';
import { DeveloperProfile } from '../models/DeveloperProfile.model';
import { Difficulty, QuestionType, Role } from '@algovisualizer/shared';
import bcrypt from 'bcryptjs';

export const seedDatabase = async (): Promise<void> => {
  try {
    // 0. Ensure Developer Founder Profile exists
    const devProfileCount = await DeveloperProfile.countDocuments();
    if (devProfileCount === 0) {
      await DeveloperProfile.create({});
      console.log('✅  Founder Developer Profile initialized in MongoDBAtlas');
    }
    // 1. Ensure default Admin User exists and is correct
    const adminPasswordHash = await bcrypt.hash('admin1234', 10);
    const adminUser = await User.findOneAndUpdate(
      { email: { $regex: /^admin@algovisualizer\.com$/i } },
      {
        $set: {
          name: 'System Admin',
          email: 'admin@algovisualizer.com',
          passwordHash: adminPasswordHash,
          role: Role.ADMIN,
          isEmailVerified: true,
          isBanned: false,
          streak: 5,
        },
      },
      { upsert: true, new: true },
    );

    if (!adminUser) {
      throw new Error('Failed to create admin user');
    }

    console.log('✅  Admin user seeded: admin@algovisualizer.com');

    // 2. Ensure default Student User exists and is correct
    const studentPasswordHash = await bcrypt.hash('student1234', 10);
    await User.findOneAndUpdate(
      { email: { $regex: /^student@algovisualizer\.com$/i } },
      {
        $set: {
          name: 'Student User',
          email: 'student@algovisualizer.com',
          passwordHash: studentPasswordHash,
          role: Role.STUDENT,
          isEmailVerified: true,
          isBanned: false,
          streak: 7,
          lastActiveDate: new Date(),
        },
      },
      { upsert: true, new: true },
    );
    console.log('✅  Student user seeded: student@algovisualizer.com');

    // 3. Ensure test user (chandramohankumarsingh06@gmail.com) exists and is correct
    const testUserPasswordHash = await bcrypt.hash('Golukumar@12', 12);
    await User.findOneAndUpdate(
      { email: { $regex: /^chandramohankumarsingh06@gmail\.com$/i } },
      {
        $set: {
          name: 'Chandra Mohan Kumar Singh',
          email: 'chandramohankumarsingh06@gmail.com',
          passwordHash: testUserPasswordHash,
          role: Role.STUDENT,
          isEmailVerified: true,
          isBanned: false,
        },
      },
      { upsert: true, new: true },
    );
    console.log('✅  Test user seeded: chandramohankumarsingh06@gmail.com');

    // Ensure DSA Knowledge Base Notes exist
    const { Note } = await import('../models/Note.model');
    const noteCount = await Note.countDocuments();
    if (noteCount === 0) {
      const { seedNotesDatabase } = await import('../scripts/seedNotes');
      await seedNotesDatabase();
      console.log('✅  DSA Knowledge Base Notes auto-seeded in MongoDB');
    }
    const categoryCount = await Category.countDocuments();
    const arrayCategoryExists = await Category.findOne({ slug: 'array' });
    
    if (categoryCount > 0 && arrayCategoryExists) {
      console.log('🌱  Database already seeded with Array category. Skipping seeder.');
      return;
    }

    console.log('🌱  Database is empty or Array category missing. Seeding initial data...');

    // 3. Seed Categories (Array first, then others - only if not exists)
    const categoriesData = [];
    if (!arrayCategoryExists) {
      categoriesData.push({ name: 'Array', slug: 'array', icon: '📊', order: 1 });
    }
    
    // Add other categories only if they don't exist
    const existingSlugs = (await Category.find({}).select('slug').lean()).map(c => c.slug);
    
    const otherCategories = [
      { name: 'Sorting', slug: 'sorting', icon: '🔃', order: 2 },
      { name: 'Searching', slug: 'searching', icon: '🔍', order: 3 },
      { name: 'Linked List', slug: 'linked-list', icon: '🔗', order: 4 },
      { name: 'Stack', slug: 'stack', icon: '📚', order: 5 },
      { name: 'Queue', slug: 'queue', icon: '🚶', order: 6 },
      { name: 'Tree', slug: 'tree', icon: '🌳', order: 7 },
      { name: 'Graph', slug: 'graph', icon: '🕸️', order: 8 },
      { name: 'Recursion', slug: 'recursion', icon: '🔁', order: 9 },
      { name: 'Backtracking', slug: 'backtracking', icon: '↩️', order: 10 },
      { name: 'Dynamic Programming', slug: 'dp', icon: '🧩', order: 11 },
      { name: 'Greedy', slug: 'greedy', icon: '💰', order: 12 },
    ];
    
    for (const cat of otherCategories) {
      if (!existingSlugs.includes(cat.slug)) {
        categoriesData.push(cat);
      }
    }

    const seededCategories = await Category.insertMany(categoriesData);
    console.log(`✅  Seeded ${seededCategories.length} categories.`);

    const getCatId = async (slug: string) => {
      const found = await Category.findOne({ slug });
      if (found) return found._id;
      return new mongoose.Types.ObjectId();
    };

    const arrayCatId = await getCatId('array');

    // 4. Seed Algorithms (Array category first, then others)
    const algorithmsData = [
      // === BASIC ARRAY OPERATIONS ===
      {
        slug: 'array-traversal',
        title: 'Array Traversal',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Array traversal is the process of visiting each element in an array sequentially. It is the most fundamental operation on arrays and forms the basis for many other algorithms.',
        javaCode: `for (int i = 0; i < arr.length; i++) {
    System.out.print(arr[i] + " ");
}`,
        cppCode: `for (int i = 0; i < n; i++) {
    cout << arr[i] << " ";
}`,
        pseudoCode: `procedure traverse(A):
    for i from 0 to length(A) - 1:
        print A[i]`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Displaying array elements', 'Searching for elements', 'Processing data'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'insert-at-beginning',
        title: 'Insert at Beginning',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Inserting at the beginning of an array requires shifting all existing elements one position to the right to make space for the new element. This operation has O(N) time complexity.',
        javaCode: `public void insertAtBeginning(int[] arr, int n, int value) {
    for (int i = n - 1; i >= 0; i--) {
        arr[i + 1] = arr[i];
    }
    arr[0] = value;
}`,
        cppCode: `void insertAtBeginning(int arr[], int& n, int value) {
    for (int i = n - 1; i >= 0; i--) {
        arr[i + 1] = arr[i];
    }
    arr[0] = value;
    n++;
}`,
        pseudoCode: `procedure insertAtBeginning(A, value):
    for i from length(A) - 1 down to 0:
        A[i + 1] = A[i]
    A[0] = value`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Adding priority items', 'Stack implementation'],
        animationConfig: { type: 'array', defaultInput: [2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'insert-at-end',
        title: 'Insert at End',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Inserting at the end of an array is a simple operation that just places the new element at the last available position. This operation has O(1) time complexity if space is available.',
        javaCode: `public void insertAtEnd(int[] arr, int n, int value) {
    arr[n] = value;
}`,
        cppCode: `void insertAtEnd(int arr[], int& n, int value) {
    arr[n] = value;
    n++;
}`,
        pseudoCode: `procedure insertAtEnd(A, value):
    A[length(A)] = value`,
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        applications: ['Appending data', 'Queue implementation'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'insert-at-index',
        title: 'Insert at Index',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Inserting at a specific index requires shifting all elements from that index onwards one position to the right. Time complexity is O(N) in the worst case.',
        javaCode: `public void insertAtIndex(int[] arr, int n, int index, int value) {
    for (int i = n - 1; i >= index; i--) {
        arr[i + 1] = arr[i];
    }
    arr[index] = value;
}`,
        cppCode: `void insertAtIndex(int arr[], int& n, int index, int value) {
    for (int i = n - 1; i >= index; i--) {
        arr[i + 1] = arr[i];
    }
    arr[index] = value;
    n++;
}`,
        pseudoCode: `procedure insertAtIndex(A, index, value):
    for i from length(A) - 1 down to index:
        A[i + 1] = A[i]
    A[index] = value`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Maintaining sorted order', 'Inserting at specific positions'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'delete-from-beginning',
        title: 'Delete from Beginning',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Deleting from the beginning requires shifting all elements one position to the left to fill the gap. This operation has O(N) time complexity.',
        javaCode: `public void deleteFromBeginning(int[] arr, int n) {
    for (int i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
}`,
        cppCode: `void deleteFromBeginning(int arr[], int& n) {
    for (int i = 0; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
}`,
        pseudoCode: `procedure deleteFromBeginning(A):
    for i from 0 to length(A) - 2:
        A[i] = A[i + 1]`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Queue implementation', 'Processing FIFO'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'delete-from-end',
        title: 'Delete from End',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Deleting from the end is the simplest deletion operation - just reduce the array size by 1. This has O(1) time complexity.',
        javaCode: `public void deleteFromEnd(int[] arr, int n) {
    // Simply reduce size
}`,
        cppCode: `void deleteFromEnd(int arr[], int& n) {
    n--;
}`,
        pseudoCode: `procedure deleteFromEnd(A):
    reduce size of A by 1`,
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        applications: ['Stack implementation', 'LIFO operations'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'delete-from-index',
        title: 'Delete from Index',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Deleting from a specific index requires shifting all elements after that index one position to the left. Time complexity is O(N) in the worst case.',
        javaCode: `public void deleteAtIndex(int[] arr, int n, int index) {
    for (int i = index; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
}`,
        cppCode: `void deleteAtIndex(int arr[], int& n, int index) {
    for (int i = index; i < n - 1; i++) {
        arr[i] = arr[i + 1];
    }
    n--;
}`,
        pseudoCode: `procedure deleteAtIndex(A, index):
    for i from index to length(A) - 2:
        A[i] = A[i + 1]`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Removing specific elements', 'Dynamic arrays'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'update-element',
        title: 'Update Element',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Updating an element at a specific index is a direct access operation with O(1) time complexity, as arrays provide random access.',
        javaCode: `public void updateElement(int[] arr, int index, int value) {
    arr[index] = value;
}`,
        cppCode: `void updateElement(int arr[], int index, int value) {
    arr[index] = value;
}`,
        pseudoCode: `procedure updateElement(A, index, value):
    A[index] = value`,
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(1)',
        applications: ['Modifying data', 'State updates'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'reverse-array',
        title: 'Reverse Array',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Reversing an array swaps elements symmetrically from both ends moving towards the center. This can be done in-place with O(1) space complexity.',
        javaCode: `public void reverseArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}`,
        cppCode: `void reverseArray(int arr[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        swap(arr[left], arr[right]);
        left++;
        right--;
    }
}`,
        pseudoCode: `procedure reverseArray(A):
    left = 0
    right = length(A) - 1
    while left < right:
        swap A[left] and A[right]
        left = left + 1
        right = right - 1`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Palindrome checking', 'String reversal', 'Data transformation'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'left-rotation',
        title: 'Left Rotation',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Left rotation moves each element one position to the left, with the first element moving to the end. Can be done in O(N) time with O(1) space.',
        javaCode: `public void leftRotate(int[] arr, int d) {
    int n = arr.length;
    d = d % n;
    reverse(arr, 0, d - 1);
    reverse(arr, d, n - 1);
    reverse(arr, 0, n - 1);
}`,
        cppCode: `void leftRotate(int arr[], int n, int d) {
    d = d % n;
    reverse(arr, 0, d - 1);
    reverse(arr, d, n - 1);
    reverse(arr, 0, n - 1);
}`,
        pseudoCode: `procedure leftRotate(A, d):
    d = d mod length(A)
    reverse A[0..d-1]
    reverse A[d..length(A)-1]
    reverse A[0..length(A)-1]`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Circular buffers', 'String rotation', 'Cyclic shifts'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'right-rotation',
        title: 'Right Rotation',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Right rotation moves each element one position to the right, with the last element moving to the beginning. Can be done in O(N) time with O(1) space.',
        javaCode: `public void rightRotate(int[] arr, int d) {
    int n = arr.length;
    d = d % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, d - 1);
    reverse(arr, d, n - 1);
}`,
        cppCode: `void rightRotate(int arr[], int n, int d) {
    d = d % n;
    reverse(arr, 0, n - 1);
    reverse(arr, 0, d - 1);
    reverse(arr, d, n - 1);
}`,
        pseudoCode: `procedure rightRotate(A, d):
    d = d mod length(A)
    reverse A[0..length(A)-1]
    reverse A[0..d-1]
    reverse A[d..length(A)-1]`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Circular buffers', 'String rotation', 'Cyclic shifts'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === SEARCHING ALGORITHMS ===
      {
        slug: 'linear-search',
        title: 'Linear Search',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Linear search checks each element sequentially until the target is found or the array ends. Simple but inefficient for large datasets with O(N) time complexity.',
        javaCode: `public int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
        cppCode: `int linearSearch(int arr[], int n, int target) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
        pseudoCode: `procedure linearSearch(A, target):
    for i from 0 to length(A) - 1:
        if A[i] == target:
            return i
    return -1`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Small datasets', 'Unsorted data', 'First occurrence search'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'binary-search',
        title: 'Binary Search',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Binary Search works on sorted arrays by repeatedly dividing the search interval in half. Much more efficient than linear search with O(log N) time complexity.',
        javaCode: `public int binarySearch(int[] arr, int target) {
    int left = 0, right = arr.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
        cppCode: `int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] == target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}`,
        pseudoCode: `procedure binarySearch(A, target):
    left = 0
    right = length(A) - 1
    while left <= right:
        mid = left + (right - left) / 2
        if A[mid] == target:
            return mid
        if A[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        applications: ['Database indexing', 'Search in sorted data', 'Binary search trees'],
        animationConfig: { type: 'array', defaultInput: [1, 3, 5, 7, 9, 11, 13] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'lower-bound',
        title: 'Lower Bound',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Lower bound finds the first element in a sorted array that is not less than (greater than or equal to) the target. Uses binary search with O(log N) time complexity.',
        javaCode: `public int lowerBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}`,
        cppCode: `int lowerBound(int arr[], int n, int target) {
    int left = 0, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}`,
        pseudoCode: `procedure lowerBound(A, target):
    left = 0
    right = length(A)
    while left < right:
        mid = left + (right - left) / 2
        if A[mid] < target:
            left = mid + 1
        else:
            right = mid
    return left`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        applications: ['Finding insertion points', 'Range queries', 'STL lower_bound'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 4, 4, 5, 7] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'upper-bound',
        title: 'Upper Bound',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Upper bound finds the first element in a sorted array that is greater than the target. Uses binary search with O(log N) time complexity.',
        javaCode: `public int upperBound(int[] arr, int target) {
    int left = 0, right = arr.length;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}`,
        cppCode: `int upperBound(int arr[], int n, int target) {
    int left = 0, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] <= target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    return left;
}`,
        pseudoCode: `procedure upperBound(A, target):
    left = 0
    right = length(A)
    while left < right:
        mid = left + (right - left) / 2
        if A[mid] <= target:
            left = mid + 1
        else:
            right = mid
    return left`,
        timeComplexity: 'O(log N)',
        spaceComplexity: 'O(1)',
        applications: ['Finding insertion points', 'Range queries', 'STL upper_bound'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 4, 4, 5, 7] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === SORTING ALGORITHMS ===
      {
        slug: 'bubble-sort',
        title: 'Bubble Sort',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Bubble Sort repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. Simple but inefficient with O(N²) time complexity.',
        javaCode: `void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}`,
        cppCode: `void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`,
        pseudoCode: `procedure bubbleSort(A):
    n = length(A)
    for i from 0 to n - 2:
        for j from 0 to n - i - 2:
            if A[j] > A[j + 1]:
                swap A[j] and A[j + 1]`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        applications: ['Simple educational sorting', 'Nearly sorted data'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'selection-sort',
        title: 'Selection Sort',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Selection Sort finds the minimum element from the unsorted portion and places it at the beginning. Has O(N²) time complexity but performs fewer swaps than bubble sort.',
        javaCode: `void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
}`,
        cppCode: `void selectionSort(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        swap(arr[i], arr[minIdx]);
    }
}`,
        pseudoCode: `procedure selectionSort(A):
    n = length(A)
    for i from 0 to n - 2:
        minIdx = i
        for j from i + 1 to n - 1:
            if A[j] < A[minIdx]:
                minIdx = j
        swap A[i] and A[minIdx]`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        applications: ['Small datasets', 'When swap operations are expensive'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'insertion-sort',
        title: 'Insertion Sort',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Insertion Sort builds the sorted array one element at a time by inserting each element into its correct position. Efficient for small or nearly sorted datasets with O(N²) worst case.',
        javaCode: `void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        cppCode: `void insertionSort(int arr[], int n) {
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
        pseudoCode: `procedure insertionSort(A):
    for i from 1 to length(A) - 1:
        key = A[i]
        j = i - 1
        while j >= 0 and A[j] > key:
            A[j + 1] = A[j]
            j = j - 1
        A[j + 1] = key`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        applications: ['Small datasets', 'Nearly sorted data', 'Online algorithms'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'merge-sort',
        title: 'Merge Sort',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Merge Sort is a divide and conquer algorithm that divides the array into halves, sorts them recursively, and then merges the sorted halves. Guaranteed O(N log N) time complexity.',
        javaCode: `void mergeSort(int[] arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
        cppCode: `void mergeSort(int arr[], int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}`,
        pseudoCode: `procedure mergeSort(A, left, right):
    if left < right:
        mid = left + (right - left) / 2
        mergeSort(A, left, mid)
        mergeSort(A, mid + 1, right)
        merge(A, left, mid, right)`,
        timeComplexity: 'O(N log N)',
        spaceComplexity: 'O(N)',
        applications: ['Large datasets', 'External sorting', 'Stable sorting required'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'quick-sort',
        title: 'Quick Sort',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Quick Sort is a divide and conquer algorithm that picks a pivot and partitions the array around it. Average O(N log N) but worst case O(N²). Very efficient in practice.',
        javaCode: `void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        cppCode: `void quickSort(int arr[], int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}`,
        pseudoCode: `procedure quickSort(A, low, high):
    if low < high:
        pi = partition(A, low, high)
        quickSort(A, low, pi - 1)
        quickSort(A, pi + 1, high)`,
        timeComplexity: 'O(N log N) average, O(N²) worst',
        spaceComplexity: 'O(log N)',
        applications: ['General purpose sorting', 'In-place sorting', 'Cache efficiency'],
        animationConfig: { type: 'array', defaultInput: [5, 2, 8, 3, 1, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === TWO POINTER TECHNIQUES ===
      {
        slug: 'two-sum',
        title: 'Two Sum',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Two Sum finds two numbers in an array that add up to a target value. Can be solved with O(N²) brute force or O(N) using hash map or two pointers on sorted array.',
        javaCode: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[] { map.get(complement), i };
        }
        map.put(nums[i], i);
    }
    return new int[] {};
}`,
        cppCode: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        if (map.find(complement) != map.end()) {
            return { map[complement], i };
        }
        map[nums[i]] = i;
    }
    return {};
}`,
        pseudoCode: `procedure twoSum(A, target):
    map = empty hash map
    for i from 0 to length(A) - 1:
        complement = target - A[i]
        if complement in map:
            return [map[complement], i]
        map[A[i]] = i
    return []`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        applications: ['Finding pairs', 'Complement problems', 'Hash map usage'],
        animationConfig: { type: 'array', defaultInput: [2, 7, 11, 15] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'remove-duplicates',
        title: 'Remove Duplicates from Sorted Array',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Remove Duplicates from Sorted Array removes duplicate elements in-place and returns the new length. Uses two pointers with O(N) time and O(1) space.',
        javaCode: `public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int i = 0;
    for (int j = 1; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}`,
        cppCode: `int removeDuplicates(vector<int>& nums) {
    if (nums.empty()) return 0;
    int i = 0;
    for (int j = 1; j < nums.size(); j++) {
        if (nums[j] != nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    return i + 1;
}`,
        pseudoCode: `procedure removeDuplicates(A):
    if length(A) = 0: return 0
    i = 0
    for j from 1 to length(A) - 1:
        if A[j] != A[i]:
            i = i + 1
            A[i] = A[j]
    return i + 1`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Data cleaning', 'Unique elements', 'In-place operations'],
        animationConfig: { type: 'array', defaultInput: [1, 1, 2, 2, 3, 4, 4] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'move-zeroes',
        title: 'Move Zeroes',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Move Zeroes moves all zeros to the end while maintaining the relative order of non-zero elements. Uses two pointers with O(N) time and O(1) space.',
        javaCode: `public void moveZeroes(int[] nums) {
    int j = 0;
    for (int i = 0; i < nums.length; i++) {
        if (nums[i] != 0) {
            nums[j] = nums[i];
            j++;
        }
    }
    for (int i = j; i < nums.length; i++) {
        nums[i] = 0;
    }
}`,
        cppCode: `void moveZeroes(vector<int>& nums) {
    int j = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            nums[j] = nums[i];
            j++;
        }
    }
    for (int i = j; i < nums.size(); i++) {
        nums[i] = 0;
    }
}`,
        pseudoCode: `procedure moveZeroes(A):
    j = 0
    for i from 0 to length(A) - 1:
        if A[i] != 0:
            A[j] = A[i]
            j = j + 1
    for i from j to length(A) - 1:
        A[i] = 0`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Data cleaning', 'Array reorganization', 'In-place operations'],
        animationConfig: { type: 'array', defaultInput: [0, 1, 0, 3, 12] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'container-with-most-water',
        title: 'Container With Most Water',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Container With Most Water finds two lines that together with x-axis form a container that holds the most water. Uses two pointers from ends moving inward with O(N) time.',
        javaCode: `public int maxArea(int[] height) {
    int left = 0, right = height.length - 1;
    int maxArea = 0;
    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}`,
        cppCode: `int maxArea(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int maxArea = 0;
    while (left < right) {
        int area = min(height[left], height[right]) * (right - left);
        maxArea = max(maxArea, area);
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    return maxArea;
}`,
        pseudoCode: `procedure maxArea(height):
    left = 0
    right = length(height) - 1
    maxArea = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        maxArea = max(maxArea, area)
        if height[left] < height[right]:
            left = left + 1
        else:
            right = right - 1
    return maxArea`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Optimization problems', 'Geometry problems', 'Two pointer technique'],
        animationConfig: { type: 'array', defaultInput: [1, 8, 6, 2, 5, 4, 8, 3, 7] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'merge-sorted-arrays',
        title: 'Merge Sorted Arrays',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Merge Sorted Arrays merges two sorted arrays into one sorted array. Uses two pointers with O(N+M) time complexity.',
        javaCode: `public void merge(int[] nums1, int m, int[] nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}`,
        cppCode: `void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
    int i = m - 1, j = n - 1, k = m + n - 1;
    while (i >= 0 && j >= 0) {
        if (nums1[i] > nums2[j]) {
            nums1[k--] = nums1[i--];
        } else {
            nums1[k--] = nums2[j--];
        }
    }
    while (j >= 0) {
        nums1[k--] = nums2[j--];
    }
}`,
        pseudoCode: `procedure merge(A, m, B, n):
    i = m - 1, j = n - 1, k = m + n - 1
    while i >= 0 and j >= 0:
        if A[i] > B[j]:
            A[k] = A[i]
            i = i - 1
        else:
            A[k] = B[j]
            j = j - 1
        k = k - 1
    while j >= 0:
        A[k] = B[j]
        j = j - 1
        k = k - 1`,
        timeComplexity: 'O(N + M)',
        spaceComplexity: 'O(1)',
        applications: ['Merge sort', 'Combining sorted data', 'External sorting'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 0, 0, 0] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === SLIDING WINDOW ===
      {
        slug: 'max-sum-subarray',
        title: 'Maximum Sum Subarray (Kadane)',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Maximum Sum Subarray (Kadane) finds the contiguous subarray with the largest sum. Uses dynamic programming with O(N) time and O(1) space.',
        javaCode: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
        cppCode: `int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }
    return maxSum;
}`,
        pseudoCode: `procedure maxSubArray(A):
    maxSum = A[0]
    currentSum = A[0]
    for i from 1 to length(A) - 1:
        currentSum = max(A[i], currentSum + A[i])
        maxSum = max(maxSum, currentSum)
    return maxSum`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Stock trading', 'Maximum profit', 'Dynamic programming'],
        animationConfig: { type: 'array', defaultInput: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'max-average-subarray',
        title: 'Maximum Average Subarray',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Maximum Average Subarray finds the contiguous subarray of length k with the maximum average. Uses sliding window with O(N) time and O(1) space.',
        javaCode: `public double findMaxAverage(int[] nums, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) {
        sum += nums[i];
    }
    int maxSum = sum;
    for (int i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, sum);
    }
    return (double) maxSum / k;
}`,
        cppCode: `double findMaxAverage(vector<int>& nums, int k) {
    int sum = 0;
    for (int i = 0; i < k; i++) {
        sum += nums[i];
    }
    int maxSum = sum;
    for (int i = k; i < nums.size(); i++) {
        sum += nums[i] - nums[i - k];
        maxSum = max(maxSum, sum);
    }
    return (double) maxSum / k;
}`,
        pseudoCode: `procedure findMaxAverage(A, k):
    sum = 0
    for i from 0 to k - 1:
        sum = sum + A[i]
    maxSum = sum
    for i from k to length(A) - 1:
        sum = sum + A[i] - A[i - k]
        maxSum = max(maxSum, sum)
    return maxSum / k`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Signal processing', 'Data analysis', 'Sliding window'],
        animationConfig: { type: 'array', defaultInput: [1, 12, -5, -6, 50, 3] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'longest-substring-without-repeating',
        title: 'Longest Substring Without Repeating Characters',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Finds the longest substring without repeating characters using sliding window with hash map. O(N) time and O(min(N, M)) space where M is character set size.',
        javaCode: `public int lengthOfLongestSubstring(String s) {
    Map<Character, Integer> map = new HashMap<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c) && map.get(c) >= left) {
            left = map.get(c) + 1;
        }
        map.put(c, right);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        cppCode: `int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> map;
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        if (map.find(c) != map.end() && map[c] >= left) {
            left = map[c] + 1;
        }
        map[c] = right;
        maxLen = max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
        pseudoCode: `procedure lengthOfLongestSubstring(s):
    map = empty hash map
    left = 0, maxLen = 0
    for right from 0 to length(s) - 1:
        c = s[right]
        if c in map and map[c] >= left:
            left = map[c] + 1
        map[c] = right
        maxLen = max(maxLen, right - left + 1)
    return maxLen`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(min(N, M))',
        applications: ['String processing', 'Pattern matching', 'Unique substrings'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'min-window-substring',
        title: 'Minimum Window Substring',
        category: arrayCatId,
        difficulty: Difficulty.HARD,
        theory: 'Finds the minimum window in string s that contains all characters of string t. Uses sliding window with hash maps. O(N+M) time complexity.',
        javaCode: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    Map<Character, Integer> map = new HashMap<>();
    for (char c : t.toCharArray()) {
        map.put(c, map.getOrDefault(c, 0) + 1);
    }
    int left = 0, minLen = Integer.MAX_VALUE, count = 0;
    String result = "";
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        if (map.containsKey(c)) {
            map.put(c, map.get(c) - 1);
            if (map.get(c) >= 0) count++;
        }
        while (count == t.length()) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.substring(left, right + 1);
            }
            char leftChar = s.charAt(left);
            if (map.containsKey(leftChar)) {
                map.put(leftChar, map.get(leftChar) + 1);
                if (map.get(leftChar) > 0) count--;
            }
            left++;
        }
    }
    return result;
}`,
        cppCode: `string minWindow(string s, string t) {
    if (s.length() < t.length()) return "";
    unordered_map<char, int> map;
    for (char c : t) {
        map[c]++;
    }
    int left = 0, minLen = INT_MAX, count = 0;
    string result = "";
    for (int right = 0; right < s.length(); right++) {
        char c = s[right];
        if (map.find(c) != map.end()) {
            map[c]--;
            if (map[c] >= 0) count++;
        }
        while (count == t.length()) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.substr(left, right - left + 1);
            }
            char leftChar = s[left];
            if (map.find(leftChar) != map.end()) {
                map[leftChar]++;
                if (map[leftChar] > 0) count--;
            }
            left++;
        }
    }
    return result;
}`,
        pseudoCode: `procedure minWindow(s, t):
    if length(s) < length(t): return ""
    map = frequency map of t
    left = 0, minLen = infinity, count = 0
    result = ""
    for right from 0 to length(s) - 1:
        c = s[right]
        if c in map:
            map[c] = map[c] - 1
            if map[c] >= 0: count = count + 1
        while count == length(t):
            if right - left + 1 < minLen:
                minLen = right - left + 1
                result = substring(s, left, right + 1)
            leftChar = s[left]
            if leftChar in map:
                map[leftChar] = map[leftChar] + 1
                if map[leftChar] > 0: count = count - 1
            left = left + 1
    return result`,
        timeComplexity: 'O(N + M)',
        spaceComplexity: 'O(M)',
        applications: ['String matching', 'Pattern search', 'Text processing'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'fixed-window-maximum',
        title: 'Fixed Window Maximum',
        category: arrayCatId,
        difficulty: Difficulty.HARD,
        theory: 'Finds the maximum in each sliding window of size k using deque. O(N) time and O(k) space complexity.',
        javaCode: `public int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> deque = new ArrayDeque<>();
    int[] result = new int[nums.length - k + 1];
    int idx = 0;
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.pollLast();
        }
        deque.offerLast(i);
        if (i >= k - 1) {
            result[idx++] = nums[deque.peekFirst()];
        }
    }
    return result;
}`,
        cppCode: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq;
    vector<int> result;
    for (int i = 0; i < nums.size(); i++) {
        while (!dq.empty() && dq.front() < i - k + 1) {
            dq.pop_front();
        }
        while (!dq.empty() && nums[dq.back()] < nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);
        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }
    return result;
}`,
        pseudoCode: `procedure maxSlidingWindow(A, k):
    deque = empty deque
    result = empty array
    for i from 0 to length(A) - 1:
        while deque not empty and deque.front < i - k + 1:
            remove front from deque
        while deque not empty and A[deque.back] < A[i]:
            remove back from deque
        add i to back of deque
        if i >= k - 1:
            add A[deque.front] to result
    return result`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(k)',
        applications: ['Stream processing', 'Moving averages', 'Real-time analytics'],
        animationConfig: { type: 'array', defaultInput: [1, 3, -1, -3, 5, 3, 6, 7] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === PREFIX SUM ===
      {
        slug: 'prefix-sum',
        title: 'Prefix Sum',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Prefix Sum precomputes cumulative sums to answer range sum queries in O(1) time after O(N) preprocessing.',
        javaCode: `public int[] prefixSum(int[] nums) {
    int[] prefix = new int[nums.length + 1];
    for (int i = 0; i < nums.length; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}`,
        cppCode: `vector<int> prefixSum(vector<int>& nums) {
    vector<int> prefix(nums.size() + 1, 0);
    for (int i = 0; i < nums.size(); i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    return prefix;
}`,
        pseudoCode: `procedure prefixSum(A):
    prefix = array of size length(A) + 1
    for i from 0 to length(A) - 1:
        prefix[i + 1] = prefix[i] + A[i]
    return prefix`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        applications: ['Range queries', 'Subarray sums', 'Precomputation'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'range-sum-query',
        title: 'Range Sum Query',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Range Sum Query uses prefix sum to answer sum of elements between indices i and j in O(1) time.',
        javaCode: `public int rangeSum(int[] prefix, int i, int j) {
    return prefix[j + 1] - prefix[i];
}`,
        cppCode: `int rangeSum(vector<int>& prefix, int i, int j) {
    return prefix[j + 1] - prefix[i];
}`,
        pseudoCode: `procedure rangeSum(prefix, i, j):
    return prefix[j + 1] - prefix[i]`,
        timeComplexity: 'O(1)',
        spaceComplexity: 'O(N)',
        applications: ['Range queries', 'Subarray sums', 'Frequent sum operations'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'difference-array',
        title: 'Difference Array',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Difference Array allows range updates in O(1) time by storing differences between consecutive elements. Final array obtained by prefix sum.',
        javaCode: `public int[] differenceArray(int[] nums) {
    int[] diff = new int[nums.length + 1];
    diff[0] = nums[0];
    for (int i = 1; i < nums.length; i++) {
        diff[i] = nums[i] - nums[i - 1];
    }
    return diff;
}`,
        cppCode: `vector<int> differenceArray(vector<int>& nums) {
    vector<int> diff(nums.size() + 1, 0);
    diff[0] = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        diff[i] = nums[i] - nums[i - 1];
    }
    return diff;
}`,
        pseudoCode: `procedure differenceArray(A):
    diff = array of size length(A) + 1
    diff[0] = A[0]
    for i from 1 to length(A) - 1:
        diff[i] = A[i] - A[i - 1]
    return diff`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        applications: ['Range updates', 'Batch operations', 'Efficient modifications'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === KADANE VARIANTS ===
      {
        slug: 'max-circular-subarray',
        title: 'Maximum Circular Subarray',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Maximum Circular Subarray finds the maximum sum subarray in a circular array. Uses Kadane for normal and inverted arrays. O(N) time.',
        javaCode: `public int maxSubarraySumCircular(int[] nums) {
    int maxNormal = kadane(nums);
    int totalSum = 0;
    for (int num : nums) {
        totalSum += num;
    }
    int[] inverted = new int[nums.length];
    for (int i = 0; i < nums.length; i++) {
        inverted[i] = -nums[i];
    }
    int maxInverted = kadane(inverted);
    int maxCircular = totalSum + maxInverted;
    if (maxCircular == 0) return maxNormal;
    return Math.max(maxNormal, maxCircular);
}`,
        cppCode: `int maxSubarraySumCircular(vector<int>& nums) {
    int maxNormal = kadane(nums);
    int totalSum = 0;
    for (int num : nums) {
        totalSum += num;
    }
    vector<int> inverted(nums.size());
    for (int i = 0; i < nums.size(); i++) {
        inverted[i] = -nums[i];
    }
    int maxInverted = kadane(inverted);
    int maxCircular = totalSum + maxInverted;
    if (maxCircular == 0) return maxNormal;
    return max(maxNormal, maxCircular);
}`,
        pseudoCode: `procedure maxSubarraySumCircular(A):
    maxNormal = kadane(A)
    totalSum = sum of all elements in A
    inverted = array with -A[i] for each element
    maxInverted = kadane(inverted)
    maxCircular = totalSum + maxInverted
    if maxCircular = 0: return maxNormal
    return max(maxNormal, maxCircular)`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(N)',
        applications: ['Circular arrays', 'Wrap-around problems', 'Maximum sum variants'],
        animationConfig: { type: 'array', defaultInput: [5, -3, 5] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === MATRIX OPERATIONS ===
      {
        slug: 'matrix-traversal',
        title: 'Matrix Traversal',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Matrix Traversal visits each element in a 2D array in row-major or column-major order. Foundation for all matrix algorithms.',
        javaCode: `public void matrixTraversal(int[][] matrix) {
    int rows = matrix.length;
    int cols = matrix[0].length;
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            System.out.print(matrix[i][j] + " ");
        }
        System.out.println();
    }
}`,
        cppCode: `void matrixTraversal(vector<vector<int>>& matrix) {
    int rows = matrix.size();
    int cols = matrix[0].size();
    for (int i = 0; i < rows; i++) {
        for (int j = 0; j < cols; j++) {
            cout << matrix[i][j] << " ";
        }
        cout << endl;
    }
}`,
        pseudoCode: `procedure matrixTraversal(matrix):
    rows = number of rows
    cols = number of columns
    for i from 0 to rows - 1:
        for j from 0 to cols - 1:
            print matrix[i][j]`,
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(1)',
        applications: ['Image processing', 'Grid problems', '2D data processing'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'spiral-matrix',
        title: 'Spiral Matrix',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Spiral Matrix traverses a 2D matrix in spiral order (clockwise). Uses four boundaries that shrink as elements are visited. O(N×M) time.',
        javaCode: `public List<Integer> spiralOrder(int[][] matrix) {
    List<Integer> result = new ArrayList<>();
    if (matrix == null || matrix.length == 0) return result;
    int top = 0, bottom = matrix.length - 1;
    int left = 0, right = matrix[0].length - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) {
            result.add(matrix[top][i]);
        }
        top++;
        for (int i = top; i <= bottom; i++) {
            result.add(matrix[i][right]);
        }
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                result.add(matrix[bottom][i]);
            }
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                result.add(matrix[i][left]);
            }
            left++;
        }
    }
    return result;
}`,
        cppCode: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> result;
    if (matrix.empty() || matrix[0].empty()) return result;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int i = left; i <= right; i++) {
            result.push_back(matrix[top][i]);
        }
        top++;
        for (int i = top; i <= bottom; i++) {
            result.push_back(matrix[i][right]);
        }
        right--;
        if (top <= bottom) {
            for (int i = right; i >= left; i--) {
                result.push_back(matrix[bottom][i]);
            }
            bottom--;
        }
        if (left <= right) {
            for (int i = bottom; i >= top; i--) {
                result.push_back(matrix[i][left]);
            }
            left++;
        }
    }
    return result;
}`,
        pseudoCode: `procedure spiralOrder(matrix):
    result = empty list
    top = 0, bottom = rows - 1
    left = 0, right = cols - 1
    while top <= bottom and left <= right:
        for i from left to right:
            add matrix[top][i] to result
        top = top + 1
        for i from top to bottom:
            add matrix[i][right] to result
        right = right - 1
        if top <= bottom:
            for i from right down to left:
                add matrix[bottom][i] to result
            bottom = bottom - 1
        if left <= right:
            for i from bottom down to top:
                add matrix[i][left] to result
            left = left + 1
    return result`,
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(1)',
        applications: ['Matrix processing', 'Spiral patterns', 'Boundary traversal'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'rotate-matrix',
        title: 'Rotate Matrix',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Rotate Matrix rotates a 2D matrix 90 degrees clockwise. Can be done in-place by transposing and reversing rows. O(N²) time.',
        javaCode: `public void rotate(int[][] matrix) {
    int n = matrix.length;
    // Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
    // Reverse each row
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n / 2; j++) {
            int temp = matrix[i][j];
            matrix[i][j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }
}`,
        cppCode: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    // Transpose
    for (int i = 0; i < n; i++) {
        for (int j = i; j < n; j++) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    // Reverse each row
    for (int i = 0; i < n; i++) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}`,
        pseudoCode: `procedure rotate(matrix):
    n = size of matrix
    // Transpose
    for i from 0 to n - 1:
        for j from i to n - 1:
            swap matrix[i][j] and matrix[j][i]
    // Reverse each row
    for i from 0 to n - 1:
        reverse row i`,
        timeComplexity: 'O(N²)',
        spaceComplexity: 'O(1)',
        applications: ['Image rotation', 'Matrix transformations', 'Geometric operations'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'set-matrix-zeroes',
        title: 'Set Matrix Zeroes',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Set Matrix Zeroes sets entire row and column to zero if an element is zero. Can be done in-place using first row and column as markers. O(N×M) time.',
        javaCode: `public void setZeroes(int[][] matrix) {
    boolean firstRowZero = false, firstColZero = false;
    int m = matrix.length, n = matrix[0].length;
    
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] == 0) firstColZero = true;
    }
    for (int j = 0; j < n; j++) {
        if (matrix[0][j] == 0) firstRowZero = true;
    }
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if (firstColZero) {
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
    if (firstRowZero) {
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
}`,
        cppCode: `void setZeroes(vector<vector<int>>& matrix) {
    bool firstRowZero = false, firstColZero = false;
    int m = matrix.size(), n = matrix[0].size();
    
    for (int i = 0; i < m; i++) {
        if (matrix[i][0] == 0) firstColZero = true;
    }
    for (int j = 0; j < n; j++) {
        if (matrix[0][j] == 0) firstRowZero = true;
    }
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if (firstColZero) {
        for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
    if (firstRowZero) {
        for (int j = 0; j < n; j++) matrix[0][j] = 0;
    }
}`,
        pseudoCode: `procedure setZeroes(matrix):
    firstRowZero = false, firstColZero = false
    m = rows, n = cols
    
    // Check first row and column
    for i from 0 to m - 1:
        if matrix[i][0] = 0: firstColZero = true
    for j from 0 to n - 1:
        if matrix[0][j] = 0: firstRowZero = true
    
    // Use first row and column as markers
    for i from 1 to m - 1:
        for j from 1 to n - 1:
            if matrix[i][j] = 0:
                matrix[i][0] = 0
                matrix[0][j] = 0
    
    // Set zeroes based on markers
    for i from 1 to m - 1:
        for j from 1 to n - 1:
            if matrix[i][0] = 0 or matrix[0][j] = 0:
                matrix[i][j] = 0
    
    // Set first row and column if needed
    if firstColZero:
        for i from 0 to m - 1: matrix[i][0] = 0
    if firstRowZero:
        for j from 0 to n - 1: matrix[0][j] = 0`,
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(1)',
        applications: ['Data cleaning', 'Matrix operations', 'In-place algorithms'],
        animationConfig: { type: 'array', defaultInput: [1, 1, 1, 1, 0, 1, 1, 1, 0] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'transpose-matrix',
        title: 'Transpose Matrix',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Transpose Matrix swaps rows and columns. For square matrices, can be done in-place. O(N×M) time.',
        javaCode: `public int[][] transpose(int[][] matrix) {
    int m = matrix.length, n = matrix[0].length;
    int[][] result = new int[n][m];
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}`,
        cppCode: `vector<vector<int>> transpose(vector<vector<int>>& matrix) {
    int m = matrix.size(), n = matrix[0].size();
    vector<vector<int>> result(n, vector<int>(m));
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}`,
        pseudoCode: `procedure transpose(matrix):
    m = rows, n = cols
    result = n × m matrix
    for i from 0 to m - 1:
        for j from 0 to n - 1:
            result[j][i] = matrix[i][j]
    return result`,
        timeComplexity: 'O(N × M)',
        spaceComplexity: 'O(N × M)',
        applications: ['Matrix operations', 'Linear algebra', 'Data transformation'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4, 5, 6] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      // === MISCELLANEOUS ===
      {
        slug: 'majority-element',
        title: 'Majority Element',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Majority Element finds the element that appears more than n/2 times. Uses Boyer-Moore voting algorithm with O(N) time and O(1) space.',
        javaCode: `public int majorityElement(int[] nums) {
    int count = 0, candidate = 0;
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
        cppCode: `int majorityElement(vector<int>& nums) {
    int count = 0, candidate = 0;
    for (int num : nums) {
        if (count == 0) {
            candidate = num;
        }
        count += (num == candidate) ? 1 : -1;
    }
    return candidate;
}`,
        pseudoCode: `procedure majorityElement(A):
    count = 0, candidate = 0
    for num in A:
        if count = 0:
            candidate = num
        if num = candidate:
            count = count + 1
        else:
            count = count - 1
    return candidate`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Voting systems', 'Frequency analysis', 'Majority detection'],
        animationConfig: { type: 'array', defaultInput: [3, 2, 3] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'product-except-self',
        title: 'Product Except Self',
        category: arrayCatId,
        difficulty: Difficulty.MEDIUM,
        theory: 'Product Except Self returns an array where each element is the product of all elements except itself. Uses prefix and suffix products with O(N) time and O(1) extra space.',
        javaCode: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    result[0] = 1;
    
    // Prefix products
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Suffix products
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}`,
        cppCode: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size();
    vector<int> result(n, 1);
    
    // Prefix products
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Suffix products
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}`,
        pseudoCode: `procedure productExceptSelf(A):
    n = length(A)
    result = array of size n
    result[0] = 1
    
    // Prefix products
    for i from 1 to n - 1:
        result[i] = result[i - 1] * A[i - 1]
    
    // Suffix products
    suffix = 1
    for i from n - 1 down to 0:
        result[i] = result[i] * suffix
        suffix = suffix * A[i]
    
    return result`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Array manipulation', 'Product calculations', 'Without division'],
        animationConfig: { type: 'array', defaultInput: [1, 2, 3, 4] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'best-time-buy-sell-stock',
        title: 'Best Time to Buy and Sell Stock',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Finds the maximum profit from buying and selling stock once. Tracks minimum price with O(N) time and O(1) space.',
        javaCode: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
        cppCode: `int maxProfit(vector<int>& prices) {
    int minPrice = INT_MAX;
    int maxProfit = 0;
    for (int price : prices) {
        minPrice = min(minPrice, price);
        maxProfit = max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
        pseudoCode: `procedure maxProfit(prices):
    minPrice = infinity
    maxProfit = 0
    for price in prices:
        minPrice = min(minPrice, price)
        maxProfit = max(maxProfit, price - minPrice)
    return maxProfit`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Stock trading', 'Maximum profit', 'Buy-sell problems'],
        animationConfig: { type: 'array', defaultInput: [7, 1, 5, 3, 6, 4] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'trapping-rain-water',
        title: 'Trapping Rain Water',
        category: arrayCatId,
        difficulty: Difficulty.HARD,
        theory: 'Calculates how much water can be trapped after raining. Uses two pointers tracking max heights from both ends. O(N) time and O(1) space.',
        javaCode: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
}`,
        cppCode: `int trap(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0;
    int water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                water += leftMax - height[left];
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                water += rightMax - height[right];
            }
            right--;
        }
    }
    return water;
}`,
        pseudoCode: `procedure trap(height):
    left = 0, right = length(height) - 1
    leftMax = 0, rightMax = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= leftMax:
                leftMax = height[left]
            else:
                water = water + (leftMax - height[left])
            left = left + 1
        else:
            if height[right] >= rightMax:
                rightMax = height[right]
            else:
                water = water + (rightMax - height[right])
            right = right - 1
    return water`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Water trapping', 'Container problems', 'Height calculations'],
        animationConfig: { type: 'array', defaultInput: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
      {
        slug: 'missing-number',
        title: 'Missing Number',
        category: arrayCatId,
        difficulty: Difficulty.EASY,
        theory: 'Finds the missing number in an array containing n distinct numbers from 0 to n. Uses XOR or sum formula with O(N) time and O(1) space.',
        javaCode: `public int missingNumber(int[] nums) {
    int n = nums.length;
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int num : nums) {
        actual += num;
    }
    return expected - actual;
}`,
        cppCode: `int missingNumber(vector<int>& nums) {
    int n = nums.size();
    int expected = n * (n + 1) / 2;
    int actual = 0;
    for (int num : nums) {
        actual += num;
    }
    return expected - actual;
}`,
        pseudoCode: `procedure missingNumber(A):
    n = length(A)
    expected = n * (n + 1) / 2
    actual = sum of all elements in A
    return expected - actual`,
        timeComplexity: 'O(N)',
        spaceComplexity: 'O(1)',
        applications: ['Missing element detection', 'Array completeness', 'Sum formula'],
        animationConfig: { type: 'array', defaultInput: [3, 0, 1] },
        isPublished: true,
        createdBy: adminUser._id,
      },
    ];

    const seededAlgorithms = await Algorithm.insertMany(algorithmsData);
    console.log(`✅  Seeded ${seededAlgorithms.length} core algorithms.`);

    const getAlgoId = (slug: string) => {
      const found = seededAlgorithms.find((a) => a.slug === slug);
      return found ? found._id : new mongoose.Types.ObjectId();
    };

    // 5. Seed Quiz Questions for Array Algorithms
    const quizQuestionsData = [
      // === BASIC ARRAY OPERATIONS ===
      {
        algorithmId: getAlgoId('array-traversal'),
        question: 'What is the time complexity of array traversal?',
        type: QuestionType.MCQ,
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctAnswer: 'O(N)',
        explanation: 'Array traversal visits each element exactly once, resulting in O(N) time complexity.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('insert-at-beginning'),
        question: 'Why is inserting at the beginning of an array O(N)?',
        type: QuestionType.MCQ,
        options: ['Need to find the beginning', 'All elements must shift right', 'Memory allocation takes time', 'None of the above'],
        correctAnswer: 'All elements must shift right',
        explanation: 'Inserting at index 0 requires shifting all existing elements one position to the right to make space.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('reverse-array'),
        question: 'What is the space complexity of reversing an array in-place?',
        type: QuestionType.MCQ,
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctAnswer: 'O(1)',
        explanation: 'In-place reversal uses only a constant amount of extra space for swapping elements.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      // === SEARCHING ===
      {
        algorithmId: getAlgoId('linear-search'),
        question: 'What is the best-case time complexity of Linear Search?',
        type: QuestionType.MCQ,
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctAnswer: 'O(1)',
        explanation: 'Best case occurs when the target is found at the first index.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('binary-search'),
        question: 'Which condition MUST be satisfied before running Binary Search?',
        type: QuestionType.MCQ,
        options: ['Array must be empty', 'Array must be sorted', 'Array must contain unique elements', 'None of the above'],
        correctAnswer: 'Array must be sorted',
        explanation: 'Binary Search assumes sorted intervals to correctly halve bounds on comparison.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('lower-bound'),
        question: 'What does lower bound return if the target is not found?',
        type: QuestionType.MCQ,
        options: ['-1', 'Index where target should be inserted', 'Last index', '0'],
        correctAnswer: 'Index where target should be inserted',
        explanation: 'Lower bound returns the first position where target could be inserted to maintain sorted order.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      // === SORTING ===
      {
        algorithmId: getAlgoId('bubble-sort'),
        question: 'What is the worst-case time complexity of Bubble Sort?',
        type: QuestionType.MCQ,
        options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(1)'],
        correctAnswer: 'O(N²)',
        explanation: 'In the worst case (reverse sorted list), Bubble Sort makes N² comparison passes.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('selection-sort'),
        question: 'How many swaps does Selection Sort perform in the worst case?',
        type: QuestionType.MCQ,
        options: ['N', 'N²', 'N log N', 'N/2'],
        correctAnswer: 'N',
        explanation: 'Selection Sort performs exactly N-1 swaps in the worst case, one for each position.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('merge-sort'),
        question: 'What is the space complexity of Merge Sort?',
        type: QuestionType.MCQ,
        options: ['O(1)', 'O(log N)', 'O(N)', 'O(N²)'],
        correctAnswer: 'O(N)',
        explanation: 'Merge Sort requires O(N) auxiliary space for merging subarrays.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      {
        algorithmId: getAlgoId('quick-sort'),
        question: 'What is the average time complexity of Quick Sort?',
        type: QuestionType.MCQ,
        options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(log N)'],
        correctAnswer: 'O(N log N)',
        explanation: 'Quick Sort has average O(N log N) complexity but worst case O(N²) when pivot selection is poor.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      // === TWO POINTER ===
      {
        algorithmId: getAlgoId('two-sum'),
        question: 'What data structure is commonly used to solve Two Sum in O(N) time?',
        type: QuestionType.MCQ,
        options: ['Stack', 'Queue', 'Hash Map', 'Tree'],
        correctAnswer: 'Hash Map',
        explanation: 'Hash map allows O(1) lookup to find the complement of each element.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('remove-duplicates'),
        question: 'What condition must be met for the two-pointer duplicate removal to work?',
        type: QuestionType.MCQ,
        options: ['Array must be sorted', 'Array must be unsorted', 'Array must have unique elements', 'None of the above'],
        correctAnswer: 'Array must be sorted',
        explanation: 'Two-pointer duplicate removal requires sorted array to correctly identify duplicates.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('container-with-most-water'),
        question: 'In Container With Most Water, which pointer moves when heights are equal?',
        type: QuestionType.MCQ,
        options: ['Left pointer', 'Right pointer', 'Either pointer', 'Both pointers'],
        correctAnswer: 'Either pointer',
        explanation: 'When heights are equal, moving either pointer will work as the area is limited by the equal heights.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      // === SLIDING WINDOW ===
      {
        algorithmId: getAlgoId('max-sum-subarray'),
        question: 'What algorithm is used to find Maximum Sum Subarray?',
        type: QuestionType.MCQ,
        options: ['Binary Search', 'Kadane\'s Algorithm', 'Dijkstra', 'Merge Sort'],
        correctAnswer: 'Kadane\'s Algorithm',
        explanation: 'Kadane\'s Algorithm uses dynamic programming to find maximum subarray sum in O(N) time.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('longest-substring-without-repeating'),
        question: 'What data structure is used to track character positions in Longest Substring Without Repeating?',
        type: QuestionType.MCQ,
        options: ['Stack', 'Hash Map', 'Queue', 'Tree'],
        correctAnswer: 'Hash Map',
        explanation: 'Hash map stores the most recent index of each character for O(1) lookup.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      {
        algorithmId: getAlgoId('fixed-window-maximum'),
        question: 'What data structure is used to efficiently find maximum in sliding window?',
        type: QuestionType.MCQ,
        options: ['Hash Map', 'Deque', 'Stack', 'Priority Queue'],
        correctAnswer: 'Deque',
        explanation: 'Deque maintains elements in decreasing order, allowing O(1) access to maximum.',
        difficulty: Difficulty.HARD,
        points: 20,
      },
      // === PREFIX SUM ===
      {
        algorithmId: getAlgoId('prefix-sum'),
        question: 'What is the time complexity of answering a range sum query using prefix sum?',
        type: QuestionType.MCQ,
        options: ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'],
        correctAnswer: 'O(1)',
        explanation: 'After O(N) preprocessing, range sum queries can be answered in O(1) time.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('difference-array'),
        question: 'What is the main advantage of using a difference array?',
        type: QuestionType.MCQ,
        options: ['Faster search', 'O(1) range updates', 'Less memory', 'Simpler code'],
        correctAnswer: 'O(1) range updates',
        explanation: 'Difference array allows updating a range in O(1) time by storing differences.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      // === MATRIX ===
      {
        algorithmId: getAlgoId('spiral-matrix'),
        question: 'How many boundaries are tracked in Spiral Matrix traversal?',
        type: QuestionType.MCQ,
        options: ['2', '3', '4', '5'],
        correctAnswer: '4',
        explanation: 'Four boundaries (top, bottom, left, right) are tracked and shrink as elements are visited.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      {
        algorithmId: getAlgoId('rotate-matrix'),
        question: 'What is the first step in rotating a matrix 90 degrees clockwise?',
        type: QuestionType.MCQ,
        options: ['Reverse rows', 'Transpose', 'Reverse columns', 'Sort elements'],
        correctAnswer: 'Transpose',
        explanation: 'First transpose the matrix (swap rows and columns), then reverse each row.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      {
        algorithmId: getAlgoId('set-matrix-zeroes'),
        question: 'What technique is used to achieve O(1) space in Set Matrix Zeroes?',
        type: QuestionType.MCQ,
        options: ['Hash Map', 'First row and column as markers', 'Recursion', 'Binary Search'],
        correctAnswer: 'First row and column as markers',
        explanation: 'First row and column are used as markers to track which rows/columns should be zeroed.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      // === MISCELLANEOUS ===
      {
        algorithmId: getAlgoId('majority-element'),
        question: 'What algorithm finds the majority element in O(N) time and O(1) space?',
        type: QuestionType.MCQ,
        options: ['Binary Search', 'Boyer-Moore Voting', 'Merge Sort', 'Quick Sort'],
        correctAnswer: 'Boyer-Moore Voting',
        explanation: 'Boyer-Moore Voting Algorithm uses a candidate and count to find majority element efficiently.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
      {
        algorithmId: getAlgoId('product-except-self'),
        question: 'How many passes does Product Except Self require?',
        type: QuestionType.MCQ,
        options: ['1', '2', '3', '4'],
        correctAnswer: '2',
        explanation: 'Two passes: one for prefix products, one for suffix products.',
        difficulty: Difficulty.MEDIUM,
        points: 15,
      },
      {
        algorithmId: getAlgoId('trapping-rain-water'),
        question: 'What technique is used in Trapping Rain Water?',
        type: QuestionType.MCQ,
        options: ['Binary Search', 'Two Pointers', 'Sliding Window', 'Recursion'],
        correctAnswer: 'Two Pointers',
        explanation: 'Two pointers track max heights from both ends to calculate trapped water.',
        difficulty: Difficulty.HARD,
        points: 20,
      },
      {
        algorithmId: getAlgoId('best-time-buy-sell-stock'),
        question: 'What does Best Time to Buy and Sell Stock track?',
        type: QuestionType.MCQ,
        options: ['Maximum price', 'Minimum price', 'Both min and max', 'Average price'],
        correctAnswer: 'Minimum price',
        explanation: 'Tracks minimum price seen so far to calculate maximum profit at each step.',
        difficulty: Difficulty.EASY,
        points: 10,
      },
    ];

    const seededQuizzes = await QuizQuestion.insertMany(quizQuestionsData);
    console.log(`✅  Seeded ${seededQuizzes.length} quiz questions.`);

    // 6. Seed Practice Problems for Array Algorithms
    const practiceProblemsData = [
      // === BASIC ARRAY OPERATIONS ===
      {
        algorithmId: getAlgoId('array-traversal'),
        title: 'Find Maximum Element',
        description: 'Given an array of integers, find the maximum element in the array.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int findMax(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int findMax(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[1, 5, 3, 9, 2]', expectedOutput: '9' },
          { input: '[-1, -5, -3]', expectedOutput: '-1' },
        ],
        solution: 'Traverse the array and keep track of the maximum element seen so far.',
        externalLink: 'https://leetcode.com/problems/find-maximum-element/',
      },
      // === SEARCHING ===
      {
        algorithmId: getAlgoId('linear-search'),
        title: 'Find Index of Target',
        description: 'Given an array of integers and a target value, return the index of the target if it exists, otherwise return -1.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};',
        },
        testCases: [
          { input: 'nums = [4,5,6,7,0,1,2], target = 0', expectedOutput: '4' },
          { input: 'nums = [4,5,6,7,0,1,2], target = 3', expectedOutput: '-1' },
        ],
        solution: 'Use linear search to check each element sequentially until target is found.',
        externalLink: 'https://leetcode.com/problems/linear-search/',
      },
      {
        algorithmId: getAlgoId('binary-search'),
        title: 'Binary Search',
        description: 'Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};',
        },
        testCases: [
          { input: 'nums = [-1,0,3,5,9,12], target = 9', expectedOutput: '4' },
          { input: 'nums = [-1,0,3,5,9,12], target = 2', expectedOutput: '-1' },
        ],
        solution: 'Use binary search with left and right pointers, adjusting based on comparison with mid element.',
        externalLink: 'https://leetcode.com/problems/binary-search/',
      },
      // === SORTING ===
      {
        algorithmId: getAlgoId('bubble-sort'),
        title: 'Sort an Array',
        description: 'Given an array of integers, sort the array in ascending order.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int[] sortArray(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[5, 2, 3, 1]', expectedOutput: '[1, 2, 3, 5]' },
          { input: '[5, 1, 1, 2, 0, 0]', expectedOutput: '[0, 0, 1, 1, 2, 5]' },
        ],
        solution: 'Use Bubble Sort, Selection Sort, Insertion Sort, or any standard sorting algorithm.',
        externalLink: 'https://leetcode.com/problems/sort-an-array/',
      },
      {
        algorithmId: getAlgoId('merge-sort'),
        title: 'Sort an Array',
        description: 'Given an array of integers nums, sort the array in ascending order and return it.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public int[] sortArray(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> sortArray(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[5,2,3,1]', expectedOutput: '[1,2,3,5]' },
          { input: '[5,1,1,2,0,0]', expectedOutput: '[0,0,1,1,2,5]' },
        ],
        solution: 'Use Merge Sort for guaranteed O(N log N) time complexity.',
        externalLink: 'https://leetcode.com/problems/sort-an-array/',
      },
      // === TWO POINTER ===
      {
        algorithmId: getAlgoId('two-sum'),
        title: 'Two Sum',
        description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};',
        },
        testCases: [
          { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
          { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
        ],
        solution: 'Use hash map to store complement of each element for O(N) time.',
        externalLink: 'https://leetcode.com/problems/two-sum/',
      },
      {
        algorithmId: getAlgoId('remove-duplicates'),
        title: 'Remove Duplicates from Sorted Array',
        description: 'Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int removeDuplicates(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int removeDuplicates(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[1,1,2]', expectedOutput: '2, nums = [1,2]' },
          { input: '[0,0,1,1,1,2,2,3,3,4]', expectedOutput: '5, nums = [0,1,2,3,4]' },
        ],
        solution: 'Use two pointers where one tracks the position to place next unique element.',
        externalLink: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
      },
      {
        algorithmId: getAlgoId('container-with-most-water'),
        title: 'Container With Most Water',
        description: 'You are given an integer array height of length n. Find two lines that together with the x-axis form a container that holds the most water.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[1,8,6,2,5,4,8,3,7]', expectedOutput: '49' },
          { input: '[1,1]', expectedOutput: '1' },
        ],
        solution: 'Use two pointers from ends, move the pointer with smaller height inward.',
        externalLink: 'https://leetcode.com/problems/container-with-most-water/',
      },
      // === SLIDING WINDOW ===
      {
        algorithmId: getAlgoId('max-sum-subarray'),
        title: 'Maximum Subarray',
        description: 'Given an integer array nums, find the contiguous subarray which has the largest sum and return its sum.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6' },
          { input: '[1]', expectedOutput: '1' },
        ],
        solution: 'Use Kadane\'s algorithm to track maximum sum ending at each position.',
        externalLink: 'https://leetcode.com/problems/maximum-subarray/',
      },
      {
        algorithmId: getAlgoId('longest-substring-without-repeating'),
        title: 'Longest Substring Without Repeating Characters',
        description: 'Given a string s, find the length of the longest substring without repeating characters.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};',
        },
        testCases: [
          { input: 'abcabcbb', expectedOutput: '3' },
          { input: 'bbbbb', expectedOutput: '1' },
        ],
        solution: 'Use sliding window with hash map to track character positions.',
        externalLink: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      },
      // === PREFIX SUM ===
      {
        algorithmId: getAlgoId('prefix-sum'),
        title: 'Range Sum Query - Immutable',
        description: 'Given an integer array nums, handle multiple queries of the sum of elements between indices i and j.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class NumArray {\n    private int[] prefix;\n    public NumArray(int[] nums) {\n        \n    }\n    public int sumRange(int left, int right) {\n        \n    }\n}',
          cpp: 'class NumArray {\nprivate:\n    vector<int> prefix;\npublic:\n    NumArray(vector<int>& nums) {\n        \n    }\n    int sumRange(int left, int right) {\n        \n    }\n};',
        },
        testCases: [
          { input: 'nums = [-2, 0, 3, -5, 2, -1], sumRange(0, 2)', expectedOutput: '1' },
          { input: 'nums = [-2, 0, 3, -5, 2, -1], sumRange(1, 5)', expectedOutput: '-1' },
        ],
        solution: 'Precompute prefix sums to answer range queries in O(1) time.',
        externalLink: 'https://leetcode.com/problems/range-sum-query-immutable/',
      },
      // === MATRIX ===
      {
        algorithmId: getAlgoId('spiral-matrix'),
        title: 'Spiral Matrix',
        description: 'Given an m x n matrix, return all elements of the matrix in spiral order.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]' },
          { input: '[[1,2,3,4],[5,6,7,8],[9,10,11,12]]', expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]' },
        ],
        solution: 'Track four boundaries (top, bottom, left, right) and traverse in spiral order.',
        externalLink: 'https://leetcode.com/problems/spiral-matrix/',
      },
      {
        algorithmId: getAlgoId('rotate-matrix'),
        title: 'Rotate Image',
        description: 'You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[[1,2,3],[4,5,6],[7,8,9]]', expectedOutput: '[[7,4,1],[8,5,2],[9,6,3]]' },
          { input: '[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', expectedOutput: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' },
        ],
        solution: 'Transpose the matrix then reverse each row.',
        externalLink: 'https://leetcode.com/problems/rotate-image/',
      },
      {
        algorithmId: getAlgoId('set-matrix-zeroes'),
        title: 'Set Matrix Zeroes',
        description: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0.',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[[1,1,1],[1,0,1],[1,1,1]]', expectedOutput: '[[1,0,1],[0,0,0],[1,0,1]]' },
          { input: '[[0,1,2,0],[3,4,5,2],[1,3,1,5]]', expectedOutput: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' },
        ],
        solution: 'Use first row and column as markers to track which rows/columns should be zeroed.',
        externalLink: 'https://leetcode.com/problems/set-matrix-zeroes/',
      },
      // === MISCELLANEOUS ===
      {
        algorithmId: getAlgoId('majority-element'),
        title: 'Majority Element',
        description: 'Given an array nums of size n, return the majority element. The majority element is the element that appears more than n/2 times.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[3,2,3]', expectedOutput: '3' },
          { input: '[2,2,1,1,1,2,2]', expectedOutput: '2' },
        ],
        solution: 'Use Boyer-Moore Voting Algorithm to find majority element in O(N) time and O(1) space.',
        externalLink: 'https://leetcode.com/problems/majority-element/',
      },
      {
        algorithmId: getAlgoId('product-except-self'),
        title: 'Product of Array Except Self',
        description: 'Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i-1].',
        difficulty: Difficulty.MEDIUM,
        starterCode: {
          java: 'class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[1,2,3,4]', expectedOutput: '[24,12,8,6]' },
          { input: '[-1,1,0,-3,3]', expectedOutput: '[0,0,9,0,0]' },
        ],
        solution: 'Use prefix and suffix products to compute result without division.',
        externalLink: 'https://leetcode.com/problems/product-of-array-except-self/',
      },
      {
        algorithmId: getAlgoId('best-time-buy-sell-stock'),
        title: 'Best Time to Buy and Sell Stock',
        description: 'You are given an array prices where prices[i] is the price of a given stock on the ith day. Maximize profit by choosing a single day to buy and a different day to sell.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[7,1,5,3,6,4]', expectedOutput: '5' },
          { input: '[7,6,4,3,1]', expectedOutput: '0' },
        ],
        solution: 'Track minimum price seen so far and calculate maximum profit at each step.',
        externalLink: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      },
      {
        algorithmId: getAlgoId('trapping-rain-water'),
        title: 'Trapping Rain Water',
        description: 'Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
        difficulty: Difficulty.HARD,
        starterCode: {
          java: 'class Solution {\n    public int trap(int[] height) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int trap(vector<int>& height) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', expectedOutput: '6' },
          { input: '[4,2,0,3,2,5]', expectedOutput: '9' },
        ],
        solution: 'Use two pointers tracking max heights from both ends to calculate trapped water.',
        externalLink: 'https://leetcode.com/problems/trapping-rain-water/',
      },
      {
        algorithmId: getAlgoId('missing-number'),
        title: 'Missing Number',
        description: 'Given an array nums containing n distinct numbers in the range [0, n], return the only number in the range that is missing from the array.',
        difficulty: Difficulty.EASY,
        starterCode: {
          java: 'class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}',
          cpp: 'class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};',
        },
        testCases: [
          { input: '[3,0,1]', expectedOutput: '2' },
          { input: '[0,1]', expectedOutput: '2' },
        ],
        solution: 'Use sum formula or XOR to find the missing number.',
        externalLink: 'https://leetcode.com/problems/missing-number/',
      },
    ];

    const seededProblems = await PracticeProblem.insertMany(practiceProblemsData);
    console.log(`✅  Seeded ${seededProblems.length} LeetCode practice problems.`);
  } catch (error) {
    console.error('❌  Error seeding database:', error);
  }
};
