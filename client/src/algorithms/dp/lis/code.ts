export const lisJavaCode = `
class LIS {
    public int solveLIS(int[] arr) {
        int n = arr.length;
        if (n == 0) return 0;

        int[] dp = new int[n];
        int max = 0;

        for (int i = 0; i < n; i++) {
            dp[i] = 1;
            for (int j = 0; j < i; j++) {
                if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                    dp[i] = dp[j] + 1;
                }
            }
            if (max < dp[i]) {
                max = dp[i];
            }
        }

        return max;
    }
}
`;

export const lisCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int solveLIS(vector<int>& arr) {
    int n = arr.size();
    if (n == 0) return 0;

    vector<int> dp(n, 1);
    int maxVal = 1;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (arr[i] > arr[j] && dp[i] < dp[j] + 1) {
                dp[i] = dp[j] + 1;
            }
        }
        maxVal = max(maxVal, dp[i]);
    }

    return maxVal;
}
`;

export const lisPseudoCode = `
FUNCTION solveLIS(arr):
    n = arr.length
    IF n == 0: RETURN 0
    dp = array of size n filled with 1
    maxVal = 1
    FOR i FROM 0 TO n-1:
        FOR j FROM 0 TO i-1:
            IF arr[i] > arr[j] AND dp[i] < dp[j] + 1:
                dp[i] = dp[j] + 1
        maxVal = max(maxVal, dp[i])
    RETURN maxVal
`;
