export const cycleDetectionJavaCode = `
import java.util.*;

class CycleDetection {
    private boolean isCyclicUtil(int i, boolean[] visited, boolean[] recStack, List<List<Integer>> adj) {
        if (recStack[i]) return true;
        if (visited[i]) return false;
        
        visited[i] = true;
        recStack[i] = true;
        
        for (Integer neighbor : adj.get(i)) {
            if (isCyclicUtil(neighbor, visited, recStack, adj)) {
                return true;
            }
        }
        
        recStack[i] = false;
        return false;
    }
    
    public boolean isCyclic(int V, List<List<Integer>> adj) {
        boolean[] visited = new boolean[V];
        boolean[] recStack = new boolean[V];
        
        for (int i = 0; i < V; i++) {
            if (isCyclicUtil(i, visited, recStack, adj)) {
                return true;
            }
        }
        return false;
    }
}
`;

export const cycleDetectionCppCode = `
#include <iostream>
#include <vector>
using namespace std;

class Graph {
    int V;
    vector<int>* adj;
    bool isCyclicUtil(int v, vector<bool>& visited, vector<bool>& recStack);

public:
    Graph(int V) {
        this->V = V;
        adj = new vector<int>[V];
    }
    void addEdge(int v, int w) { adj[v].push_back(w); }
    bool isCyclic();
};

bool Graph::isCyclicUtil(int v, vector<bool>& visited, vector<bool>& recStack) {
    if (visited[v] == false) {
        visited[v] = true;
        recStack[v] = true;
        
        for (int i : adj[v]) {
            if (!visited[i] && isCyclicUtil(i, visited, recStack))
                return true;
            else if (recStack[i])
                return true;
        }
    }
    recStack[v] = false;
    return false;
}

bool Graph::isCyclic() {
    vector<bool> visited(V, false);
    vector<bool> recStack(V, false);
    for (int i = 0; i < V; i++) {
        if (!visited[i] && isCyclicUtil(i, visited, recStack))
            return true;
    }
    return false;
}
`;

export const cycleDetectionPseudoCode = `
FUNCTION isCyclicUtil(node, visited, recStack):
    IF recStack[node] is true:
        RETURN true
    IF visited[node] is true:
        RETURN false
        
    visited[node] = true
    recStack[node] = true
    
    FOR each neighbor OF node:
        IF isCyclicUtil(neighbor, visited, recStack) is true:
            RETURN true
            
    recStack[node] = false
    RETURN false
`;
