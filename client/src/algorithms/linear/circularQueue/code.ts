export const circularQueueJavaCode = `
class CircularQueue {
    private int size;
    private int[] queue;
    private int front;
    private int rear;

    public CircularQueue(int k) {
        size = k;
        queue = new int[size];
        front = -1;
        rear = -1;
    }

    public boolean enqueue(int value) {
        if (isFull()) {
            System.out.println("Queue Full");
            return false;
        }
        if (isEmpty()) {
            front = 0;
        }
        rear = (rear + 1) % size;
        queue[rear] = value;
        return true;
    }

    public int dequeue() {
        if (isEmpty()) {
            System.out.println("Queue Empty");
            return -1;
        }
        int temp = queue[front];
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % size;
        }
        return temp;
    }

    public int Front() {
        if (isEmpty()) return -1;
        return queue[front];
    }

    public int Rear() {
        if (isEmpty()) return -1;
        return queue[rear];
    }

    public boolean isEmpty() {
        return (front == -1);
    }

    public boolean isFull() {
        return ((rear + 1) % size == front);
    }
}
`;

export const circularQueueCppCode = `
#include <iostream>
using namespace std;

class CircularQueue {
    int rear, front;
    int size;
    int *arr;

public:
    CircularQueue(int s) {
       front = rear = -1;
       size = s;
       arr = new int[s];
    }

    bool enqueue(int value) {
       if ((front == 0 && rear == size-1) || (rear == (front-1)%(size-1))) {
           cout << "Queue is Full";
           return false;
       }
       else if (front == -1) {
           front = rear = 0;
           arr[rear] = value;
       }
       else if (rear == size-1 && front != 0) {
           rear = 0;
           arr[rear] = value;
       }
       else {
           rear++;
           arr[rear] = value;
       }
       return true;
    }

    int dequeue() {
       if (front == -1) {
           cout << "Queue is Empty";
           return -1;
       }
       int data = arr[front];
       arr[front] = -1;
       if (front == rear) {
           front = rear = -1;
       }
       else if (front == size-1)
           front = 0;
       else
           front++;
       return data;
    }
};
`;

export const circularQueuePseudoCode = `
FUNCTION enqueue(value):
    IF isFull():
        PRINT "Queue Overflow"
        RETURN false
    IF isEmpty():
        front = 0
    rear = (rear + 1) % size
    arr[rear] = value
    RETURN true

FUNCTION dequeue():
    IF isEmpty():
        PRINT "Queue Underflow"
        RETURN -1
    value = arr[front]
    IF front == rear:
        front = -1
        rear = -1
    ELSE:
        front = (front + 1) % size
    RETURN value
`;
