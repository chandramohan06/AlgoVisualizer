export const floydWarshallJavaCode = `
class FloydWarshall {
    final static int INF = 9999999;
    
    void floydWarshall(int graph[][], int V) {
        int dist[][] = new int[V][V];
        int i, j, k;
        
        for (i = 0; i < V; i++)
            for (j = 0; j < V; j++)
                dist[i][j] = graph[i][j];
                
        for (k = 0; k < V; k++) {
            for (i = 0; i < V; i++) {
                for (j = 0; j < V; j++) {
                    if (dist[i][k] + dist[k][j] < dist[i][j])
                        dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}
`;

export const floydWarshallCppCode = `
#include <iostream>
#include <vector>
using namespace std;

#define INF 100000000

void floydWarshall(vector<vector<int>>& dist, int V) {
    for (int k = 0; k < V; k++) {
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (dist[i][k] != INF && dist[k][j] != INF && dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
}
`;

export const floydWarshallPseudoCode = `
FUNCTION FloydWarshall(Graph):
    dist = 2D array of size V x V initialized to Infinity
    FOR each vertex v:
        dist[v][v] = 0
    FOR each edge (u, v) with weight w:
        dist[u][v] = w
        
    FOR k FROM 0 TO V - 1:
        FOR i FROM 0 TO V - 1:
            FOR j FROM 0 TO V - 1:
                IF dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
`;
