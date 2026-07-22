export const avlTreeJavaCode = `
class Node {
    int data;
    Node left, right;
    int height;
    
    Node(int data) {
        this.data = data;
        left = right = null;
        height = 1;
    }
}

class AVLTree {
    Node root;
    
    int height(Node N) {
        if (N == null) return 0;
        return N.height;
    }
    
    int getBalance(Node N) {
        if (N == null) return 0;
        return height(N.left) - height(N.right);
    }
    
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        
        x.right = y;
        y.left = T2;
        
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        
        return x;
    }
    
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        
        y.left = x;
        x.right = T2;
        
        x.height = Math.max(height(x.left), height(x.right)) + 1;
        y.height = Math.max(height(y.left), height(y.right)) + 1;
        
        return y;
    }
    
    Node insert(Node node, int data) {
        if (node == null) return new Node(data);
        
        if (data < node.data)
            node.left = insert(node.left, data);
        else if (data > node.data)
            node.right = insert(node.right, data);
        else
            return node;
        
        node.height = 1 + Math.max(height(node.left), height(node.right));
        
        int balance = getBalance(node);
        
        // Left Left Case
        if (balance > 1 && data < node.left.data)
            return rightRotate(node);
        
        // Right Right Case
        if (balance < -1 && data > node.right.data)
            return leftRotate(node);
        
        // Left Right Case
        if (balance > 1 && data > node.left.data) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        
        // Right Left Case
        if (balance < -1 && data < node.right.data) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        
        return node;
    }
    
    Node minValueNode(Node node) {
        Node current = node;
        while (current.left != null) current = current.left;
        return current;
    }
    
    Node delete(Node root, int data) {
        if (root == null) return root;
        
        if (data < root.data)
            root.left = delete(root.left, data);
        else if (data > root.data)
            root.right = delete(root.right, data);
        else {
            if (root.left == null || root.right == null) {
                Node temp = root.left != null ? root.left : root.right;
                if (temp == null) {
                    temp = root;
                    root = null;
                } else
                    root = temp;
            } else {
                Node temp = minValueNode(root.right);
                root.data = temp.data;
                root.right = delete(root.right, temp.data);
            }
        }
        
        if (root == null) return root;
        
        root.height = Math.max(height(root.left), height(root.right)) + 1;
        
        int balance = getBalance(root);
        
        if (balance > 1 && getBalance(root.left) >= 0)
            return rightRotate(root);
        
        if (balance > 1 && getBalance(root.left) < 0) {
            root.left = leftRotate(root.left);
            return rightRotate(root);
        }
        
        if (balance < -1 && getBalance(root.right) <= 0)
            return leftRotate(root);
        
        if (balance < -1 && getBalance(root.right) > 0) {
            root.right = rightRotate(root.right);
            return leftRotate(root);
        }
        
        return root;
    }
}
`;

export const avlTreeCppCode = `
struct Node {
    int data;
    Node* left;
    Node* right;
    int height;
    
    Node(int data) {
        this->data = data;
        left = right = nullptr;
        height = 1;
    }
};

class AVLTree {
public:
    Node* root;
    
    AVLTree() {
        root = nullptr;
    }
    
    int height(Node* N) {
        if (N == nullptr) return 0;
        return N->height;
    }
    
    int getBalance(Node* N) {
        if (N == nullptr) return 0;
        return height(N->left) - height(N->right);
    }
    
    Node* rightRotate(Node* y) {
        Node* x = y->left;
        Node* T2 = x->right;
        
        x->right = y;
        y->left = T2;
        
        y->height = max(height(y->left), height(y->right)) + 1;
        x->height = max(height(x->left), height(x->right)) + 1;
        
        return x;
    }
    
    Node* leftRotate(Node* x) {
        Node* y = x->right;
        Node* T2 = y->left;
        
        y->left = x;
        x->right = T2;
        
        x->height = max(height(x->left), height(x->right)) + 1;
        y->height = max(height(y->left), height(y->right)) + 1;
        
        return y;
    }
    
    Node* insert(Node* node, int data) {
        if (node == nullptr) return new Node(data);
        
        if (data < node->data)
            node->left = insert(node->left, data);
        else if (data > node->data)
            node->right = insert(node->right, data);
        else
            return node;
        
        node->height = 1 + max(height(node->left), height(node->right));
        
        int balance = getBalance(node);
        
        if (balance > 1 && data < node->left->data)
            return rightRotate(node);
        
        if (balance < -1 && data > node->right->data)
            return leftRotate(node);
        
        if (balance > 1 && data > node->left->data) {
            node->left = leftRotate(node->left);
            return rightRotate(node);
        }
        
        if (balance < -1 && data < node->right->data) {
            node->right = rightRotate(node->right);
            return leftRotate(node);
        }
        
        return node;
    }
    
    Node* minValueNode(Node* node) {
        Node* current = node;
        while (current->left) current = current->left;
        return current;
    }
    
    Node* delete(Node* root, int data) {
        if (root == nullptr) return root;
        
        if (data < root->data)
            root->left = delete(root->left, data);
        else if (data > root->data)
            root->right = delete(root->right, data);
        else {
            if (root->left == nullptr || root->right == nullptr) {
                Node* temp = root->left ? root->left : root->right;
                if (temp == nullptr) {
                    temp = root;
                    root = nullptr;
                } else
                    *root = *temp;
            } else {
                Node* temp = minValueNode(root->right);
                root->data = temp->data;
                root->right = delete(root->right, temp->data);
            }
        }
        
        if (root == nullptr) return root;
        
        root->height = 1 + max(height(root->left), height(root->right));
        
        int balance = getBalance(root);
        
        if (balance > 1 && getBalance(root->left) >= 0)
            return rightRotate(root);
        
        if (balance > 1 && getBalance(root->left) < 0) {
            root->left = leftRotate(root->left);
            return rightRotate(root);
        }
        
        if (balance < -1 && getBalance(root->right) <= 0)
            return leftRotate(root);
        
        if (balance < -1 && getBalance(root->right) > 0) {
            root->right = rightRotate(root->right);
            return leftRotate(root);
        }
        
        return root;
    }
};
`;

