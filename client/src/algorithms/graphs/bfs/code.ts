export const bfsJavaCode = `
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
    
    void BFS(int s) {
        boolean visited[] = new boolean[V];
        LinkedList<Integer> queue = new LinkedList<Integer>();
        
        visited[s] = true;
        queue.add(s);
        
        while (queue.size() != 0) {
            s = queue.poll();
            System.out.print(s + " ");
            
            Iterator<Integer> i = adj[s].listIterator();
            while (i.hasNext()) {
                int n = i.next();
                if (!visited[n]) {
                    visited[n] = true;
                    queue.add(n);
                }
            }
        }
    }
}
`;

export const bfsCppCode = `
#include <iostream>
#include <list>
#include <queue>
using namespace std;

class Graph {
    int V;
    list<int>* adj;
    
public:
    Graph(int V) {
        this->V = V;
        adj = new list<int>[V];
    }
    
    void addEdge(int v, int w) {
        adj[v].push_back(w);
    }
    
    void BFS(int s) {
        bool* visited = new bool[V];
        for (int i = 0; i < V; i++)
            visited[i] = false;
        
        list<int> queue;
        visited[s] = true;
        queue.push_back(s);
        
        while (!queue.empty()) {
            s = queue.front();
            cout << s << " ";
            queue.pop_front();
            
            for (auto i = adj[s].begin(); i != adj[s].end(); ++i) {
                if (!visited[*i]) {
                    visited[*i] = true;
                    queue.push_back(*i);
                }
            }
        }
    }
};
`;

export const bfsPseudoCode = `
FUNCTION BFS(start):
    visited = array of size V initialized to false
    queue = empty queue
    
    visited[start] = true
    queue.enqueue(start)
    
    WHILE queue is NOT empty:
        current = queue.dequeue()
        PRINT current
        
        FOR each neighbor OF current:
            IF visited[neighbor] is false:
                visited[neighbor] = true
                queue.enqueue(neighbor)
`;
