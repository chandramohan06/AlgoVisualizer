export const nQueensJavaCode = `
class NQueens {
    private int N = 4;

    public boolean solveNQueens(int[][] board, int col) {
        if (col >= N) return true;

        for (int i = 0; i < N; i++) {
            if (isSafe(board, i, col)) {
                board[i][col] = 1;

                if (solveNQueens(board, col + 1)) {
                    return true;
                }

                board[i][col] = 0; // backtrack
            }
        }
        return false;
    }

    private boolean isSafe(int[][] board, int row, int col) {
        int i, j;
        for (i = 0; i < col; i++) {
            if (board[row][i] == 1) return false;
        }
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] == 1) return false;
        }
        for (i = row, j = col; j >= 0 && i < N; i++, j--) {
            if (board[i][j] == 1) return false;
        }
        return true;
    }
}
`;

export const nQueensCppCode = `
#define N 4
#include <iostream>
using namespace std;

bool isSafe(int board[N][N], int row, int col) {
    for (int i = 0; i < col; i++)
        if (board[row][i]) return false;

    for (int i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j]) return false;

    for (int i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j]) return false;

    return true;
}

bool solveNQueens(int board[N][N], int col) {
    if (col >= N) return true;

    for (int i = 0; i < N; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;

            if (solveNQueens(board, col + 1))
                return true;

            board[i][col] = 0; // backtrack
        }
    }
    return false;
}
`;

export const nQueensPseudoCode = `
FUNCTION solveNQueens(board, col):
    IF col >= N: RETURN true
    FOR row FROM 0 TO N - 1:
        IF isSafe(board, row, col):
            board[row][col] = 1
            IF solveNQueens(board, col + 1) == true:
                RETURN true
            board[row][col] = 0 // backtrack
    RETURN false
`;
