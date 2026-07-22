export const huffmanJavaCode = `
import java.util.PriorityQueue;

class HuffmanNode {
    int data;
    char c;
    HuffmanNode left;
    HuffmanNode right;
}

class HuffmanCoding {
    public HuffmanNode buildTree(int[] freqs, char[] chars) {
        int n = freqs.length;
        PriorityQueue<HuffmanNode> q = new PriorityQueue<>(n, (a, b) -> a.data - b.data);

        for (int i = 0; i < n; i++) {
            HuffmanNode hn = new HuffmanNode();
            hn.c = chars[i];
            hn.data = freqs[i];
            hn.left = null;
            hn.right = null;
            q.add(hn);
        }

        HuffmanNode root = null;
        while (q.size() > 1) {
            HuffmanNode x = q.poll();
            HuffmanNode y = q.poll();

            HuffmanNode f = new HuffmanNode();
            f.data = x.data + y.data;
            f.c = '-';
            f.left = x;
            f.right = y;
            root = f;
            q.add(f);
        }
        return root;
    }
}
`;

export const huffmanCppCode = `
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct HuffmanNode {
    int data;
    char c;
    HuffmanNode *left, *right;
    HuffmanNode(char character, int frequency) {
        left = right = NULL;
        this->c = character;
        this->data = frequency;
    }
};

struct compare {
    bool operator()(HuffmanNode* l, HuffmanNode* r) {
        return (l->data > r->data);
    }
};

HuffmanNode* buildTree(vector<char>& chars, vector<int>& freqs) {
    priority_queue<HuffmanNode*, vector<HuffmanNode*>, compare> minHeap;

    for (size_t i = 0; i < chars.size(); ++i)
        minHeap.push(new HuffmanNode(chars[i], freqs[i]));

    while (minHeap.size() > 1) {
        HuffmanNode *left = minHeap.top(); minHeap.pop();
        HuffmanNode *right = minHeap.top(); minHeap.pop();

        HuffmanNode *top = new HuffmanNode('-', left->data + right->data);
        top->left = left;
        top->right = right;
        minHeap.push(top);
    }
    return minHeap.top();
}
`;

export const huffmanPseudoCode = `
FUNCTION buildHuffmanTree(freqs, chars):
    minHeap = PriorityQueue sorted by frequency ascending
    FOR i FROM 0 TO freqs.length - 1:
        minHeap.add(Node(chars[i], freqs[i]))
    
    WHILE minHeap.size > 1:
        left = minHeap.poll()
        right = minHeap.poll()
        parent = Node('-', left.freq + right.freq)
        parent.left = left
        parent.right = right
        minHeap.add(parent)
        
    RETURN minHeap.peek()
`;
