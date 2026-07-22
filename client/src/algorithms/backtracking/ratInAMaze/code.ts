export const ratInAMazeJavaCode = `
class RatInAMaze {
    private int N = 4;

    public boolean solveMaze(int[][] maze, int x, int y, int[][] sol) {
        if (x == N - 1 && y == N - 1) {
            sol[x][y] = 1;
            return true;
        }

        if (isSafe(maze, x, y)) {
            sol[x][y] = 1; // mark in path

            // Move Down
            if (solveMaze(maze, x + 1, y, sol)) {
                return true;
            }

            // Move Right
            if (solveMaze(maze, x, y + 1, sol)) {
                return true;
            }

            sol[x][y] = 0; // backtrack
            return false;
        }
        return false;
    }

    private boolean isSafe(int[][] maze, int x, int y) {
        return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
    }
}
`;

export const ratInAMazeCppCode = `
#define N 4
#include <iostream>
using namespace std;

bool isSafe(int maze[N][N], int x, int y) {
    return (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1);
}

bool solveMaze(int maze[N][N], int x, int y, int sol[N][N]) {
    if (x == N - 1 && y == N - 1) {
        sol[x][y] = 1;
        return true;
    }

    if (isSafe(maze, x, y)) {
        sol[x][y] = 1;

        if (solveMaze(maze, x + 1, y, sol))
            return true;

        if (solveMaze(maze, x, y + 1, sol))
            return true;

        sol[x][y] = 0; // backtrack
        return false;
    }
    return false;
}
`;

export const ratInAMazePseudoCode = `
FUNCTION solveMaze(maze, x, y, sol):
    IF x == N-1 AND y == N-1:
        sol[x][y] = 1
        RETURN true
    IF isSafe(maze, x, y):
        sol[x][y] = 1
        IF solveMaze(maze, x + 1, y, sol) == true:
            RETURN true
        IF solveMaze(maze, x, y + 1, sol) == true:
            RETURN true
        sol[x][y] = 0 // backtrack
        RETURN false
    RETURN false
`;
