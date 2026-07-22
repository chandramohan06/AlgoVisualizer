export const fibMemoJavaCode = `
class FibonacciMemo {
    public int fib(int n, int[] memo) {
        if (n <= 1) {
            return n;
        }
        if (memo[n] != 0) {
            return memo[n];
        }
        memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
        return memo[n];
    }
}
`;

export const fibMemoCppCode = `
int fib(int n, int memo[]) {
    if (n <= 1) {
        return n;
    }
    if (memo[n] != 0) {
        return memo[n];
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
`;

export const fibMemoPseudoCode = `
FUNCTION fib(n, memo):
    IF n <= 1: RETURN n
    IF memo[n] != UNKNOWN: RETURN memo[n]
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo)
    RETURN memo[n]
`;
