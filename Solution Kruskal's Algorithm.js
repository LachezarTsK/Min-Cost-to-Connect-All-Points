
/**
 * @param {number[][]} points
 * @return {number}
 */
var minCostConnectPoints = function (points) {
    if (points.length < 2) {
        return 0;
    }
    const totalPoints = points.length;
    const totalEdges = (totalPoints * (totalPoints - 1)) / 2;

    const edges = new Array(totalEdges).fill(null);
    initializeArrayEdges(points, edges, totalPoints);
    edges.sort((x, y) => x.distance - y.distance);

    return calculateMinimumCostConnectAllPoints(edges, totalEdges, totalPoints);
};

/**
 * @param {Edge[]} edges
 * @param {number} totalEdges 
 * @param {number} totalPoints 
 * @return {number}
 */
function calculateMinimumCostConnectAllPoints(edges, totalEdges, totalPoints) {

    const unionFind = new UnionFind(totalPoints);
    let countEdgesInMinSpanningTree = 0;
    let minCostConnectAllPoints = 0;

    for (let i = 0; i < totalEdges && countEdgesInMinSpanningTree < totalPoints - 1; ++i) {
        let parentFirst = unionFind.findParent(edges[i].firstPoint);
        let parentSecond = unionFind.findParent(edges[i].secondPoint);

        if (parentFirst !== parentSecond) {
            unionFind.joinByRank(parentFirst, parentSecond);
            ++countEdgesInMinSpanningTree;
            minCostConnectAllPoints += edges[i].distance;
        }
    }
    return minCostConnectAllPoints;
}

/**
 * @param {number[][]} points 
 * @param {Edge[]} edges
 * @param {number} totalPoints 
 * @return {void}
 */
function initializeArrayEdges(points, edges, totalPoints) {
    let index = 0;
    for (let i = 0; i < totalPoints; ++i) {
        for (let j = i + 1; j < totalPoints; ++j) {
            edges[index++] = new Edge(i, j, manhattanDistance(points[i], points[j]));
        }
    }
}

/**
 * @param {number} firstPoint 
 * @param {number} secondPoint 
 * @return {number}
 */
function manhattanDistance(firstPoint, secondPoint) {
    return Math.abs(firstPoint[0] - secondPoint[0]) + Math.abs(firstPoint[1] - secondPoint[1]);
}

/**
 * @param {number} firstPoint 
 * @param {number} secondPoint 
 * @param {number} distance 
 */
function Edge(firstPoint, secondPoint, distance) {
    this.firstPoint = firstPoint;
    this.secondPoint = secondPoint;
    this.distance = distance;
}

class UnionFind {

    constructor(totalPoints) {
        this.parent = Array.from(Array(totalPoints).keys());
        this.rank = new Array(totalPoints).fill(0);
    }

    findParent(index) {
        if (this.parent[index] !== index) {
            this.parent[index] = this.findParent(this.parent[index]);
        }
        return this.parent[index];
    }

    joinByRank(first, second) {
        if (this.rank[first] > this.rank[second]) {
            this.parent[second] = first;
        } else if (this.rank[first] < this.rank[second]) {
            this.parent[first] = second;
        } else {
            this.parent[second] = first;
            this.rank[first]++;
        }
    }
}
