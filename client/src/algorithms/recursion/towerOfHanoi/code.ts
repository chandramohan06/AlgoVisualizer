export const hanoiJavaCode = `
class TowerOfHanoi {
    public void solveHanoi(int n, char fromRod, char toRod, char auxRod) {
        if (n == 0) return;
        solveHanoi(n - 1, fromRod, auxRod, toRod);
        System.out.println("Move disk " + n + " from " + fromRod + " to " + toRod);
        solveHanoi(n - 1, auxRod, toRod, fromRod);
    }
}
`;

export const hanoiCppCode = `
#include <iostream>
using namespace void;

void solveHanoi(int n, char fromRod, char toRod, char auxRod) {
    if (n == 0) return;
    solveHanoi(n - 1, fromRod, auxRod, toRod);
    cout << "Move disk " << n << " from " << fromRod << " to " << toRod << endl;
    solveHanoi(n - 1, auxRod, toRod, fromRod);
}
`;

export const hanoiPseudoCode = `
FUNCTION solveHanoi(n, fromRod, toRod, auxRod):
    IF n == 0: RETURN
    solveHanoi(n - 1, fromRod, auxRod, toRod)
    PRINT "Move disk n from fromRod to toRod"
    solveHanoi(n - 1, auxRod, toRod, fromRod)
`;
