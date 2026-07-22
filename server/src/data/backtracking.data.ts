import { DSAAlgorithmEntry } from './dsa.types';

export const BACKTRACKING_CATEGORY_DATA: DSAAlgorithmEntry[] = [
  {
    slug: 'n-queens',
    title: 'N-Queens Backtracking',
    categorySlug: 'backtracking',
    categoryName: 'Backtracking',
    topicGroup: 'Classic',
    difficulty: 'hard',
    description: 'Place N chess queens on N x N chessboard so no two queens attack each other.',
    theory: 'Backtracking explores decisions by placing a queen in row r, column c. If valid, recurse for row r+1. If invalid or dead end, undo choice (backtrack) and try next column.',
    working: 'Use sets or boolean arrays for cols, diag1 (r-c), diag2 (r+c) constraints. Recurse row by row.',
    javaCode: `import java.util.*;
public class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        backtrack(0, board, res, n);
        return res;
    }
    private void backtrack(int r, char[][] board, List<List<String>> res, int n) {
        if (r == n) {
            List<String> list = new ArrayList<>();
            for (char[] row : board) list.add(new String(row));
            res.add(list);
            return;
        }
        for (int c = 0; c < n; c++) {
            if (isValid(board, r, c, n)) {
                board[r][c] = 'Q';
                backtrack(r + 1, board, res, n);
                board[r][c] = '.'; // Backtrack
            }
        }
    }
    private boolean isValid(char[][] b, int r, int c, int n) {
        for (int i = 0; i < r; i++) {
            if (b[i][c] == 'Q') return false;
            if (c - (r - i) >= 0 && b[i][c - (r - i)] == 'Q') return false;
            if (c + (r - i) < n && b[i][c + (r - i)] == 'Q') return false;
        }
        return true;
    }
}`,
    cppCode: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    auto isValid = [&](int r, int c) {
        for (int i = 0; i < r; ++i) {
            if (board[i][c] == 'Q') return false;
            if (c - (r - i) >= 0 && board[i][c - (r - i)] == 'Q') return false;
            if (c + (r - i) < n && board[i][c + (r - i)] == 'Q') return false;
        }
        return true;
    };
    auto backtrack = [&](auto& self, int r) -> void {
        if (r == n) { res.push_back(board); return; }
        for (int c = 0; c < n; ++c) {
            if (isValid(r, c)) {
                board[r][c] = 'Q';
                self(self, r + 1);
                board[r][c] = '.';
            }
        }
    };
    backtrack(backtrack, 0);
    return res;
}`,
    pythonCode: `def solveNQueens(n):
    res = []
    board = [["."] * n for _ in range(n)]
    cols, diag1, diag2 = set(), set(), set()

    def backtrack(r):
        if r == n:
            res.append(["".join(row) for row in board])
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            board[r][c] = "Q"
            backtrack(r + 1)
            board[r][c] = "."
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)

    backtrack(0)
    return res`,
    pseudoCode: `FUNCTION solveNQueens(n):
    CREATE board of size n x n filled with '.'
    FUNCTION backtrack(row):
        IF row == n THEN
            SAVE board configuration
            RETURN
        END IF
        FOR col FROM 0 TO n - 1 DO:
            IF isSafe(row, col) THEN
                PLACE Queen at board[row][col]
                backtrack(row + 1)
                REMOVE Queen from board[row][col] // Backtrack
            END IF
        END FOR
    END FUNCTION
    backtrack(0)
