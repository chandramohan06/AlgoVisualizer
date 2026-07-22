export const kruskalMSTJavaCode = `
import java.util.*;

class KruskalMST {
    static class Edge implements Comparable<Edge> {
        int src, dest, weight;
        public int compareTo(Edge compareEdge) {
            return this.weight - compareEdge.weight;
        }
    }
    
    static class Subset {
        int parent, rank;
    }
    
    int find(Subset subsets[], int i) {
        if (subsets[i].parent != i)
            subsets[i].parent = find(subsets, subsets[i].parent);
        return subsets[i].parent;
    }
    
    void union(Subset subsets[], int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);
        if (subsets[xroot].rank < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank)
            subsets[yroot].parent = xroot;
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }
    
    void Kruskal(Edge edges[], int V) {
        Arrays.sort(edges);
        Subset subsets[] = new Subset[V];
        for (int v = 0; v < V; ++v) {
            subsets[v] = new Subset();
            subsets[v].parent = v;
            subsets[v].rank = 0;
        }
        
        List<Edge> result = new ArrayList<>();
        int e = 0;
        int i = 0;
        while (result.size() < V - 1 && i < edges.length) {
            Edge next_edge = edges[i++];
            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);
            if (x != y) {
                result.add(next_edge);
                union(subsets, x, y);
            }
        }
    }
}
`;

export const kruskalMSTCppCode = `
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int src, dest, weight;
    bool operator<(const Edge& other) const {
        return weight < other.weight;
    }
};

struct Subset {
    int parent, rank;
};

int find(vector<Subset>& subsets, int i) {
    if (subsets[i].parent != i)
        subsets[i].parent = find(subsets, subsets[i].parent);
    return subsets[i].parent;
}

void Union(vector<Subset>& subsets, int x, int y) {
    int xroot = find(subsets, x);
    int yroot = find(subsets, y);
    
    if (subsets[xroot].rank < subsets[yroot].rank)
        subsets[xroot].parent = yroot;
    else if (subsets[xroot].rank > subsets[yroot].rank)
        subsets[yroot].parent = xroot;
    else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}

void KruskalMST(vector<Edge>& edges, int V) {
    sort(edges.begin(), edges.end());
    vector<Subset> subsets(V);
    for (int v = 0; v < V; v++) {
        subsets[v].parent = v;
        subsets[v].rank = 0;
    }
    
    vector<Edge> result;
    for (auto& edge : edges) {
        int x = find(subsets, edge.src);
        int y = find(subsets, edge.dest);
        if (x != y) {
            result.push_back(edge);
            Union(subsets, x, y);
        }
    }
}
`;

export const kruskalMSTPseudoCode = `
FUNCTION KruskalMST(Graph):
    sort edges of Graph by weight in non-decreasing order
    ds = DisjointSet()
    FOR each vertex v:
        ds.makeSet(v)
        
    mst = empty set of edges
    FOR each edge (u, v) by sorted weight:
        IF ds.find(u) != ds.find(v):
            mst.add((u, v))
            ds.union(u, v)
            
    RETURN mst
`;
