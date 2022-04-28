
import java.util.Arrays;
import java.util.stream.IntStream;

public class Solution {

    private static record Edge(int firstPoint, int secondPoint, int distance) {}

    public int minCostConnectPoints(int[][] points) {
        if (points.length < 2) {
            return 0;
        }
        final int totalPoints = points.length;
        final int totalEdges = (totalPoints * (totalPoints - 1)) / 2;

        Edge[] edges = new Edge[totalEdges];
        initializeArrayEdges(points, edges, totalPoints);
        Arrays.sort(edges, (x, y) -> x.distance - y.distance);

        return calculateMinimumCostConnectAllPoints(edges, totalEdges, totalPoints);
    }

    private int calculateMinimumCostConnectAllPoints(Edge[] edges, int totalEdges, int totalPoints) {

        UnionFind unionFind = new UnionFind(totalPoints);
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

    private void initializeArrayEdges(int[][] points, Edge[] edges, int totalPoints) {
        int index = 0;
        for (int i = 0; i < totalPoints; ++i) {
            for (int j = i + 1; j < totalPoints; ++j) {
                edges[index++] = new Edge(i, j, manhattanDistance(points[i], points[j]));
            }
        }
    }

    private int manhattanDistance(int[] firstPoint, int[] secondPoint) {
        return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
    }
}

class UnionFind {

    private final int[] parent;
    private final int[] rank;

    UnionFind(int totalPoints) {
        parent = IntStream.range(0, totalPoints).toArray();
        rank = new int[totalPoints];
    }

    protected int findParent(int index) {
        if (parent[index] != index) {
            parent[index] = findParent(parent[index]);
        }
        return parent[index];
    }

    protected void joinByRank(int first, int second) {
        if (rank[first] > rank[second]) {
            parent[second] = first;
        } else if (rank[first] < rank[second]) {
            parent[first] = second;
        } else {
            parent[second] = first;
            rank[first]++;
        }
    }
}
