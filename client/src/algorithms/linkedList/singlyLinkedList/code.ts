export const singlyLinkedListJavaCode = `
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class SinglyLinkedList {
    Node head;
    Node tail;
    int size;
    
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
        size++;
    }
    
    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (tail == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    public void insertAtIndex(int data, int index) {
        if (index < 0 || index > size) return;
        if (index == 0) {
            insertAtHead(data);
            return;
        }
        if (index == size) {
            insertAtTail(data);
            return;
        }
        
        Node newNode = new Node(data);
        Node current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }
    
    public void deleteHead() {
        if (head == null) return;
        head = head.next;
        if (head == null) tail = null;
        size--;
    }
    
    public void deleteTail() {
        if (tail == null) return;
        if (head == tail) {
            head = null;
            tail = null;
        } else {
            Node current = head;
            while (current.next != tail) {
                current = current.next;
            }
            tail = current;
            tail.next = null;
        }
        size--;
    }
    
    public int search(int data) {
        Node current = head;
        int index = 0;
        while (current != null) {
            if (current.data == data) return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    
    public void reverse() {
        Node prev = null;
        Node current = head;
        tail = head;
        while (current != null) {
            Node next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
}
`;

export const singlyLinkedListCppCode = `
struct Node {
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};

class SinglyLinkedList {
public:
    Node* head;
    Node* tail;
    int size;
    
    SinglyLinkedList() {
        head = nullptr;
        tail = nullptr;
        size = 0;
    }
    
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->next = head;
            head = newNode;
        }
        size++;
    }
    
    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (tail == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    void insertAtIndex(int data, int index) {
        if (index < 0 || index > size) return;
        if (index == 0) {
            insertAtHead(data);
            return;
        }
        if (index == size) {
            insertAtTail(data);
            return;
        }
        
        Node* newNode = new Node(data);
        Node* current = head;
        for (int i = 0; i < index - 1; i++) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
        size++;
    }
    
    void deleteHead() {
        if (head == nullptr) return;
        head = head->next;
        if (head == nullptr) tail = nullptr;
        size--;
    }
    
    void deleteTail() {
        if (tail == nullptr) return;
        if (head == tail) {
            head = nullptr;
            tail = nullptr;
        } else {
            Node* current = head;
            while (current->next != tail) {
                current = current->next;
            }
            tail = current;
            tail->next = nullptr;
        }
        size--;
    }
    
    int search(int data) {
        Node* current = head;
        int index = 0;
        while (current != nullptr) {
            if (current->data == data) return index;
            current = current->next;
            index++;
        }
        return -1;
    }
    
    void reverse() {
        Node* prev = nullptr;
        Node* current = head;
        tail = head;
        while (current != nullptr) {
            Node* next = current->next;
            current->next = prev;
            prev = current;
            current = next;
        }
        head = prev;
    }
};
`;

export const singlyLinkedListPseudoCode = `
FUNCTION insertAtHead(data):
    CREATE newNode with data
    IF head is NULL:
        head = newNode
        tail = newNode
    ELSE:
        newNode.next = head
        head = newNode
    size = size + 1

FUNCTION insertAtTail(data):
    CREATE newNode with data
    IF tail is NULL:
        head = newNode
        tail = newNode
    ELSE:
        tail.next = newNode
        tail = newNode
    size = size + 1

FUNCTION insertAtIndex(data, index):
    IF index < 0 OR index > size:
        RETURN
    IF index == 0:
        insertAtHead(data)
        RETURN
    IF index == size:
        insertAtTail(data)
        RETURN
    
    CREATE newNode with data
    current = head
    FOR i FROM 0 TO index - 1:
        current = current.next
    newNode.next = current.next
    current.next = newNode
    size = size + 1

FUNCTION deleteHead():
    IF head is NULL:
        RETURN
    head = head.next
    IF head is NULL:
        tail = NULL
    size = size - 1

FUNCTION deleteTail():
    IF tail is NULL:
        RETURN
    IF head == tail:
        head = NULL
        tail = NULL
    ELSE:
        current = head
        WHILE current.next != tail:
            current = current.next
        tail = current
        tail.next = NULL
    size = size - 1

FUNCTION search(data):
    current = head
    index = 0
    WHILE current != NULL:
        IF current.data == data:
            RETURN index
        current = current.next
        index = index + 1
    RETURN -1

FUNCTION reverse():
    prev = NULL
    current = head
    tail = head
    WHILE current != NULL:
        next = current.next
        current.next = prev
        prev = current
        current = next
    head = prev
`;
