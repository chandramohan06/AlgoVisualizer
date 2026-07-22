export const dfsJavaCode = `
import java.util.*;

class Graph {
    private int V;
    private LinkedList<Integer> adj[];
    
    Graph(int v) {
        V = v;
        adj = new LinkedList[v];
        for (int i = 0; i < v; ++i)
            adj[i] = new LinkedList();
    }
    
    void addEdge(int v, int w) {
        adj[v].add(w);
    }
    
    void DFSUtil(int v, boolean visited[]) {
        visited[v] = true;
        System.out.print(v + " ");
        
        for (int n : adj[v]) {
            if (!visited[n]) {
                DFSUtil(n, visited);
            }
        }
    }
    
    void DFS(int v) {
        boolean visited[] = new boolean[V];
        DFSUtil(v, visited);
    }
}
`;

export const dfsCppCode = `
#include <iostream>
#include <list>
#include <vector>
using namespace std;

class Graph {
    int V;
    list<int>* adj;
    void DFSUtil(int v, vector<bool>& visited);

public:
    Graph(int V);
    void addEdge(int v, int w);
    void DFS(int v);
};

Graph::Graph(int V) {
    this->V = V;
    adj = new list<int>[V];
}

void Graph::addEdge(int v, int w) {
    adj[v].push_back(w);
}

void Graph::DFSUtil(int v, vector<bool>& visited) {
    visited[v] = true;
    cout << v << " ";
    
    for (auto i = adj[v].begin(); i != adj[v].end(); ++i) {
        if (!visited[*i]) {
            DFSUtil(*i, visited);
        }
    }
}

void Graph::DFS(int v) {
    vector<bool> visited(V, false);
    DFSUtil(v, visited);
}
`;

export const dfsPseudoCode = `
FUNCTION DFS(node, visited):
    visited[node] = true
    PRINT node
    
    FOR each neighbor OF node:
        IF visited[neighbor] is false:
            DFS(neighbor, visited)
`;
