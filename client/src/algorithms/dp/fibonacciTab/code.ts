export const fibTabJavaCode = `
class FibonacciTabulation {
    public int fib(int n) {
        if (n <= 1) {
            return n;
        }
        int[] dp = new int[n + 1];
        dp[0] = 0;
        dp[1] = 1;

        for (int i = 2; i <= n; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }

        return dp[n];
    }
}
`;

export const fibTabCppCode = `
int fib(int n) {
    if (n <= 1) {
        return n;
    }
    int* dp = new int[n + 1];
    dp[0] = 0;
    dp[1] = 1;

    for (int i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    return dp[n];
}
`;

export const fibTabPseudoCode = `
FUNCTION fib(n):
    IF n <= 1: RETURN n
    dp = array of size n + 1
    dp[0] = 0
    dp[1] = 1
    FOR i FROM 2 TO n:
        dp[i] = dp[i - 1] + dp[i - 2]
    RETURN dp[n]
`;
