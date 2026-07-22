export const editDistanceJavaCode = `
class EditDistance {
    public int solveEditDistance(String s1, String s2) {
        int m = s1.length();
        int n = s2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0) {
                    dp[i][j] = j;
                } else if (j == 0) {
                    dp[i][j] = i;
                } else if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], 
                                   Math.min(dp[i - 1][j], dp[i][j - 1]));
                }
            }
        }

        return dp[m][n];
    }
}
`;

export const editDistanceCppCode = `
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int solveEditDistance(string s1, string s2) {
    int m = s1.length();
    int n = s2.length();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 0; i <= m; i++) {
        for (int j = 0; j <= n; j++) {
            if (i == 0) {
                dp[i][j] = j;
            } else if (j == 0) {
                dp[i][j] = i;
            } else if (s1[i - 1] == s2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + min({dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]});
            }
        }
    }

    return dp[m][n];
}
`;

export const editDistancePseudoCode = `
FUNCTION solveEditDistance(s1, s2):
    m = s1.length, n = s2.length
    dp = 2D array of size (m + 1) x (n + 1)
    FOR i FROM 0 TO m:
        FOR j FROM 0 TO n:
            IF i == 0:
                dp[i][j] = j
            ELSE IF j == 0:
                dp[i][j] = i
            ELSE IF s1[i - 1] == s2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            ELSE:
                dp[i][j] = 1 + min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1])
    RETURN dp[m][n]
`;