export const avlTreePseudoCode = `
FUNCTION height(N):
    IF N is NULL:
        RETURN 0
    RETURN N.height

FUNCTION getBalance(N):
    IF N is NULL:
        RETURN 0
    RETURN height(N.left) - height(N.right)

FUNCTION rightRotate(y):
    x = y.left
    T2 = x.right
    
    x.right = y
    y.left = T2
    
    y.height = 1 + MAX(height(y.left), height(y.right))
    x.height = 1 + MAX(height(x.left), height(x.right))
    
    RETURN x

FUNCTION leftRotate(x):
    y = x.right
    T2 = y.left
    
    y.left = x
    x.right = T2
    
    x.height = 1 + MAX(height(x.left), height(x.right))
    y.height = 1 + MAX(height(y.left), height(y.right))
    
    RETURN y

FUNCTION insert(node, data):
    IF node is NULL:
        RETURN new Node(data)
    
    IF data < node.data:
        node.left = insert(node.left, data)
    ELSE IF data > node.data:
        node.right = insert(node.right, data)
    ELSE:
        RETURN node
    
    node.height = 1 + MAX(height(node.left), height(node.right))
    
    balance = getBalance(node)
    
    IF balance > 1 AND data < node.left.data:
        RETURN rightRotate(node)
    
    IF balance < -1 AND data > node.right.data:
        RETURN leftRotate(node)
    
    IF balance > 1 AND data > node.left.data:
        node.left = leftRotate(node.left)
        RETURN rightRotate(node)
    
    IF balance < -1 AND data < node.right.data:
        node.right = rightRotate(node.right)
        RETURN leftRotate(node)
    
    RETURN node

FUNCTION delete(root, data):
    IF root is NULL:
        RETURN root
    
    IF data < root.data:
        root.left = delete(root.left, data)
    ELSE IF data > root.data:
        root.right = delete(root.right, data)
    ELSE:
        IF root.left is NULL OR root.right is NULL:
            temp = root.left IF root.left is NOT NULL ELSE root.right
            IF temp is NULL:
                temp = root
                root = NULL
            ELSE:
                root = temp
        ELSE:
            temp = minValueNode(root.right)
            root.data = temp.data
            root.right = delete(root.right, temp.data)
    
    IF root is NULL:
        RETURN root
    
    root.height = 1 + MAX(height(root.left), height(root.right))
    
    balance = getBalance(root)
    
    IF balance > 1 AND getBalance(root.left) >= 0:
        RETURN rightRotate(root)
    
    IF balance > 1 AND getBalance(root.left) < 0:
        root.left = leftRotate(root.left)
        RETURN rightRotate(root)
    
    IF balance < -1 AND getBalance(root.right) <= 0:
        RETURN leftRotate(root)
    
    IF balance < -1 AND getBalance(root.right) > 0:
        root.right = rightRotate(root.right)
        RETURN leftRotate(root)
    
    RETURN root
`;
