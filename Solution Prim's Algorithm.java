
import java.util.Arrays;

public class Solution {

    public int minCostConnectPoints(int[][] points) {
        if (points.length < 2) {
            return 0;
        }

        final int totalPoints = points.length;
        final boolean[] pointsInMinSpanningTree = new boolean[totalPoints];
        final int[] minCostConnect = new int[totalPoints];
        Arrays.fill(minCostConnect, Integer.MAX_VALUE);

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

    private int findNextPoint(int[] minCostConnect, boolean[] pointsInMinSpanningTree) {
        int currentCost = Integer.MAX_VALUE;
        int currentPoint = 0;
        for (int i = 0; i < minCostConnect.length; ++i) {
            if (!pointsInMinSpanningTree[i] && currentCost > minCostConnect[i]) {
                currentCost = minCostConnect[i];
                currentPoint = i;
            }
        }
        return currentPoint;
    }

    private void updateMinCostConnect(int[][] points, int[] minCostConnect, boolean[] pointsInMinSpanningTree, int nextPoint) {
        for (int i = 0; i < minCostConnect.length; ++i) {
            int cost = manhattanDistance(points[nextPoint], points[i]);
            if (!pointsInMinSpanningTree[i] && minCostConnect[i] > cost) {
                minCostConnect[i] = cost;
            }
        }
    }

    private int manhattanDistance(int[] firstPoint, int[] secondPoint) {
        return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
    }
}
