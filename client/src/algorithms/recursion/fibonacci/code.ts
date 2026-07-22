export const fibonacciJavaCode = `
class Fibonacci {
    public int fib(int n) {
        if (n <= 1) {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }
}
`;

export const fibonacciCppCode = `
int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}
`;

export const fibonacciPseudoCode = `
FUNCTION fib(n):
    IF n <= 1:
        RETURN n
    RETURN fib(n - 1) + fib(n - 2)
`;
