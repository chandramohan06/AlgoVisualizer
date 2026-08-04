import { ArrayAlgorithmData } from '../array.types';

export const MATRIX_ARRAY_DATA: ArrayAlgorithmData[] = [
  {
    slug: 'matrix-traversal',
    title: 'Matrix Traversal',
    topicGroup: 'Matrix',
    difficulty: 'easy',
    description: 'Traverse 2D grid matrix row-by-row or column-by-column.',
    theory: 'Row-major traversal visits matrix[r][c] for each row r and column c. Column-major traversal visits matrix[r][c] outer iterating c then r.',
    javaCode: `public class MatrixTraversal {
    public static void traverseRowMajor(int[][] grid) {
        int rows = grid.length, cols = grid[0].length;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                System.out.print(grid[r][c] + " ");
            }
        }
    }
}`,
    cppCode: `void traverseRowMajor(const vector<vector<int>>& grid) {
    int rows = grid.size(), cols = grid[0].size();
    for (int r = 0; r < rows; ++r) {
        for (int c = 0; c < cols; ++c) {
            cout << grid[r][c] << " ";
        }
    }
}`,
    pseudoCode: `FUNCTION traverseRowMajor(grid):
    rows = length(grid), cols = length(grid[0])
    FOR r FROM 0 TO rows - 1:
        FOR c FROM 0 TO cols - 1:
            PRINT grid[r][c]
        END FOR
    END FOR
END FUNCTION`,
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(1)',
    applications: ['2D graphics rendering', 'Game board processing'],
    interviewTips: ['Row-major traversal is cache friendly in C/C++/Java (contiguous row storage)'],
    sampleInput: [[1, 2], [3, 4]],
    sampleOutput: '1 2 3 4',
    quizzes: [
      { question: 'What is time complexity of traversing R x C matrix?', type: 'mcq', options: ['O(R * C)', 'O(R + C)', 'O(R²)', 'O(C²)'], correctAnswer: 'O(R * C)', explanation: 'Every grid cell is visited exactly once.', difficulty: 'easy', points: 10 },
      { question: 'Why is Row-major traversal faster than Column-major traversal in C/C++?', type: 'mcq', options: ['Row-major accesses contiguous memory addresses, maximizing CPU cache line hits', 'Column major uses recursion', 'Row major takes less memory', 'Compiler optimizes row major only'], correctAnswer: 'Row-major accesses contiguous memory addresses, maximizing CPU cache line hits', explanation: '2D arrays in C/C++ are stored sequentially row by row in RAM.', difficulty: 'easy', points: 10 },
      { question: 'Formula to map 2D index grid[r][c] to 1D array index with C columns?', type: 'mcq', options: ['r * C + c', 'r + c * C', 'r * c', 'r + c'], correctAnswer: 'r * C + c', explanation: '1D offset equals row index multiplied by column count plus column index.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of Matrix Traversal?', type: 'mcq', options: ['O(1)', 'O(R * C)', 'O(R)', 'O(C)'], correctAnswer: 'O(1)', explanation: 'Requires no auxiliary data structure.', difficulty: 'medium', points: 15 },
      { question: 'How many total elements exist in R x C matrix?', type: 'mcq', options: ['R * C', 'R + C', '2 * (R + C)', 'R^C'], correctAnswer: 'R * C', explanation: 'Total cells equals rows multiplied by columns.', difficulty: 'medium', points: 15 },
      { question: 'Snake pattern matrix traversal order reverses direction every row. True or False?', type: 'mcq', options: ['True', 'False', 'Only for square matrix', 'Only for 3x3'], correctAnswer: 'True', explanation: 'Snake traversal prints left-to-right on even rows, right-to-left on odd rows.', difficulty: 'hard', points: 20 },
    ],
  },
  {
    slug: 'spiral-matrix',
    title: 'Spiral Matrix',
    topicGroup: 'Matrix',
    difficulty: 'medium',
    description: 'Traverse matrix in spiral order (outer boundary clockwise inward).',
    theory: 'Maintain 4 boundary pointers: `top`, `bottom`, `left`, `right`. Traverse top row left->right, right col top->bottom, bottom row right->left, left col bottom->top, shrinking boundaries inward.',
    javaCode: `public class SpiralMatrix {
    public static List<Integer> spiralOrder(int[][] matrix) {
        List<Integer> res = new ArrayList<>();
        if (matrix.length == 0) return res;
        int top = 0, bottom = matrix.length - 1;
        int left = 0, right = matrix[0].length - 1;
        while (top <= bottom && left <= right) {
            for (int col = left; col <= right; col++) res.add(matrix[top][col]);
            top++;
            for (int row = top; row <= bottom; row++) res.add(matrix[row][right]);
            right--;
            if (top <= bottom) {
                for (int col = right; col >= left; col--) res.add(matrix[bottom][col]);
                bottom--;
            }
            if (left <= right) {
                for (int row = bottom; row >= top; row--) res.add(matrix[row][left]);
                left++;
            }
        }
        return res;
    }
}`,
    cppCode: `vector<int> spiralOrder(vector<vector<int>>& matrix) {
    vector<int> res;
    if (matrix.empty()) return res;
    int top = 0, bottom = matrix.size() - 1;
    int left = 0, right = matrix[0].size() - 1;
    while (top <= bottom && left <= right) {
        for (int col = left; col <= right; ++col) res.push_back(matrix[top][col]);
        top++;
        for (int row = top; row <= bottom; ++row) res.push_back(matrix[row][right]);
        right--;
        if (top <= bottom) {
            for (int col = right; col >= left; --col) res.push_back(matrix[bottom][col]);
            bottom--;
        }
        if (left <= right) {
            for (int row = bottom; row >= top; --row) res.push_back(matrix[row][left]);
            left++;
        }
    }
    return res;
}`,
    pseudoCode: `FUNCTION spiralOrder(matrix):
    top = 0, bottom = rows - 1
    left = 0, right = cols - 1
    WHILE top <= bottom AND left <= right DO:
        FOR col FROM left TO right: add matrix[top][col]
        top = top + 1
        FOR row FROM top TO bottom: add matrix[row][right]
        right = right - 1
        IF top <= bottom THEN
            FOR col FROM right DOWN TO left: add matrix[bottom][col]
            bottom = bottom - 1
        END IF
        IF left <= right THEN
            FOR row FROM bottom DOWN TO top: add matrix[row][left]
            left = left + 1
        END IF
    END WHILE
    RETURN result
END FUNCTION`,
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(1)',
    applications: ['2D matrix printing', 'Spiral image processing filters'],
    interviewTips: ['Always check `if (top <= bottom)` and `if (left <= right)` inside loop to avoid duplicate traversals on single-row/single-col matrices'],
    sampleInput: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    sampleOutput: '[1, 2, 3, 6, 9, 8, 7, 4, 5]',
    quizzes: [
      { question: 'What is time complexity of Spiral Matrix traversal for R x C grid?', type: 'mcq', options: ['O(R * C)', 'O(R + C)', 'O((R * C) log(R * C))', 'O(R²)'], correctAnswer: 'O(R * C)', explanation: 'Every cell is visited exactly once.', difficulty: 'easy', points: 10 },
      { question: 'How many boundary pointers are maintained in standard Spiral Matrix algorithm?', type: 'mcq', options: ['4 (top, bottom, left, right)', '2', '1', '8'], correctAnswer: '4 (top, bottom, left, right)', explanation: 'Pointers define contracting rectangular boundary.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity excluding output list storage?', type: 'mcq', options: ['O(1)', 'O(R * C)', 'O(R)', 'O(C)'], correctAnswer: 'O(1)', explanation: 'Pointers use constant auxiliary memory.', difficulty: 'easy', points: 10 },
      { question: 'Why check `if (top <= bottom)` before traversing bottom row right-to-left?', type: 'mcq', options: ['Prevents re-traversing top row on single-row matrix', 'Prevents null error', 'Sorts array', 'Calculates determinant'], correctAnswer: 'Prevents re-traversing top row on single-row matrix', explanation: 'If top > bottom after top++, bottom row traversal would duplicate top row elements.', difficulty: 'medium', points: 15 },
      { question: 'Spiral traversal direction order?', type: 'mcq', options: ['Right -> Down -> Left -> Up', 'Down -> Right -> Up -> Left', 'Left -> Right -> Down -> Up', 'Up -> Down -> Left -> Right'], correctAnswer: 'Right -> Down -> Left -> Up', explanation: 'Clockwise outer boundary traversal sequence.', difficulty: 'medium', points: 15 },
      { question: 'Number of elements in spiral output for N x N matrix?', type: 'mcq', options: ['N²', 'N', '2N', '4N'], correctAnswer: 'N²', explanation: 'Includes all N² cells of matrix.', difficulty: 'hard', points: 20 },
    ],
  },
  {
    slug: 'rotate-matrix',
    title: 'Rotate Matrix',
    topicGroup: 'Matrix',
    difficulty: 'medium',
    description: 'Rotate N x N matrix 90 degrees clockwise in-place.',
    theory: 'To rotate 90 degrees clockwise in-place: Step 1: Transpose matrix (swap matrix[i][j] with matrix[j][i]). Step 2: Reverse each row.',
    javaCode: `public class RotateMatrix {
    public static void rotate(int[][] matrix) {
        int n = matrix.length;
        // Step 1: Transpose
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int temp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = temp;
            }
        }
        // Step 2: Reverse each row
        for (int i = 0; i < n; i++) {
            int left = 0, right = n - 1;
            while (left < right) {
                int temp = matrix[i][left];
                matrix[i][left] = matrix[i][right];
                matrix[i][right] = temp;
                left++;
                right--;
            }
        }
    }
}`,
    cppCode: `void rotate(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            swap(matrix[i][j], matrix[j][i]);
        }
    }
    for (int i = 0; i < n; ++i) {
        reverse(matrix[i].begin(), matrix[i].end());
    }
}`,
    pseudoCode: `FUNCTION rotate(matrix):
    n = length(matrix)
    FOR i FROM 0 TO n - 1:
        FOR j FROM i + 1 TO n - 1:
            SWAP matrix[i][j] AND matrix[j][i]
        END FOR
    END FOR
    FOR i FROM 0 TO n - 1:
        REVERSE matrix[i]
    END FOR
END FUNCTION`,
    timeComplexity: 'O(N²)',
    spaceComplexity: 'O(1) in-place',
    applications: ['Image rotation', 'Computer graphics transformations'],
    interviewTips: ['90 deg counter-clockwise = Transpose + Reverse each column (or Reverse each row + Transpose)'],
    sampleInput: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
    sampleOutput: '[[7, 4, 1], [8, 5, 2], [9, 6, 3]]',
    quizzes: [
      { question: 'What two steps perform 90 degrees clockwise in-place matrix rotation?', type: 'mcq', options: ['Transpose + Reverse each row', 'Transpose + Reverse each column', 'Reverse each row + Sort', 'Invert colors'], correctAnswer: 'Transpose + Reverse each row', explanation: 'Transposing main diagonal then reversing rows produces 90 deg clockwise rotation.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of in-place 90 deg rotation on N x N matrix?', type: 'mcq', options: ['O(N²)', 'O(N)', 'O(N log N)', 'O(N³)'], correctAnswer: 'O(N²)', explanation: 'Visits all N² cells during transpose and row reversals.', difficulty: 'easy', points: 10 },
      { question: 'Space complexity of in-place rotation algorithm?', type: 'mcq', options: ['O(1)', 'O(N²)', 'O(N)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Swaps matrix entries in-place using O(1) auxiliary variables.', difficulty: 'easy', points: 10 },
      { question: 'Two steps for 90 degrees counter-clockwise rotation?', type: 'mcq', options: ['Transpose + Reverse each column', 'Transpose + Reverse each row', 'Reverse each row + Sort', 'Double matrix'], correctAnswer: 'Transpose + Reverse each column', explanation: 'Transposing then reversing columns rotates 90 deg anti-clockwise.', difficulty: 'medium', points: 15 },
      { question: 'Where does top-left element matrix[0][0] move after 90 deg clockwise rotation?', type: 'mcq', options: ['Top-right matrix[0][N-1]', 'Bottom-right matrix[N-1][N-1]', 'Bottom-left matrix[N-1][0]', 'Stays at matrix[0][0]'], correctAnswer: 'Top-right matrix[0][N-1]', explanation: 'Top-left corner moves to top-right corner.', difficulty: 'medium', points: 15 },
      { question: 'What does applying 90 deg clockwise rotation 4 times produce?', type: 'mcq', options: ['Original matrix unchanged', 'Transposed matrix', 'Reversed matrix', 'All zeroes'], correctAnswer: 'Original matrix unchanged', explanation: '4 * 90 = 360 degrees rotation returns matrix to original orientation.', difficulty: 'hard', points: 20 },
    ],
  },
  {
    slug: 'transpose-matrix',
    title: 'Transpose Matrix',
    topicGroup: 'Matrix',
    difficulty: 'easy',
    description: 'Swap rows and columns of a matrix (matrix[i][j] becomes matrix[j][i]).',
    theory: 'Transposing an R x C matrix creates a C x R matrix where newMatrix[c][r] = oldMatrix[r][c]. For square N x N matrices, it can be done in-place by swapping matrix[i][j] and matrix[j][i] for j > i.',
    javaCode: `public class TransposeMatrix {
    public static int[][] transpose(int[][] matrix) {
        int r = matrix.length, c = matrix[0].length;
        int[][] res = new int[c][r];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                res[j][i] = matrix[i][j];
            }
        }
        return res;
    }
}`,
    cppCode: `vector<vector<int>> transpose(const vector<vector<int>>& matrix) {
    int r = matrix.size(), c = matrix[0].size();
    vector<vector<int>> res(c, vector<int>(r));
    for (int i = 0; i < r; ++i) {
        for (int j = 0; j < c; ++j) {
            res[j][i] = matrix[i][j];
        }
    }
    return res;
}`,
    pseudoCode: `FUNCTION transpose(matrix):
    r = rows, c = cols
    CREATE res of size c x r
    FOR i FROM 0 TO r - 1:
        FOR j FROM 0 TO c - 1:
            res[j][i] = matrix[i][j]
        END FOR
    END FOR
    RETURN res
END FUNCTION`,
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(R * C) for new matrix, O(1) in-place if square',
    applications: ['Linear algebra matrix operations', 'Data table pivot transformations'],
    interviewTips: ['Highlight distinction between square N x N (in-place) and rectangular R x C (requires new allocation)'],
    sampleInput: [[1, 2, 3], [4, 5, 6]],
    sampleOutput: '[[1, 4], [2, 5], [3, 6]]',
    quizzes: [
      { question: 'What are the dimensions of transposed matrix of an R x C matrix?', type: 'mcq', options: ['C x R', 'R x C', 'R x R', 'C x C'], correctAnswer: 'C x R', explanation: 'Rows and columns are swapped, changing R x C to C x R.', difficulty: 'easy', points: 10 },
      { question: 'What is time complexity of matrix transpose for R x C grid?', type: 'mcq', options: ['O(R * C)', 'O(R + C)', 'O(R²)', 'O(C²)'], correctAnswer: 'O(R * C)', explanation: 'Visits all R * C entries once.', difficulty: 'easy', points: 10 },
      { question: 'Can rectangular R x C matrix (R != C) be transposed in-place in simple array memory?', type: 'mcq', options: ['No, dimensions change requiring new allocation C x R', 'Yes', 'Always', 'Only if R is even'], correctAnswer: 'No, dimensions change requiring new allocation C x R', explanation: 'Changing dimensions requires allocating new memory layout C x R.', difficulty: 'easy', points: 10 },
      { question: 'In-place transpose condition for inner loop j on N x N matrix?', type: 'mcq', options: ['j FROM i + 1 TO N - 1', 'j FROM 0 TO N - 1', 'j FROM 0 TO i', 'j = i'], correctAnswer: 'j FROM i + 1 TO N - 1', explanation: 'Swapping upper triangle elements matrix[i][j] with matrix[j][i] avoids double-swapping.', difficulty: 'medium', points: 15 },
      { question: 'What is transpose of transpose of matrix M?', type: 'mcq', options: ['Original matrix M', 'Zero matrix', 'Inverse matrix', 'Negated matrix'], correctAnswer: 'Original matrix M', explanation: '(M^T)^T = M.', difficulty: 'medium', points: 15 },
      { question: 'If matrix is symmetric (M = M^T), what property holds?', type: 'mcq', options: ['matrix[i][j] == matrix[j][i] for all i, j', 'All elements 0', 'Matrix is diagonal', 'Determinant is 0'], correctAnswer: 'matrix[i][j] == matrix[j][i] for all i, j', explanation: 'A symmetric matrix is identical to its transpose.', difficulty: 'hard', points: 20 },
    ],
  },
  {
    slug: 'set-matrix-zeroes',
    title: 'Set Matrix Zeroes',
    topicGroup: 'Matrix',
    difficulty: 'medium',
    description: 'If an element is 0, set its entire row and column to 0 in-place.',
    theory: 'Use first row and first column as flag markers to track zeroes. Variable `firstColZero` tracks if column 0 needs to be zeroed.',
    javaCode: `public class SetMatrixZeroes {
    public static void setZeroes(int[][] matrix) {
        int r = matrix.length, c = matrix[0].length;
        boolean firstCol = false;
        for (int i = 0; i < r; i++) {
            if (matrix[i][0] == 0) firstCol = true;
            for (int j = 1; j < c; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < r; i++) {
            for (int j = 1; j < c; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (matrix[0][0] == 0) {
            for (int j = 0; j < c; j++) matrix[0][j] = 0;
        }
        if (firstCol) {
            for (int i = 0; i < r; i++) matrix[i][0] = 0;
        }
    }
}`,
    cppCode: `void setZeroes(vector<vector<int>>& matrix) {
    int r = matrix.size(), c = matrix[0].size();
    bool firstCol = false;
    for (int i = 0; i < r; ++i) {
        if (matrix[i][0] == 0) firstCol = true;
        for (int j = 1; j < c; ++j) {
            if (matrix[i][j] == 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0;
            }
        }
    }
    for (int i = 1; i < r; ++i) {
        for (int j = 1; j < c; ++j) {
            if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                matrix[i][j] = 0;
            }
        }
    }
    if (matrix[0][0] == 0) {
        for (int j = 0; j < c; ++j) matrix[0][j] = 0;
    }
    if (firstCol) {
        for (int i = 0; i < r; ++i) matrix[i][0] = 0;
    }
}`,
    pseudoCode: `FUNCTION setZeroes(matrix):
    mark row 0 and col 0 for zeroes
    FOR i FROM 0 TO r-1:
        FOR j FROM 1 TO c-1:
            IF matrix[i][j] == 0 THEN
                matrix[i][0] = 0
                matrix[0][j] = 0
            END IF
        END FOR
    END FOR
    fill matrix using markers
    fill first row and first column if needed
END FUNCTION`,
    timeComplexity: 'O(R * C)',
    spaceComplexity: 'O(1) auxiliary space',
    applications: ['Sparse matrix processing', 'Database null propagation'],
    interviewTips: ['Naive solution uses O(R+C) space; optimal uses first row & first column as marker flags for O(1) space'],
    sampleInput: [[1, 1, 1], [1, 0, 1], [1, 1, 1]],
    sampleOutput: '[[1, 0, 1], [0, 0, 0], [1, 0, 1]]',
    quizzes: [
      { question: 'What is optimal auxiliary space complexity of Set Matrix Zeroes?', type: 'mcq', options: ['O(1)', 'O(R + C)', 'O(R * C)', 'O(log N)'], correctAnswer: 'O(1)', explanation: 'Using row 0 and col 0 as marker flags takes constant O(1) auxiliary space.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity of optimal Set Matrix Zeroes?', type: 'mcq', options: ['O(R * C)', 'O(R + C)', 'O(R² * C²)', 'O(1)'], correctAnswer: 'O(R * C)', explanation: 'Passes over matrix cells constant number of times.', difficulty: 'easy', points: 10 },
      { question: 'Why can\'t we zero out rows/cols immediately when encountering a 0 during first pass?', type: 'mcq', options: ['Overwrites non-zero cells with 0s, causing entire matrix to become zeroes', 'Causes syntax error', 'Slows execution', 'Breaks memory'], correctAnswer: 'Overwrites non-zero cells with 0s, causing entire matrix to become zeroes', explanation: 'Immediate zeroing propagates cascading zeroes incorrectly.', difficulty: 'easy', points: 10 },
      { question: 'What helper variables or markers achieve O(1) space?', type: 'mcq', options: ['First row and first column of matrix plus 1 boolean variable', 'Stack', 'Queue', 'HashSet'], correctAnswer: 'First row and first column of matrix plus 1 boolean variable', explanation: 'First row/col store flags for rest of matrix.', difficulty: 'medium', points: 15 },
      { question: 'Naive space complexity using row and column boolean arrays?', type: 'mcq', options: ['O(R + C)', 'O(R * C)', 'O(1)', 'O(log N)'], correctAnswer: 'O(R + C)', explanation: 'Boolean array of size R for rows and size C for columns.', difficulty: 'medium', points: 15 },
      { question: 'Order of zeroing out matrix cells during second pass?', type: 'mcq', options: ['From index 1,1 to R-1,C-1, then process first row and first column', 'Random order', 'From top-left only', 'Reverse order'], correctAnswer: 'From index 1,1 to R-1,C-1, then process first row and first column', explanation: 'Processing inner matrix first preserves flags stored in first row/col.', difficulty: 'hard', points: 20 },
    ],
  },
];
