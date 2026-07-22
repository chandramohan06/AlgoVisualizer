export const circularLinkedListJavaCode = `
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class CircularLinkedList {
    Node head;
    Node tail;
    int size;
    
    public void insert(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
            newNode.next = newNode;
        } else {
            newNode.next = head;
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            tail = newNode;
            newNode.next = newNode;
        } else {
            newNode.next = head;
            tail.next = newNode;
            head = newNode;
        }
        size++;
    }
    
    public void deleteHead() {
        if (head == null) return;
        if (head == tail) {
            head = null;
            tail = null;
        } else {
            head = head.next;
            tail.next = head;
        }
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
            tail.next = head;
        }
        size--;
    }
    
    public boolean delete(int data) {
        if (head == null) return false;
        
        Node current = head;
        Node prev = null;
        
        do {
            if (current.data == data) {
                if (current == head) {
                    deleteHead();
                    return true;
                }
                if (current == tail) {
                    deleteTail();
                    return true;
                }
                prev.next = current.next;
                size--;
                return true;
            }
            prev = current;
            current = current.next;
        } while (current != head);
        
        return false;
    }
    
    public int search(int data) {
        if (head == null) return -1;
        
        Node current = head;
        int index = 0;
        
        do {
            if (current.data == data) return index;
            current = current.next;
            index++;
        } while (current != head);
        
        return -1;
    }
    
    public int[] traverse() {
        int[] result = new int[size];
        Node current = head;
        for (int i = 0; i < size && current != null; i++) {
            result[i] = current.data;
            current = current.next;
        }
        return result;
    }
}
`;

export const circularLinkedListCppCode = `
struct Node {
    int data;
    Node* next;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
    }
};

class CircularLinkedList {
public:
    Node* head;
    Node* tail;
    int size;
    
    CircularLinkedList() {
        head = nullptr;
        tail = nullptr;
        size = 0;
    }
    
    void insert(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
            newNode->next = newNode;
        } else {
            newNode->next = head;
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }
    
    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
            newNode->next = newNode;
        } else {
            newNode->next = head;
            tail->next = newNode;
            head = newNode;
        }
        size++;
    }
    
    void deleteHead() {
        if (head == nullptr) return;
        if (head == tail) {
            head = nullptr;
            tail = nullptr;
        } else {
            head = head->next;
            tail->next = head;
        }
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
            tail->next = head;
        }
        size--;
    }
    
    bool delete(int data) {
        if (head == nullptr) return false;
        
        Node* current = head;
        Node* prev = nullptr;
        
        do {
            if (current->data == data) {
                if (current == head) {
                    deleteHead();
                    return true;
                }
                if (current == tail) {
                    deleteTail();
                    return true;
                }
                prev->next = current->next;
                size--;
                return true;
            }
            prev = current;
            current = current->next;
        } while (current != head);
        
        return false;
    }
    
    int search(int data) {
        if (head == nullptr) return -1;
        
        Node* current = head;
        int index = 0;
        
        do {
            if (current->data == data) return index;
            current = current->next;
            index++;
        } while (current != head);
        
        return -1;
    }
    
    std::vector<int> traverse() {
        std::vector<int> result;
        Node* current = head;
        for (int i = 0; i < size && current != nullptr; i++) {
            result.push_back(current->data);
            current = current->next;
        }
        return result;
    }
};
`;

export const circularLinkedListPseudoCode = `
FUNCTION insert(data):
    CREATE newNode with data
    IF head is NULL:
        head = newNode
        tail = newNode
        newNode.next = newNode
    ELSE:
        newNode.next = head
        tail.next = newNode
        tail = newNode
    size = size + 1

FUNCTION insertAtHead(data):
    CREATE newNode with data
    IF head is NULL:
        head = newNode
        tail = newNode
        newNode.next = newNode
    ELSE:
        newNode.next = head
        tail.next = newNode
        head = newNode
    size = size + 1

FUNCTION deleteHead():
    IF head is NULL:
        RETURN
    IF head == tail:
        head = NULL
        tail = NULL
    ELSE:
        head = head.next
        tail.next = head
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
        tail.next = head
    size = size - 1

FUNCTION delete(data):
    IF head is NULL:
        RETURN false
    
    current = head
    prev = NULL
    
    DO:
        IF current.data == data:
            IF current == head:
                deleteHead()
                RETURN true
            IF current == tail:
                deleteTail()
                RETURN true
            prev.next = current.next
            size = size - 1
            RETURN true
        prev = current
        current = current.next
    WHILE current != head
    
    RETURN false

FUNCTION search(data):
    IF head is NULL:
        RETURN -1
    
    current = head
    index = 0
    
    DO:
        IF current.data == data:
            RETURN index
        current = current.next
        index = index + 1
    WHILE current != head
    
    RETURN -1

FUNCTION traverse():
    result = []
    current = head
    FOR i FROM 0 TO size - 1:
        result.APPEND(current.data)
        current = current.next
    RETURN result
`;
