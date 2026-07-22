export const stackJavaCode = `
class Stack {
    private int maxSize;
    private int[] stackArray;
    private int top;

    public Stack(int size) {
        maxSize = size;
        stackArray = new int[maxSize];
        top = -1;
    }

    public void push(int value) {
        if (isFull()) {
            System.out.println("Stack Overflow");
            return;
        }
        stackArray[++top] = value;
    }

    public int pop() {
        if (isEmpty()) {
            System.out.println("Stack Underflow");
            return -1;
        }
        return stackArray[top--];
    }

    public int peek() {
        if (isEmpty()) return -1;
        return stackArray[top];
    }

    public boolean isEmpty() {
        return (top == -1);
    }

    public boolean isFull() {
        return (top == maxSize - 1);
    }
}
`;

export const stackCppCode = `
#include <iostream>
using namespace std;

class Stack {
    int top;
    int maxSize;
    int* arr;

public:
    Stack(int size) {
        top = -1;
        maxSize = size;
        arr = new int[maxSize];
    }

    bool push(int x) {
        if (top >= (maxSize - 1)) {
            cout << "Stack Overflow";
            return false;
        }
        arr[++top] = x;
        return true;
    }

    int pop() {
        if (top < 0) {
            cout << "Stack Underflow";
            return -1;
        }
        return arr[top--];
    }

    int peek() {
        if (top < 0) return -1;
        return arr[top];
    }

    bool isEmpty() {
        return (top < 0);
    }

    bool isFull() {
        return (top >= (maxSize - 1));
    }
};
`;

export const stackPseudoCode = `
FUNCTION push(value):
    IF isFull():
        PRINT "Stack Overflow"
        RETURN
    top = top + 1
    arr[top] = value

FUNCTION pop():
    IF isEmpty():
        PRINT "Stack Underflow"
        RETURN -1
    value = arr[top]
    top = top - 1
    RETURN value

FUNCTION peek():
    IF isEmpty():
        RETURN -1
    RETURN arr[top]
`;
