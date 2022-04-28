
#include <algorithm>
#include <numeric>
#include <vector>
using namespace std;

class Solution {
    
public:
    int minCostConnectPoints(vector<vector<int>>&points) {
        if (points.size() < 2) {
            return 0;
        }
        const int totalPoints = points.size();
        vector<bool> pointsInMinSpanningTree(totalPoints);
        vector<int> minCostConnect(totalPoints);
        fill(minCostConnect.begin(), minCostConnect.end(), INT_MAX);

        int countPointsInMinSpanningTree = 0;
        int minCostConnectAllPoints = 0;
        minCostConnect[0] = 0;

        while (countPointsInMinSpanningTree < totalPoints) {

            int nextPoint = findNextPoint(minCostConnect, pointsInMinSpanningTree);

            ++countPointsInMinSpanningTree;
            pointsInMinSpanningTree[nextPoint] = true;
            minCostConnectAllPoints += minCostConnect[nextPoint];
            updateMinCostConnect(points, minCostConnect, pointsInMinSpanningTree, nextPoint);
        }
        return minCostConnectAllPoints;
    }

private:
    int findNextPoint(const vector<int>& minCostConnect, const vector<bool>& pointsInMinSpanningTree) {
        int currentCost = INT_MAX;
        int currentPoint = 0;
        for (int i = 0; i < minCostConnect.size(); ++i) {
            if (!pointsInMinSpanningTree[i] && currentCost > minCostConnect[i]) {
                currentCost = minCostConnect[i];
                currentPoint = i;
            }
        }
        return currentPoint;
    }

    void updateMinCostConnect(const vector<vector<int>>& points, vector<int>& minCostConnect, const vector<bool>& pointsInMinSpanningTree, int nextPoint) {
        for (int i = 0; i < minCostConnect.size(); ++i) {
            int cost = manhattanDistance(points[nextPoint], points[i]);
            if (!pointsInMinSpanningTree[i] && minCostConnect[i] > cost) {
                minCostConnect[i] = cost;
            }
        }
    }

    int manhattanDistance(const vector<int>& firstPoint, const vector<int>& secondPoint) {
        return abs(firstPoint[0] - secondPoint[0]) + abs(firstPoint[1] - secondPoint[1]);
    }
};
