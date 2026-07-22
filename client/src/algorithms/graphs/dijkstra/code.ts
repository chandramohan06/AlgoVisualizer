export const dijkstraJavaCode = `
import java.util.*;

class Dijkstra {
    static class Edge {
        int target;
        int weight;
        Edge(int target, int weight) {
            this.target = target;
            this.weight = weight;
        }
    }
    
    public static void dijkstra(List<List<Edge>> adj, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{src, 0});
        
        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int u = curr[0];
            int d = curr[1];
            
            if (d > dist[u]) continue;
            
            for (Edge edge : adj.get(u)) {
                int v = edge.target;
                int weight = edge.weight;
                if (dist[u] + weight < dist[v]) {
                    dist[v] = dist[u] + weight;
                    pq.add(new int[]{v, dist[v]});
                }
            }
        }
    }
}
`;

export const dijkstraCppCode = `
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

typedef pair<int, int> iPair; // weight, node

class Graph {
    int V;
    vector<pair<int, int>>* adj;

public:
    Graph(int V) {
        this->V = V;
        adj = new vector<iPair>[V];
    }
    
    void addEdge(int u, int v, int w) {
        adj[u].push_back(make_pair(v, w));
        adj[v].push_back(make_pair(u, w));
    }
    
    void dijkstra(int src) {
        priority_queue<iPair, vector<iPair>, greater<iPair>> pq;
        vector<int> dist(V, 1e9);
        
        pq.push(make_pair(0, src));
        dist[src] = 0;
        
        while (!pq.empty()) {
            int u = pq.top().second;
            pq.pop();
            
            for (auto x : adj[u]) {
                int v = x.first;
                int weight = x.second;
                
                if (dist[v] > dist[u] + weight) {
                    dist[v] = dist[u] + weight;
                    pq.push(make_pair(dist[v], v));
                }
            }
        }
    }
};
`;

export const dijkstraPseudoCode = `
FUNCTION Dijkstra(Graph, source):
    dist = array of size V initialized to Infinity
    dist[source] = 0
    pq = PriorityQueue of pairs (node, distance)
    pq.enqueue(source, 0)
    
    WHILE pq is NOT empty:
        current = pq.dequeue()
        
        FOR each neighbor OF current:
            IF dist[current] + weight < dist[neighbor]:
                dist[neighbor] = dist[current] + weight
                pq.enqueue(neighbor, dist[neighbor])
`;
