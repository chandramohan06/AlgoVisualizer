export const primMSTJavaCode = `
import java.util.*;

class PrimMST {
    static class Edge {
        int dest, weight;
        Edge(int dest, int weight) {
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public static void prim(List<List<Edge>> adj, int V) {
        int[] key = new int[V];
        int[] parent = new int[V];
        boolean[] inMST = new boolean[V];
        
        Arrays.fill(key, Integer.MAX_VALUE);
        Arrays.fill(parent, -1);
        key[0] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{0, 0});
        
        while (!pq.isEmpty()) {
            int u = pq.poll()[0];
            inMST[u] = true;
            
            for (Edge edge : adj.get(u)) {
                int v = edge.dest;
                int weight = edge.weight;
                if (!inMST[v] && weight < key[v]) {
                    key[v] = weight;
                    parent[v] = u;
                    pq.add(new int[]{v, key[v]});
                }
            }
        }
    }
}
`;

export const primMSTCppCode = `
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> iPair; // weight, node

void primMST(vector<pair<int, int>> adj[], int V) {
    priority_queue<iPair, vector<iPair>, greater<iPair>> pq;
    int src = 0;
    
    vector<int> key(V, 1e9);
    vector<int> parent(V, -1);
    vector<bool> inMST(V, false);
    
    pq.push(make_pair(0, src));
    key[src] = 0;
    
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        
        inMST[u] = true;
        
        for (auto x : adj[u]) {
            int v = x.first;
            int weight = x.second;
            
            if (!inMST[v] && key[v] > weight) {
                key[v] = weight;
                pq.push(make_pair(key[v], v));
                parent[v] = u;
            }
        }
    }
}
`;

export const primMSTPseudoCode = `
FUNCTION PrimMST(Graph, startNode):
    key = array of size V initialized to Infinity
    parent = array of size V initialized to -1
    inMST = array of size V initialized to false
    
    key[startNode] = 0
    pq = PriorityQueue of pairs (node, key)
    pq.enqueue(startNode, 0)
    
    WHILE pq is NOT empty:
        u = pq.dequeue()
        inMST[u] = true
        
        FOR each neighbor v OF u WITH weight w:
            IF inMST[v] is false AND w < key[v]:
                key[v] = w
                parent[v] = u
                pq.enqueue(v, key[v])
`;
