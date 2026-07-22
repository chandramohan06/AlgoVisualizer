export const lcsJavaCode = `
class LCS {
    public int solveLCS(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0) {
                    dp[i][j] = 0;
                } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
}
`;

export const lcsCppCode = `
#include <iostream>
#include <string>
#include <algorithm>
#include <vector>
using namespace std;

int solveLCS(string s1, string s2) {
    int m = s1.length();
    int n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0 || j == 0) {
                dp[i][j] = 0;
            } else if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}
`;

export const lcsPseudoCode = `
FUNCTION solveLCS(s1, s2):
    m = s1.length, n = s2.length
    dp = 2D array of size (m + 1) x (n + 1)
    FOR i FROM 0 TO m:
        FOR j FROM 0 TO n:
            IF i == 0 OR j == 0:
                dp[i][j] = 0
            ELSE IF s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            ELSE:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    RETURN dp[m][n]
`;
