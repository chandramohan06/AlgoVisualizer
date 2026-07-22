export const bstJavaCode = `
class Node {
    int data;
    Node left, right;
    
    Node(int data) {
        this.data = data;
        left = right = null;
    }
}

class BinarySearchTree {
    Node root;
    
    public void insert(int data) {
        root = insertRec(root, data);
    }
    
    private Node insertRec(Node root, int data) {
        if (root == null) {
            root = new Node(data);
            return root;
        }
        if (data < root.data)
            root.left = insertRec(root.left, data);
        else if (data > root.data)
            root.right = insertRec(root.right, data);
        return root;
    }
    
    public Node search(int data) {
        return searchRec(root, data);
    }
    
    private Node searchRec(Node root, int data) {
        if (root == null || root.data == data) return root;
        if (data < root.data) return searchRec(root.left, data);
        return searchRec(root.right, data);
    }
    
    public Node findMin() {
        if (root == null) return null;
        Node current = root;
        while (current.left != null) current = current.left;
        return current;
    }
    
    public Node findMax() {
        if (root == null) return null;
        Node current = root;
        while (current.right != null) current = current.right;
        return current;
    }
    
    public void delete(int data) {
        root = deleteRec(root, data);
    }
    
    private Node deleteRec(Node root, int data) {
        if (root == null) return root;
        if (data < root.data)
            root.left = deleteRec(root.left, data);
        else if (data > root.data)
            root.right = deleteRec(root.right, data);
        else {
            if (root.left == null) return root.right;
            if (root.right == null) return root.left;
            root.data = minValue(root.right);
            root.right = deleteRec(root.right, root.data);
        }
        return root;
    }
    
    private int minValue(Node root) {
        int minv = root.data;
        while (root.left != null) {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }
    
    public Node successor(int data) {
        Node current = search(data);
        if (current == null) return null;
        if (current.right != null) {
            Node temp = current.right;
            while (temp.left != null) temp = temp.left;
            return temp;
        }
        Node successor = null;
        Node ancestor = root;
        while (ancestor != null) {
            if (data < ancestor.data) {
                successor = ancestor;
                ancestor = ancestor.left;
            } else if (data > ancestor.data) {
                ancestor = ancestor.right;
            } else break;
        }
        return successor;
    }
    
    public Node predecessor(int data) {
        Node current = search(data);
        if (current == null) return null;
        if (current.left != null) {
            Node temp = current.left;
            while (temp.right != null) temp = temp.right;
            return temp;
        }
        Node predecessor = null;
        Node ancestor = root;
        while (ancestor != null) {
            if (data < ancestor.data) {
                ancestor = ancestor.left;
            } else if (data > ancestor.data) {
                predecessor = ancestor;
                ancestor = ancestor.right;
            } else break;
        }
        return predecessor;
    }
}
`;

