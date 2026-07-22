export const factorialJavaCode = `
class Factorial {
    public int factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }
}
`;

export const factorialCppCode = `
int factorial(int n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}
`;

export const factorialPseudoCode = `
FUNCTION factorial(n):
    IF n <= 1:
        RETURN 1
    RETURN n * factorial(n - 1)
`;
