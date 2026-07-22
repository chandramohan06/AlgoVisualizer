export const sudokuJavaCode = `
class SudokuSolver {
    private static final int N = 4;

    public boolean solveSudoku(int[][] board) {
        for (int row = 0; row < N; row++) {
            for (int col = 0; col < N; col++) {
                if (board[row][col] == 0) {
                    for (int num = 1; num <= N; num++) {
                        if (isSafe(board, row, col, num)) {
                            board[row][col] = num;

                            if (solveSudoku(board)) {
                                return true;
                            }

                            board[row][col] = 0; // backtrack
                        }
                    }
                    return false; // trigger backtracking
                }
            }
        }
        return true;
    }

    private boolean isSafe(int[][] board, int row, int col, int num) {
        for (int x = 0; x < N; x++) {
            if (board[row][x] == num || board[x][col] == num) {
                return false;
            }
        }
        int boxRowStart = row - row % 2;
        int boxColStart = col - col % 2;
        for (int r = 0; r < 2; r++) {
            for (int d = 0; d < 2; d++) {
                if (board[r + boxRowStart][d + boxColStart] == num) {
                    return false;
                }
            }
        }
        return true;
    }
}
`;

export const sudokuCppCode = `
#define N 4
#include <iostream>
using namespace std;

bool isSafe(int board[N][N], int row, int col, int num) {
    for (int x = 0; x < N; x++)
        if (board[row][x] == num || board[x][col] == num)
            return false;

    int boxRowStart = row - row % 2;
    int boxColStart = col - col % 2;
    for (int r = 0; r < 2; r++)
        for (int d = 0; d < 2; d++)
            if (board[r + boxRowStart][d + boxColStart] == num)
                return false;

    return true;
}

bool solveSudoku(int board[N][N]) {
    for (int row = 0; row < N; row++) {
        for (int col = 0; col < N; col++) {
            if (board[row][col] == 0) {
                for (int num = 1; num <= N; num++) {
                    if (isSafe(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0; // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}
`;

export const sudokuPseudoCode = `
FUNCTION solveSudoku(board):
    FOR row FROM 0 TO N-1:
        FOR col FROM 0 TO N-1:
            IF board[row][col] == 0:
                FOR num FROM 1 TO N:
                    IF isSafe(board, row, col, num):
                        board[row][col] = num
                        IF solveSudoku(board) == true:
                            RETURN true
                        board[row][col] = 0 // backtrack
                RETURN false
    RETURN true
`;
