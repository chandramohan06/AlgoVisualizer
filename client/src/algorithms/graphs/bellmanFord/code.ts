export const bellmanFordJavaCode = `
import java.util.*;

class BellmanFord {
    static class Edge {
        int src, dest, weight;
        Edge(int src, int dest, int weight) {
            this.src = src;
            this.dest = dest;
            this.weight = weight;
        }
    }
    
    public static boolean bellmanFord(List<Edge> edges, int src, int V) {
        int[] dist = new int[V];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        
        for (int i = 1; i < V; ++i) {
            for (Edge edge : edges) {
                int u = edge.src;
                int v = edge.dest;
                int w = edge.weight;
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }
        
        for (Edge edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int w = edge.weight;
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                System.out.println("Graph contains negative weight cycle");
                return false;
            }
        }
        return true;
    }
}
`;

export const bellmanFordCppCode = `
#include <iostream>
#include <vector>
using namespace std;

struct Edge {
    int src, dest, weight;
};

bool bellmanFord(vector<Edge>& edges, int src, int V) {
    vector<int> dist(V, 1e9);
    dist[src] = 0;
    
    for (int i = 1; i < V; i++) {
        for (auto& edge : edges) {
            int u = edge.src;
            int v = edge.dest;
            int w = edge.weight;
            if (dist[u] != 1e9 && dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
            }
        }
    }
    
    for (auto& edge : edges) {
        int u = edge.src;
        int v = edge.dest;
        int w = edge.weight;
        if (dist[u] != 1e9 && dist[u] + w < dist[v]) {
            return false; // Negative cycle detected
        }
    }
    return true;
}
`;

export const bellmanFordPseudoCode = `
FUNCTION BellmanFord(Graph, source):
    dist = array of size V initialized to Infinity
    dist[source] = 0
    
    FOR i FROM 1 TO V - 1:
        FOR each edge (u, v) WITH weight w IN Graph:
            IF dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                
    FOR each edge (u, v) WITH weight w IN Graph:
        IF dist[u] + w < dist[v]:
            RETURN "Graph contains negative weight cycle"
            
    RETURN dist
`;
