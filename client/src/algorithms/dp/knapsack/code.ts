export const knapsackJavaCode = `
class Knapsack {
    public int solveKnapsack(int W, int[] wt, int[] val, int n) {
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 0; i <= n; i++) {
            for (int w = 0; w <= W; w++) {
                if (i == 0 || w == 0) {
                    dp[i][w] = 0;
                } else if (wt[i - 1] <= w) {
                    dp[i][w] = Math.max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }

        return dp[n][W];
    }
}
`;

export const knapsackCppCode = `
#include <iostream>
#include <algorithm>
using namespace std;

int solveKnapsack(int W, int wt[], int val[], int n) {
    int** dp = new int*[n + 1];
    for (int i = 0; i <= n; i++) {
        dp[i] = new int[W + 1];
    }

    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0) {
                dp[i][w] = 0;
            } else if (wt[i - 1] <= w) {
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}
`;

export const knapsackPseudoCode = `
FUNCTION solveKnapsack(W, wt, val, n):
    dp = 2D array of size (n + 1) x (W + 1)
    FOR i FROM 0 TO n:
        FOR w FROM 0 TO W:
            IF i == 0 OR w == 0:
                dp[i][w] = 0
            ELSE IF wt[i - 1] <= w:
                dp[i][w] = max(val[i - 1] + dp[i - 1][w - wt[i - 1]], dp[i - 1][w])
            ELSE:
                dp[i][w] = dp[i - 1][w]
    RETURN dp[n][W]
`;
