export const unionFindJavaCode = `
class UnionFind {
    private int[] parent;
    private int[] rank;
    
    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }
    
    public int find(int i) {
        if (parent[i] == i) {
            return i;
        }
        parent[i] = find(parent[i]); // Path compression
        return parent[i];
    }
    
    public void union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
}
`;

export const unionFindCppCode = `
#include <iostream>
#include <vector>
using namespace std;

class UnionFind {
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int size) {
        parent.resize(size);
        rank.resize(size, 0);
        for (int i = 0; i < size; i++) parent[i] = i;
    }
    
    int find(int i) {
        if (parent[i] == i)
            return i;
        return parent[i] = find(parent[i]); // Path compression
    }
    
    void Union(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        
        if (rootI != rootJ) {
            if (rank[rootI] < rank[rootJ]) {
                parent[rootI] = rootJ;
            } else if (rank[rootI] > rank[rootJ]) {
                parent[rootJ] = rootI;
            } else {
                parent[rootJ] = rootI;
                rank[rootI]++;
            }
        }
    }
};
`;

export const unionFindPseudoCode = `
FUNCTION makeSet(x):
    parent[x] = x
    rank[x] = 0

FUNCTION find(x):
    IF parent[x] is NOT x:
        parent[x] = find(parent[x])  // Path compression
    RETURN parent[x]

FUNCTION union(x, y):
    rootX = find(x)
    rootY = find(y)
    IF rootX is NOT rootY:
        IF rank[rootX] < rank[rootY]:
            parent[rootX] = rootY
        ELSE IF rank[rootX] > rank[rootY]:
            parent[rootY] = rootX
        ELSE:
            parent[rootY] = rootX
            rank[rootX] = rank[rootX] + 1
`;
