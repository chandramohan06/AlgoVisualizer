export const trieJavaCode = `
class TrieNode {
    TrieNode[] children;
    boolean isEndOfWord;
    
    public TrieNode() {
        children = new TrieNode[26];
        isEndOfWord = false;
    }
}

class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode current = root;
        for (int i = 0; i < word.length(); i++) {
            int index = word.charAt(i) - 'a';
            if (current.children[index] == null) {
                current.children[index] = new TrieNode();
            }
            current = current.children[index];
        }
        current.isEndOfWord = true;
    }
    
    public boolean search(String word) {
        TrieNode current = root;
        for (int i = 0; i < word.length(); i++) {
            int index = word.charAt(i) - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        return current.isEndOfWord;
    }
    
    public boolean startsWith(String prefix) {
        TrieNode current = root;
        for (int i = 0; i < prefix.length(); i++) {
            int index = prefix.charAt(i) - 'a';
            if (current.children[index] == null) {
                return false;
            }
            current = current.children[index];
        }
        return true;
    }
    
    public boolean delete(String word) {
        return deleteRec(root, word, 0);
    }
    
    private boolean deleteRec(TrieNode node, String word, int index) {
        if (index == word.length()) {
            if (!node.isEndOfWord) return false;
            node.isEndOfWord = false;
            return isEmpty(node);
        }
        
        int charIndex = word.charAt(index) - 'a';
        TrieNode child = node.children[charIndex];
        
        if (child == null) return false;
        
        boolean shouldDeleteChild = deleteRec(child, word, index + 1);
        
        if (shouldDeleteChild) {
            node.children[charIndex] = null;
            return isEmpty(node) && !node.isEndOfWord;
        }
        
        return false;
    }
    
    private boolean isEmpty(TrieNode node) {
        for (int i = 0; i < 26; i++) {
            if (node.children[i] != null) return false;
        }
        return true;
    }
}
`;

export const trieCppCode = `
struct TrieNode {
    TrieNode* children[26];
    bool isEndOfWord;
    
    TrieNode() {
        for (int i = 0; i < 26; i++) {
            children[i] = nullptr;
        }
        isEndOfWord = false;
    }
};

class Trie {
private:
    TrieNode* root;
    
public:
    Trie() {
        root = new TrieNode();
    }
    
    void insert(string word) {
        TrieNode* current = root;
        for (char c : word) {
            int index = c - 'a';
            if (current->children[index] == nullptr) {
                current->children[index] = new TrieNode();
            }
            current = current->children[index];
        }
        current->isEndOfWord = true;
    }
    
    bool search(string word) {
        TrieNode* current = root;
        for (char c : word) {
            int index = c - 'a';
            if (current->children[index] == nullptr) {
                return false;
            }
            current = current->children[index];
        }
        return current->isEndOfWord;
    }
    
    bool startsWith(string prefix) {
        TrieNode* current = root;
        for (char c : prefix) {
            int index = c - 'a';
            if (current->children[index] == nullptr) {
                return false;
            }
            current = current->children[index];
        }
        return true;
    }
    
    bool delete(string word) {
        return deleteRec(root, word, 0);
    }
    
private:
    bool deleteRec(TrieNode* node, string word, int index) {
        if (index == word.length()) {
            if (!node->isEndOfWord) return false;
            node->isEndOfWord = false;
            return isEmpty(node);
        }
        
        int charIndex = word[index] - 'a';
        TrieNode* child = node->children[charIndex];
        
        if (child == nullptr) return false;
        
        bool shouldDeleteChild = deleteRec(child, word, index + 1);
        
        if (shouldDeleteChild) {
            node->children[charIndex] = nullptr;
            return isEmpty(node) && !node->isEndOfWord;
        }
        
        return false;
    }
    
    bool isEmpty(TrieNode* node) {
        for (int i = 0; i < 26; i++) {
            if (node->children[i] != nullptr) return false;
        }
        return true;
    }
};
`;

export const triePseudoCode = `
FUNCTION insert(word):
    current = root
    FOR each character c IN word:
        index = c - 'a'
        IF current.children[index] is NULL:
            current.children[index] = new TrieNode()
        current = current.children[index]
    current.isEndOfWord = true

FUNCTION search(word):
    current = root
    FOR each character c IN word:
        index = c - 'a'
        IF current.children[index] is NULL:
            RETURN false
        current = current.children[index]
    RETURN current.isEndOfWord

FUNCTION startsWith(prefix):
    current = root
    FOR each character c IN prefix:
        index = c - 'a'
        IF current.children[index] is NULL:
            RETURN false
        current = current.children[index]
    RETURN true

FUNCTION delete(word):
    RETURN deleteRec(root, word, 0)

FUNCTION deleteRec(node, word, index):
    IF index == LENGTH(word):
        IF NOT node.isEndOfWord:
            RETURN false
        node.isEndOfWord = false
        RETURN isEmpty(node)
    
    charIndex = word[index] - 'a'
    child = node.children[charIndex]
    
    IF child is NULL:
        RETURN false
    
    shouldDeleteChild = deleteRec(child, word, index + 1)
    
    IF shouldDeleteChild:
        node.children[charIndex] = NULL
        RETURN isEmpty(node) AND NOT node.isEndOfWord
    
    RETURN false

FUNCTION isEmpty(node):
    FOR i FROM 0 TO 25:
        IF node.children[i] is NOT NULL:
            RETURN false
    RETURN true
`;
