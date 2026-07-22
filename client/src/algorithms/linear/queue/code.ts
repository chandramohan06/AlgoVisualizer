export const queueJavaCode = `
class Queue {
    private int maxSize;
    private int[] queueArray;
    private int front;
    private int rear;
    private int nItems;

    public Queue(int size) {
        maxSize = size;
        queueArray = new int[maxSize];
        front = 0;
        rear = -1;
        nItems = 0;
    }

    public void enqueue(int value) {
        if (isFull()) {
            System.out.println("Queue Overflow");
            return;
        }
        queueArray[++rear] = value;
        nItems++;
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Underflow");
            return -1;
        }
        int temp = queueArray[front++];
        nItems--;
        return temp;
    }

    public int peekFront() {
        if (isEmpty()) return -1;
        return queueArray[front];
    }

    public int peekRear() {
        if (isEmpty()) return -1;
        return queueArray[rear];
    }

    public boolean isEmpty() {
        return (nItems == 0);
    }

    public boolean isFull() {
        return (rear == maxSize - 1);
    }
}
`;

export const queueCppCode = `
#include <iostream>
using namespace std;

class Queue {
    int front, rear, capacity;
    int* queue;

public:
    Queue(int c) {
        front = 0;
        rear = -1;
        capacity = c;
        queue = new int[capacity];
    }

    void enqueue(int data) {
        if (rear == capacity - 1) {
            cout << "Queue Overflow\n";
            return;
        }
        queue[++rear] = data;
    }

    int dequeue() {
        if (front > rear) {
            cout << "Queue Underflow\n";
            return -1;
        }
        int val = queue[front++];
        return val;
    }

    int getFront() {
        if (front > rear) return -1;
        return queue[front];
    }

    int getRear() {
        if (front > rear) return -1;
        return queue[rear];
    }

    bool isEmpty() {
        return (front > rear);
    }

    bool isFull() {
        return (rear == capacity - 1);
    }
};
`;

export const queuePseudoCode = `
FUNCTION enqueue(value):
    IF isFull():
        PRINT "Queue Overflow"
        RETURN
    rear = rear + 1
    arr[rear] = value

FUNCTION dequeue():
    IF isEmpty():
        PRINT "Queue Underflow"
        RETURN -1
    value = arr[front]
    front = front + 1
    RETURN value

FUNCTION peekFront():
    IF isEmpty():
        RETURN -1
    RETURN arr[front]
`;
