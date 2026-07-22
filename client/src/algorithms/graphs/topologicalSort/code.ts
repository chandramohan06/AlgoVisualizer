export const topologicalSortJavaCode = `
import java.util.*;

class TopologicalSort {
    public static void topologicalSort(List<List<Integer>> adj, int V) {
        int[] indegree = new int[V];
        for (int i = 0; i < V; i++) {
            for (int node : adj.get(i)) {
                indegree[node]++;
            }
        }
        
        Queue<Integer> q = new LinkedList<Integer>();
        for (int i = 0; i < V; i++) {
            if (indegree[i] == 0) {
                q.add(i);
            }
        }
        
        List<Integer> topOrder = new ArrayList<>();
        while (!q.isEmpty()) {
            int u = q.poll();
            topOrder.add(u);
            
            for (int node : adj.get(u)) {
                indegree[node]--;
                if (indegree[node] == 0) {
                    q.add(node);
                }
            }
        }
    }
}
`;

export const topologicalSortCppCode = `
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

void topologicalSort(vector<int> adj[], int V) {
    vector<int> indegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto node : adj[i]) {
            indegree[node]++;
        }
    }
    
    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (indegree[i] == 0) {
            q.push(i);
        }
    }
    
    vector<int> topOrder;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topOrder.push_back(u);
        
        for (auto node : adj[u]) {
            indegree[node]--;
            if (indegree[node] == 0) {
                q.push(node);
            }
        }
    }
}
`;

export const topologicalSortPseudoCode = `
FUNCTION TopologicalSort(Graph):
    indegree = array of size V initialized to 0
    FOR each vertex u in Graph:
        FOR each neighbor v of u:
            indegree[v] = indegree[v] + 1
            
    queue = empty queue
    FOR each vertex v in Graph:
        IF indegree[v] is 0:
            queue.enqueue(v)
            
    topOrder = empty list
    WHILE queue is NOT empty:
        u = queue.dequeue()
        topOrder.add(u)
        
        FOR each neighbor v of u:
            indegree[v] = indegree[v] - 1
            IF indegree[v] is 0:
                queue.enqueue(v)
                
    RETURN topOrder
`;
