export const binaryTreeJavaCode = `
class Node {
    int data;
    Node left, right;
    
    Node(int data) {
        this.data = data;
        left = right = null;
    }
}

class BinaryTree {
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
        else
            root.right = insertRec(root.right, data);
        return root;
    }
    
    public boolean search(int data) {
        return searchRec(root, data);
    }
    
    private boolean searchRec(Node root, int data) {
        if (root == null) return false;
        if (root.data == data) return true;
        return data < root.data ? searchRec(root.left, data) : searchRec(root.right, data);
    }
    
    public void preorder() {
        preorderRec(root);
    }
    
    private void preorderRec(Node root) {
        if (root != null) {
            System.out.print(root.data + " ");
            preorderRec(root.left);
            preorderRec(root.right);
        }
    }
    
    public void inorder() {
        inorderRec(root);
    }
    
    private void inorderRec(Node root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }
    
    public void postorder() {
        postorderRec(root);
    }
    
    private void postorderRec(Node root) {
        if (root != null) {
            postorderRec(root.left);
            postorderRec(root.right);
            System.out.print(root.data + " ");
        }
    }
    
    public void levelOrder() {
        if (root == null) return;
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        while (!queue.isEmpty()) {
            Node temp = queue.poll();
            System.out.print(temp.data + " ");
            if (temp.left != null) queue.add(temp.left);
            if (temp.right != null) queue.add(temp.right);
        }
    }
}
`;

export const binaryTreeCppCode = `
struct Node {
    int data;
    Node* left, *right;
    
    Node(int data) {
        this->data = data;
        left = right = nullptr;
    }
};

class BinaryTree {
public:
    Node* root;
    
    BinaryTree() {
        root = nullptr;
    }
    
    void insert(int data) {
        root = insertRec(root, data);
    }
    
private:
    Node* insertRec(Node* root, int data) {
        if (root == nullptr) {
            return new Node(data);
        }
        if (data < root->data)
            root->left = insertRec(root->left, data);
        else
            root->right = insertRec(root->right, data);
        return root;
    }
    
public:
    bool search(int data) {
        return searchRec(root, data);
    }
    
private:
    bool searchRec(Node* root, int data) {
        if (root == nullptr) return false;
        if (root->data == data) return true;
        return data < root->data ? searchRec(root->left, data) : searchRec(root->right, data);
    }
    
public:
    void preorder() {
        preorderRec(root);
    }
    
private:
    void preorderRec(Node* root) {
        if (root != nullptr) {
            cout << root->data << " ";
            preorderRec(root->left);
            preorderRec(root->right);
        }
    }
    
public:
    void inorder() {
        inorderRec(root);
    }
    
private:
    void inorderRec(Node* root) {
        if (root != nullptr) {
            inorderRec(root->left);
            cout << root->data << " ";
            inorderRec(root->right);
        }
    }
    
public:
    void postorder() {
        postorderRec(root);
    }
    
private:
    void postorderRec(Node* root) {
        if (root != nullptr) {
            postorderRec(root->left);
            postorderRec(root->right);
            cout << root->data << " ";
        }
    }
    
public:
    void levelOrder() {
        if (root == nullptr) return;
        queue<Node*> q;
        q.push(root);
        while (!q.empty()) {
            Node* temp = q.front();
            q.pop();
            cout << temp->data << " ";
            if (temp->left) q.push(temp->left);
            if (temp->right) q.push(temp->right);
        }
    }
};
`;

export const binaryTreePseudoCode = `
FUNCTION insert(data):
    root = insertRec(root, data)

FUNCTION insertRec(root, data):
    IF root is NULL:
        RETURN new Node(data)
    IF data < root.data:
        root.left = insertRec(root.left, data)
    ELSE:
        root.right = insertRec(root.right, data)
    RETURN root

FUNCTION search(data):
    RETURN searchRec(root, data)

FUNCTION searchRec(root, data):
    IF root is NULL:
        RETURN false
    IF root.data == data:
        RETURN true
    IF data < root.data:
        RETURN searchRec(root.left, data)
    ELSE:
        RETURN searchRec(root.right, data)

FUNCTION preorder():
    preorderRec(root)

FUNCTION preorderRec(root):
    IF root is NOT NULL:
        PRINT root.data
        preorderRec(root.left)
        preorderRec(root.right)

FUNCTION inorder():
    inorderRec(root)

FUNCTION inorderRec(root):
    IF root is NOT NULL:
        inorderRec(root.left)
        PRINT root.data
        inorderRec(root.right)

FUNCTION postorder():
    postorderRec(root)

FUNCTION postorderRec(root):
    IF root is NOT NULL:
        postorderRec(root.left)
        postorderRec(root.right)
        PRINT root.data

FUNCTION levelOrder():
    IF root is NULL:
        RETURN
    queue = [root]
    WHILE queue is NOT empty:
        temp = queue.dequeue()
        PRINT temp.data
        IF temp.left is NOT NULL:
            queue.enqueue(temp.left)
        IF temp.right is NOT NULL:
            queue.enqueue(temp.right)
`;
