export const doublyLinkedListJavaCode = `
class Node {
    int data;
    Node next;
    Node prev;
    
    Node(int data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}

class DoublyLinkedList {
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
            head.prev = newNode;
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
            newNode.prev = tail;
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
        for (int i = 0; i < index; i++) {
            current = current.next;
        }
        newNode.prev = current.prev;
        newNode.next = current;
        current.prev.next = newNode;
        current.prev = newNode;
        size++;
    }
    
    public void deleteHead() {
        if (head == null) return;
        head = head.next;
        if (head != null) {
            head.prev = null;
        } else {
            tail = null;
        }
        size--;
    }
    
    public void deleteTail() {
        if (tail == null) return;
        tail = tail.prev;
        if (tail != null) {
            tail.next = null;
        } else {
            head = null;
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
    
    public int searchBackward(int data) {
        Node current = tail;
        int index = size - 1;
        while (current != null) {
            if (current.data == data) return index;
            current = current.prev;
            index--;
        }
        return -1;
    }
    
    public void reverse() {
        Node current = head;
        Node temp = null;
        while (current != null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        if (temp != null) {
            tail = head;
            head = temp.prev;
        }
    }
    
    public int[] traverseForward() {
        int[] result = new int[size];
        Node current = head;
        int i = 0;
        while (current != null) {
            result[i++] = current.data;
            current = current.next;
        }
        return result;
    }
    
    public int[] traverseBackward() {
        int[] result = new int[size];
        Node current = tail;
        int i = 0;
        while (current != null) {
            result[i++] = current.data;
            current = current.prev;
        }
        return result;
    }
}
`;

export const doublyLinkedListCppCode = `
struct Node {
    int data;
    Node* next;
    Node* prev;
    
    Node(int data) {
        this->data = data;
        this->next = nullptr;
        this->prev = nullptr;
    }
};

class DoublyLinkedList {
public:
    Node* head;
    Node* tail;
    int size;
    
    DoublyLinkedList() {
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
            head->prev = newNode;
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
            newNode->prev = tail;
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
        for (int i = 0; i < index; i++) {
            current = current->next;
        }
        newNode->prev = current->prev;
        newNode->next = current;
        current->prev->next = newNode;
        current->prev = newNode;
        size++;
    }
    
    void deleteHead() {
        if (head == nullptr) return;
        head = head->next;
        if (head != nullptr) {
            head->prev = nullptr;
        } else {
            tail = nullptr;
        }
        size--;
    }
    
    void deleteTail() {
        if (tail == nullptr) return;
        tail = tail->prev;
        if (tail != nullptr) {
            tail->next = nullptr;
        } else {
            head = nullptr;
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
    
    int searchBackward(int data) {
        Node* current = tail;
        int index = size - 1;
        while (current != nullptr) {
            if (current->data == data) return index;
            current = current->prev;
            index--;
        }
        return -1;
    }
    
    void reverse() {
        Node* current = head;
        Node* temp = nullptr;
        while (current != nullptr) {
            temp = current->prev;
            current->prev = current->next;
            current->next = temp;
            current = current->prev;
        }
        if (temp != nullptr) {
            tail = head;
            head = temp->prev;
        }
    }
    
    std::vector<int> traverseForward() {
        std::vector<int> result;
        Node* current = head;
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->next;
        }
        return result;
    }
    
    std::vector<int> traverseBackward() {
        std::vector<int> result;
        Node* current = tail;
        while (current != nullptr) {
            result.push_back(current->data);
            current = current->prev;
        }
        return result;
    }
};
`;

export const doublyLinkedListPseudoCode = `
FUNCTION insertAtHead(data):
    CREATE newNode with data
    IF head is NULL:
        head = newNode
        tail = newNode
    ELSE:
        newNode.next = head
        head.prev = newNode
        head = newNode
    size = size + 1

FUNCTION insertAtTail(data):
    CREATE newNode with data
    IF tail is NULL:
        head = newNode
        tail = newNode
    ELSE:
        newNode.prev = tail
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
    newNode.prev = current.prev
    newNode.next = current
    current.prev.next = newNode
    current.prev = newNode
    size = size + 1

FUNCTION deleteHead():
    IF head is NULL:
        RETURN
    head = head.next
    IF head is NOT NULL:
        head.prev = NULL
    ELSE:
        tail = NULL
    size = size - 1

FUNCTION deleteTail():
    IF tail is NULL:
        RETURN
    tail = tail.prev
    IF tail is NOT NULL:
        tail.next = NULL
    ELSE:
        head = NULL
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

FUNCTION searchBackward(data):
    current = tail
    index = size - 1
    WHILE current != NULL:
        IF current.data == data:
            RETURN index
        current = current.prev
        index = index - 1
    RETURN -1

FUNCTION reverse():
    current = head
    temp = NULL
    WHILE current != NULL:
        temp = current.prev
        current.prev = current.next
        current.next = temp
        current = current.prev
    IF temp is NOT NULL:
        tail = head
        head = temp.prev

FUNCTION traverseForward():
    result = []
    current = head
    WHILE current != NULL:
        result.APPEND(current.data)
        current = current.next
    RETURN result

FUNCTION traverseBackward():
    result = []
    current = tail
    WHILE current != NULL:
        result.APPEND(current.data)
        current = current.prev
    RETURN result
`;