export const bstCppCode = `
struct Node {
    int data;
    Node* left, *right;
    
    Node(int data) {
        this->data = data;
        left = right = nullptr;
    }
};

class BinarySearchTree {
public:
    Node* root;
    
    BinarySearchTree() {
        root = nullptr;
    }
    
    void insert(int data) {
        root = insertRec(root, data);
    }
    
private:
    Node* insertRec(Node* root, int data) {
        if (root == nullptr) return new Node(data);
        if (data < root->data)
            root->left = insertRec(root->left, data);
        else if (data > root->data)
            root->right = insertRec(root->right, data);
        return root;
    }
    
public:
    Node* search(int data) {
        return searchRec(root, data);
    }
    
private:
    Node* searchRec(Node* root, int data) {
        if (root == nullptr || root->data == data) return root;
        if (data < root->data) return searchRec(root->left, data);
        return searchRec(root->right, data);
    }
    
public:
    Node* findMin() {
        if (root == nullptr) return nullptr;
        Node* current = root;
        while (current->left) current = current->left;
        return current;
    }
    
    Node* findMax() {
        if (root == nullptr) return nullptr;
        Node* current = root;
        while (current->right) current = current->right;
        return current;
    }
    
    void delete(int data) {
        root = deleteRec(root, data);
    }
    
private:
    Node* deleteRec(Node* root, int data) {
        if (root == nullptr) return root;
        if (data < root->data)
            root->left = deleteRec(root->left, data);
        else if (data > root->data)
            root->right = deleteRec(root->right, data);
        else {
            if (root->left == nullptr) return root->right;
            if (root->right == nullptr) return root->left;
            root->data = minValue(root->right);
            root->right = deleteRec(root->right, root->data);
        }
        return root;
    }
    
    int minValue(Node* root) {
        int minv = root->data;
        while (root->left) {
            minv = root->left->data;
            root = root->left;
        }
        return minv;
    }
    
public:
    Node* successor(int data) {
        Node* current = search(data);
        if (current == nullptr) return nullptr;
        if (current->right) {
            Node* temp = current->right;
            while (temp->left) temp = temp->left;
            return temp;
        }
        Node* successor = nullptr;
        Node* ancestor = root;
        while (ancestor) {
            if (data < ancestor->data) {
                successor = ancestor;
                ancestor = ancestor->left;
            } else if (data > ancestor->data) {
                ancestor = ancestor->right;
            } else break;
        }
        return successor;
    }
    
    Node* predecessor(int data) {
        Node* current = search(data);
        if (current == nullptr) return nullptr;
        if (current->left) {
            Node* temp = current->left;
            while (temp->right) temp = temp->right;
            return temp;
        }
        Node* predecessor = nullptr;
        Node* ancestor = root;
        while (ancestor) {
            if (data < ancestor->data) {
                ancestor = ancestor->left;
            } else if (data > ancestor->data) {
                predecessor = ancestor;
                ancestor = ancestor->right;
            } else break;
        }
        return predecessor;
    }
};
`;

export const bstPseudoCode = `
FUNCTION insert(data):
    root = insertRec(root, data)

FUNCTION insertRec(root, data):
    IF root is NULL:
        RETURN new Node(data)
    IF data < root.data:
        root.left = insertRec(root.left, data)
    ELSE IF data > root.data:
        root.right = insertRec(root.right, data)
    RETURN root

FUNCTION search(data):
    RETURN searchRec(root, data)

FUNCTION searchRec(root, data):
    IF root is NULL OR root.data == data:
        RETURN root
    IF data < root.data:
        RETURN searchRec(root.left, data)
    RETURN searchRec(root.right, data)

FUNCTION findMin():
    IF root is NULL:
        RETURN NULL
    current = root
    WHILE current.left is NOT NULL:
        current = current.left
    RETURN current

FUNCTION findMax():
    IF root is NULL:
        RETURN NULL
    current = root
    WHILE current.right is NOT NULL:
        current = current.right
    RETURN current

FUNCTION delete(data):
    root = deleteRec(root, data)

FUNCTION deleteRec(root, data):
    IF root is NULL:
        RETURN root
    IF data < root.data:
        root.left = deleteRec(root.left, data)
    ELSE IF data > root.data:
        root.right = deleteRec(root.right, data)
    ELSE:
        IF root.left is NULL:
            RETURN root.right
        IF root.right is NULL:
            RETURN root.left
        root.data = minValue(root.right)
        root.right = deleteRec(root.right, root.data)
    RETURN root

FUNCTION minValue(root):
    minv = root.data
    WHILE root.left is NOT NULL:
        minv = root.left.data
        root = root.left
    RETURN minv

FUNCTION successor(data):
    current = search(data)
    IF current is NULL:
        RETURN NULL
    IF current.right is NOT NULL:
        temp = current.right
        WHILE temp.left is NOT NULL:
            temp = temp.left
        RETURN temp
    successor = NULL
    ancestor = root
    WHILE ancestor is NOT NULL:
        IF data < ancestor.data:
            successor = ancestor
            ancestor = ancestor.left
        ELSE IF data > ancestor.data:
            ancestor = ancestor.right
        ELSE:
            BREAK
    RETURN successor

FUNCTION predecessor(data):
    current = search(data)
    IF current is NULL:
        RETURN NULL
    IF current.left is NOT NULL:
        temp = current.left
        WHILE temp.right is NOT NULL:
            temp = temp.right
        RETURN temp
    predecessor = NULL
    ancestor = root
    WHILE ancestor is NOT NULL:
        IF data < ancestor.data:
            ancestor = ancestor.left
        ELSE IF data > ancestor.data:
            predecessor = ancestor
            ancestor = ancestor.right
        ELSE:
            BREAK
    RETURN predecessor
`;