END FUNCTION`,
    timeComplexity: 'O(N!)',
    spaceComplexity: 'O(N²) board and O(N) recursion stack',
    applications: ['Constraint satisfaction problems', 'Resource allocation scheduling', 'Circuit board routing'],
    interviewTips: ['Store column and diagonal occupancy in HashSets or Bitmasks for O(1) safety checks'],
    commonMistakes: ['Forgetting to undo move (backtrack state restore) when returning from recursive call'],
    leetCodeNumber: 51,
    leetCodeName: 'N-Queens',
    leetCodeDifficulty: 'Hard',
    leetCodePattern: 'Backtracking',
    leetCodeUrl: 'https://leetcode.com/problems/n-queens/',
    sampleInput: 'n=4',
    sampleOutput: '2 distinct solutions',
    quizzes: [
      { question: 'What step distinguishes Backtracking from standard depth-first search?', type: 'mcq', options: ['Undoing state choice (restoring state) when recursive branch fails', 'Sorting', 'Using queue', 'Memoization'], correctAnswer: 'Undoing state choice (restoring state) when recursive branch fails', explanation: 'Backtracking undoes choices to try alternative paths.', difficulty: 'easy', points: 10 },
      { question: 'Time complexity upper bound for N-Queens solver?', type: 'mcq', options: ['O(N!)', 'O(N²)', 'O(2^N)', 'O(N log N)'], correctAnswer: 'O(N!)', explanation: 'First row has N choices, second N-2, third N-4, giving O(N!).', difficulty: 'easy', points: 10 },
      { question: 'How many total solutions exist for N=4 Queens problem?', type: 'mcq', options: ['2', '1', '4', '8'], correctAnswer: '2', explanation: 'N=4 has exactly 2 distinct valid board configurations.', difficulty: 'easy', points: 10 },
      { question: 'Formula for main diagonal identifier of cell (r, c)?', type: 'mcq', options: ['r - c', 'r + c', 'r * c', 'r / c'], correctAnswer: 'r - c', explanation: 'Cells on same main diagonal have constant difference (r - c).', difficulty: 'medium', points: 15 },
      { question: 'Formula for anti-diagonal identifier of cell (r, c)?', type: 'mcq', options: ['r + c', 'r - c', 'r * c', 'c - r'], correctAnswer: 'r + c', explanation: 'Cells on same anti-diagonal have constant sum (r + c).', difficulty: 'medium', points: 15 },
      { question: 'For N=1, how many solutions exist?', type: 'mcq', options: ['1', '0', '2', 'Infinite'], correctAnswer: '1', explanation: 'Single cell grid [Q] is valid solution.', difficulty: 'hard', points: 20 },
    ],
    practiceProblems: [
      { title: 'N-Queens (LeetCode 51)', description: 'Return all distinct board solutions for N-Queens.', difficulty: 'easy', starterCode: { java: 'class Solution {\n  public List<List<String>> solveNQueens(int n) {\n    return new ArrayList<>();\n  }\n}', cpp: 'vector<vector<string>> solveNQueens(int n) {\n  return {};\n}', python: 'def solveNQueens(n):\n    return []' }, testCases: [{ input: 'n=4', expectedOutput: '2 solutions' }], explanation: 'Backtracking with column and diagonal sets.', externalLink: 'https://leetcode.com/problems/n-queens/' },
      { title: 'Sudoku Solver (LeetCode 37)', description: 'Solve 9x9 Sudoku puzzle by filling empty cells.', difficulty: 'medium', starterCode: { java: 'class Solution {\n  public void solveSudoku(char[][] board) {}\n}', cpp: 'void solveSudoku(vector<vector<char>>& board) {}', python: 'def solveSudoku(board):\n    pass' }, testCases: [{ input: 'board 9x9', expectedOutput: 'solved board' }], explanation: 'Backtrack digits 1-9 checking row, col, and 3x3 box.', externalLink: 'https://leetcode.com/problems/sudoku-solver/' },
      { title: 'Word Search (LeetCode 79)', description: 'Determine if word exists in 2D character board.', difficulty: 'hard', starterCode: { java: 'class Solution {\n  public boolean exist(char[][] board, String word) {\n    return false;\n  }\n}', cpp: 'bool exist(vector<vector<char>>& board, string word) {\n  return false;\n}', python: 'def exist(board, word):\n    return False' }, testCases: [{ input: 'board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED"', expectedOutput: 'true' }], solution: 'DFS backtracking visiting adjacent cells.', externalLink: 'https://leetcode.com/problems/word-search/' },
    ],
  },
];
