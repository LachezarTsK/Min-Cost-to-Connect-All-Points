

#include <algorithm>
#include <numeric>
#include <vector>
using namespace std;

class UnionFind {
    
    vector<int> parent;
    vector<int> rank;

public:
    UnionFind(int totalPoints) {
        parent.resize(totalPoints);
        iota(parent.begin(), parent.end(), 0);
        rank.resize(totalPoints);
    }

    int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = first;
        } else if (rank[first] < rank[second]) {
            parent[first] = second;
        } else {
            parent[second] = first;
            rank[first]++;
        }
    }
};

class Solution {

    struct Edge {
        int firstPoint{};
        int secondPoint{};
        int distance{};

        Edge() = default;
        ~Edge() = default;
        Edge(int firstPoint, int secondPoint, int distance): firstPoint{firstPoint}, secondPoint{secondPoint}, distance{distance}{}
    };

public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        if (points.size() < 2) {
            return 0;
        }
        const int totalPoints = points.size();
        const int totalEdges = (totalPoints * (totalPoints - 1)) / 2;

        vector<Edge> edges(totalEdges);
        initializeArrayEdges(points, edges, totalPoints);
        sort(edges.begin(), edges.end(), [](Edge x, Edge y){return x.distance < y.distance;});

        return calculateMinimumCostConnectAllPoints(edges, totalEdges, totalPoints);
    }
    
private:
    int calculateMinimumCostConnectAllPoints(const vector<Edge>& edges, int totalEdges, int totalPoints) {
        UnionFind unionFind(totalPoints);
        int countEdgesInMinSpanningTree = 0;
        int minCostConnectAllPoints = 0;

        for (int i = 0; i < totalEdges && countEdgesInMinSpanningTree < totalPoints - 1; ++i) {
            int parentFirst = unionFind.findParent(edges[i].firstPoint);
            int parentSecond = unionFind.findParent(edges[i].secondPoint);

            if (parentFirst != parentSecond) {
                unionFind.joinByRank(parentFirst, parentSecond);
                ++countEdgesInMinSpanningTree;
                minCostConnectAllPoints += edges[i].distance;
            }
        }
        return minCostConnectAllPoints;
    }

    void initializeArrayEdges(const vector<vector<int>>& points, vector< Edge>& edges, int totalPoints) {
        int index = 0;
        for (int i = 0; i < totalPoints; ++i) {
            for (int j = i + 1; j < totalPoints; ++j) {
                edges[index++] = Edge(i, j, manhattanDistance(points[i], points[j]));
            }
        }
    }

    int manhattanDistance(const vector<int>& firstPoint, const vector<int>& secondPoint) {
        return abs(firstPoint[0] - secondPoint[0]) + abs(firstPoint[1] - secondPoint[1]);
    }
};
