export const dequeJavaCode = `
class Deque {
    private int[] arr;
    private int front;
    private int rear;
    private int size;

    public Deque(int size) {
        this.size = size;
        arr = new int[size];
        front = -1;
        rear = -1;
    }

    public void insertFront(int key) {
        if (isFull()) {
            System.out.println("Overflow");
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (front == 0) {
            front = size - 1;
        } else {
            front = front - 1;
        }
        arr[front] = key;
    }

    public void insertRear(int key) {
        if (isFull()) {
            System.out.println("Overflow");
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (rear == size - 1) {
            rear = 0;
        } else {
            rear = rear + 1;
        }
        arr[rear] = key;
    }

    public void deleteFront() {
        if (isEmpty()) {
            System.out.println("Underflow");
            return;
        }
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % size;
        }
    }

    public void deleteRear() {
        if (isEmpty()) {
            System.out.println("Underflow");
            return;
        }
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (rear == 0) {
            rear = size - 1;
        } else {
            rear = rear - 1;
        }
    }

    public boolean isFull() {
        return ((front == 0 && rear == size - 1) || front == rear + 1);
    }

    public boolean isEmpty() {
        return (front == -1);
    }
}
`;

export const dequeCppCode = `
#include <iostream>
using namespace std;

class Deque {
    int arr[5];
    int front;
    int rear;
    int size;

public:
    Deque(int size) {
        front = -1;
        rear = -1;
        this->size = size;
    }

    void insertFront(int key) {
        if (isFull()) {
            cout << "Overflow\n";
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (front == 0)
            front = size - 1;
        else
            front = front - 1;

        arr[front] = key;
    }

    void insertRear(int key) {
        if (isFull()) {
            cout << "Overflow\n";
            return;
        }
        if (front == -1) {
            front = 0;
            rear = 0;
        } else if (rear == size - 1)
            rear = 0;
        else
            rear = rear + 1;

        arr[rear] = key;
    }

    void deleteFront() {
        if (isEmpty()) {
            cout << "Underflow\n";
            return;
        }
        if (front == rear) {
            front = -1;
            rear = -1;
        } else
            front = (front + 1) % size;
    }

    void deleteRear() {
        if (isEmpty()) {
            cout << "Underflow\n";
            return;
        }
        if (front == rear) {
            front = -1;
            rear = -1;
        } else if (rear == 0)
            rear = size - 1;
        else
            rear = rear - 1;
    }

    bool isFull() {
        return ((front == 0 && rear == size - 1) || front == rear + 1);
    }

    bool isEmpty() {
        return (front == -1);
    }
};
`;

export const dequePseudoCode = `
FUNCTION insertFront(key):
    IF isFull():
        PRINT "Overflow"
        RETURN
    IF isEmpty():
        front = 0, rear = 0
    ELSE IF front == 0:
        front = size - 1
    ELSE:
        front = front - 1
    arr[front] = key

FUNCTION insertRear(key):
    IF isFull():
        PRINT "Overflow"
        RETURN
    IF isEmpty():
        front = 0, rear = 0
    ELSE IF rear == size - 1:
        rear = 0
    ELSE:
        rear = rear + 1
    arr[rear] = key
`;
